import React from 'react';
import ReactJsonDemo from './components/Demo';

//index entrypoint component
export default class extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {...props} = this.state;
        return (<div class="mac-react" >
            <ReactJsonDemo />
        </div>);
    }

}
