import React from 'react'

interface Props {
  rows: {[key: string]: any}[];
}

function ResultTable(props: Props) {
  const columns = props.rows[0] ? Object.keys(props.rows[0]) : []
  const headers = columns.map(col => <th>{col}</th>)

  const body = props.rows.map((row) => (
    <tr>
      {columns.map(col => <td>{row[col]}</td>)}
    </tr>
  ))

  return (
    <table width="100%">
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
