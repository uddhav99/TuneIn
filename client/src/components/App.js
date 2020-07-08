import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from "react-router-dom";

import Header from './Header';
import DashBoard from './Dashboard';
import Home from './Home';

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div className="container">
                    <Header />
                    <Route path="/" exact={true} component={Home}/> 
                    <Route path="/dashboard" exact={true} component={DashBoard}/>
                    <a href="/auth/spotify">Login with spotify</a>
                </div>
            </BrowserRouter>
        )
    }
}

export default App;