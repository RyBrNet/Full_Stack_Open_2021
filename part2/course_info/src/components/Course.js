import React from 'react'

const Header = ({course}) => {
    return (
      <div>
        <h2>{course.name}</h2>
      </div>
    )
  }
  
  const Part = ({part}) => {
    return (
      <div>
        <p>{part.name} {part.exercises}</p>
      </div>
    )
  }
  
  const Content = ({course}) => {
    return (
      <div>
        {course.parts.map( part => 
          <Part key={part.id} part={part} />
        )}
      </div>
    )
  }
  
  const Total = ({course}) => {
    const numberOfExercises = course.parts.reduce((accumulator, currentValue) => 
      accumulator + currentValue.exercises, 0)
    return (
      <div>
        <h4>Total of {numberOfExercises} exercises</h4>
      </div>
    )
  }
  
  const Course = ({course}) => {
    return (
      <div>
        <Header course={course} />
            
        <Content course={course} />
            
        <Total course={course} />
      </div>
    )
  }

export default Course