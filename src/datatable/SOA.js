import React, { useEffect, useState, useContext } from 'react'
import DataTable from 'react-data-table-component'
import { useJournalsQuery } from 'src/features/functions/ReportsSlice'
import { cilDelete, cilFile, cilSearch, cilPencil, cilReportSlash, cilTrash } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { Modal, Button, Form, Row } from 'react-bootstrap'
import { CButton, CFormInput } from '@coreui/react'
import SoaReport from './SoaReport'
// import axios from 'axios'
import { useShipnetreportMutation } from 'src/features/functions/StatementOfAccount'

const SOA = () => {
  const [shipnetreport] = useShipnetreportMutation()
  const [datas, setDatas] = useState([])
  const [shitnetData, SetShipnetData] = useState([])

  const [search, setSearch] = useState('')
  const [searchEntryDate, setSearchEntryDate] = useState('')
  const [EntryDateArray, setEntryDateArray] = useState([])
  const [filtereddata, setFiltereddata] = useState([])
  const [showEntry, setShowEntry] = useState(false)

  const { data } = useJournalsQuery()

  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = async (row) => {
    setShow(true)
    var result = await shipnetreport({ shipcode: row.shipCode }).unwrap()
    SetShipnetData(result)
    // console.log('result')
  }

  const getdata = () => {
    try {
      setDatas(data)
      LoadArrayList()
    } catch (error) {
      console.log(error)
    }
  }

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
  const column = [
    {
      name: 'ShipNet Code',
      selector: (row) => row.shipCode,
    },
    {
      name: 'Name',
      selector: (row) => row.shipName,
    },
    {
      name: 'Company Name',
      selector: (row) => row.companyName,
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
      name: 'Action',
      cell: (row) => (
        <>
          <CButton className="btn-sm mx-1" onClick={() => handleShow(row)}>
            <CIcon icon={cilFile} size="lg" />
          </CButton>
        </>
      ),
    },
  ]

  useEffect(() => {
    // console.log(datas)
    const result = datas?.filter((data) => {
      return (
        data.shipCode?.toLowerCase().match(search.toLocaleLowerCase()) &&
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
      <Modal show={show} onHide={handleClose} size={'xl'}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Form.Label column sm={2} md={2} style={{ fontWeight: 'bold' }}>
              Vessel:
            </Form.Label>
            <Form.Label
              column
              sm={2}
              md={3}
              style={{ fontWeight: 'bold', textDecoration: 'underline' }}
            ></Form.Label>
            <Form.Label column sm={2} md={2} style={{ fontWeight: 'bold' }}>
              Date :
            </Form.Label>
            <Form.Label
              column
              sm={2}
              md={3}
              style={{ fontWeight: 'bold', textDecoration: 'underline' }}
            ></Form.Label>
            <Form.Label column sm={2} md={2} style={{ fontWeight: 'bold' }}>
              To :
            </Form.Label>
            <Form.Label
              column
              sm={2}
              md={3}
              style={{ fontWeight: 'bold', textDecoration: 'underline' }}
            ></Form.Label>
          </Row>
          <Row>
            <SoaReport shitnetData={shitnetData} />
          </Row>
        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer> */}
      </Modal>
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
              placeholder="Search ShipNet Code"
              className="w-25 mx-2"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </>
        }
        title="SOA Information"
      />
    </>
  )
}

export default SOA
