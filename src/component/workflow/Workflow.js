import React, {Component} from 'react';
import './Workflow.css';
import Dialog from '../dialog/Dialog';

class Workflow extends Component {

    constructor(props){
        super(props);
        this.state = {
            steps:[
                {step: 'step1', value: 'Process resume'},
                {step: 'step2', value: 'Interview 1st round'},
                {step: 'step3', value: 'Interview Face to Face'},
                {step: 'step4', value: 'Final decision state'}
            ],
            currentStep: props.currentStep || 'step1',
            data: [
                {candidateId: 1, candidateName: 'Candidate 1', step: 'step1'},
                {candidateId: 2, candidateName: 'Candidate 10', step: 'step2'},
                {candidateId: 3, candidateName: 'Candidate 2', step: 'step3'},
                {candidateId: 4, candidateName: 'Candidate 3', step: 'step4'},
                {candidateId: 5, candidateName: 'Candidate 4', step: 'step1'},
                {candidateId: 6, candidateName: 'Candidate 5', step: 'step2'},
                {candidateId: 7, candidateName: 'Candidate 6', step: 'step3'},
                {candidateId: 8, candidateName: 'Candidate 7', step: 'step4'},
                {candidateId: 9, candidateName: 'Candidate 8', step: 'step1'},
                {candidateId: 10, candidateName: 'Candidate 9', step: 'step2'}
            ],
            displayDialog: false
        }

        this.drag = this.drag.bind(this);
        this.drop = this.drop.bind(this);
        this.allowDrop = this.allowDrop.bind(this);
        this.closeDialog = this.closeDialog.bind(this);
        this.viewDetails = this.viewDetails.bind(this);
    }

    viewDetails(){
        debugger;
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
        ev.preventDefault();
        var targetData = ev.dataTransfer.getData('data');
        const data = this.state.data;
        const newDataSet = data.map(curr => {
            if(curr.candidateId == targetData){
                curr.step = targetStep;
            }
            return curr;
        });

        this.setState({data: newDataSet});
        if(ev.target){
            ev.target.classList.remove('dragging');
        }
    }

    render(){
        return (
            <div>
                <div className="workflow">
                    {this.state.steps.map(curr=> {
                        return (
                            <div className="swimlane" key={curr.step} onDrop={(evt) => this.drop(evt, curr.step)} onDragOver={this.allowDrop}>
                                <div className="header">{curr.value}</div>
                                {this.state.data.map(data => {
                                    if(data.step === curr.step) {
                                    return  <div className="data" onClick={this.viewDetails} draggable="true" onDragStart={(evt) => this.drag(evt, data)}>{data.candidateName}</div>;
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

    }
}

export default Workflow;