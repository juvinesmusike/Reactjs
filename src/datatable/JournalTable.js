import React, { useState, useEffect } from 'react'
import DataTable from 'react-data-table-component'
import { useSoaQuery } from 'src/features/functions/ReportsSlice'
import CIcon from '@coreui/icons-react'
import { CButton, CFormInput } from '@coreui/react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import {
  cilTrash,
  cilPencil,
  cilEyedropper,
  cilCloudDownload,
  cilFile,
  cilFolderOpen,
  cilSearch,
} from '@coreui/icons'
import { Row, Col } from 'react-bootstrap'
import JournalSubTable from './JournalSubTable'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { format } from 'date-fns'
import { ro } from 'date-fns/locale'

const JournalTable = () => {
  var converter = require('number-to-words')
  const [datas, setDatas] = useState([])
  const [selectedVoucher, setselectedVoucher] = useState([])
  const [filtereddata, setFiltereddata] = useState([])

  const [show, setShow] = useState(false)
  const closeModal = () => setShow(false)

  const { data } = useSoaQuery()

  const [remitter, setRemitter] = useState('')
  const [entrydate, setEntrydate] = useState('')
  const [currate, setcurrate] = useState('')
  const [search, setSearch] = useState('')
  const [voucherno, setVoucherno] = useState('')
  const [reference, setReference] = useState('')

  const [showEntry, setShowEntry] = useState(false)
  const [searchEntryDate, setSearchEntryDate] = useState('')
  const [EntryDateArray, setEntryDateArray] = useState([])

  const getdata = () => {
    try {
      setDatas(data)
      LoadArrayList()
    } catch (error) {
      console.log(error)
    }
  }

  const column = [
    {
      name: 'Voucher No.',
      selector: (row) => row.voucher,
    },
    {
      name: 'Account Group',
      selector: (row) => row.accountGroup,
    },
    {
      name: 'Company Name',
      selector: (row) => row.companyName,
    },
    {
      name: 'Description',
      selector: (row) => row.description,
    },
    {
      name: showEntry ? (
        <>
          <Form.Select
            size="sm"
            value={searchEntryDate}
            onChange={(e) => {
              setSearchEntryDate(e.target.value)
            }}
          >
            {EntryDateArray?.map((row) => (
              <option key={row.id} value={row.entrydate}>
                {row.entrydate}
              </option>
            ))}
          </Form.Select>
          <CButton
            size="sm"
            onClick={() => {
              setShowEntry(false)
              setSearchEntryDate('')
            }}
          >
            X
          </CButton>
        </>
      ) : (
        <label onClick={() => setShowEntry(true)}>Date Entry</label>
      ),
      selector: (row) => row.entryDate,
    },
    {
      name: 'Reference',
      selector: (row) => row.reference,
    },
    {
      name: 'Action',
      cell: (row) => (
        <>
          <CButton onClick={() => openModal(row)} className="btn-sm mx-1">
            <CIcon icon={cilFolderOpen} size="lg" />
          </CButton>
          {/* <CButton className="btn-sm btn-danger text-white">
            <CIcon icon={cilTrash} size="lg" />
          </CButton> */}
        </>
      ),
    },
  ]

  const LoadArrayList = () => {
    var list = []
    data?.map((row) => {
      let obj = list.find((o) => o.entrydate === row.entryDate)
      if (!obj) {
        list.push({ id: row.id, entrydate: row.entryDate })
      }
    })
    console.log(list)
    setEntryDateArray(list)
  }
  const openModal = (row) => {
    console.log(row)
    setselectedVoucher(row)
    // selectedDataState(row.voucher)
    setEntrydate(row.entryDate)
    setRemitter(row.description)
    setVoucherno(row.voucher)
    setReference(row.reference)
    setcurrate((parseFloat(row.currencyAmount) / parseFloat(row.amount))?.toFixed(2))
    setShow(true)
  }

  useEffect(() => {
    console.log(datas)
    const result = datas?.filter((data) => {
      return (
        data.voucher?.toLowerCase().match(search.toLocaleLowerCase()) &&
        data.entryDate?.toLowerCase().match(searchEntryDate.toLocaleLowerCase())
      )
    })

    setFiltereddata(result)
  }, [search, datas, searchEntryDate])

  useEffect(() => {
    getdata()
  }, [data])

  return (
    <>
      <DataTable
        columns={column}
        data={filtereddata}
        pagination
        subHeader
        subHeaderAlign="right"
        subHeaderComponent={
          <>
            <CIcon icon={cilSearch} />
            <CFormInput
              placeholder="Search Voucher Number"
              className="w-25 mx-2"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </>
        }
        title="Accounts Information"
      />
      <Modal show={show} onHide={closeModal} centered size="xl">
        <Modal.Header closeButton>
          <Modal.Title>
            <center>JOURNAL REPORT</center>
          </Modal.Title>
          {/* <Modal.Title>{selectedVoucher}</Modal.Title> */}
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Form.Label column sm={2} md={2} style={{ fontWeight: 'bold' }}>
              Voucher No:
            </Form.Label>
            <Form.Label
              column
              sm={2}
              md={3}
              style={{ fontWeight: 'bold', textDecoration: 'underline' }}
            >
              {voucherno}
              {/* {converter.toWords(4852625.56)} */}
            </Form.Label>
            <Form.Label column sm={2} md={2} style={{ fontWeight: 'bold' }}>
              Reference :
            </Form.Label>
            <Form.Label
              column
              sm={2}
              md={3}
              style={{ fontWeight: 'bold', textDecoration: 'underline' }}
            >
              {reference}
            </Form.Label>
          </Row>
          <Row>
            <Form.Label column sm={2} md={2} style={{ fontWeight: 'bold' }}>
              Remitter:
            </Form.Label>
            <Form.Label
              column
              sm={2}
              md={3}
              style={{ fontWeight: 'bold', textDecoration: 'underline' }}
            >
              {remitter}
            </Form.Label>
            <Form.Label column sm={1} md={1} style={{ fontWeight: 'bold' }}>
              Date:
            </Form.Label>
            <Form.Label
              column
              sm={2}
              md={2}
              style={{ fontWeight: 'bold', textDecoration: 'underline' }}
            >
              {entrydate}
            </Form.Label>
            <Form.Label column sm={1} md={1} style={{ fontWeight: 'bold' }}>
              Rate:
            </Form.Label>
            <Form.Label
              column
              sm={1}
              md={2}
              style={{ fontWeight: 'bold', textDecoration: 'underline' }}
            >
              {currate}
            </Form.Label>
          </Row>
          <hr />
          <Row>
            <Col>
              <JournalSubTable voucherdetials={selectedVoucher} pagination />
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          {/* <Button variant="secondary" onClick={handleClose}>
            Close
          </Button> */}
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default JournalTable
