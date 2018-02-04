import React from 'react';
import _ from 'lodash';
import './ValueLabel.css';

const ValueLabel = (props) => {
    const id = _.uniqueId('labelValue_');
    return (
        <div className="form">
            <label htmlFor={id}>{props.label}</label>
            <div className="value" id={id}>{props.value}</div>
        </div>
    );
}

export default ValueLabel;