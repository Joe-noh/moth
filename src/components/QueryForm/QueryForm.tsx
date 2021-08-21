import React, { useState } from 'react'

interface Props {
  onSubmit: (query: string) => void;
}

function QueryForm(props: Props) {
  const [query, setQuery] = useState('')

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault()

    setQuery(e.target.value)
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    props.onSubmit(query)
  }

  return (
    <form onSubmit={onSubmit}>
      <textarea onChange={onChange} value={query}></textarea>
      <input type="submit" />
    </form>
  )
}

export default QueryForm
