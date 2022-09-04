import React , {useState , useEffect , useRef} from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setCredentials } from 'src/features/auth/authSlice'
import {useLoginMutation } from 'src/features/auth/authApiSlice'

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
  const navigate = useNavigate()

  const [login ,{isLoading}] = useLoginMutation()
  const dispatch = useDispatch()

  // useEffect(()=>{
  //   userRef.current.focus()
  // },[])


  // useEffect(()=>{
  //   SeterrMsg('')
  // },[username,password])


  const handleSubmit = async (e)=>{
    e.preventDefault()


    try {
      const userData = await login({username , password}).unwrap()
      console.log(userData)
      dispatch(setCredentials({...userData , username}))
      Setusername('')
      toastSuccess("test")
      Setpassword('')
      navigate('/Weather')
      // console.log(userData)
    } catch (error) {
      if(error.status === 500){
        toastError('No Server Response')
      }else if(error.status === 400){
        toastWarning(error.data.message)
      }else if(error.response.status === 401){
        toastWarning('Unauthorized')
      } else {
        toastWarning('Login Failed')
      }
  }

  }
  return (
    
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      < ToastContainer/>
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={5}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-medium-emphasis">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput placeholder="Username" autoComplete="username" value={username} onChange={(e) => Setusername(e.target.value)}/>
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
                        </CButton>
                      </CCol>
                      {/* <CCol xs={4} className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol> */}
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              {/* <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                      tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        Register Now!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard> */}
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
