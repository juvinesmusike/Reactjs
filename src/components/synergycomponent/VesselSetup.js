import React, { useState } from 'react'
import { CButton, CForm, CFormInput, CImage } from '@coreui/react'
import { Form } from 'react-bootstrap'
import VesselTable from 'src/datatable/VesselTable'
import { useUploadvesselMutation } from 'src/features/functions/VesselSlice'
import Loading from 'src/assets/images/loading.gif'
import { toastSuccess, toastError, toastWarning } from 'src/app/toast'
import { ToastContainer } from 'react-toastify'

const VesselSetup = () => {
  const [uploadvessel] = useUploadvesselMutation()
  const [file, setFile] = useState()
  const [loading, Setloading] = useState(false)

  const onChange = (e) => {
    setFile(e.target.files[0])
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    if (file) {
      let formData = new FormData()
      formData.append('file', file)
      //  console.log(formData)
      var result = await uploadvessel(formData).unwrap()
      if (result.isSuccess) {
        toastSuccess('File Uploaded!')
        setFile('')
        Setloading(false)
      } else {
        toastWarning(result.message)
        Setloading(false)
      }
    } else {
      toastWarning('Please Select a File!')
      Setloading(false)
    }
  }

  const ViewLoading = loading ? (
    <CImage
      src={Loading}
      style={{
        zIndex: '1',
        display: 'flex',
        position: 'fixed',
        left: '55%',
        top: '40%',
        width: '100px',
      }}
    />
  ) : (
    ''
  )

  return (
    <>
      <ToastContainer />
      {ViewLoading}
      <Form.Label style={{ fontWeight: 'bold', fontSize: '20px' }}>Upload Vissel File</Form.Label>
      <CForm encType="multipart/form-data" className="mb-4" onSubmit={onSubmit}>
        <CFormInput type="file" name="file" className="mb-3" onChange={onChange} />
        <CFormInput type="submit" value="Submit" className="btn btn-primary" />
      </CForm>
      <VesselTable />
    </>
  )
}

export default VesselSetup
