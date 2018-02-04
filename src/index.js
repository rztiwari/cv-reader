import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter as  Router, Route} from 'react-router-dom';

import {Home, FileUpload, FileDetails, Workflow} from './component';


ReactDOM.render(
    <Router>
        <div>
            <Home />
            <div className="content">
                <Route path="/details" component={FileDetails}/>
                <Route path="/main" component={FileUpload}/>
                <Route path="/workflow" component={Workflow}/>
            </div>
        </div>
    </Router>,
    document.getElementById('root'));
registerServiceWorker();
