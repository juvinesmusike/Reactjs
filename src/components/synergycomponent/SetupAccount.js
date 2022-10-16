import React, { useState } from 'react'
import { CForm, CFormInput, CImage } from '@coreui/react'
import { useUploadsetupaccountMutation } from 'src/features/functions/UploadSetupAccount'
import { ToastContainer } from 'react-toastify'
import { toastSuccess, toastError, toastWarning } from 'src/app/toast'
import Loading from 'src/assets/images/loading.gif'
import Dt_SetupAccount from 'src/datatable/Dt_SetupAccount'

const SetupAccount = () => {
  const [uploadsetupaccount] = useUploadsetupaccountMutation()
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
      var result = await uploadsetupaccount(formData).unwrap()
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
    <div>
      <ToastContainer />
      {ViewLoading}
      <CForm onSubmit={onSubmit} encType="multipart/form-data" className="mb-4">
        <CFormInput type="file" name="file" className="mb-3" onChange={onChange} />
        <CFormInput type="submit" value="Submit" className="btn btn-primary" />
      </CForm>
      <Dt_SetupAccount />
    </div>
  )
}

export default SetupAccount
