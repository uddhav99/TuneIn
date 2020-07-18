import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state ={
          file: null
        }
    }

    onSubmit = async (e) => {
        console.log(this.state.file);
        let formData = new FormData();

        formData.append('image', this.state.file);
        const res = await axios({
            method: 'post',
            url: '/api/search',
            data: formData,
            headers: {'Content-Type': 'multipart/form-data' }
        })
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
                <form>
                    <h1>File Upload</h1>
                    <input type="file" accept="image/png, image/jpeg" onChange={this.onChange}/>
                    <button type="button" onClick={this.onSubmit}>Upload</button>
                </form>
            </div>
        );
    }
}

export default Dashboard;