import React, { useState, useEffect, useMemo } from 'react'
import axios from 'axios'
import { useTable, usePagination } from 'react-table'
import DataTable from 'react-data-table-component'
import {
  CButton,
  CFormInput,
  CFormSelect,
  CInputGroup,
  CTable,
  CTableBody,
  CTableHead,
  CTableRow,
} from '@coreui/react'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import CIcon from '@coreui/icons-react'
import { cilDelete, cilPencil, cilTrash } from '@coreui/icons'
import { useAccountsetupQuery } from 'src/features/functions/ReportsSlice'
import { useUpdateaccountMutation } from 'src/features/functions/UploadSlice'
import {
  useAnnexsubkeyQuery,
  useAnnextypeQuery,
  useMaingroupQuery,
} from 'src/features/functions/AnnexSetupSlice'
import { ro } from 'date-fns/locale'

const Dt_SetupAccount = () => {
  //--load all selected options
  const { data: MainGroupList } = useMaingroupQuery()
  const { data: AnnexTypeList } = useAnnextypeQuery()
  const { data: AnnexSubKeyList } = useAnnexsubkeyQuery()

  const [mainList, setMainList] = useState([])
  const [typeList, setTypeList] = useState([])
  const [SubList, setSubList] = useState([])

  const [mainselecetedvalue, setMainSelectedValue] = useState('')
  const [Typeselecetedvalue, setTypeSelectedValue] = useState('')
  const [Subselecetedvalue, setSubSelectedValue] = useState('')
  const [accountnumber, setAccountnumber] = useState('')
  const [accountname, setAccountname] = useState('')
  const [TypeName, setTypeName] = useState('')
  const [SubName, setSubName] = useState('')

  const [datas, setDatas] = useState([])
  const [filtereddata, setFiltereddata] = useState([])
  const { data: AccountsList } = useAccountsetupQuery()
  const accountsetup = useAccountsetupQuery()

  const [updateaccount] = useUpdateaccountMutation()

  const [search, setSearch] = useState('')

  const getdata = async () => {
    try {
      setDatas(AccountsList)
      setFiltereddata(AccountsList)
    } catch (error) {
      console.log(error)
    }
  }

  const LoadSelectedAnnexType = (maincode) => {
    setMainSelectedValue(maincode)
    var list = []
    AnnexTypeList?.map((row) => {
      if (row.m_group == maincode) {
        list.push({ letter: row.letter, name: row.name, id: row.id })
      }
    })
    setTypeList(list)
  }

  const LoadSelectedAnnexSub = (_id) => {
    var TypeInfo = AnnexTypeList?.find(({ id }) => id == _id)
    setTypeName(TypeInfo?.name)
    //   console.log(TypeInfo?.id)
    setTypeSelectedValue(TypeInfo?.id)
    var list = []
    AnnexSubKeyList?.map((row) => {
      if (row.annex_letter == TypeInfo?.letter) {
        list.push({ code: row.code, name: row.name, id: row.id })
      }
    })
    setSubList(list)
  }

  const SetSubKey = (e) => {
    setSubSelectedValue(e.target.value)
    var SubInfo = SubList?.find(({ code }) => code == e.target.value)
    setSubName(SubInfo?.name)
    console.log(SubInfo?.name)
  }

  useEffect(() => {
    getdata()
    setMainList(MainGroupList)
  }, [MainGroupList, AccountsList])

  const column = [
    {
      name: 'Account Number',
      selector: (row) => row.accountnumber,
    },
    {
      name: 'Account Name',
      selector: (row) => row.accountname,
    },
    {
      name: 'Main Group',
      selector: (row) => row.maingroup,
    },
    {
      name: 'Annex Type',
      selector: (row) => row.annextype,
    },
    {
      name: 'Annex Sub Key',
      selector: (row) => row.annexsubkey,
    },
    ,
    {
      name: 'Action',
      cell: (row) => (
        <>
          <CButton onClick={() => ViewModal(row)} className="btn-sm mx-1">
            <CIcon icon={cilPencil} size="lg" />
          </CButton>
          <CButton className="btn-sm btn-danger text-white">
            <CIcon icon={cilTrash} size="lg" />
          </CButton>
        </>
      ),
    },
  ]

  const ViewModal = (row) => {
    //  console.log(row)\

    if (!isNullOrWhitespace(row?.annextype) && !isNullOrWhitespace(row?.annexsubkey)) {
      var TypeInfo = (TypeInfo = AnnexTypeList?.find(({ letter }) => letter == row.annextype))

      LoadSelectedAnnexType(row.maingroup)
      LoadSelectedAnnexSub(TypeInfo?.id)

      setMainSelectedValue(row.maingroup)
      setTypeSelectedValue(TypeInfo?.id)
      setSubSelectedValue(row.annexsubkey)

      // setTypeList(AnnexTypeList)
      // setSubList(AnnexSubKeyList)
    } else {
      setTypeList([])
      setSubList([])
      setMainSelectedValue('')
      LoadSelectedAnnexType('')
      LoadSelectedAnnexSub('')
      setTypeSelectedValue('')
      setSubSelectedValue('')
    }

    setAccountnumber(row.accountnumber)
    setAccountname(row.accountname)
    handleShow()
  }

  function isNullOrWhitespace(input) {
    return !input || !input.trim()
  }

  const [show, setShow] = useState(false)

  const handleClose = async () => {
    var TypeInfo = (TypeInfo = AnnexTypeList?.find(({ id }) => id == Typeselecetedvalue))
    var result = await updateaccount({
      number: accountnumber,
      maingroup: mainselecetedvalue,
      annextype: TypeInfo?.letter,
      annexname: TypeName,
      annexsubkey: Subselecetedvalue,
      annexsubname: SubName,
    })
    accountsetup.refetch()
    setShow(false)
  }

  const closeModal = () => {
    setTypeList([])
    setSubList([])
    setMainSelectedValue('')
    LoadSelectedAnnexType('')
    LoadSelectedAnnexSub('')
    setTypeSelectedValue('')
    setSubSelectedValue('')
    setShow(false)
  }
  const handleShow = () => setShow(true)

  useEffect(() => {
    const result = datas?.filter((data) => {
      return data.accountnumber.toLowerCase().match(search.toLocaleLowerCase())
    })

    setFiltereddata(result)
  }, [search, datas])
  return (
    <>
      <DataTable
        columns={column}
        data={filtereddata}
        pagination
        subHeader
        subHeaderAlign="right"
        subHeaderComponent={
          <CFormInput
            placeholder="Search Account Number"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        }
        title="Accounts Information"
      />

      <Modal show={show} onHide={closeModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Account Info</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Account Number</Form.Label>
              <Form.Control
                type="text"
                value={accountnumber}
                placeholder="Account Number"
                autoFocus
                readOnly
                style={{ fontWeight: 'bold' }}
                onChange={(e) => setAccountnumber(e.target.value)}
              />
              <Form.Label>Account Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Account Code"
                readOnly
                style={{ fontWeight: 'bold' }}
                value={accountname}
                onChange={(e) => setAccountname(e.target.value)}
              />
              <Form.Label>Main Group</Form.Label>
              <Form.Select
                type="text"
                placeholder="Main Group"
                // defaultValue={selecteddata.maingroup}
                style={{ fontWeight: 'bold' }}
                value={mainselecetedvalue}
                onChange={(e) => LoadSelectedAnnexType(e.target.value)}
              >
                <option value="0">Select Main Group</option>
                {mainList?.map((row) => (
                  <option value={row.code} key={row.id}>
                    {row.code} - {row.name}
                  </option>
                ))}
              </Form.Select>
              <Form.Label>Annex Type</Form.Label>
              <Form.Select
                type="text"
                placeholder="Main Group"
                value={Typeselecetedvalue}
                style={{ fontWeight: 'bold' }}
                onChange={(e) => LoadSelectedAnnexSub(e.target.value)}
              >
                <option value="0">Select Annex Type</option>
                {typeList?.map((row) => (
                  <option value={row.id} key={row.id}>
                    {row.letter} - {row.name}
                  </option>
                ))}
              </Form.Select>
              <Form.Label>Annex Sub Key</Form.Label>
              <Form.Select
                type="text"
                placeholder="Main Group"
                value={Subselecetedvalue}
                style={{ fontWeight: 'bold' }}
                onChange={(e) => SetSubKey(e)}
              >
                <option value="0">Select Sub Key</option>
                {SubList?.map((row) => (
                  <option value={row.code} key={row.id}>
                    {row.code} - {row.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          {/* <Button variant="secondary" onClick={handleClose}>
            Close
          </Button> */}
          <Button variant="primary" onClick={() => handleClose()}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Dt_SetupAccount
