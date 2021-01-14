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

    findColor = (color) => {
        const { colorType } = this.props;
        let r = color.rgb.r;
        let g = color.rgb.g;
        let b = color.rgb.b;
        let alpha = color.rgb.a;
        if (colorType === 'hex') {
            return color.hex;
        }
        else if (colorType === 'rgb') {
            return 'rgb(' + r + ', ' + g + ', ' + b + ')';
        }
        return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + alpha + ')';
    }

    handleColorPickerChange = (color, event) => {
        this.setState({
            value: this.findColor(color)
        });
    }

    renderColorPicker = () => {
        let { theme, value, colorType } = this.props;
        if (colorType === 'rgb') {
            value = 'rgba' + value.slice(3, value.length - 1) + ', 0)';
        }
        return (
            <span {...Theme(theme, 'color-picker')}>
                <ReactColorPicker
                    color={ value }
                    onChangeComplete={ this.handleColorPickerChange }/>
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
        let { value, showColorPicker } = this.state;
        let { search, theme } = this.props;
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
                { showColorPicker && this.renderColorPicker() }
            </div>
        );
    }
}

export default onClickOutside(JsonColor);