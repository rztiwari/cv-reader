import React, {Component} from 'react';
import axios from 'axios';
import _ from 'lodash';

import './Workflow.css';
import Dialog from '../dialog/Dialog';

class Workflow extends Component {

    constructor(props){
        super(props);
        this.state = {
            steps:[
                {step: 1, value: 'Process resume'},
                {step: 2, value: 'Interview 1st round'},
                {step: 3, value: 'Interview Face to Face'},
                {step: 4, value: 'Final decision state'}
            ],
            currentStep: props.currentStep || 'step1',
            data: [
                {candidateId: 1, name: 'Candidate 1', step: 'step1'},
                {candidateId: 2, name: 'Candidate 10', step: 'step2'},
                {candidateId: 3, name: 'Candidate 2', step: 'step3'},
                {candidateId: 4, name: 'Candidate 3', step: 'step4'},
                {candidateId: 5, name: 'Candidate 4', step: 'step1'},
                {candidateId: 6, name: 'Candidate 5', step: 'step2'},
                {candidateId: 7, name: 'Candidate 6', step: 'step3'},
                {candidateId: 8, name: 'Candidate 7', step: 'step4'},
                {candidateId: 9, name: 'Candidate 8', step: 'step1'},
                {candidateId: 10, name: 'Candidate 9', step: 'step2'}
            ],
            displayDialog: false
        }

        this.drag = this.drag.bind(this);
        this.drop = this.drop.bind(this);
        this.allowDrop = this.allowDrop.bind(this);
        this.closeDialog = this.closeDialog.bind(this);
        this.viewDetails = this.viewDetails.bind(this);
    }

    componentDidMount(){
        const jobid = this.props && 
            this.props.location && 
            this.props.location.state && 
            this.props.location.state.jobid ? this.props.location.state.jobid : '' ;

        axios.get('/api/steps')
            .then(response => {
                this.setState({steps: response.data});
            })
            .catch(error => {
                console.log(error);
            });

        if(jobid){
            axios.get('/api/candidate/'+ jobid)
            .then(response => {
                this.setState({data: response.data.data});
            })
            .catch((error) => {
                console.log(error);
            });
        }
    }

    viewDetails(){
        this.setState({displayDialog: true});
    }

    closeDialog(val){
        this.setState({displayDialog: false});
    }

    allowDrop(ev) {
        ev.preventDefault();
    }
    
    drag(ev, data) {
        ev.dataTransfer.setData('data', data.candidateId); 
        if(ev.target){
            ev.target.classList.add('dragging');
        }
    }
    
    drop(ev, targetStep) {
        const jobid = this.props && 
            this.props.location && 
            this.props.location.state && 
            this.props.location.state.jobid ? this.props.location.state.jobid : '' ;
        ev.preventDefault();
        var targetData = ev.dataTransfer.getData('data');
       
        let data = this.state.data;
        const newDataSet = data.map(curr => {
            if(curr.candidateId == targetData){
                curr.step = targetStep;
            }
            return curr;
        })[0];

        if(jobid && newDataSet){
            const config = {
                headers: { 'content-type': 'application/json' }
            }
            axios.post('/api/candidate/'+jobid, newDataSet, config)
            .then(response => {
                    let dataRemoved = _.filter(data, item => {
                        return item.candidateId !== newDataSet.candidateId;
                    });
                    dataRemoved.push(newDataSet);
                    this.setState({data: dataRemoved});
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        if(ev.target){
            ev.target.classList.remove('dragging');
        }
    }

    render(){
        if(this.state.data){
        return (
            <div>
                <div className="workflow">
                    {this.state.steps.map(curr=> {
                        return (
                            <div className="swimlane" key={curr.step} onDrop={(evt) => this.drop(evt, curr.step)} onDragOver={this.allowDrop}>
                                <div className="header">{curr.value}</div>
                                {this.state.data.map(data => {
                                    if(data.step === curr.step) {
                                    return  <div className="data" onClick={this.viewDetails} draggable="true" onDragStart={(evt) => this.drag(evt, data)}>{data.name}</div>;
                                    } else {
                                        return '';
                                    }
                                })}
                            </div>
                        )
                    })}
                </div>
                {this.state.displayDialog && <Dialog close={(val) => this.closeDialog(val)}/>}
            </div>
            )
        }else {
            <div></div>
        }

    }
}

export default Workflow;