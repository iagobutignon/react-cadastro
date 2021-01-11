import React, { Component } from 'react'
import axios from 'axios'
import Main from '../template/Main'

const headerProps = {
    icon: 'users',
    title: 'Clientes',
    subtitle: 'Cadastro de Clientes'
}

const baseUrl = 'http://localhost:3001/tickets'
const initialState = {
    customer: { name: '', email: '', cpf: '', birthday: '' },
    list: []
}

class Customer extends Component {

    state = { ...initialState }

    componentWillMount() {
        axios(baseUrl).then(resp => {
            this.setState({ list: resp.data })
        })
    }

    clear() {
        this.setState({ customer: initialState.customer })
    }

    save() {
        const customer = this.state.customer
        const method = customer.id ? 'put' : 'post'
        const url = customer.id ? `${baseUrl}/${customer.id}` : baseUrl
        axios[method](url, customer)
            .then(resp => {
                const list = this.getUpdatedList(resp.data)
                this.setState({ customer: initialState.customer, list })
            })
    }

    getUpdatedList(customer, add = true) {
        const list = this.state.list.filter(u => u.id !== customer.id)
        if(add) list.unshift(customer)
        return list
    }

    updateField(event) {
        const customer = { ...this.state.customer }
        customer[event.target.name] = event.target.value
        this.setState({ customer })
    }

    load(customer) {
        this.setState({ customer })
    }

    remove(customer) {
        axios.delete(`${baseUrl}/${customer.id}`).then(resp => {
            const list = this.getUpdatedList(customer, false)
            this.setState({ list })
        })
    }

    renderForm() {
        return (
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Nome</label>
                            <input type="text" name="name" className="form-control" value={this.state.customer.name} 
                                placeholder="Digite o nome" onChange={e => this.updateField(e)} />
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>E-Mail</label>
                            <input type="text" name="email" className="form-control" value={this.state.customer.email} 
                                placeholder="Digite o e-mail" onChange={e => this.updateField(e)} />
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>CPF</label>
                            <input type="text" name="cpf" className="form-control" value={this.state.customer.cpf} 
                                placeholder="Digite o CPF" onChange={e => this.updateField(e)} />
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Data de Nascimento</label>
                            <input type="text" name="birthday" className="form-control" value={this.state.customer.birthday} 
                                placeholder="Digite data de nascimento" onChange={e => this.updateField(e)} />
                        </div>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                        <button className="btn btn-primary" onClick={e => this.save(e)}>
                            Gravar
                        </button>
                        <button className="btn btn-secondary ml-2" onClick={e => this.clear(e)}>
                            Limpar
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    renderRows() {
        return this.state.list.map(customer => {
            return (
                <tr key={customer.id}>
                    <td>{customer.name}</td>
                    <td>{customer.email}</td>
                    <td>{customer.cpf}</td>
                    <td>{customer.birthday}</td>
                    <td>
                        <button className="btn btn-warning"
                            onClick={() => this.load(customer)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                    </td>
                </tr>
            )
        })
    }

    renderTable() {
        return(
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>CPF</th>
                        <th>Data de Nascimento</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        )
    }

    render() {        
        return (
            <Main {...headerProps} >
                {this.renderForm()}
                {this.renderTable()}
            </Main>
        )
    }
}

export default Customer