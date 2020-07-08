import React, { Component } from 'react';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false
        }
    }

    

    render() {
        return (
            <div>
                This is the header component.
            </div>
        );
    }
}

export default Header;