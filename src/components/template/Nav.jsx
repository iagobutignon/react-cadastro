import './Nav.css'
import React from 'react'
import { Link } from 'react-router-dom'

const Nav = props =>
    <aside className="menu-area">
        <nav className="menu">
            <Link to='/'>
                <i className="fa fa-home"></i> Início
            </Link>
            <Link to='/customers'>
                <i className="fa fa-users"></i> Clientes
            </Link>
            <Link to='/products'>
                <i className="fa fa-tags"></i> Produtos
            </Link>
        </nav>
    </aside>

export default Nav