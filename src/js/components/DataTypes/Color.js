import React from 'react';
import DataTypeLabel from './DataTypeLabel';
import highlightedString from './../../helpers/highlightedString';
import stringifyVariable from './../../helpers/stringifyVariable';
import ReactColorPicker from 'react-color';
import onClickOutside from 'react-onclickoutside';

//theme
import Theme from './../../themes/getStyle';

class JsonColor extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            showColorPicker: false,
            value: this.props.value,
            type: ''
        };
    }

    handleClickOutside = () => {
        if (this.state.showColorPicker) {
            this.toggleColorPicker();
        }
        this.props.onValueChange(this.state.value);
    }

    toggleColorPicker = () => {
        this.setState({
            showColorPicker: !this.state.showColorPicker
        });
    }

    hexToRGB = (hex, alpha) => {
        let r = parseInt(hex.slice(1, 3), 16);
        let g = parseInt(hex.slice(3, 5), 16);
        let b = parseInt(hex.slice(5, 7), 16);
        if (this.props.colorType === 'rgb') {
            return 'rgb(' + r + ', ' + g + ', ' + b + ')';
        }
        return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + alpha + ')';
    }

    handleColorPickerChange = (color, event) => {
        let { colorType } = this.props;
        if (colorType === 'hex') {
            this.setState({
                value: color.hex
            });
        } else if (colorType === 'rgba') {
            this.setState({
                value: this.hexToRGB(color.hex, color.rgb.a)
            });
        } else {
            this.setState({
                value: this.hexToRGB(color.hex, color.rgb.a)
            });
        }
    }

    renderColorPicker = () => {
        let { theme } = this.props;
        return (
            <span {...Theme(theme, 'color-picker')}>
                <ReactColorPicker onChangeComplete={this.handleColorPickerChange}/>
            </span>
        );
    }

    renderColorBox = () => {
        let { value } = this.state;
        return (
            <div
                className='color-picker-box'
                style={ { backgroundColor: value } }
                onClick={ this.toggleColorPicker }>
            </div>
        );
    }
    render() {
        const type_name = 'color';
        let { value } = this.state;
        let { search, theme } = this.props;
        const { showColorPicker } = this.state;
        const valueStr = stringifyVariable(value);
        const start = (valueStr).indexOf(search);
        if (start > -1) {
            value = highlightedString(valueStr, start, search.length, theme);
        }
        return (
            <div {...Theme(theme, 'color')}>
                <DataTypeLabel type_name={type_name} {...this.props} />
                <div {...Theme(theme, 'color-picker-row')}>
                    { value }
                    { this.renderColorBox() }
                </div>
                { showColorPicker ? this.renderColorPicker() : null }
            </div>
        );
    }
}

export default onClickOutside(JsonColor);