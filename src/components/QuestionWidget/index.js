import React from 'react'

import Widget from '../Widget'
import Button from '../Button'

function QuestionWidget({ question, questionIndex, totalQuestions, onSubmit }) {
    
    const questionId = `$question__${questionIndex}`

    const handleSubmit = event => {
        event.preventDefault()
        onSubmit()
    }

    return (
      <Widget>
          <Widget.Header>
              <h3>Pergunta {questionIndex + 1} de {totalQuestions}</h3>
          </Widget.Header>

          <img 
              alt="Descrição"
              style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
              }}
              src={question.image} 
          />
          <Widget.Content>
              <h2>{question.title}</h2>
              <p>{question.description}</p>

              <form onSubmit={handleSubmit}>
                {question.alternatives.map((alternative, index) => {
                    const alternativeIndex = `alternative__${index}`
                    return (
                        <Widget.Topic
                            key={alternativeIndex} 
                            as='label'
                            htmlFor={alternativeIndex}>
                            
                            <input 
                                id={alternativeIndex}
                                name={questionId}
                                type="radio"
                                /*style={{ display: 'none'}}*/
                            />
                            {` ${alternative}`}
                        </Widget.Topic>
                    )
                })}

                <Button type="submit">Confirmar</Button>
              </form>
          </Widget.Content>         
      </Widget>
    )
}

export default QuestionWidget