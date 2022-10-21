import React, { useEffect, useState } from 'react'
import { Card, Form, Table, Container, Row, Col } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import { CButton, CForm, CFormInput } from '@coreui/react'
import Modal from 'react-bootstrap/Modal'
import {
  useMaingroupQuery,
  useSavemainMutation,
  useAnnextypeQuery,
  useSaveannextypeMutation,
  useUpdatemainMutation,
  useDeletemainMutation,
  useAnnexsubkeyQuery,
  useSaveannexsubMutation,
  useUpdateannextypeMutation,
  useDeleteannextypeMutation,
  useGetmaingroupMutation,
  useGetannextypeMutation,
  useGetannexsubkeyMutation,
} from 'src/features/functions/AnnexSetupSlice'
import { cilSettings, cilPencil, cilTrash } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import DataTable from 'react-data-table-component'

const ShipNetTable = () => {
  const M_table = {
    display: 'block' /* important */,
    height: '225px',
    overflowY: 'scroll',
  }

  const AnnexType_table = {
    display: 'block' /* important */,
    height: '225px',
    overflowY: 'scroll',
  }

  const AnnexSub_table = {
    display: 'block' /* important */,
    height: '225px',
    overflowY: 'scroll',
  }

  const thead_row = {
    width: '100%',
    display: 'table',
    tableLayout: 'fixed',
  }

  const { data: Mainlist } = useMaingroupQuery()
  const { data: AnnexTypeList } = useAnnextypeQuery()
  const { data: AnnexSubList } = useAnnexsubkeyQuery()

  //-- Main Group Variables
  const maingroup = useMaingroupQuery()
  const [savemain] = useSavemainMutation()
  const [updatemain] = useUpdatemainMutation()
  const [deletemain] = useDeletemainMutation()
  const [getmaingroup] = useGetmaingroupMutation()

  const [maindata, setMaindata] = useState([])
  const [BtnMainName, SetBtnMainName] = useState('')
  const [maincode, setMaincode] = useState('')
  const [mainname, setMainname] = useState('')

  //--AnnexType Variables
  const [annextypelist, setAnnextype] = useState([])
  const [typemaingroup, setTypemaingroup] = useState('')
  const [typeletter, setTypeletter] = useState('')
  const [typename, setTypeName] = useState('')
  const [BtnAnnexType, SetBtnAnnexType] = useState('')
  const [TypeID, setTypeID] = useState('')
  const annextype = useAnnextypeQuery()
  const [saveannextype] = useSaveannextypeMutation()
  const [updateannextype] = useUpdateannextypeMutation()
  const [deleteannextype] = useDeleteannextypeMutation()
  const [getannextype] = useGetannextypeMutation()

  //--AnnexSub Key Variables
  const [annexsubkeylist, setAnnexsubkeylist] = useState([])
  const [selecttypemaingroup, setSelectTypemaingroup] = useState('')
  const [subAnnexletter, setSubAnnexletter] = useState('')
  const [subCode, setSubCode] = useState('')
  const [subName, setSubName] = useState('')
  const [selectedMgroup, setSelectedMgroup] = useState([])
  const [BtnAnnexSub, SetBtnAnnexSub] = useState('')
  const [saveannexsub] = useSaveannexsubMutation()
  const [getannexsubkey] = useGetannexsubkeyMutation()
  const annexsubkey = useAnnexsubkeyQuery()

  //-- local variables
  const [shipcode, setShipcode] = useState('')

  //-- Main Group Functions
  const EditMain = (row) => {
    setMainname(row.name)
    setMaincode(row.code)
    SetBtnMainName('Update')
  }

  // const [show, setShow] = useState(false)
  // const closeModal = () => setShow(false)

  const SaveUpdateMain = async () => {
    if (maincode == '' || mainname == '') {
      console.log('empty')
    } else {
      if (BtnMainName == 'Save') {
        var result = await savemain({
          code: maincode,
          name: mainname,
        }).unwrap()
        maingroup.refetch()
        if (result.isSuccess) {
          console.log(result)
        } else {
          console.log(result)
        }
      } else {
        var result = await updatemain({
          Code: maincode,
          code: maincode,
          name: mainname,
        }).unwrap()
        maingroup.refetch()
        SetBtnMainName('Save')
      }
    }
  }

  const DeleteMain = async (row) => {
    var result = await deletemain({ Code: row.code }).unwrap()
    reLoadList(row.shipNetCode)
  }

  // -- Annex Type Functions
  const EditAnnexType = (row) => {
    setTypemaingroup(row.m_group)
    setTypeletter(row.letter)
    setTypeName(row.name)
    setTypeID(row.id)
    SetBtnAnnexType('Update')
  }

  const SaveUpdateAnnexType = async () => {
    if (typemaingroup == '' || typeletter == '' || typename == '') {
      console.log('empty')
    } else {
      if (BtnAnnexType == 'Save') {
        var result = await saveannextype({
          m_group: typemaingroup,
          letter: typeletter,
          name: typename,
        }).unwrap()
        if (result.isSuccess) {
          console.log(result)
        } else {
          console.log(result)
        }
        annextype.refetch()
      } else {
        var result = await updateannextype({
          id: TypeID,
          m_group: typemaingroup,
          letter: typeletter,
          name: typename,
        }).unwrap()
        SetBtnAnnexType('Save')
        annextype.refetch()
      }
    }
  }

  const DeleteAnnexType = async (row) => {
    var result = await deleteannextype({ id: row.id }).unwrap()
    reLoadList(row.shipNetCode)
  }

  //-- Annex Sub Functionality
  const EditAnnexSub = (row) => {
    LoadSelectedAnnexType(row.m_group)
    setSelectTypemaingroup(row.m_group)
    setSubCode(row.code)
    setSubName(row.name)
    SetBtnAnnexSub('Update')
    setSubAnnexletter(row.annex_letter)
  }

  const SaveUpdateAnnexSub = async () => {
    if (subName == '' || subCode == '') {
      console.log('empty')
    } else {
      if (BtnAnnexSub == 'Save') {
        var result = await saveannexsub({
          m_group: selecttypemaingroup,
          annex_letter: subAnnexletter,
          code: subCode,
          name: subName,
          shipNetCode: shipcode,
        }).unwrap()
        annexsubkey.refetch()
        if (result.isSuccess) {
          console.log(result)
        } else {
          console.log(result)
        }
      } else {
      }
    }
  }

  const LoadSelectedAnnexType = (maincode) => {
    setSelectTypemaingroup(maincode)
    var list = []

    annextypelist?.map((x) => {
      if (x.m_group == maincode) {
        list.push(x)
      }
    })
    setSelectedMgroup(list)
    console.log(list)
  }

  const reLoadList = async (ShipCode) => {
    var mainList = await getmaingroup({ ShipCode }).unwrap()
    setMaindata(mainList)

    var annexType = await getannextype({ ShipCode }).unwrap()
    setAnnextype(annexType)

    var annexSub = await getannexsubkey({ ShipCode }).unwrap()
    setAnnexsubkeylist(annexSub)
  }

  useEffect(() => {
    console.log(Mainlist)
    setMaindata(Mainlist)
    setAnnextype(AnnexTypeList)
    setAnnexsubkeylist(AnnexSubList)
    SetBtnMainName('Save')
    SetBtnAnnexType('Save')
    SetBtnAnnexSub('Save')
  }, [Mainlist, AnnexTypeList, AnnexSubList])

  const SetupVissel = async (row) => {
    // setShow(true)
    setShipcode(row.shipCode)

    reLoadList(row.shipCode)
  }

  const column = [
    {
      name: 'ShipNet Code',
      selector: (row) => row.shipCode,
    },
    {
      name: 'Vissel Name',
      selector: (row) => row.name,
    },
    {
      name: 'Action',
      cell: (row) => (
        <>
          <CButton className="btn-sm mx-1" onClick={() => SetupVissel(row)}>
            <CIcon icon={cilSettings} size="lg" />
          </CButton>
          {/* <CButton className="btn-sm btn-danger text-white">
            <CIcon icon={cilTrash} size="lg" />
          </CButton> */}
        </>
      ),
    },
  ]
  return (
    <>
      {/* <DataTable
        columns={column}
        data={VisselData}
        pagination
        subHeader
        subHeaderAlign="right"
        subHeaderComponent={<CFormInput placeholder="Search Account Number" />}
        title="Vissel ShipNET Code List"
      /> */}

      <Row>
        <Col sm={12} md={6}>
          <Card>
            <Form className="p-4">
              <Form.Label style={{ fontWeight: 'bold' }}>Main Group</Form.Label>
              <hr />
              <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                <Form.Label column sm="2" size={'sm'}>
                  Code
                </Form.Label>
                <Col sm="4">
                  <Form.Control
                    type="text"
                    placeholder="Code"
                    value={maincode}
                    onChange={(e) => setMaincode(e.target.value)}
                  />
                </Col>
                <Form.Label column sm="2">
                  Name
                </Form.Label>
                <Col sm="4">
                  <Form.Control
                    type="text"
                    placeholder="Name"
                    value={mainname}
                    onChange={(e) => setMainname(e.target.value)}
                  />
                </Col>
              </Form.Group>
              <hr />
              <Form.Label style={{ fontWeight: 'bold' }}>Main Group List</Form.Label>
              <Table striped bordered hover size="sm" className="mt-2">
                <thead style={thead_row}>
                  <tr>
                    <th>Code</th>
                    <th>Name</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody style={M_table}>
                  {maindata?.map((row) => (
                    <tr key={row.id} style={thead_row}>
                      <td>{row.code}</td>
                      <td>{row.name}</td>
                      <td>
                        <CButton className="btn-sm mx-1" onClick={() => EditMain(row)}>
                          <CIcon icon={cilPencil} />
                        </CButton>
                        <CButton
                          className="btn-sm btn-danger text-white"
                          onClick={() => DeleteMain(row)}
                        >
                          <CIcon icon={cilTrash} />
                        </CButton>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Row>
                <Col>
                  <CButton
                    style={{ float: 'right', width: '30%' }}
                    onClick={() => SaveUpdateMain()}
                  >
                    {BtnMainName}
                  </CButton>
                </Col>
              </Row>
            </Form>
          </Card>
        </Col>

        <Col sm={12} md={6}>
          <Card>
            <Form className="p-4">
              <Form.Label style={{ fontWeight: 'bold' }}>Annex Type</Form.Label>
              <hr />
              <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                <Form.Label column sm="3">
                  Main Group
                </Form.Label>
                <Col sm="9" className="mb-3">
                  <Form.Select
                    aria-label="Default select example"
                    value={typemaingroup}
                    onChange={(e) => setTypemaingroup(e.target.value)}
                  >
                    <option value={0}>Select Main Group</option>
                    {maindata?.map((row) => (
                      <option key={row.id} value={row.code}>
                        {row.code} - {row.name}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
                <Form.Label column sm="2" size={'sm'}>
                  Letter
                </Form.Label>
                <Col sm="2">
                  <Form.Control
                    type="text"
                    placeholder="Letter"
                    value={typeletter}
                    onChange={(e) => setTypeletter(e.target.value)}
                  />
                </Col>
                <Form.Label column sm="2">
                  Name
                </Form.Label>
                <Col sm="6">
                  <Form.Control
                    type="text"
                    placeholder="Name"
                    value={typename}
                    onChange={(e) => setTypeName(e.target.value)}
                  />
                </Col>
              </Form.Group>

              <hr />
              <Form.Label style={{ fontWeight: 'bold' }}>Annex Type List</Form.Label>
              <Table striped bordered hover size="sm" className="mt-2">
                <thead style={thead_row}>
                  <tr>
                    <th>Main Group</th>
                    <th>Letter</th>
                    <th>Name</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody style={AnnexType_table}>
                  {annextypelist?.map((row) => (
                    <tr style={thead_row} key={row.id}>
                      <td>{row.m_group}</td>
                      <td>{row.letter}</td>
                      <td>{row.name}</td>
                      <td>
                        <CButton className="btn-sm mx-1" onClick={() => EditAnnexType(row)}>
                          <CIcon icon={cilPencil} />
                        </CButton>
                        <CButton
                          className="btn-sm btn-danger text-white"
                          onClick={() => DeleteAnnexType(row)}
                        >
                          <CIcon icon={cilTrash} />
                        </CButton>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Row>
                <Col>
                  <CButton
                    style={{ float: 'right', width: '30%' }}
                    onClick={() => SaveUpdateAnnexType()}
                    value={BtnAnnexType}
                  >
                    {BtnAnnexType}
                  </CButton>
                </Col>
              </Row>
            </Form>
          </Card>
        </Col>
      </Row>

      <Row className="mt-3">
        <Col sm={12} md={12}>
          <Card>
            <Form className="p-4">
              <Form.Label style={{ fontWeight: 'bold' }}>Annex Sub Key</Form.Label>
              <hr />
              <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                <Form.Label column sm={2}>
                  Main Group
                </Form.Label>
                <Col sm={4} className="mb-3">
                  <Form.Select
                    aria-label="Default select example"
                    value={selecttypemaingroup}
                    onChange={(e) => LoadSelectedAnnexType(e.target.value)}
                  >
                    <option value={0}>Select Main Group</option>
                    {maindata?.map((row) => (
                      <option key={row.id} value={row.code}>
                        {row.code} - {row.name}
                      </option>
                    ))}
                  </Form.Select>
                </Col>

                <Form.Label column sm={2}>
                  Annex Type
                </Form.Label>
                <Col sm={4} className="mb-3">
                  <Form.Select
                    aria-label="Default select example"
                    value={subAnnexletter}
                    onChange={(e) => setSubAnnexletter(e.target.value)}
                  >
                    <option>Select Annex Letter</option>
                    {selectedMgroup?.map((row) => (
                      <option value={row.letter}>
                        {row.letter} - {row.name}
                      </option>
                    ))}
                  </Form.Select>
                </Col>

                <Form.Label column sm="2" size={'sm'}>
                  Code
                </Form.Label>
                <Col sm="4">
                  <Form.Control
                    type="text"
                    placeholder="Code"
                    value={subCode}
                    onChange={(e) => setSubCode(e.target.value)}
                  />
                </Col>
                <Form.Label column sm="2">
                  Name
                </Form.Label>
                <Col sm="4">
                  <Form.Control
                    type="text"
                    placeholder="Name"
                    value={subName}
                    onChange={(e) => setSubName(e.target.value)}
                  />
                </Col>
              </Form.Group>
              <hr />
              <Form.Label style={{ fontWeight: 'bold' }}>Annex Sub Key List</Form.Label>
              <div></div>
              <Table striped bordered hover size="sm" className="mt-2">
                <thead style={thead_row}>
                  <tr>
                    <th>Main Group</th>
                    <th>Annex Type</th>
                    <th>Code</th>
                    <th>Name</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody style={AnnexSub_table}>
                  {annexsubkeylist?.map((row) => (
                    <tr style={thead_row} key={row.id}>
                      <td>{row.m_group}</td>
                      <td>{row.annex_letter}</td>
                      <td>{row.code}</td>
                      <td>{row.name}</td>
                      <td>
                        <CButton className="btn-sm mx-1" onClick={() => EditAnnexSub(row)}>
                          <CIcon icon={cilPencil} />
                        </CButton>
                        <CButton className="btn-sm btn-danger text-white">
                          <CIcon icon={cilTrash} />
                        </CButton>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Row>
                <Col>
                  <CButton
                    style={{ float: 'right', width: '30%' }}
                    value={BtnAnnexSub}
                    onClick={() => SaveUpdateAnnexSub()}
                  >
                    {BtnAnnexSub}
                  </CButton>
                </Col>
              </Row>
            </Form>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default ShipNetTable
