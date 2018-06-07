import React from 'react';
import ReactJsonDemo from './components/Demo';

//index entrypoint component
export default class extends React.PureComponent {

    render() {
        const {...props} = this.state;
        return (<div class="mac-react" >
            <ReactJsonDemo />
        </div>);
    }

}
