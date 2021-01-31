import React from 'react'
import { useRouter } from 'next/router'

import Widget from '../Widget'

function capitalCase(str) {
    if (str) {
        return str[0].toUpperCase().concat(str.slice(1))
    }
}

function ResultWidget({ results }) {
    const router = useRouter()
    // console.log(router.query)
    const [name, _] = capitalCase(router.query.name).split('/')

    const totalRightQuestions = results.reduce((accumulator, currentValue) => {
        const isRight = currentValue === true
        if(isRight) {
            return accumulator + 1
        }
        return accumulator

    }, 0)

    return (
      <Widget>
        <Widget.Header>
          Carregando...
        </Widget.Header>
  
        <Widget.Content>
          <p>Parabéns, {name}! Você acertou {totalRightQuestions} perguntas</p>
          <ul>
              {results.map((result, index) => (
                  <li key={index}>
                      0{index+1}) {result === true ? 'T': 'F'}
                  </li>
              ))}
          </ul>
        </Widget.Content>
      </Widget>
    );
  }


export default ResultWidget