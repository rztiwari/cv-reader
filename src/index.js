import React from 'react';
import ReactDOM from 'react-dom';
import { Row, Col } from 'antd';
import {BrowserRouter as  Router, Route} from 'react-router-dom';
import 'antd/dist/antd.css';

import './index.css';
import registerServiceWorker from './registerServiceWorker';

import {Home, FileUpload, FileDetails, Workflow} from './component';


ReactDOM.render(
    <Router>
        <div>
            <Home />
            <Row>
                <Col span={4}></Col>
                <Col span={16}>
                    <div className="content">
                        <Route path="/details" component={FileDetails}/>
                        <Route path="/main" component={FileUpload}/>
                        <Route path="/workflow" component={Workflow}/>
                    </div>
                </Col>
                <Col span={4}></Col>
            </Row>
        </div>
    </Router>,
    document.getElementById('root'));
registerServiceWorker();
