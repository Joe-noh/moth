import React, { useState } from 'react'
import './App.css'
import { invoke } from '@tauri-apps/api/tauri'

type Row = { [key:string] : number }

function App() {
  const [cols, setCols] = useState<string[]>([])
  const [rows, setRows] = useState<Row[]>([])
  const query = "SELECT * FROM books"

  const select = async () => {
    const res: Row[] = await invoke('execute_query', { query })

    setCols(Object.keys(res[0]))
    setRows(res)
  }

  const headers = cols.map(col => <th>{col}</th>)

  const body = rows.map((row) => (
    <tr>
      {cols.map(col => <td>{row[col]}</td>)}
    </tr>
  ))

  return (
    <div className="App">
      Tauri
      <button onClick={select}>{query}</button>
      <table width="100%">
        <thead>
          <tr>{headers}</tr>
        </thead>
        <tbody>
          {body}
        </tbody>
      </table>
    </div>
  )
}

export default App
