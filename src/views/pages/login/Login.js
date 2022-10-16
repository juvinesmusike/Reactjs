import React , {useState , useEffect , useRef} from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setCredentials } from 'src/features/auth/authSlice'
import {useLoginMutation } from 'src/features/auth/authApiSlice'
import { CSpinner } from '@coreui/react'
 import logo from 'src/assets/images/Synery_Logo.png'

import { Link } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CImage,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'

import { ToastContainer } from 'react-toastify';
import { toastSuccess , toastError , toastWarning } from 'src/app/toast'

const Login = () => {

  
  // const userRef = useRef()
  // const errRef = useRef()
  const [username, Setusername] = useState('')
  const [password, Setpassword] = useState('')
  const [errMsg, SeterrMsg] = useState('')
  const [loading , Setloading] = useState(false)

  const navigate = useNavigate()

  const [login ,{isLoading}] = useLoginMutation()
  const dispatch = useDispatch()

  // useEffect(()=>{
  //   userRef.current.focus()
  // },[])


  // useEffect(()=>{
  //   SeterrMsg('')
  // },[username,password])

  const ViewLoading = (loading == true) ? 
  <CSpinner component="span" size="sm" aria-hidden="true"/> : ""


  const handleSubmit = async (e)=>{
    e.preventDefault()
    Setloading(true)
    try {
    
      if(username == "" || password == ""){
        toastWarning("Username and Password is invalid")
        Setloading(false)
      }else{
        const userData = await login({username , password}).unwrap()
        // console.log(userData)
        dispatch(setCredentials({...userData , username}))
        Setusername('')
        Setpassword('')
        navigate('/upload')
      }
    } catch (error) {
      console.log(error)
      if(error.originalStatus === 500){
        toastError('No Server Response')
      }else if(error.status === 400){
        toastWarning(error.data.message)
      }else if(error.status === 401){
        toastWarning('Unauthorized')
      } else {
        toastWarning('Login Failed')
      }
      Setloading(false)

  }


   
  
  }
  return (
    
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      < ToastContainer/>
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={7}>
            <CCardGroup>
            <CCard className="text-white bg- py-5" style={{ width: '44%'}}>.
              <CImage src={logo} style={{width:'80%', margin:'auto'}} />

                {/* <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                      tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                  </div>
                </CCardBody> */}
              </CCard>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-medium-emphasis">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput placeholder="Username" autoComplete="username" value={username} onChange={(e) => Setusername(e.target.value)} required />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        value={password} onChange={(e) => Setpassword(e.target.value)}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={12}>
                        <CButton color="primary" className="px-5" onClick={handleSubmit}>
                          Login      
                          {ViewLoading}                  
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
