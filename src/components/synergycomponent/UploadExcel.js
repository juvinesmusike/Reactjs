import { CButton, CForm, CFormInput , CImage } from '@coreui/react'
import React, { useState } from 'react'
import ReactFileReader from 'react-file-reader';
import axios from 'axios';
import Loading from 'src/assets/images/loading.gif'
import { toastSuccess , toastError , toastWarning } from 'src/app/toast'
import { ToastContainer } from 'react-toastify';

import { useUploadMutation } from 'src/features/functions/UploadSlice'

const UploadExcel = () => {
    
    const localtoken = localStorage.getItem("user") 
    const token = localtoken != null ? JSON.parse(localtoken).token : null

    const [ upload ] = useUploadMutation()
    const [file , setFile] = useState()
    const [filename , setFilename] = useState()
    const [loading , Setloading] = useState(false)

    const onChange = (e) => {
        setFile(e.target.files[0])
    }
    
    const  onSubmit = async (e) =>{
        Setloading(true);
        e.preventDefault()
        try 
        {
            if(file){
                let formData = new FormData()
                formData.append('file',file);
              //  console.log(formData)
                var result = await upload(formData).unwrap();  
                if(result.isSuccess){
                    toastSuccess("File Uploaded!")
                    setFile('')
                    Setloading(false)
                }else{
                    toastWarning(result.message)
                    Setloading(false)
                }
            }else{
                toastWarning("Please Select a File!")
                Setloading(false)
            }

           
        }
        catch(errMsg)
        {
          console.log(errMsg)
            toastError("Server Error")
            Setloading(false)
        }
    }

    const ViewLoading = (loading) ? <CImage src={Loading} style={{ zIndex:'1', display:'flex' ,position:'fixed' , left:'55%' , top:'40%' , width:'100px'}}/> : ""
  return (
   <section>
    < ToastContainer/>
    <CForm onSubmit={onSubmit} encType="multipart/form-data"> 
        {ViewLoading}
         <CFormInput type='file' name="file" className='mb-3' onChange={onChange}  />
         <CFormInput type='submit' value="Submit" className="btn btn-primary"/>
    </CForm>  
   </section>
  )
}

export default UploadExcel
