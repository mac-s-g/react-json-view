import React from 'react';

//clibboard icon
import Clippy from 'react-icons/lib/go/clippy';
//style specifically for this component
require('./../../style/variable_meta.scss');
//clipboard library
//https://www.npmjs.com/package/clipboard
import Clipboard from 'clipboard';
import ReactTooltip from 'react-tooltip';


export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state.id = Date.now().toString();
    }

    state = {
        id: null,
        clipboard: null,
        copy_state: null
    }

    componentDidMount = () => {
        const {id} = this.state;
        const {src} = this.props;
        let clipboard_container = document.getElementById(
            'clipboard-container-' + id
        );
        this.state.clipboard = new Clipboard(
            clipboard_container
        );

        this.state.clipboard.on('success', (e) => {
            this.setState({copy_state: 'success'});
        });

        this.state.clipboard.on('error', (e) => {
            this.setState({copy_state: 'error'});
        });

        this.state.copy_state = null;
    }

    componentWillUnmount = () => {
        this.state.clipboard && this.state.clipboard.destroy();
    }

    getCopyComponent(src, id, tooltip_id, copy_state) {
        //had to jump through some hoops to get the
        //react-tooltip to act like a react component should.
        //it does not support dynamic content updates
        return (
            <div>
                <div
                style={{display:copy_state=='success' ? 'none' : 'inline-block'}}
                data-clipboard-text={JSON.stringify(src)}
                id={"clipboard-container-" + id}
                class="copy-to-clipboard"
                data-tip='copy to clipboard'
                data-for={tooltip_id} >
                    <Clippy />
                    <ReactTooltip
                    effect="solid"
                    class="rjv-tooltip"
                    id={tooltip_id}
                    place="right"
                    delayShow={1000} >
                        copy to clipboard
                    </ReactTooltip>
                </div>
                <div
                style={{display:copy_state=='success' ? 'inline-block' : 'none'}}
                class="copy-to-clipboard"
                data-tip='copied'
                data-for={tooltip_id + '-success'} >
                    <Clippy />
                    <ReactTooltip
                    effect="solid"
                    class="rjv-tooltip"
                    id={tooltip_id + '-success'}
                    place="right"
                    afterHide={()=>{
                        this.setState({copy_state: null});
                    }}
                    delayShow={0} >
                        copied
                    </ReactTooltip>
                </div>
            </div>
        );
    }

    render = () => {
        const {id, copy_state} = this.state;
        const {src, size} = this.props;
        const tooltip_id = 'tooltip-' + id;

        return (
        <div class="object-meta-data" onClick={(e)=>{
            e.stopPropagation();
        }}>
            {/* size badge display */}
            <span class="object-size">
                {size} item{size > 1 ? 's' : ''}
            </span>
            {/* copy to clipboard icon */}
            {this.getCopyComponent(
                src, id, tooltip_id, copy_state
            )}
        </div>
        );
    }

}