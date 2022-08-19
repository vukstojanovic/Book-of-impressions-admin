import { useRef } from 'react'
import { Space, Table, Modal, Button } from 'antd'
import { EyeOutlined, DeleteOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import { Document, Page, pdfjs } from 'react-pdf'
import { useState } from 'react'
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'

import { AddButton } from '@/components/buttons/AddButton'
import { getColumnSearchProps } from '@/utils/columnSearchFilter'

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`

export const Reports = () => {
  const { t } = useTranslation('Reports')
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [modalUrl, setModalUrl] = useState('')
  const [modalTitle, setModalTitle] = useState('')
  const [numPages, setNumPages] = useState(null)
  const [pageNumber, setPageNumber] = useState(1)
  const [isError, setIsError] = useState(false)

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
    console.log(reportData?.url?.props?.href)
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

  const data = [
    {
      key: '1',
      name: 'Boi',
      createdBy: 'Danilo Markicevic',
      url: (
        <a href="/sample.pdf" download>
          sample.pdf
        </a>
      ),
      createdAt: '12.05.2022',
    },
    {
      key: '2',
      name: 'Boi2',
      createdBy: 'Vuk Stojanovic',
      url: (
        <a href="/masina_za_ves.pdf" download>
          masina_za_ves.pdf
        </a>
      ),
      createdAt: '11.06.2021',
    },
    {
      key: '3',
      name: 'Boi3',
      createdBy: 'Stefan Meza',
      url: (
        <a href="/it_academy.pdf" download>
          it_academy.pdf
        </a>
      ),
      createdAt: '05.08.2022',
    },
    {
      key: '4',
      name: 'Travel App',
      createdBy: 'Vlada Stojanovic',
      url: (
        <a href="/pdf_test.pdf" download>
          pdf_test
        </a>
      ),
      createdAt: '24.06.2021',
    },
    {
      key: '5',
      name: 'Benefit',
      createdBy: 'Nikola Markovic',
      url: (
        <a href="/" download>
          no pdf available
        </a>
      ),
      createdAt: '10.11.2022',
    },
  ]

  return (
    <>
      <AddButton linkTo={'/reports/download-report'} />
      <Table columns={columns} dataSource={data} />
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
