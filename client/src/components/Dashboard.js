import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import spotifyDesktop from '../assets/spotifyDesktop.png';
import spotifyMobile from '../assets/spotifyMobile2.png';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state ={
          file: null
        }
    }

    onSubmit = async (e) => {
        let formData = new FormData();

        formData.append('image', this.state.file);
        try {
            const res = await axios({
                method: 'post',
                url: '/api/search',
                data: formData,
                headers: {'Content-Type': 'multipart/form-data' }
            })
        } catch (err) {
            // authentication required 
            if (err['response']['status'] === 401) {
                console.log(JSON.stringify(err));
                console.log('authentication problems');
                this.props.history.push('/');
            } else {
                console.log('Error finding songs');
            }
        }
    }

    onChange = (e) => {
        const file = e.target.files[0];
        this.setState({file: file});
    }

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
                <div 
                    style={{textAlign:'left', marginTop: '40px', paddingTop:'10px', float: 'left'}}
                >
                    <img src={spotifyMobile} height="300" style={{position: 'relative', left:'40px'}} alt="mobile"/>
                    <img src={spotifyDesktop} height="400" width="600" alt="desktop"/>
                </div>
                <form style={{textAlign: 'right', marginRight:'150px', marginTop:'200px', color:'white'}}>
                    <input type="file" accept="image/png, image/jpeg" onChange={this.onChange}/>
                    <button type="button" onClick={this.onSubmit}>Submit</button>
                </form>
            </div>
        );
    }
}

export default withRouter(Dashboard);