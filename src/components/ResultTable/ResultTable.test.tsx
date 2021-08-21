import React from 'react'
import { render, screen } from '@testing-library/react'
import ResultTable from './ResultTable'

test('Shows given data', () => {
  const rows = [
    { id: 1, name: 'John', age: 30 },
    { id: 2, name: 'Alex', age: 25 },
  ]

  render(<ResultTable rows={rows} />)

  const table = screen.getByTestId('table')

  const headers = [...table.querySelectorAll('th')].map(th => th.textContent)
  const records = [...table.querySelectorAll('td')].map(td => td.textContent)

  expect(headers).toStrictEqual(['id', 'name', 'age'])
  expect(records).toStrictEqual(['1', 'John', '30', '2', 'Alex', '25'])
})
