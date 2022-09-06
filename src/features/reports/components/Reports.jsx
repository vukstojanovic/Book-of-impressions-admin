import { useRef } from 'react'
import { DatePicker, Col, Select, Row, Space, Table, Modal, Button, Empty, Form, Input } from 'antd'
import { EyeOutlined, DeleteOutlined, PlusCircleOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import { Document, Page, pdfjs } from 'react-pdf'
import { useState } from 'react'

import { useCreateNewReport } from '../api/createNewReport.js'
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'

import { useSelectDate } from '@/hooks/useSelectDate'
import { getColumnSearchProps } from '@/utils/columnSearchFilter'
/* import { selectDateRange } from '@/utils/selectDateRange' */
import { SelectDateRange } from '@/components/buttons'

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`

export const Reports = () => {
  const { t } = useTranslation('Reports')
  const [form] = Form.useForm()

  const { mutate: createReport } = useCreateNewReport()
  const [selectDateRange, state] = useSelectDate()

  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [isCreateReportModalOpen, setIsCreateReportModalOpen] = useState(false)

  const [modalUrl, setModalUrl] = useState('')
  const [modalTitle, setModalTitle] = useState('')

  const [numPages, setNumPages] = useState(null)
  const [pageNumber, setPageNumber] = useState(1)
  const [isError, setIsError] = useState(false)

  const { Option } = Select

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

  function onFormSelectChange(value) {
    console.log(`selected ${value}`)
  }

  function onFieldsChange(values) {
    console.log('VALUES: ', values)
    if (values.length !== 0) {
      console.log('Length not 0')
      console.log('Value Name: ', values[0].name[0])
      if (values[0].name[0] !== 'forms' && values[0].name[0] !== 'name') {
        console.log('Not forms and not name')
        selectDateRange({ values, form })
      }
    }
  }

  const handleSubmitReports = (values) => {
    const data = {
      name: values.name,
      forms: values.forms,
      dateFrom: state.dateFrom,
      dateTo: state.dateTo,
    }
    createReport(data)
  }

  function handleOpenCreateReportModal() {
    setIsCreateReportModalOpen(true)
  }

  function handleCloseCreateReportModal() {
    setIsCreateReportModalOpen(false)
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
      <Row align="middle" justify="end" style={{ marginBottom: '1.75rem' }}>
        <Button
          onClick={handleOpenCreateReportModal}
          icon={<PlusCircleOutlined />}
          type="primary"
          shape="circle"
          size="large"
        />
      </Row>
      <Table
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
        as="form"
        visible={isCreateReportModalOpen}
        okText={t('generate')}
        cancelText={t('cancel')}
        centered
        title={t('create_new_report')}
        onCancel={handleCloseCreateReportModal}
        okButtonProps={{ htmlType: 'submit', form: 'report-form' }}
      >
        <Form
          onFieldsChange={onFieldsChange}
          form={form}
          onFinish={handleSubmitReports}
          layout="vertical"
          name="report-form"
        >
          <Form.Item label={t('label_name')} name="name">
            <Input allowClear />
          </Form.Item>
          <SelectDateRange />
          {state.custom && (
            <Col>
              <Form.Item name="pickedDate">
                <DatePicker.RangePicker style={{ maxWidth: '250px' }} />
              </Form.Item>
            </Col>
          )}
          <Form.Item label={t('label_forms')} name="forms">
            <Select
              mode="multiple"
              allowClear
              style={{
                width: '100%',
              }}
              placeholder="Please select"
              onChange={onFormSelectChange}
            >
              {data.map((option, i) => {
                return (
                  <Option value={option.name} key={i}>
                    {option.name}
                  </Option>
                )
              })}{' '}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
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
