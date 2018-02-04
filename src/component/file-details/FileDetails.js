import React, {Component} from 'react';
import { Link } from 'react-router-dom';

import ValueLabel from '../ValueLabel';
import './FileDetails.css'


class FileDetails extends Component {
    
    render(){
        let data = this.props && this.props.location ? this.props.location.state: '';
        if(data){
            return (
                <div className="form">
                    {data.name && <ValueLabel value={data.name} label="Name of the candidate:" />}
                    {data.jobid && <ValueLabel value={data.jobid} label="Job id:" />}
                    {data.client && <ValueLabel value={data.client} label="Client for:" />}
                    {data.role && <ValueLabel value={data.role} label="Role for:" />}
                    {data.skillsTag && <ValueLabel value={data.skillsTag} label="Tagged Skills from Resume:" />}
                    <div>
                        <Link to="/workflow">Go to workflow</Link>
                    </div>
                </div>
            );
        }else{
            return <div/>
        }
    }
   
}

export default FileDetails;