import React from 'react'
import { ThemeProvider } from 'styled-components'
import QuizScreen from '../../src/screens/Quiz'

export default function QuizDaGaleraPage({ dbExterno }) {
    // console.log(dbExterno)

    return (
        <div>
            Desafio da próxima aula junto com as animações

            <ThemeProvider theme={dbExterno.theme} />
            <QuizScreen 
                externalQuestions={dbExterno.questions}
                externalBg={dbExterno.bg}
            />
            {/*<pre style={{color: 'black'}}>
                {JSON.stringify(dbExterno.questions, null, 4)}
            </pre>*/}
        </div>
    )
}

export async function getServerSideProps(context) {
    // console.log('infos do next', context)
    const [projectName, githubUser] = context.query.id.split('___')
    const dbExterno = await fetch(`https://${projectName}.${githubUser}.vercel.app/api/db`)
        .then(response => {
            if(response.ok) {
                return response.json()
            } 
            throw new Error('Não foi possível se conectar a api externa')
        })
        .then(responseJSON => responseJSON)
        .catch(err => {
                console.error(err)
        })

        //console.log(dbExterno)
        
    return {
        props: {
            dbExterno
        }
    }
}