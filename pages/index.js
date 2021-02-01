import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'

import db from '../db.json';
import QuizBackground from '../src/components/QuizBackground';
import QuizLogo from '../src/components/QuizLogo';
import QuizContainer from '../src/components/QuizContainer'
import Widget from '../src/components/Widget';
import Link from '../src/components/Link'
import Input from '../src/components/Input'
import Button from '../src/components/Button'
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';


export default function Home() {
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = ((event) => {
    event.preventDefault()
    router.push(`/quiz?name=${name}`)
  })

  const handleLinkClick = ((event) => {
    
    if (!name) {
      event.preventDefault()
      setError('Por favor, coloque seu nome')
    } 
                  
  })
  return (

    <QuizBackground backgroundImage={db.bg}>
      <Head>
        <title>Alura Quiz - Modelo Base</title>
      </Head>
      <QuizContainer>
        <QuizLogo />
        <Widget
          as={motion.section}
          transition={{ 
            delay: 0, 
            duration: 0.5
          }}
          variants={{
            show: { opacity: 1, y: '0'},
            hidden: { opacity : 0, y: '100%'},
          }} 
          initial="hidden" 
          animate="show"
        >
          <Widget.Header>
            <h1>{db.title}</h1>
          </Widget.Header>

          <Widget.Content>
            <p>{db.description}</p>
            <form onSubmit={handleSubmit}>
              <Input 
                inputName="nomeDoUsuario"
                value={name}
                placeholder="Digite aqui seu nome"
                onChange={ e => {
                  setName(e.target.value) 
                  setError('')
                 }} 
              />
              <Button type="submit" disabled={name.length === 0}>Jogar {name}</Button>
            </form>
          </Widget.Content>
        </Widget>
        { error && <p style={{color: 'red'}}>{error}</p>}
        <Widget
          as={motion.section}
          transition={{ 
            delay: 0.5, 
            duration: 0.5
          }}
          variants={{
            show: { opacity: 1, y: '0'},
            hidden: { opacity : 0, y: '100%'},
          }} 
          initial="hidden" 
          animate="show"
        >
          <Widget.Content>
            <h1>Quizes da galera</h1>
            <ul>
              {db.external.map(linkExterno => {
                const [projectName, githubUser]= linkExterno.replace(/\//g,'')
                                                             .replace('https:','')
                                                              .replace('.vercel.app', '')
                                                               .split('.')

                
                return (
                <li key={linkExterno}>
                  <Widget.Topic
                    as={Link} 
                    href={ name.length === 0 ? 'javascript:void(0)' : `/quiz/${projectName}___${githubUser}`}
                    onClick={handleLinkClick}
                  >
                      {githubUser}/{projectName}
                  </Widget.Topic>
                </li>
              )})}
            </ul>
          </Widget.Content>
        </Widget>
        <Footer
          as={motion.footer}
          transition={{ 
            delay: 1, 
            duration: 0.5
          }}
          variants={{
            show: { opacity: 1 },
            hidden: { opacity : 0 },
          }} 
          initial="hidden" 
          animate="show"
        />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/cadupm" />
    </QuizBackground>
  );
}
