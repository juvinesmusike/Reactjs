import { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import { Col, Row, Form } from 'react-bootstrap'
import { useShipnetreportMutation } from 'src/features/functions/StatementOfAccount'
import { Button } from '@coreui/coreui'
import { CButton, CFormInput } from '@coreui/react'
import SoaPDF from './SoaPDF'
import jsPDF from 'jspdf'
import 'jspdf-autotable'

const SoaReport = ({ shitnetData }) => {
  const [shipnetreport] = useShipnetreportMutation()
  const [shipnetList, setShipnetList] = useState([])
  const [selectedShipNet, setSelectedShipNet] = useState([])
  const [footertable, SetFooterTable] = useState([])
  const [annexLetter, setannexLetter] = useState([])

  const [totalDebitCharges, settotalDebitCharges] = useState('')
  const [totalCreditCharges, settotalCreditCharges] = useState('')
  const [GrandtotalDebitCharges, setGrandtotalDebitCharges] = useState('')
  const [GrandtotalCreditCharges, setGrandtotalCreditCharges] = useState('')

  const [datas, setDatas] = useState([])

  const column = [
    {
      name: 'Particulars',
      selector: (row) => row.a,
      width: '370.00px',
    },
    {
      name: 'Reference',
      selector: (row) => row.b,
      width: '350.00px',
    },
    {
      name: 'Debit',
      selector: (row) => row.c,
      width: '180.00px',
    },
    {
      name: 'Credit',
      selector: (row) => row.d,
      width: '180.00px',
    },
  ]

  const ReturnAmount = (type, StringCon) => {
    var amount = 0
    shitnetData?.map((row) => {
      if (type == 'A' || type == 'B' || type == 'E') {
        if (row.annexLetter == type && row.annexSubName?.includes(StringCon)) {
          amount += row.amount
        }
      } else {
        if (row.annexLetter == type) {
          amount += row.amount
        }
      }
    })

    return amount == 0 ? '0.00' : amount.toFixed(2)
  }

  const TotalGrandTotal = (AnnexLetterArray) => {
    var amount = 0
    AnnexLetterArray?.map((r) => {
      shitnetData?.map((row) => {
        if (row.annexLetter == r) {
          amount += row.amount
        }
      })
    })
    return amount.toFixed(2)
  }

  const LoadAnnexReport = () => {
    var annexlist = []
    shitnetData?.map((row) => {
      if (row.amount > 0) {
        if (!annexlist?.includes(row.annexLetter)) {
          annexlist.push(row.annexLetter)
        }
      }
    })
    //console.log(annexlist)
    setannexLetter(annexlist)
    // annexlist?.map((a_row) => {
    //   const doc = new jsPDF('p', 'mm', 'a4')
    //   var space = 0
    //   shitnetData?.map((row) => {
    //     if (a_row == row.annexLetter) {
    //       space = space + 4
    //       doc.setFont('helvetica', 'normal')
    //       doc.setFontSize(8)
    //       doc.text(28, 30 + space, row.amount.toString(), {
    //         align: 'left',
    //       })
    //       // annexSubkey: row.
    //     }
    //   })
    //   doc.save('ss.pdf')
    // })
    //
  }

  const setDatasValue = () => {
    setDatas([
      { a: '1. Wages', b: '', c: '', d: '' },
      {
        a: `    Home Allotment-Filipino`,
        b: 'attached A',
        c: ReturnAmount('A', 'HOME'),
        d: '0.00',
      },
      {
        a: '    Special Allotment-Filipino',
        b: 'attached A',
        c: ReturnAmount('A', 'SPECIAL'),
        d: '0.00',
      },
      { a: '    Balance of Wages', b: 'attached B', c: ReturnAmount('B', 'BALANCE'), d: '0.00' },
      { a: '    Side Contract', b: 'attached B', c: ReturnAmount('B', 'SIDE'), d: '0.00' },
      { a: '    Standby Pay', b: 'attached C', c: ReturnAmount('C', ''), d: '0.00' },
      {
        a: '    Social Contributions/Funding Element',
        b: 'attached D',
        c: ReturnAmount('D', ''),
        d: '0.00',
      },
      { a: '    Bonus', b: 'attached E', c: ReturnAmount('E', 'BONUS'), d: '0.00' },
      { a: '    Severance Pay', b: 'attached E', c: ReturnAmount('E', 'SEVERANCE'), d: '0.00' },
      { a: '2. Training Expenses', b: 'attached F', c: ReturnAmount('F', ''), d: '0.00' },
      { a: '3. Training Allowance', b: 'attached G', c: ReturnAmount('G', ''), d: '0.00' },
      { a: '4. Airfare Expense', b: 'attached H', c: ReturnAmount('H', ''), d: '0.00' },
      { a: '5. Pre-joining Medical Expense', b: 'attached I', c: ReturnAmount('I', ''), d: '0.00' },
      { a: '6. Communication Expense', b: 'attached J', c: ReturnAmount('J', ''), d: '0.00' },
      { a: '7. Visa', b: 'attached K', c: ReturnAmount('K', ''), d: '0.00' },
      { a: '8. Working Gears', b: 'attached N', c: ReturnAmount('N', ''), d: '0.00' },
      { a: '9. Pre-joining Expense', b: 'attached O', c: ReturnAmount('O', ''), d: '0.00' },
      { a: '10.00. Handling Fee', b: 'attached P', c: ReturnAmount('P', ''), d: '0.00' },
      { a: '11. Flags & Licenses', b: 'attached Q', c: ReturnAmount('Q', ''), d: '0.00' },
      { a: '12. Postage', b: 'attached R', c: ReturnAmount('R', ''), d: '0.00' },
      { a: '13. Various', b: 'attached S', c: ReturnAmount('S', ''), d: '0.00' },
      { a: '14. Agency Fee', b: 'attached T', c: ReturnAmount('T', ''), d: '0.00' },
      { a: '15. Crew Change Cost', b: 'attached U', c: ReturnAmount('U', ''), d: '0.00' },
      {
        a: '16. Crew Change Cost - Agents Fee',
        b: 'attached V',
        c: ReturnAmount('V', ''),
        d: '0.00',
      },
      { a: '17. Bank Charge', b: 'attached W', c: ReturnAmount('W', ''), d: '0.00' },
    ])
  }

  const Footer = () => {
    SetFooterTable([
      { a: '    Total Charges per Current Statement', b: '', c: '0.00', d: '0.00' },
      { a: '    Sick Wage', b: 'attached L', c: '0.00', d: '0.00' },
      { a: '    Medical Expense', b: 'attached M', c: '0.00', d: '0.00' },
      { a: '    TOTAL P&I Charges', b: '', c: '0.00', d: '0.00' },
      { a: '    Grand Total per Current Statement', b: '', c: '0.00', d: '0.00' },
      { a: '    REMITTANCE RECEIVED', b: '', c: '', d: '0.00' },
      { a: '    INTRA-VESSEL ADJUSTMENT', b: '', c: '0.00', d: '0.00' },
      { a: '    BALANCE DUE IN YOUR/(OUR) FAVOR (USD)', b: '', c: '0.00', d: '' },
    ])
  }

  useEffect(() => {
    setDatasValue()
    Footer()
    LoadAnnexReport()
    // console.log(shitnetData)
    // console.log(shitnetData)
  }, [shitnetData])
  return (
    <>
      <DataTable columns={column} data={datas} fixedHeader fixedHeaderScrollHeight={'50.00vh'} />
      <hr />
      <Row>
        <Col md={10.0} lg={8} style={{ fontWeight: 'bold' }}>
          Total Charges per Current Statement
        </Col>
        <Col lg={2} style={{ fontWeight: 'bold' }}>
          {TotalGrandTotal([
            'A',
            'B',
            'C',
            'D',
            'E',
            'F',
            'G',
            'H',
            'I',
            'J',
            'K',
            'N',
            'O',
            'P',
            'Q',
            'R',
            'S',
            'T',
            'U',
            'V',
            'W',
          ])}
        </Col>
        <Col lg={2} style={{ fontWeight: 'bold' }}>
          {/* {TotalGrandTotal([''])} */}
          0.00
        </Col>
      </Row>
      <hr className="mt-3" />
      <div className="mx-2">
        <Row>
          <Col lg={4}>Sick Wage</Col>
          <Col lg={4}>attached L</Col>
          <Col>{ReturnAmount('L', '')}</Col>
          <Col>0.00</Col>
        </Row>
        <Row className="mt-2">
          <Col lg={4}>Medical Expense</Col>
          <Col lg={4}>attached M</Col>
          <Col>{ReturnAmount('M', '')}</Col>
          <Col>0.00</Col>
        </Row>
        <Row className="mt-2">
          <Col lg={8}>TOTAL P&I Charges</Col>
          <Col>{TotalGrandTotal(['L', 'M'])}</Col>
          <Col>0.00</Col>
        </Row>
        <Row className="mt-2">
          <Col lg={8} style={{ fontWeight: 'bold' }}>
            Grand Total per Current Statement
          </Col>
          <Col style={{ fontWeight: 'bold' }}>0.00</Col>
          <Col style={{ fontWeight: 'bold' }}>0.00</Col>
        </Row>
        <Row className="mt-2">
          <Col lg={8} style={{ fontWeight: 'bold' }}>
            REMITTANCE RECEIVED
          </Col>
          <Col style={{ fontWeight: 'bold' }}>0.00</Col>
          <Col style={{ fontWeight: 'bold' }}>0.00</Col>
        </Row>
        <Row className="mt-2">
          <Col lg={8} style={{ fontWeight: 'bold' }}>
            INTRA-VESSEL ADJUSTMENT
          </Col>
          <Col style={{ fontWeight: 'bold' }}>0.00</Col>
          <Col style={{ fontWeight: 'bold' }}>0.00</Col>
        </Row>
        <Row className="mt-2">
          <Col lg={8} style={{ fontWeight: 'bold' }}>
            BALANCE DUE IN YOUR/(OUR) FAVOR (USD)
          </Col>
          <Col style={{ fontWeight: 'bold' }}>0.00</Col>
          <Col style={{ fontWeight: 'bold' }}>0.00</Col>
        </Row>
      </div>
      <hr className="mt-3" />
      <Row>
        <Col>
          <SoaPDF
            shitnetData={shitnetData}
            defaultValues={datas}
            footertable={footertable}
            annexReportLetter={annexLetter}
          />
        </Col>
      </Row>
    </>
  )
}

export default SoaReport
