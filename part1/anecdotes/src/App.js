import React, { useState } from 'react'

const Button = ({handleClick, text}) => (
  <button 
    onClick={handleClick}>
    {text}
  </button>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(6).fill(0))
  
  const setVote = anecdoteNumber => {
    const copy = [...votes]
    copy[anecdoteNumber] += 1
    setVotes(copy)
  }

  let mostVotes = 0
  let mostVotedAnecdote = 0;

  votes.forEach(function(element, index) {
      if( element > mostVotes ) {
        mostVotes = element
        mostVotedAnecdote = index;
      }
  } )

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <Button handleClick={() => setVote(selected)} text="Vote" />
      <Button handleClick={() => setSelected(Math.floor(Math.random() * 6))} text="Next Anecdote" />
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[mostVotedAnecdote]}</p>
      <p>Has {votes[mostVotedAnecdote]} votes!</p>
    </div>
  )
}

export default App