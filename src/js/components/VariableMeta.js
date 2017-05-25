import React from 'react';

//clibboard icon
import Clippy from 'react-icons/lib/go/clippy';
//clipboard library
//https://www.npmjs.com/package/clipboard
import Clipboard from 'clipboard';
import ReactTooltip from 'react-tooltip';

//theme
import Theme from './../themes/getStyle';


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

        //cant figure out why document.getElementById
        //is not working for tests
        if (clipboard_container) {
            this.state.clipboard = new Clipboard(
                clipboard_container
            );

            this.state.clipboard.on('success', (e) => {
                this.setState({copy_state: 'success'});
            });

            this.state.clipboard.on('error', (e) => {
                this.setState({copy_state: 'error'});
            });
        }

        this.state.copy_state = null;
    }

    componentWillUnmount = () => {
        this.state.clipboard && this.state.clipboard.destroy();
    }

    getCopyComponent = () => {
        const {id, copy_state} = this.state;
        const {src, size, hover, theme, enableClipboard} = this.props;
        const tooltip_id = 'tooltip-' + id;
        //had to jump through some hoops to get the
        //react-tooltip to act like a react component should.
        //it does not support dynamic content updates
        let style = Theme(theme, 'copy-to-clipboard').style;
        return (
            <span
            class="copy-to-clipboard-container"
            style={{
                display: enableClipboard && hover? 'inline-block' : 'none'
            }}>
                <span
                style={{
                    ...style,
                    display:copy_state=='success' ? 'none' : 'inline-block'
                }}
                data-clipboard-text={JSON.stringify(src)}
                id={"clipboard-container-" + id}
                data-tip='copy to clipboard'
                data-for={tooltip_id} >
                    <Clippy {...Theme(theme, 'copy-icon')} />
                    <ReactTooltip
                    effect="solid"
                    class="rjv-tooltip"
                    id={tooltip_id}
                    place="right"
                    delayShow={1000} />
                </span>
                <span
                style={{
                    ...style,
                    display:copy_state == 'success' && hover
                    ? 'inline-block' : 'none'
                }}
                data-tip='copied'
                data-for={tooltip_id + '-success'} >
                    <Clippy {...Theme(theme, 'copy-icon')} />
                    <ReactTooltip
                    effect="solid"
                    class="rjv-tooltip"
                    id={tooltip_id + '-success'}
                    place="right"
                    afterHide={()=>{
                        this.setState({copy_state: null});
                    }}
                    delayShow={0} />
                </span>
            </span>
        );
    }

    getObjectSize = () => {
        const {size, theme, displayObjectSize} = this.props;
        if (displayObjectSize) {
            return (
                <span class="object-size"
                {...Theme(theme, 'object-size')}>
                    {size} item{size == 1 ? '' : 's'}
                </span>
            );
        }
    }

    render = () => {
        const {theme} = this.props;
        return (
        <div {...Theme(theme, 'object-meta-data')}
        class='object-meta-data'
        onClick={(e)=>{
            e.stopPropagation();
        }}>
            {/* size badge display */}
            {this.getObjectSize()}
            {/* copy to clipboard icon */}
            {this.getCopyComponent()}
        </div>
        );
    }

}