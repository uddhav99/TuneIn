import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from "react-router-dom";

class App extends Component {
    render() {
        return (
            <div>
                <a href="/auth/spotify">Login with spotify</a>
            </div>
        )
    }
}

export default App;