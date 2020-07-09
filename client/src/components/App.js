import React, { Component } from 'react';
import { BrowserRouter, Route} from "react-router-dom";
import { connect } from 'react-redux';
import * as actions from '../actions';
import Header from './Header';
import DashBoard from './Dashboard';
import Home from './Home';

class App extends Component {

    componentDidMount() {
        this.props.fetchUser();
    }

    render() {
        return (
            <BrowserRouter>
                <div className="container">
                    <Header />
                    <Route path="/" exact={true} component={Home}/> 
                    <Route path="/dashboard" exact={true} component={DashBoard}/>
                </div>
            </BrowserRouter>
        )
    }
}

export default connect(null, actions)(App);