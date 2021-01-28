/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import db from '../db.json';

import QuizLogo from '../src/components/QuizLogo';
import QuizBackground from '../src/components/QuizBackground';
import QuizContainer from '../src/components/QuizContainer';
import QuestionWidget from '../src/components/QuestionWidget'
import LoadingWidget from '../src/components/LoadingWidget'

const screenStates = {
    QUIZ: 'QUIZ',
    LOADING: 'LOADING',
    RESULT: 'RESULT',
}

function capitalCase(str) {
    return str[0].toUpperCase().concat(str.slice(1))
}

export default function QuizPage() {
    // console.log('quiz criados', db.questions)
    const [screenState, setScreenState ] = useState(screenStates.LOADING)
    const [questionIndex, setQuestionIndex] = useState(0)
    const question = db.questions[questionIndex]
    const totalQuestions = db.questions.length

    const router = useRouter()
    const name = capitalCase(router.query.name)
    

    // React Effects
    // atualizado == willUpdate
    // morre == WillUnmount
    
    useEffect(() => {
        setTimeout(() => {
            setScreenState(screenStates.QUIZ)  
        }, 1*1200)
        // nasce == didMount
    }, [questionIndex])

    function handleSubmitQuiz() {
        const nextQuestion = questionIndex + 1
        if(nextQuestion < totalQuestions) {
            setQuestionIndex(nextQuestion)
            setScreenState(screenStates.LOADING)
        } else {
            setScreenState(screenStates.LOADING)
            setTimeout(() => {
                setScreenState(screenStates.RESULT)  
            }, 1*1200)
        }
    }
    

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo />

        { screenState === 'QUIZ' && 
            <QuestionWidget 
                question={question}
                questionIndex={questionIndex}
                totalQuestions={totalQuestions}
                onSubmit={handleSubmitQuiz}
            />
        }
        
        { screenState === 'RESULT' &&
            <div>
                Parabéns, {name}! Você acertou X questões. 
            </div>
            
        }

        { screenState === 'LOADING' && 
            <LoadingWidget />
        }

        </QuizContainer>
    </QuizBackground>
  );
}