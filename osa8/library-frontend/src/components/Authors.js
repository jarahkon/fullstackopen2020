import { useState } from 'react'
import { ALL_AUTHORS } from "../api/queries"
import { useQuery, useMutation } from "@apollo/client"
import { UPDATE_AUTHOR } from '../api/mutations'

const Authors = ({ show }) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')
  const [ updateAuthor ] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [ { query: ALL_AUTHORS } ]
  })
  const result = useQuery(ALL_AUTHORS)
  if (!show) {
    return null
  }
  let authors = []

  if (result.loading) {
    return <div>loading...</div>
  }

  authors = result.data.allAuthors;

  const submit = async (event) => {
    event.preventDefault()
    console.log('edit author...')
    updateAuthor({ variables: { name, born } })

    setName('')
    setBorn('')
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          name
          <select 
            value={name}
            onChange={({ target }) => setName(target.value)}
          >
            {authors.map((a) => (
              <option key={a.name}>{a.name}</option>
            ))}
          </select>
        </div>
        <div>
          born
          <input
            value={born}
            onChange={({ target }) => setBorn(Number(target.value))}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default Authors
