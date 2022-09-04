import { CButton, CForm, CFormInput } from '@coreui/react'
import React , {useEffect} from 'react'
import { Navigate } from 'react-router-dom'
import { useGetviewQuery } from './viewSlice'

const WeatherList = () => {



    // console.log(localStorage.getItem("user"))
 
    const Load = (e) => {
        e.preventDefault()
        
    }

    const { data,
        isLoading,
        isError,
        isSuccess,
        error
    } = useGetviewQuery()

    // console.log(data);

    // let content;
    // if (isLoading) {
    //     content = <p>"Loding ...."</p>
    // } else if (isSuccess) {
    //     <section>
    //         <h1>WeatherForecast</h1>
    //         <ul>
    //             {data.map((row, i) => {
    //                 return <li key={i}>{row.TemperatureC}</li>
    //             })}
    //         </ul>
    //     </section>
    // } else if (isError) {
    //     content = <p>{JSON.stringify(error)}</p>
    // }
    return (

       
          <section>
           
                {/* <CFormInput type='file'/> */}
                
            {/* <CFormInput>asd</CFormInput> */}
            <CButton onClick={Load}>
                Button
            </CButton>
        <h1>WeatherForecast</h1>
        <ul>
            {data?.map((row, i) => {
                return <li key={i}>{row.summary}</li>
            })}
        </ul>
    </section>)
}

export default WeatherList
