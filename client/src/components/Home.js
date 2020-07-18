import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import spotifyDesktop from '../assets/spotifyDesktop.png';
import spotifyMobile from '../assets/spotifyMobile2.png';

class Home extends Component {
    render() {
        return(
            <div>
                <h3 style={{padding: '20px', textAlign: 'center', color: 'white', fontWeight: '100'}}>
                    Customize your playlist based on your mood!
                </h3>
                <h5 style={{margin: '30px', padding: '0px',textAlign: 'center', color: 'grey', display:'block'}}>
                    Click a picture of your surroundings or simply upload one based on what you're currently in the mood for and 
                    <br />
                    <br />
                    TuneIn will add a playlist according to your liking!
                </h5>
                <div style={{textAlign: 'center'}}>
                    <Button 
                        style={{textAlign: 'center', backgroundColor: 'transparent', border:'1px solid white', borderRadius: '10px'}} 
                        variant="outline-secondary"
                        href="/auth/spotify"
                    >
                        Get Started!
                    </Button>
                </div>
                <div 
                    className="container" 
                    style={{textAlign:'center', marginTop: '40px', paddingTop:'10px'}}
                >
                    <img src={spotifyMobile} height="300" style={{position: 'relative', left:'40px'}} alt="mobile"/>
                    <img src={spotifyDesktop} height="400" width="600" alt="desktop"/>
                </div>
            </div>
        );
    }
}

// make images responsive based on screen size 
export default Home;