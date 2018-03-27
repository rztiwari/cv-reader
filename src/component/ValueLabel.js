import React from 'react';
import _ from 'lodash';
import { Row, Col } from 'antd';

import './ValueLabel.css';

const ValueLabel = (props) => {
    const id = _.uniqueId('labelValue_');
    return (
        <div className="form">
            {/* <label htmlFor={id}>{props.label}</label>
            <div className="value" id={id}>{props.value}</div> */}
            <Row type="flex">
                <Col span={6}><label htmlFor={id}>{props.label}</label></Col>
                <Col span={18} order={3}><span id={id}>{props.value}</span></Col>
            </Row>
        </div>
    );
}

export default ValueLabel;