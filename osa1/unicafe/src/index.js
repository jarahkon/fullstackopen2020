import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Title = ({title}) => {
  return (
  <h1>{title}</h1>
  )
}

const Button = ({name, handler}) => {
  return (
    <button onClick={handler}>
      {name}
    </button>
  )
}

const StatisticsLine = ({text, value}) => {
  return (
    <div>
    {text} {value}
  </div>
  )
  
}

const Statistics = ({good, neutral, bad}) => {
  const goodString = "good"
  const neutralString = "neutral"
  const badString = "bad"
  const allString = "all"
  const averageString = "average"
  const positiveString = "positive"

  if (good + neutral + bad === 0) {
    return (
      <div>No feedback given</div>
    )
  }

  return (
    <div>
      <StatisticsLine text={goodString} value={good} />
      <StatisticsLine text={neutralString} value={neutral} />
      <StatisticsLine text={badString} value={bad} />
      <StatisticsLine text={allString} value={good + neutral + bad} />
      <StatisticsLine text={averageString} value={good + bad + neutral} />
      <StatisticsLine text={positiveString} value={good / (good + neutral + bad) * 100 + ' %'} />
    </div>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increaseGood = () => setGood(good + 1)
  const increaseNeutral = () => setNeutral(neutral + 1)
  const increaseBad = () => setBad(bad + 1)

  const feedbackTitle="give feedback"
  const statisticsTitle="statistics"

  const goodString = "good"
  const neutralString = "neutral"
  const badString = "bad"

  return (
    <div>
      <Title title={feedbackTitle} />
      <Button name={goodString} handler={increaseGood} />
      <Button name={neutralString} handler={increaseNeutral} />
      <Button name={badString} handler={increaseBad} />
      <Title title={statisticsTitle} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)