import React, { Component } from 'react';
import { Form, Icon, Input, Button } from 'antd';
import axios from 'axios';
import './FileUpload.css';
import { BrowserRouter as Router } from 'react-router-dom';

const FormItem = Form.Item;

class FileUploader extends Component {

    constructor(props) {
        super(props);

        this.state = {
            form: true,
            size: 'large'
        }
        this.uploadFile = this.uploadFile.bind(this);
        this.resetForm = this.resetForm.bind(this);
    }

    resetForm() {
        const inputRefs = { ...this.refs }
        if (inputRefs) {
            Object.keys(inputRefs).forEach(ref => {
                if(inputRefs[ref].input){
                    inputRefs[ref].input.value = '';
                }
            });
        }
    }

    uploadFile(evt) {

        evt.preventDefault();
        let data = new FormData(evt.target);
        const config = {
            headers: { 'content-type': 'multipart/form-data' }
        }

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

    render() {
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };

        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };

        const size = this.state.size;

        if (this.state.form === true) {
            return (
                <Form action="/upload/cv" method="post" ref='uploadForm' onSubmit={this.uploadFile}>
                    <FormItem {...formItemLayout} label="Name of the candidate:">
                        <Input size={size} name="name" ref='name' placeholder="Please input the candidate name" />
                    </FormItem>
                    <FormItem {...formItemLayout} label="Job id:">
                        <Input size={size} name="jobid" ref='jobid' placeholder="Please input the job id" />
                    </FormItem>
                    <FormItem {...formItemLayout} label="Client for:">
                        <Input size={size} name="client" ref='client' placeholder="Please input client" />
                    </FormItem>
                    <FormItem {...formItemLayout} label="Role for:">
                        <Input size={size} name="role" ref='role' placeholder="Please input the role" />
                    </FormItem>
                    <FormItem {...formItemLayout} label="Choose document to upload">
                        <Input size={size} type="file" name='file' ref='file' placeholder="Please select .pdf or .docx file"/>
                    </FormItem>
                    <FormItem {...tailFormItemLayout}>
                        <Button size={size} type='primary' htmlType="submit">Submit</Button>
                        <Button size={size} type='secondary' htmlType="button" onClick={this.resetForm} >Reset</Button>
                    </FormItem>
                </Form>
            );
        } else {
            return (<div> Form uploaded Successully!!</div>);
        }
    }
}


export default FileUploader;
