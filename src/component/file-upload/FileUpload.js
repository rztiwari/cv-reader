import React, {Component} from 'react';
import axios from 'axios';
import './FileUpload.css';
import { BrowserRouter as Router } from 'react-router-dom';

class FileUploader extends Component {

    constructor(props){
        super(props);

        this.state = {
            form: true
        }
        this.uploadFile = this.uploadFile.bind(this);
        this.resetForm = this.resetForm.bind(this);
    }

    resetForm(){
        const inputRefs = {...this.refs}
        if(inputRefs){
            Object.keys(inputRefs).map(ref=> {
                inputRefs[ref].value = '';
            });
        }
    }

    uploadFile(evt){

        evt.preventDefault();

        let form = this.refs['uploadForm'];
        let data = new FormData(form);
        const config = {
            headers: { 'content-type': 'multipart/form-data' }
        }

    //    this.props.history.push('/details', { 
    //         name: 'Candiate', 
    //         role: 'Senior Java Developer', 
    //         jobid: 'ABCD12212',
    //         client: 'Some Random UK PLC',
    //         skillsTag: '#Java #Javascript #Ruby #Perl #Maven #REACT #REDUX #Oracle #Automation'
    //     });

        axios.post('/api/upload/cv', data, config)
          .then((response) => {
              this.setState({
                  form: false
                });
                this.props.history.push('/details', response.data);
          })
          .catch((error) => {
            console.log(error);
          });

    }
    
    render(){
        if(this.state.form === true ){
            return (
              <form encType="multipart/form-data" action="/upload/cv" method="post" ref='uploadForm'>
                <div className="form">
                    <label htmlFor="name">Name of the candidate:</label>
                    <input name="name" id="name" ref="name"></input>
                </div>
                <div className="form">
                    <label htmlFor="jobid">Job id:</label>
                    <input name="jobid" id="jobid" ref="jobid"></input>
                </div>
                <div className="form">
                    <label htmlFor="client">Client for:</label>
                    <input name="client" id="client" ref="client"></input>
                </div>
                <div className="form">
                    <label htmlFor="role">Role for:</label>
                    <input name="role" id="role" ref="role"></input>
                </div>
                <div className="form-upload">
                    <input id="image-file" type="file"  name='file'/>
                    <input type='button' value="Submit" onClick={this.uploadFile} className="file-submit"></input>
                    <input type='button' value="Reset" onClick={this.resetForm} className="file-submit"></input>
                </div>
              </form>
            );
        }else {
           return (<div> Form uploaded Successully!!</div>);
        }
    }
}


export default FileUploader;
