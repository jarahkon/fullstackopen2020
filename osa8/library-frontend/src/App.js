import { useState, useEffect } from 'react'
import { useApolloClient } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Notify from './components/Notify'
import LoginForm from './components/LoginForm'

const App = () => {
  const [page, setPage] = useState('authors')
  const [errorMessage, setErrorMessage] = useState(null)
  const [token, setToken] = useState(null)
  const client = useApolloClient();

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  const localToken = localStorage.getItem('library-user-token');

  useEffect(() => {
    setToken(localToken)
  }, [localToken])

  return (
    <div>
      <Notify errorMessage={errorMessage} />
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={!token ? () => setPage('loginForm') : logout}>{ !token ? 'login' : 'logout' }</button>
      </div>

      <Authors show={page === 'authors'} setError={notify} />

      <Books show={page === 'books'} setError={notify} />

      <NewBook show={page === 'add'} setError={notify} />

      <LoginForm show={page === 'loginForm'} setError={notify} setToken={setToken} />
    </div>
  )
}

export default App
