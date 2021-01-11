import React, { Component } from 'react'
import axios from 'axios'
import Main from '../template/Main'

const headerProps = {
    icon: 'tags',
    title: 'Produtos',
    subtitle: 'Cadastro de Produtos'
}

const baseUrl = 'http://localhost:3001/products'
const initialState = {
    product: { name: '', description: '', quantity: '', price: '' },
    list: []
}

class Product extends Component {

    state = { ...initialState }

    componentWillMount() {
        axios(baseUrl).then(resp => {
            this.setState({ list:resp.data })
        })
    }

    clear() {
        this.setState({ product: initialState.product })
    }

    save() {
         const product = this.state.product
         const method = product.id ? 'put' : 'post'
         const url = product.id ? `${baseUrl}/${product.id}` : baseUrl
         axios[method](url, product)
            .then(resp => {
                const list = this.getUpdatedList(resp.data)
                this.setState({ product: initialState.product, list})
            })
    }

    getUpdatedList(product, add= true) {
        const list = this.state.list.filter(u => u.id !== product.id)
        if(add) list.unshift(product)
        return list
    }

    updateField(event) {
        const product = { ...this.state.product }
        product[event.target.name] = event.target.value
        this.setState({ product })
    }

    load(product) {
        this.setState({ product })
    }

    remove(product) {
        axios.delete(`${baseUrl}/${product.id}`).then(resp => {
            const list = this.getUpdatedList(product, false)
            this.setState({ list })
        })
    }

    renderForm() {
        return (
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-4">
                        <div className="form-group">
                            <label>Produto</label>
                            <input type="text" name="name" className="form-control" value={this.state.product.name} 
                                placeholder="Digite o nome do produto" onChange={e => this.updateField(e)} />
                        </div>
                    </div>

                    <div className="col-12 col-md-4">
                        <div className="form-group">
                            <label>Quantidade</label>
                            <input type="text" name="quantity" className="form-control" value={this.state.product.quantity} 
                                placeholder="Digite a quantidade" onChange={e => this.updateField(e)} />
                        </div>
                    </div>

                    <div className="col-12 col-md-4">
                        <div className="form-group">
                            <label>Preço</label>
                            <input type="text" name="price" className="form-control" value={this.state.product.price} 
                                placeholder="Digite o preço" onChange={e => this.updateField(e)} />
                        </div>
                    </div>                    

                    <div className="col-12 col-md-12">
                        <div className="form-group">
                            <label>Descrição</label>
                            <textarea type="text" name="description" className="form-control" value={this.state.product.description} 
                                placeholder="Digite uma descrição" onChange={e => this.updateField(e)} />
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
        return this.state.list.map(product => {
            return (
                <tr key={product.id}>
                    <td>{product.name}</td>
                    <td>{product.description}</td>
                    <td>{product.quantity}</td>
                    <td>{product.price}</td>
                    <td>
                        <button className="btn btn-warning"
                            onClick={() => this.load(product)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="btn btn-danger ml-2"
                            onClick={() => this.remove(product)}>
                            <i className="fa fa-trash"></i>
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
                        <th>Descrição</th>
                        <th>Quantidade</th>
                        <th>Preço</th>
                        <th>Ações</th>
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
            <Main {...headerProps}>
                {this.renderForm()}
                {this.renderTable()}
            </Main>
        )
    }
}

export default Product