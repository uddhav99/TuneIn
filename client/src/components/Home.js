import React, { Component } from 'react';

class Home extends Component {
    render() {
        return(
            <div>
                <h3 style={{padding: '30px', textAlign: 'center', color: 'white'}}>
                    Customize your playlist based on your mood!
                </h3>
                <h5 style={{margin: '50px', padding: '0px',textAlign: 'center', color: 'grey', display:'block'}}>
                    Click a picture of your surroundings or simply upload one based on what you're currently in the mood for and 
                    <br />
                    <br />
                    TuneIn will add a playlist according to your liking!
                </h5>
            </div>
        );
    }
}

export default Home;