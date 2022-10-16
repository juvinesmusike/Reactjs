import React, { useState , useEffect} from 'react'
import { CButton, CForm, CFormInput ,CImage} from '@coreui/react'
import { useUploadsetupaccountMutation } from 'src/features/functions/UploadSetupAccount'
import { ToastContainer } from 'react-toastify';
import { toastSuccess , toastError , toastWarning } from 'src/app/toast'
import Loading from 'src/assets/images/loading.gif'
import DefaultDatatable from 'src/datatable/DefaultDatatable';
import axios from 'axios';

const SetupAccountTest = () => {

const [uploadsetupaccount] = useUploadsetupaccountMutation()
const [file , setFile] = useState()
const [loading , Setloading] = useState(false)

const [datas , setDatas] = useState([]);
const [maingroup , setMaingroup] = useState('')

const getdata =  async () => {
    try {
        const repos = await axios.get("https://localhost:7033/Uploadexcel/setupaccount")
       setDatas(repos.data)
    //    setDatas(await reportsoa);
    } catch (error) {
        console.log(error)
    }

}

useEffect(()=>{getdata()}
,[])
const onChange = (e) => {
    setFile(e.target.files[0])
}

const onSubmit = async (e) =>{
    e.preventDefault();
    if(file){
        let formData = new FormData()
        formData.append('file',file);
      //  console.log(formData)
        var result = await uploadsetupaccount(formData).unwrap();  
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


const column = [
  {
      Header : 'Accountnumber',
      accessor: 'accountnumber'
  },
  {
      Header : 'accountname',
      accessor: 'accountname'
  },
  {
      Header : 'maingroup',
      accessor: 'maingroup'
  },
  {
      Header : 'annextype',
      accessor: 'annextype'
  },
  {
      Header : 'annexsubkey',
      accessor: 'annexsubkey'
  }
  // ,
  // {
  //     Header : 'Action',
  //     // accessor: 'annexsubkey'
  // }

]

const updateMyData = (rowIndex, columnId, value) => {
  // We also turn on the flag to not reset the page
  // setSkipPageReset(true)
  setDatas(old =>
    old.map((row, index) => {
      if (index === rowIndex) {
        return {
          ...old[rowIndex],
          [columnId]: value,
        }
      }
      return row
    })
  )
}

const tableHooks = (hooks) =>{

  hooks.visibleColumns.push((columns) => [
      ...columns,{
          id:"Edit",
          Header:'Edit',
          Cell: ({row}) =>(
              <CButton onClick={(e) => {alert("test")}}>
                  Edit
              </CButton>
          )
      }
  ])
}

const ViewLoading = (loading) ? <CImage src={Loading} style={{ zIndex:'1', display:'flex' ,position:'fixed' , left:'55%' , top:'40%' , width:'100px'}}/> : ""

  return (
    <div> 
    <DefaultDatatable 
    columns={column} 
    data={datas}
    updateMyData={updateMyData}
     tableHooks = {tableHooks}
    />
    </div>
  )
}

export default SetupAccountTest
