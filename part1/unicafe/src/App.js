import React, { useState } from 'react'

const Statistic = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td> 
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({good, neutral, bad}) => {
  const total = good + neutral + bad

  if (total < 1 ) {
    return (
      <div>No Feedback Given</div>
    )
  } else {
    const percentPositive = (((good / (good + neutral + bad)) * 100).toFixed(2)) + "%"
    const average = ((good + -bad)/total).toFixed(2)
    return (
      <table>
        <tbody>
          <Statistic text="Good" value ={good}/> 
          <Statistic text="Neutral" value ={neutral}/>
          <Statistic text="Bad" value ={bad}/>
          <Statistic text="Average" value ={average}/>
          <Statistic text="Percent Postive" value ={percentPositive}/>
        </tbody>
      </table> 
    )
  }
}

const Button = ({handleClick, text}) => (
  <button 
    onClick={handleClick}>
    {text}
  </button>
)

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const setToGood = newValue => {
    setGood(newValue)
  }

  const setToNeutral = newValue => {
    setNeutral(newValue)
  }

  const setToBad = newValue => {
    setBad(newValue)
  }

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button handleClick={() => setToGood(good + 1)} text="Good" />
      <Button handleClick={() => setToNeutral(neutral + 1)} text="Neutral" />
      <Button handleClick={() => setToBad(bad + 1)} text="Bad" />
      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App