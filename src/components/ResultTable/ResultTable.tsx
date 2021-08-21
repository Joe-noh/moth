import React from 'react'

interface Props {
  rows: {[key: string]: any}[];
}

function ResultTable(props: Props) {
  const columns = props.rows[0] ? Object.keys(props.rows[0]) : []
  const headers = columns.map((col, i) => <th key={i}>{col}</th>)

  const body = props.rows.map((row, i) => (
    <tr key={i}>
      {columns.map((col, j) => <td key={j}>{row[col]}</td>)}
    </tr>
  ))

  return (
    <table width="100%" data-testid="table">
      <thead>
        <tr>{headers}</tr>
      </thead>
      <tbody>
        {body}
      </tbody>
    </table>
  )
}

export default ResultTable
