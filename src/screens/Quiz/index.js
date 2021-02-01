/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';

import QuizLogo from '../../components/QuizLogo';
import QuizBackground from '../../components/QuizBackground';
import QuizContainer from '../../components/QuizContainer';
import QuestionWidget from '../../components/QuestionWidget'
import LoadingWidget from '../../components/LoadingWidget'
import ResultWidget from '../../components/ResultWidget'

const screenStates = {
    QUIZ: 'QUIZ',
    LOADING: 'LOADING',
    RESULT: 'RESULT',
}


export default function QuizScreen({ externalQuestions, externalBg }) {
    
    // console.log('quiz criados', db.questions)
    const [screenState, setScreenState ] = useState(screenStates.LOADING)
    const [questionIndex, setQuestionIndex] = useState(0)
    const [results, setResults] = useState([])
    const question = externalQuestions[questionIndex]
    const totalQuestions = externalQuestions.length

    console.log(externalBg)

    function addResult(result) {
        setResults([
            ...results,
            result
        ])
    }

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
    <QuizBackground backgroundImage={externalBg}>
      <QuizContainer>
        <QuizLogo />

        { screenState === 'QUIZ' && 
            <QuestionWidget 
                question={question}
                questionIndex={questionIndex}
                totalQuestions={totalQuestions}
                onSubmit={handleSubmitQuiz}
                addResult={addResult}
            />
        }
        
        { screenState === 'RESULT' &&
            <ResultWidget results={results} />
            
        }

        { screenState === 'LOADING' && 
            <LoadingWidget />
        }

        </QuizContainer>
    </QuizBackground>
  );
}