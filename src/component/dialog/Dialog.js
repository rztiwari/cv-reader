import React, {Component} from 'react';
import _ from 'lodash';

import './Dialog.css';

class Dialog extends Component {

    constructor(props){
        super(props);

        debugger;

        this.state = {
            content:'This is testing content',
            header: 'Activity history',
            closable: true
        };

        this.close = this.close.bind(this);
    }

    close(){
        this.state = null;
        this.props.close(true);
    }

    render(){
        debugger;
        if(this.state){
            return(
                <div className="modal" ref="modalRef">
                    <div className="header">
                        <span className="headerContent">{this.state.header}</span>
                        {this.state.closable === true && <span className="close" onClick={this.close}>X</span>}
                    </div>
                    <div className="body">{this.state.content}</div>
                </div>
            );
        }else{
            return '';
        }
    }

}

export default Dialog;