import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';

class Header extends Component {


    renderContent() {
        switch(this.props.auth) {
            case null:
                return
            case false:
                return (
                    <li>
                         <a href="/auth/spotify" style={{borderRadius: '12px'}} className="waves-effect waves-light btn green darken-1">
                            Log in with Spotify
                        </a>
                    </li>
                );
            default:
                return (
                    <a href="/api/logout" style={{borderRadius: '12px'}} className="waves-effect waves-light btn-small green darken-1">
                        Log Out
                    </a>
                );
        }
    }
    
    render() {
        return (
            <nav>
                <div className="nav-wrapper blue-grey darken-4" style={{paddingLeft: '4px'}}>
                    <Link to={this.props.auth ? '/dashboard' : '/'} className="brand-logo" style={{marginLeft:'20px'}}>TuneIn</Link>
                    <ul className="right">
                        {this.renderContent()}
                    </ul>
                </div>
          </nav>
        );
    }
}

function mapStateToProps(state) {
    return { auth: state.auth };
}

export default connect(mapStateToProps)(Header);