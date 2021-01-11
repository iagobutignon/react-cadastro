import React from 'react'
import Main from '../template/Main'

const Home = props =>
    <Main icon="home" title="Início" subtitle="Projeto React">
        <div className="display-4">Bem vindo!</div>
        <hr />
        <p className="mb-0">Sistema desenvolvido para portifólio</p>
    </Main>

export default Home