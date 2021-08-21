import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import QueryForm from './QueryForm'

test('Calls onSubmit callback', () => {
  const onSubmit = jest.fn()
  const query = 'SELECT * FROM books;'

  render(<QueryForm onSubmit={onSubmit} />)

  fireEvent.change(screen.getByTestId('query-textarea'), { target: { value: query } })
  fireEvent.click(screen.getByTestId('submit-button'))

  expect(onSubmit).toHaveBeenCalledWith(query)
})
