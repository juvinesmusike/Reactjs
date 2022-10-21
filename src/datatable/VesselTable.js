import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import { useVessellistQuery } from 'src/features/functions/VesselSlice'

const VesselTable = () => {
  const [datas, setDatas] = useState([])
  const { data: VesselData } = useVessellistQuery()
  const column = [
    {
      name: 'ShipNet Code',
      selector: (row) => row.shipCode,
    },
    {
      name: 'Name',
      selector: (row) => row.name,
    },
  ]

  useEffect(() => {
    setDatas(VesselData)
  }, [VesselData])
  return <DataTable columns={column} data={datas} />
}

export default VesselTable
