import { CButton, CForm, CFormInput } from '@coreui/react'
import React, { useState } from 'react'
import ReactFileReader from 'react-file-reader';
import axios from 'axios';

import { useUploadMutation } from 'src/features/functions/UploadSlice'

const UploadExcel = () => {
    
    const localtoken = localStorage.getItem("user") 
    const token = localtoken != null ? JSON.parse(localtoken).token : null

    const [ upload ] = useUploadMutation()
    const [file , setFile] = useState()
    const [filename , setFilename] = useState()

    const onChange = (e) => {
        setFile(e.target.files[0])
    }
    
    const  onSubmit = async (e) =>{
        e.preventDefault()
        try 
        {
            let formData = new FormData()
            formData.append('file',file);
           var result = await upload({formData}).unwrap();
            console.log(result)

        // await axios({
        //         url:"https://localhost:7033/Uploadexcel/Upload",
        //         method:"POST",
        //         headers:{
        //             "Content-Type": "multipart/form-data",
        //             "Authorization": `Bearer ${token}`
        //         },
        //         data:formData
        //     }).then((res) => {
        //         console.log(res)
        //     });
        }
        catch(errMsg)
        {
            console.log(errMsg)
        }
  
   
    }
  return (
   <section>
    <CForm onSubmit={onSubmit} encType="multipart/form-data"> 
         <CFormInput type='file' name="file" className='mb-3' onChange={onChange}  />
         <CFormInput type='submit' value="Submit"/>
    </CForm>
       
        {/* <ReactFileReader fileTypes={[".csv",".xlsx"]} base64={true} multipleFiles={false} handleFiles={handleFiles}>
            <button className='btn'>Upload</button>
            </ReactFileReader>

            <CButton type='submit' onClick={onSubmit}>click</CButton> */}
                
   
  
   </section>
  )
}

export default UploadExcel
