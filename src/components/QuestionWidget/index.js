import React, { useState } from 'react'

import Widget from '../Widget'
import Button from '../Button'
import AlternativesForm from '../AlternativesForm'
import BackLinkArrow from '../BackLinkArrow'


function QuestionWidget({ question, questionIndex, totalQuestions, onSubmit, addResult }) {
    
    const questionId = `$question__${questionIndex}`
    const [selectedAlternative, setSelectedAlternative] = useState(undefined)
    const [isQuestionSubmited, setIsQuestionSubmited] = useState(false)
   
    const isCorrect = selectedAlternative === question.answer
    

    const handleSubmit = event => {
        event.preventDefault()
        setIsQuestionSubmited(true)
        setTimeout(() => {
            addResult(isCorrect)
            setIsQuestionSubmited(false)
            setSelectedAlternative(undefined)
            onSubmit()
        },3 * 1000)
    }

    return (
      <Widget>
          <Widget.Header>
              <BackLinkArrow href='/' />
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

              <AlternativesForm onSubmit={handleSubmit}>
                {question.alternatives.map((alternative, index) => {
                    const alternativeIndex = `alternative__${index}`
                    const selectedAlternativeStatus = isQuestionSubmited && isCorrect
                    const isSelected = selectedAlternative ===  index

                    return (
                        <Widget.Topic
                            key={alternativeIndex} 
                            as='label'
                            htmlFor={alternativeIndex}
                            data-selected={isSelected}
                            data-status={selectedAlternativeStatus ? 'SUCCESS' : 'ERROR'}
                        >
                            
                            <input 
                                id={alternativeIndex}
                                name={questionId}
                                type="radio"
                                onChange={() => setSelectedAlternative(index)}
                                style={{ display: 'none'}}
                            />
                            {` ${alternative}`}
                        </Widget.Topic>
                    )
                })}

                <Button type="submit" disabled={selectedAlternative === undefined}>Confirmar</Button>

                {isCorrect && isQuestionSubmited &&
                    <p>Voce acertou</p>
                }

                {!isCorrect && isQuestionSubmited &&
                    <p style={{color: 'red'}}>Voce errou</p>
                }   
                
              </AlternativesForm>
          </Widget.Content>         
      </Widget>
    )
}

export default QuestionWidget