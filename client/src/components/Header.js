import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: true
        }
    }

    renderContent() {
        if (this.state.isLoggedIn) {
            return (
                <li>
                    <a onClick={() => !this.state.isLoggedIn} href="/api/logout" style={{borderRadius: '12px'}} class="waves-effect waves-light btn-small green darken-1">
                        Log Out
                    </a>
                </li>
            );
        }
        else {
            return (
                <li>
                    <a href="/auth/spotify" style={{borderRadius: '12px'}} class="waves-effect waves-light btn green darken-1">
                        Log in with Spotify
                    </a>
                </li>
            );
        }
    }
    

    render() {
        return (
            <nav>
                <div class="nav-wrapper blue-grey darken-4" style={{paddingLeft: '4px'}}>
                    <Link to={this.state.isLoggedIn ? '/dashboard' : '/'} class="brand-logo">TuneIn</Link>
                    <ul class="right">
                        {this.renderContent()}
                    </ul>
                </div>
          </nav>
        );
    }
}

export default Header;