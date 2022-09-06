import { useRef } from 'react'
import { Row, Col, Skeleton, Space, Table, Modal, Button, Empty } from 'antd'
import { EyeOutlined, DeleteOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import { Document, Page, pdfjs } from 'react-pdf'
import { useState } from 'react'
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'
import dayjs from 'dayjs'

import { AddButton } from '@/components/buttons/AddButton'
import { getColumnSearchProps } from '@/utils/columnSearchFilter'
import { useReports } from '@/features/reports/api/getReports'

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`

export const Reports = () => {
  const { t } = useTranslation('Reports')
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [modalUrl, setModalUrl] = useState('')
  const [modalTitle, setModalTitle] = useState('')
  const [numPages, setNumPages] = useState(null)
  const [pageNumber, setPageNumber] = useState(1)
  const [isError, setIsError] = useState(false)

  const { data: reports, isLoading } = useReports()

  // function for fixing misalignment bug in pdf contents
  function removeTextLayerOffset() {
    const textLayers = document.querySelectorAll('.react-pdf__Page__textContent')
    textLayers.forEach((layer) => {
      const { style } = layer
      style.top = '0'
      style.left = '0'
      style.transform = ''
    })
  }

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages)
    setIsError(false)
    removeTextLayerOffset()
  }

  function onDocumentLoadError() {
    setIsError(true)
  }

  function openModal(reportData) {
    setModalUrl(reportData?.url?.props?.href || '')
    setModalTitle(reportData.name)
    setIsViewModalOpen(true)
  }

  function closeModal() {
    setIsViewModalOpen(false)
    setPageNumber(1)
  }

  function changePageBack() {
    if (pageNumber > 1) setPageNumber((prevPageNumber) => prevPageNumber - 1)
  }

  function changePageNext() {
    if (pageNumber < numPages) setPageNumber((prevPageNumber) => prevPageNumber + 1)
  }

  const searchInput = useRef(null)

  const columns = [
    {
      title: t('name'),
      dataIndex: 'name',
      key: 'name',
      ...getColumnSearchProps('name', searchInput),
    },
    {
      title: t('created_by'),
      dataIndex: 'createdBy',
      key: 'createBy',
      ...getColumnSearchProps('createdBy', searchInput),
    },
    {
      title: t('url'),
      dataIndex: 'url',
      key: 'url',
      ...getColumnSearchProps('url', searchInput),
    },
    {
      title: t('created_at'),
      dataIndex: 'createdAt',
      key: 'cretedAt',
      ...getColumnSearchProps('createdAt', searchInput),
    },
    {
      title: t('action'),
      key: 'action',
      render: (_, record) => (
        <Space size="small">
          <EyeOutlined
            onClick={() => openModal(record)}
            style={{ fontSize: '20px', cursor: 'pointer' }}
          />
          <DeleteOutlined style={{ fontSize: '20px', cursor: 'pointer' }} />
        </Space>
      ),
    },
  ]

  if (isLoading) {
    return (
      <>
        <Row justify="end" style={{ marginBottom: '20px' }}>
          <Col>
            <Skeleton.Button shape="circle" />
          </Col>
        </Row>
        <Row>
          <Skeleton />
        </Row>
      </>
    )
  }

  if (reports[0].length === 0) {
    return (
      <Empty
        description={
          <span>
            <b>{t('no_results')}</b>
          </span>
        }
      />
    )
  }

  const data = reports[0].map((report) => {
    const { createdBy, createdDate, id: key, name, url } = report
    return {
      key,
      name,
      createdBy,
      url: (
        <a href={url} download>
          {name}.pdf
        </a>
      ),
      createdAt: dayjs(createdDate).format('DD/MM/YYYY'),
    }
  })

  return (
    <>
      <AddButton linkTo={'/reports/download-report'} />
      <Table
        style={{ overflowX: 'auto' }}
        columns={columns}
        dataSource={data}
        locale={{
          emptyText: (
            <Empty
              description={
                <span>
                  <b>{t('no_results')}</b>
                </span>
              }
            />
          ),
        }}
      />
      <Modal
        centered
        title={modalTitle}
        visible={isViewModalOpen}
        okText="Download pdf"
        onOk={closeModal}
        onCancel={closeModal}
        footer={
          <a href={modalUrl} download>
            <Button disabled={isError} type="primary">
              {t('download_pdf')}
            </Button>
          </a>
        }
      >
        <Document
          file={modalUrl}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={onDocumentLoadError}
          loading={<div>{t('loading')}</div>}
        >
          <Page height={600} pageNumber={pageNumber} onLoadSuccess={removeTextLayerOffset} />
        </Document>
        {!isError && (
          <div style={{ marginTop: '10px' }}>
            <Button
              style={
                pageNumber > 1
                  ? { cursor: 'pointer', marginRight: '5px' }
                  : { cursor: 'not-allowed', marginRight: '5px' }
              }
              onClick={changePageBack}
            >
              {t('prev')}
            </Button>
            <Button
              style={pageNumber < numPages ? { cursor: 'pointer' } : { cursor: 'not-allowed' }}
              onClick={changePageNext}
            >
              {t('next')}
            </Button>
            <p style={{ marginTop: '15px' }}>
              {t('page')} {pageNumber} {t('of')} {numPages}
            </p>
          </div>
        )}
      </Modal>
    </>
  )
}
