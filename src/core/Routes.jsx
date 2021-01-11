import React from 'react'
import { Switch, Route, Redirect } from 'react-router'

import Home from '../components/home/Home'
import Product from '../components/product/Product'
import Customer from '../components/customer/Customer'

const Routes = props =>
    <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/customers' component={Customer} />
        <Route path='/products' component={Product} />
        <Redirect from='*' to='/' />
    </Switch>

export default Routes