import React, { useEffect, useState } from 'react'
import { Card, Form, Table, Container, Row, Col } from 'react-bootstrap'
import { CButton, CForm, CFormInput } from '@coreui/react'

import ShipNetTable from 'src/datatable/ShipNetTable'

const AnnnexSetup = () => {
  return (
    <Container fluid="lg">
      {/* <Form.Label style={{ fontWeight: 'bold', fontSize: '20px' }}>Upload Vissel File</Form.Label>
      <CForm encType="multipart/form-data" className="mb-4">
        <CFormInput type="file" name="file" className="mb-3" />
        <CFormInput type="submit" value="Submit" className="btn btn-primary" />
      </CForm> */}
      <ShipNetTable />
    </Container>
  )
}

export default AnnnexSetup
