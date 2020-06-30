import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({text, handleClick}) => (
  <button onClick={handleClick}>{text}</button>
)

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [voteCount, setVote] = useState([0, 0, 0, 0, 0, 0])

  const randomInteger = (min, max, prev) => {
    let getRandom = () => Math.floor(Math.random() * (max - min + 1) ) + min
    let num = getRandom()
    while (num === prev) {
      num = getRandom()
    }
    return num
  }

  const handleAnecdoteClick = () => {
    setSelected(randomInteger(0, 5, selected))
  }

  const handleVoteClick = () => {
    const copy = [...voteCount]
    copy[selected] += 1
    setVote(copy)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {props.anecdotes[selected]}
      <br/>
      has {voteCount[selected]} votes
      <br/>
      <Button text="vote" handleClick={handleVoteClick} />
      <Button text="next anecdote" handleClick={handleAnecdoteClick} />
      <h1>Anecdote with the most votes</h1>
      {anecdotes[voteCount.indexOf(Math.max(...voteCount))]}
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)