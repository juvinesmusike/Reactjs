import { CFormInput } from '@coreui/react'
import React, { useState, useEffect } from 'react'
import DataTable from 'react-data-table-component'
import { useVoucherMutation } from 'src/features/functions/ChartofAccountSlice'
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import { Card, Form, Table, Container, Row, Col, FormGroup } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import { toastWarning } from 'src/app/toast'
import { ToastContainer } from 'react-toastify'

const JournalSubTable = ({ voucherdetials }) => {
  const [remmitter, setRemitter] = useState('')
  const [preparedby, setPreparedby] = useState('')
  const [checkedby, setCheckedby] = useState('')
  const [notedby, setNotedby] = useState('')
  const [approvedby, setApprovedby] = useState('')
  const [template, setTemplate] = useState('0')
  const doc = new jsPDF('p', 'mm', 'a4')
  const column = [
    {
      name: 'Account Title',
      selector: (row) => row.accountName,
      //  allowOverflow: 'true',
      width: '250px',
    },
    {
      name: 'Vessel Name',
      selector: (row) => row.ship,
      width: '230px',
    },
    {
      name: 'Code',
      selector: (row) => row.accountNumber,
    },
    {
      name: 'Debit Php',
      selector: (row) => (row.phpAmount < 0 ? '' : row.phpAmount),
    },
    {
      name: 'Credit Php',
      selector: (row) => (row.phpAmount > 0 ? '' : row.phpAmount),
    },
    {
      name: 'Debit USD',
      selector: (row) => (row.usdAmount < 0 ? '' : row.usdAmount),
    },
    {
      name: 'Credit USD',
      selector: (row) => (row.usdAmount > 0 ? '' : row.usdAmount),
    },
  ]

  const [voucher] = useVoucherMutation()
  const [voucherdata, setVoucherData] = useState([])

  const LoadVoucherData = async () => {
    var result = await voucher({ vouchernum: voucherdetials.voucher })
    console.log(result)
    setVoucherData(result.data)
    console.log(voucherdetials.comments.replace(/(\r\n|\r|\n)/g, ''))
  }

  const addFooters = (doc) => {
    const pageCount = doc.internal.getNumberOfPages()

    doc.setFont('helvetica', 'italic')
    doc.setFontSize(8)
    for (var i = 1; i <= pageCount; i++) {
      doc.setPage(i)
      doc.text(
        'Page ' + String(i) + ' of ' + String(pageCount),
        doc.internal.pageSize.width / 2,
        287,
        {
          align: 'center',
        },
      )
    }
  }

  const dlPDF = () => {
    if (template != '0') {
      var tableBody = []
      voucherdata.map((row, index) => {
        tableBody.push([
          row.accountName,
          row.ship,
          row.accountNumber,
          row.phpAmount < 0 ? '' : parseFloat(row.phpAmount).toFixed(2),
          row.phpAmount > 0 ? '' : parseFloat(row.phpAmount).toFixed(2),
          row.usdAmount < 0 ? '' : parseFloat(row.usdAmount).toFixed(2),
          row.usdAmount > 0 ? '' : parseFloat(row.usdAmount).toFixed(2),
        ])

        setRemitter(row.description)
      })
      console.log(tableBody)

      var pageHeight = doc.internal.pageSize.height || doc.internal.pageSize.getHeight()
      var pageWidth = doc.internal.pageSize.width || doc.internal.pageSize.getWidth()

      doc.setFont('helvetica', 'bold')
      doc.setFontSize(11)
      doc.text(pageWidth / 2, 10, 'SYNERGYGROUP OPERATIONS INC.', { align: 'center' })

      doc.setFont('helvetica', 'normal')
      doc.setFontSize(9)
      doc.text(
        pageWidth / 2,
        16,
        `3RD FLR UNIVERSAL LMS BLDG.#106 ESTEBAN STREET LEGASPI VILLAGE, MAKATI CITY, PHILIPPINES 1229`,
        { align: 'center' },
      )

      doc.setFont('helvetica', 'normal')
      doc.setFontSize(9)
      doc.text(pageWidth / 2, 21, `VAT REG. TIN NO. 006-893-022-000`, { align: 'center' })

      doc.setFont('helvetica', 'normal')
      doc.setFontSize(9)
      doc.text(pageWidth / 2, 26, `${template} JOURNAL`, { align: 'center' })

      doc.setFont('helvetica', 'normal')
      doc.setFontSize(9)
      doc.text(pageWidth / 2, 31, `FOR THE MONTH OF NOVEMBER 2014`, { align: 'center' })

      doc.setFont('helvetica', 'bold')
      doc.setFontSize(9)
      doc.text(14, 40, `Remitter:____________________________________________________`)

      doc.setFont('helvetica', 'normal')
      doc.setFontSize(9)
      doc.text(voucherdetials.description, 30, 40)

      doc.setFont('helvetica', 'bold')
      doc.setFontSize(9)
      doc.text(122, 40, `Date:____________`)

      doc.setFont('helvetica', 'normal')
      doc.setFontSize(9)
      doc.text(voucherdetials.entryDate, 132, 40)

      doc.setFont('helvetica', 'bold')
      doc.setFontSize(9)
      doc.text(160, 40, `Rate:____________`)

      doc.setFont('helvetica', 'normal')
      doc.setFontSize(9)
      doc.text(
        (parseFloat(voucherdetials.currencyAmount) / parseFloat(voucherdetials.amount))?.toFixed(2),
        170,
        40,
      )

      //--- vertical Line particulars Left
      doc.setLineWidth(0.3)
      doc.setDrawColor(0, 0, 0)
      doc.line(14, 60, 14, 44)

      //--- vertical Line particulars Right
      doc.setLineWidth(0.3)
      doc.setDrawColor(0, 0, 0)
      doc.line(196, 60, 196, 44)

      doc.setLineWidth(0.3)
      doc.setDrawColor(0, 0, 0)
      doc.line(196, 44, 14, 44)

      doc.setFont('helvetica', 'bold')
      doc.setFontSize(14)
      doc.text(pageWidth / 2, 50, 'PARTICULARS', { align: 'center' })

      doc.setLineWidth(0.3)
      doc.setDrawColor(0, 0, 0)
      doc.line(196, 52, 14, 52)

      doc.setFont('helvetica', 'normal')
      var splitTitle = doc.splitTextToSize(
        voucherdetials.comments.replace(/(\r\n|\r|\n)/g, ' '),
        280,
      )
      doc.setFontSize(9)
      doc.text(pageWidth / 2, 55, splitTitle, { align: 'center' })

      doc.setLineWidth(0.3)
      doc.setDrawColor(0, 0, 0)
      doc.line(196, 60, 14, 60)

      //-- autoTable
      doc.autoTable({
        //  columns: column.map((col) => col.name),
        head: [
          [
            {
              content: 'Account Title',
              rowSpan: 2,
              styles: { halign: 'center' },
            },
            {
              content: 'Vessel Name',
              rowSpan: 2,
            },
            {
              content: 'Code',
              rowSpan: 2,
              styles: { halign: 'center' },
            },
            {
              content: 'Peso',
              colSpan: 2,
              styles: { halign: 'center' },
            },
            {
              content: 'USD',
              colSpan: 2,
              styles: { halign: 'center' },
            },
          ],
          [
            {
              content: 'Debit Php',
              styles: { halign: 'center' },
            },
            {
              content: 'Credit Php',
              styles: { halign: 'center' },
            },
            {
              content: 'Debit USD',
              styles: { halign: 'center' },
            },
            {
              content: 'Credit USD',
              styles: { halign: 'center' },
            },
          ],
        ],
        body: tableBody,
        tableLineColor: [0, 0, 0],
        //  tableLineWidth: 0.3,
        theme: 'plain',
        margin: { bottom: 50 },

        //   bodyStyles: { minCellHeight: 80 },
        styles: {
          fontSize: 8,
          font: 'helvetica',
        },
        headStyles: {
          halign: 'center',
          rowSpan: 2,
          lineColor: [0, 0, 0],
          lineWidth: 0.3,
          fillColor: [255, 255, 255],
          textColor: [0, 0, 0],
        },
        columnStyles: {
          0: { cellWidth: 50 },
          1: { cellWidth: 40 },
          2: { cellWidth: 20 },
          // 3: { cellWidth: 17 },
          // 4: { cellWidth: 17 },
          // 5: { cellWidth: 17 },
          // 6: { cellWidth: 17 },
          // etc
        },
        willDrawCell: function (data) {
          if (data.row.section === 'body') {
            doc.setDrawColor(0, 0, 0) // set the border color
            doc.setLineWidth(0.3) // set the border with

            // draw left border
            doc.line(data.cell.x, data.cell.y + data.cell.height, data.cell.x, data.cell.y)
            // draw right border
            doc.line(
              data.cell.x + data.cell.width,
              data.cell.y,
              data.cell.x + data.cell.width,
              data.cell.y + data.cell.height,
            )
            // draw left border
            doc.line(data.cell.x, data.cell.y + data.cell.height, data.cell.x, 230)
            //draw right border
            doc.line(
              data.cell.x + data.cell.width,
              230,
              data.cell.x + data.cell.width,
              data.cell.y + data.cell.height,
            )
          }
        },
        startY: 62,
        horizontalPageBreak: true,
      })

      doc.setLineWidth(0.3)
      doc.setDrawColor(0, 0, 0)
      doc.line(196, 230, 14, 230)

      doc.setLineWidth(0.3)
      doc.setDrawColor(0, 0, 0)
      doc.line(14, 245, 14, 150)

      doc.setLineWidth(0.3)
      doc.setDrawColor(0, 0, 0)
      doc.line(196, 245, 196, 150)

      doc.setLineWidth(0.3)
      doc.setDrawColor(0, 0, 0)
      doc.line(196, 245, 14, 245)

      doc.setFont('helvetica', 'bold')
      doc.setFontSize(9)
      doc.text(35, 235, `Prepared By`)

      doc.setFont('helvetica', 'bold')
      doc.setFontSize(9)
      doc.text(preparedby, 35, 243)

      doc.setFont('helvetica', 'bold')
      doc.setFontSize(9)
      doc.text(80, 235, `Checked By`)

      doc.setFont('helvetica', 'bold')
      doc.setFontSize(9)
      doc.text(checkedby, 80, 243)

      doc.setFont('helvetica', 'bold')
      doc.setFontSize(9)
      doc.text(120, 235, `Noted By`)

      doc.setFont('helvetica', 'bold')
      doc.setFontSize(9)
      doc.text(notedby, 120, 243)

      doc.setFont('helvetica', 'bold')
      doc.setFontSize(9)
      doc.text(160, 235, `Approved By`)

      doc.setFont('helvetica', 'bold')
      doc.setFontSize(9)
      doc.text(approvedby, 160, 243)

      doc.setFont('helvetica', 'bold')
      doc.setFontSize(9)
      doc.text(120, 255, `Received By: _______________________________`)

      // doc.setFont('helvetica', 'normal')
      // doc.setFontSize(9)
      // doc.text(145, 255, `44.50000`)

      doc.setFont('helvetica', 'bold')
      doc.setFontSize(9)
      doc.text(120, 265, `Voucher No: ________________________________`)

      doc.setFont('helvetica', 'normal')
      doc.setFontSize(9)
      doc.text(voucherdetials.voucher, 145, 265)

      doc.save('sample.pdf')
      setTemplate('0')
    } else {
      toastWarning('Select a Template!')
      //-- select template
    }
  }

  useEffect(() => {
    LoadVoucherData()
  }, [voucherdetials])
  return (
    <div>
      <ToastContainer />
      <DataTable columns={column} data={voucherdata} pagination id="datatable" />
      <hr />
      <Row>
        <Col md={3}>
          <Form.Group className="mb-3">
            <Form.Label>Prepared By</Form.Label>
            <Form.Control
              type="text"
              size={'sm'}
              placeholder="Prepared By"
              value={preparedby}
              onChange={(e) => setPreparedby(e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group className="mb-3">
            <Form.Label>Checked By</Form.Label>
            <Form.Control
              type="text"
              size={'sm'}
              placeholder="Checked By"
              value={checkedby}
              onChange={(e) => setCheckedby(e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group className="mb-3">
            <Form.Label>Noted By</Form.Label>
            <Form.Control
              type="text"
              size={'sm'}
              placeholder="Noted By"
              value={notedby}
              onChange={(e) => setNotedby(e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group className="mb-3">
            <Form.Label>Approved By</Form.Label>
            <Form.Control
              type="text"
              size={'sm'}
              placeholder="Approved By"
              value={approvedby}
              onChange={(e) => setApprovedby(e.target.value)}
            />
          </Form.Group>
        </Col>
      </Row>
      <hr />
      <Form.Group as={Row}>
        <Form.Label column md="2">
          Select Template :
        </Form.Label>
        <Col md="4" className="mb-3">
          <Form.Select size={'sm'} value={template} onChange={(e) => setTemplate(e.target.value)}>
            <option value="0">-- OPTIONS --</option>
            <option value="DISBURSEMENT">DISBURSEMENT</option>
            <option value="REVENUE">REVENUE</option>
            <option value="CASH RECEIPTS">CASH RECEIPTS</option>
            <option value="GENERAL">GENERAL</option>
          </Form.Select>
        </Col>
        <Col>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="primary" onClick={() => dlPDF()}>
              Export PDF
            </Button>
          </div>
        </Col>
      </Form.Group>
      {/* <CFormInput></CFormInput> */}
    </div>
  )
}

export default JournalSubTable
