import React, { useState } from 'react'
import {DataGrid} from '@mui/x-data-grid'


export default function MusicGrid({columns, rows, setSelection, selection}) {
  return (
    <div style={{ height: 800, width: '110%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={60}
        rowsPerPageOptions={[5]}
        onSelectionModelChange={(newSelection) => {
          console.log(newSelection);
          setSelection(newSelection)
        }}
        checkboxSelection
        disableSelectionOnClick={false}
        disableColumnMenu={true}
        selectionModel={selection}
      />
    </div>
  )
}