import React, { useState } from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import { useRouter } from 'next/router'

import db from '../db.json';
import QuizBackground from '../src/components/QuizBackground';
import QuizLogo from '../src/components/QuizLogo';
import QuizContainer from '../src/components/QuizContainer'
import Widget from '../src/components/Widget';
import Input from '../src/components/Input'
import Button from '../src/components/Button'
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';


export default function Home() {
  const [name, setName] = useState('')
  const router = useRouter()

  const handleSubmit = ((event) => {
    event.preventDefault()
    router.push(`/quiz?name=${name}`)
  })

  return (

    <QuizBackground backgroundImage={db.bg}>
      <Head>
        <title>Alura Quiz - Modelo Base</title>
      </Head>
      <QuizContainer>
        <QuizLogo />
        <Widget>
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
                 }} 
              />
              <Button type="submit" disabled={name.length === 0}>Jogar {name}</Button>
            </form>
          </Widget.Content>
        </Widget>
        <Widget>
          <Widget.Content>
            <h1>Quizes da galera</h1>

            <p> Descrição e pá number 2</p>
          </Widget.Content>
        </Widget>
        <Footer />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/cadupm" />
    </QuizBackground>
  );
}
