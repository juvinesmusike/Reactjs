import Button from 'react-bootstrap/Button'
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import { useEffect, useState } from 'react'
import { InputGroup } from 'react-bootstrap'

const SoaPDF = ({ shitnetData, defaultValues, footertable, annexReportLetter }) => {
  const [table, setTable] = useState([])
  const PdfPosition = 15
  const doc = new jsPDF('p', 'mm', 'a4')

  const ReturnAmount = (subkey, annexletter) => {
    console.log(annexletter)
    var amount = 0
    shitnetData?.map((row) => {
      if (row.annexSubkey == subkey && row.annexLetter == annexletter) {
        amount += row.amount
      }
    })
    return amount.toFixed(2)
  }

  const dlPDF = () => {
    var pageWidth = doc.internal.pageSize.width || doc.internal.pageSize.getWidth()

    doc.setFont('helvetica', 'bold')
    doc.setFontSize(15)
    doc.text(pageWidth / 2, 10 + PdfPosition, 'SYNERGYGROUP OPERATIONS INC.', { align: 'center' })

    doc.setFont('Bodoni MT', 'bold')
    doc.setFontSize(8)
    doc.text(
      pageWidth / 2,
      16 + PdfPosition,
      `3RD FLOOR UNIVERSAL LMS BLDG.,#106 ESTEBAN STREET LEGASPI VILLAGE, MAKATI CITY 1229`,
      { align: 'center' },
    )

    doc.setFont('Bodoni MT', 'bold')
    doc.setFontSize(8)
    doc.text(pageWidth / 2, 21 + PdfPosition, `TELEPHONE NO: 737-35000;737-2540 TO 45`, {
      align: 'center',
    })

    //-- TO details
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(8)
    doc.text(14, 27 + PdfPosition, 'TO:', {
      align: 'left',
    })

    doc.setFont('helvetica', 'normal')
    doc.setFontSize(8)
    doc.text(28, 27 + PdfPosition, 'SYNERGY MARINE PTE LTD.', {
      align: 'left',
    })

    //-- DATE details
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(8)
    doc.text(14, 30 + PdfPosition, 'DATE:', {
      align: 'left',
    })

    doc.setFont('helvetica', 'normal')
    doc.setFontSize(8)
    doc.text(28, 30 + PdfPosition, '26-Sep-2022', {
      align: 'left',
    })

    //-- VESSEL details
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(8)
    doc.text(14, 33 + PdfPosition, 'VESSEL:', {
      align: 'left',
    })

    doc.setFont('helvetica', 'normal')
    doc.setFontSize(8)
    doc.text(28, 33 + PdfPosition, 'M/V WORLD RUBY', {
      align: 'left',
    })

    //-- MONTH details
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(8)
    doc.text(14, 36 + PdfPosition, 'MONTH:', {
      align: 'left',
    })

    doc.setFont('helvetica', 'normal')
    doc.setFontSize(8)
    doc.text(28, 36 + PdfPosition, 'SEP-2022', {
      align: 'left',
    })

    //--- vertical Line End-left
    doc.setLineWidth(0.1)
    doc.setDrawColor(0, 0, 0)
    doc.line(14, 38 + PdfPosition, 14, 240 + PdfPosition)

    //--- vertical Line End-right
    doc.setLineWidth(0.1)
    doc.setDrawColor(0, 0, 0)
    doc.line(196, 38 + PdfPosition, 196, 240 + PdfPosition)

    //--- vertical Line
    doc.setLineWidth(0.1)
    doc.setDrawColor(0, 0, 0)
    doc.line(95, 38 + PdfPosition, 95, 179 + PdfPosition)

    //--- vertical Line
    doc.setLineWidth(0.1)
    doc.setDrawColor(0, 0, 0)
    doc.line(120, 38 + PdfPosition, 120, 205 + PdfPosition)

    //--- vertical Line
    doc.setLineWidth(0.1)
    doc.setDrawColor(0, 0, 0)
    doc.line(155, 42 + PdfPosition, 155, 205 + PdfPosition)

    //--Horizontal line 1st
    doc.setLineWidth(0.1)
    doc.setDrawColor(0, 0, 0)
    doc.line(196, 38 + PdfPosition, 14, 38 + PdfPosition)

    //--Horizontal line
    doc.setLineWidth(0.1)
    doc.setDrawColor(0, 0, 0)
    doc.line(196, 46 + PdfPosition, 14, 46 + PdfPosition)

    //-- Table Header (PARTICULARS)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(8)
    doc.text(45, 41 + PdfPosition, 'PARTICULARS')

    //-- Table Header (REFERENCE)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(8)
    doc.text(98, 41 + PdfPosition, 'REFERENCE')

    //-- Table Header (IN US$)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(8)
    doc.text(150, 41 + PdfPosition, 'IN US$')

    //--Horizontal line
    doc.setLineWidth(0.1)
    doc.setDrawColor(0, 0, 0)
    doc.line(120, 42 + PdfPosition, 196, 42 + PdfPosition)

    //-- Table Header (DEBIT)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(8)
    doc.text(135, 45 + PdfPosition, 'DEBIT')

    //-- Table Header (CREDIT)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(8)
    doc.text(170, 45 + PdfPosition, 'CREDIT')

    //-- BEGINNING BALANCE
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(8)
    doc.text(15, 50 + PdfPosition, 'BEGINNING BALANCE')

    //-- BEGINNING BALANCE (Debit)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(8)
    doc.text(153, 50 + PdfPosition, '0.00', {
      align: 'right',
    })

    //-- BEGINNING BALANCE (Credit)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(8)
    doc.text(194, 50 + PdfPosition, '0.00', {
      align: 'right',
    })

    //--Horizontal line
    doc.setLineWidth(0.1)
    doc.setDrawColor(0, 0, 0)
    doc.line(196, 55.5 + PdfPosition, 14, 55.5 + PdfPosition)

    var space = 0
    defaultValues.map((row) => {
      space = space + 4.5

      doc.setFont('helvetica', 'normal')
      doc.setFontSize(8)
      doc.text(15, 50 + space + PdfPosition, row.a, {
        align: 'left',
      })

      doc.setFont('helvetica', 'normal')
      doc.setFontSize(8)
      doc.text(100, 50 + space + PdfPosition, row.b, {
        align: 'left',
      })

      doc.setFont('helvetica', 'normal')
      doc.setFontSize(8)
      doc.text(153, 46 + space + PdfPosition + 4, row.c.toString(), {
        align: 'right',
      })

      doc.setFont('helvetica', 'normal')
      doc.setFontSize(8)
      doc.text(194, 46 + space + PdfPosition + 4, row.d.toString(), {
        align: 'right',
      })

      //--Horizontal line
      doc.setLineWidth(0.1)
      doc.setDrawColor(0, 0, 0)
      doc.line(95, 50 + space + 1 + PdfPosition, 120, 50 + space + 1 + PdfPosition)
    })

    //--Horizontal line
    doc.setLineWidth(0.1)
    doc.setDrawColor(0, 0, 0)
    doc.line(196, 163.5 + PdfPosition, 14, 163.5 + PdfPosition)

    var f_space = 0
    var rowcount = 0
    footertable.map((r) => {
      rowcount++
      f_space = f_space + 4.5

      if (rowcount == 1 || rowcount >= 5) {
        doc.setFont('helvetica', 'bold')
      } else {
        doc.setFont('helvetica', 'normal')
      }
      doc.setFontSize(8)
      doc.text(15, 164 + f_space + PdfPosition, r.a, {
        align: 'left',
      })

      if (rowcount <= 3) {
        doc.setFont('helvetica', 'normal')
        doc.setFontSize(8)
        doc.text(100, 164 + f_space + PdfPosition, r.b, {
          align: 'left',
        })

        //--Horizontal line
        doc.setLineWidth(0.1)
        doc.setDrawColor(0, 0, 0)
        doc.line(95, 164 + f_space + 1 + PdfPosition, 120, 164 + f_space + 1 + PdfPosition)
      }

      if (rowcount == 1 || rowcount >= 5) {
        doc.setFont('helvetica', 'bold')
      } else {
        doc.setFont('helvetica', 'normal')
      }
      doc.setFontSize(8)
      doc.text(153, 164 + f_space + PdfPosition, r.c.toString(), {
        align: 'right',
      })

      if (rowcount == 1 || rowcount >= 5) {
        doc.setFont('helvetica', 'bold')
      } else {
        doc.setFont('helvetica', 'normal')
      }
      doc.setFontSize(8)
      doc.text(194, 164 + f_space + PdfPosition, r.d.toString(), {
        align: 'right',
      })

      if (
        rowcount == 1 ||
        rowcount == 3 ||
        rowcount == 4 ||
        rowcount == 5 ||
        rowcount == 7 ||
        rowcount == 8
      ) {
        //--Horizontal line (footer )
        doc.setLineWidth(0.1)
        doc.setDrawColor(0, 0, 0)
        doc.line(120, 164 + f_space + 1 + PdfPosition, 196, 164 + f_space + 1 + PdfPosition)
      }
    })

    //--Horizontal line
    doc.setLineWidth(0.1)
    doc.setDrawColor(0, 0, 0)
    doc.line(196, 205 + PdfPosition, 14, 205 + PdfPosition)

    //---------------PREPARED BY--------------------
    //-- Footer (PREPARED BY)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(8)
    doc.text(15, 215 + PdfPosition, 'PREPARED BY:')

    //--Horizontal line ( Accounting assistant - vessel)
    doc.setLineWidth(0.1)
    doc.setDrawColor(0, 0, 0)
    doc.line(15, 230 + PdfPosition, 65, 230 + PdfPosition)

    //-- Footer (PREPARED BY - Accounting assistant - vessel)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(8)
    doc.text(15, 235 + PdfPosition, 'Accounting assistant - vessel'.toUpperCase())
    //-----------------------------------

    //---------------CHECKED BY--------------------
    //-- Footer (CHECKED BY)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(8)
    doc.text(85, 215 + PdfPosition, 'CHECKED BY:')

    //--Horizontal line ( Accounting Supervisor - vessel)
    doc.setLineWidth(0.1)
    doc.setDrawColor(0, 0, 0)
    doc.line(85, 230 + PdfPosition, 135, 230 + PdfPosition)

    //-- Footer (CHECKED BY - Accounting Supervisor - vessel)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(8)
    doc.text(85, 235 + PdfPosition, 'Accounting Supervisor - vessel'.toUpperCase())
    //-----------------------------------

    //---------------APPROVED BY--------------------
    //-- Footer (APPROVED BY)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(8)
    doc.text(155, 215 + PdfPosition, 'APPROVED BY:')

    //--Horizontal line ( ACCOUNTING MANAGER)
    doc.setLineWidth(0.1)
    doc.setDrawColor(0, 0, 0)
    doc.line(155, 230 + PdfPosition, 195, 230 + PdfPosition)

    //-- Footer (APPROVED BY - ACCOUNTING MANAGER)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(8)
    doc.text(155, 235 + PdfPosition, 'ACCOUNTING MANAGER')
    //-----------------------------------

    //--Horizontal line
    doc.setLineWidth(0.1)
    doc.setDrawColor(0, 0, 0)
    doc.line(196, 240 + PdfPosition, 14, 240 + PdfPosition)

    //--------------------------------------------------------------------------------
    //------- Annex Pages ----------------------------------------------------------
    annexReportLetter?.map((a_row) => {
      doc.addPage()
      var pageWidth = doc.internal.pageSize.width || doc.internal.pageSize.getWidth()

      doc.setFont('helvetica', 'bold')
      doc.setFontSize(15)
      doc.text(pageWidth / 2, 10 + PdfPosition, 'SYNERGYGROUP OPERATIONS INC.', {
        align: 'center',
      })

      doc.setFont('Bodoni MT', 'bold')
      doc.setFontSize(8)
      doc.text(
        pageWidth / 2,
        16 + PdfPosition,
        `3RD FLOOR UNIVERSAL LMS BLDG.,#106 ESTEBAN STREET LEGASPI VILLAGE, MAKATI CITY 1229`,
        { align: 'center' },
      )

      doc.setFont('Bodoni MT', 'bold')
      doc.setFontSize(8)
      doc.text(pageWidth / 2, 21 + PdfPosition, `TELEPHONE NO: 737-35000;737-2540 TO 45`, {
        align: 'center',
      })

      //-- TO details
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(8)
      doc.text(14, 30 + PdfPosition, 'TO:', {
        align: 'left',
      })

      //-- ANNEX LETTER HEADER
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(8)
      doc.text(190, 30 + PdfPosition, `ANNEX ${a_row}`, {
        align: 'right',
      })

      //--Horizontal line ------ ANNEX LETTER HEADER
      doc.setLineWidth(0.1)
      doc.setDrawColor(0, 0, 0)
      doc.line(170, 31 + PdfPosition, 196, 31 + PdfPosition)

      doc.setFont('helvetica', 'normal')
      doc.setFontSize(8)
      doc.text(28, 30 + PdfPosition, 'SYNERGY MARINE PTE LTD.', {
        align: 'left',
      })

      //-- DATE details
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(8)
      doc.text(14, 35 + PdfPosition, 'DATE:', {
        align: 'left',
      })

      doc.setFont('helvetica', 'normal')
      doc.setFontSize(8)
      doc.text(28, 35 + PdfPosition, '26-Sep-2022', {
        align: 'left',
      })

      //-- RE details
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(8)
      doc.text(14, 40 + PdfPosition, 'RE', {
        align: 'left',
      })

      //--Horizontal line --------------------
      doc.setLineWidth(0.1)
      doc.setDrawColor(0, 0, 0)
      doc.line(14, 41 + PdfPosition, 100, 41 + PdfPosition)

      doc.setFont('helvetica', 'normal')
      doc.setFontSize(8)
      doc.text(45, 44 + PdfPosition, 'M/V WORLD RUBY', {
        align: 'left',
      })

      //--Horizontal line ------------------------
      doc.setLineWidth(0.1)
      doc.setDrawColor(0, 0, 0)
      doc.line(14, 45 + PdfPosition, 100, 45 + PdfPosition)

      //-------------- Annex Header --------------------------------
      //-- TO BILL YOU FOR THE FOLLOWING
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(8)
      doc.text(14, 55 + PdfPosition, 'TO BILL YOU FOR THE FOLLOWING : ', {
        align: 'left',
      })

      //-- INVOICE NO.
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(8)
      doc.text(105, 55 + PdfPosition, 'INVOICE NO.', {
        align: 'left',
      })

      //--Horizontal line ------ INVOICE NO
      doc.setLineWidth(0.1)
      doc.setDrawColor(0, 0, 0)
      doc.line(95, 56 + PdfPosition, 130, 56 + PdfPosition)

      //-- Amount (Php).
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(8)
      doc.text(140, 55 + PdfPosition, 'AMOUNT (PHP)', {
        align: 'left',
      })

      //--Horizontal line ------ Amount (Php)
      doc.setLineWidth(0.1)
      doc.setDrawColor(0, 0, 0)
      doc.line(135, 56 + PdfPosition, 165, 56 + PdfPosition)

      //-- Amount (USD).
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(8)
      doc.text(172, 55 + PdfPosition, 'AMOUNT (USD)', {
        align: 'left',
      })

      //--Horizontal line ------ Amount (USD)
      doc.setLineWidth(0.1)
      doc.setDrawColor(0, 0, 0)
      doc.line(170, 56 + PdfPosition, 196, 56 + PdfPosition)

      var annexsubgroup = []
      var space = 0
      shitnetData?.map((row) => {
        if (a_row == row.annexLetter) {
          if (!annexsubgroup?.includes(row.annexSubkey)) {
            annexsubgroup.push(row.annexSubkey)
            space = space + 5

            //--Horizontal line ------ INVOICE NO - ROW
            doc.setLineWidth(0.1)
            doc.setDrawColor(0, 0, 0)
            doc.line(95, 66 + PdfPosition + space, 130, 66 + PdfPosition + space)

            //--Horizontal line ------ Amount (Php) - ROW
            doc.setLineWidth(0.1)
            doc.setDrawColor(0, 0, 0)
            doc.line(135, 66 + PdfPosition + space, 165, 66 + PdfPosition + space)

            //--Horizontal line ------ Amount (USD) - ROW
            doc.setLineWidth(0.1)
            doc.setDrawColor(0, 0, 0)
            doc.line(170, 66 + PdfPosition + space, 196, 66 + PdfPosition + space)
            //------------- Sub annex Name
            doc.setFont('helvetica', 'bold')
            doc.setFontSize(8)
            doc.text(
              20,
              65 + space + PdfPosition,
              row.annexSubkey.toString() + ' ' + row.annexSubName,
              {
                align: 'left',
              },
            )

            doc.setFont('helvetica', 'bold')
            doc.setFontSize(8)
            doc.text(
              193,
              65 + space + PdfPosition,
              ReturnAmount(row.annexSubkey, row.annexLetter),
              {
                align: 'right',
              },
            )
          }
        }
      })

      //-- TOTAL AMOUNT IN U.S. DOLLARS
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(8)
      doc.text(14, 80 + PdfPosition + space, 'TOTAL AMOUNT IN U.S. DOLLARS : ', {
        align: 'left',
      })

      //--  AMOUNT IN Word
      var addSpaceLoop = 0
      for (let i = 0; i < 3; i++) {
        addSpaceLoop = addSpaceLoop + 4
        doc.setLineWidth(0.1)
        doc.setDrawColor(0, 0, 0)
        doc.line(
          95,
          75 + PdfPosition + space + addSpaceLoop,
          196,
          75 + PdfPosition + space + addSpaceLoop,
        )
      }
      //--Horizontal line
      doc.setLineWidth(0.5)
      doc.setDrawColor(0, 0, 0)
      doc.line(
        196,
        80 + PdfPosition + space + addSpaceLoop,
        14,
        80 + PdfPosition + space + addSpaceLoop,
      )
    })

    //---------------------------------

    doc.save('sample.pdf')
  }

  return (
    <>
      <Button variant="primary" onClick={() => dlPDF()}>
        Export PDF
      </Button>
    </>
  )
}

export default SoaPDF
