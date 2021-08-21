import React, { useState } from 'react'
import { invoke } from '@tauri-apps/api/tauri'
import './App.css'
import QueryForm from './components/QueryForm/QueryForm';
import ResultTable from './components/ResultTable/ResultTable';

type Row = { [key:string] : number }

function App() {
  const [rows, setRows] = useState<Row[]>([])

  const onQuerySubmit = async (query: string) => {
    const res: Row[] = await invoke('execute_query', { query })

    setRows(res)
  }

  return (
    <div className="App">
      <QueryForm onSubmit={onQuerySubmit} />
      <ResultTable rows={rows} />
    </div>
  )
}

export default App
