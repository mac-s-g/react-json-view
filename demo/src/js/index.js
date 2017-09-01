import React from 'react';
import ReactJsonDemo from './components/ReactJsonView/Demo';

//index entrypoint component
export default class extends React.Component {

    constructor(props) {
        super(props);
        this.init(props);
    }

    state = {}

    defaults = {}

    init = (props) => {
        for (let i in this.defaults) {
            if (props[i] !== undefined) {
                this.state[i] = props[i];
            } else {
                this.state[i] = this.defaults[i];
            }
        }
    }

    render() {
        const {...props} = this.state;
        return (<div class="mac-react" >
            <ReactJsonDemo />
        </div>);
    }

    componentWillReceiveProps(nextProps) {
        this.init(nextProps);
        this.setState(this.state);
    }

}
