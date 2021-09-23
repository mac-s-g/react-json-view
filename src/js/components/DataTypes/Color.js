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
            type: ''
        };
    }

    handleClickOutside = () => {
        if (this.state.showColorPicker) {
            this.toggleColorPicker();
        }
    };

    toggleColorPicker = () => {
        const { showColorPicker } = this.state;
        this.props.isOneColorPickerOpen(showColorPicker);
        this.setState({
            showColorPicker: !showColorPicker
        });
    };

    findColor = color => {
        const { colorType } = this.props;
        let r = color.rgb.r;
        let g = color.rgb.g;
        let b = color.rgb.b;
        let alpha = color.rgb.a;
        let h = Math.round(color.hsl.h);
        let s = Math.round(color.hsl.s * 100);
        let l = Math.round(color.hsl.l * 100);
        let a = color.hsl.a;
        if (colorType === 'rgb') {
            return `rgb(${r}, ${g}, ${b})`;
        } else if (colorType === 'rgba') {
            return `rgba(${r}, ${g}, ${b}, ${alpha})`;
        } else if (colorType === 'hsl') {
            return `hsl(${h}, ${s}%, ${l}%)`;
        } else if (colorType === 'hsla') {
            return `hsla(${h}, ${s}%, ${l}%, ${a})`;
        }
        return color.hex;
    };

    handleColorPickerChange = (color, event) => {
        this.props.handleChange({
            newColorValue: this.findColor(color)
        });
    };

    renderColorPicker = () => {
        const { theme, colorType, value } = this.props;
        let view = 'hex';
        if (colorType === 'rgb' || colorType === 'rgba') {
            view = 'rgb';
        } else if (colorType === 'hsl' || colorType === 'hsla') {
            view = 'hsl';
        }
        return (
            <span {...Theme(theme, 'color-picker')}>
                <ReactColorPicker
                    color={value}
                    defaultView={view}
                    onChangeComplete={this.handleColorPickerChange}
                />
            </span>
        );
    };

    renderColorBox = () => {
        let { value } = this.props;
        return (
            <div
                className="color-picker-box"
                style={{ backgroundColor: value }}
                onClick={this.toggleColorPicker}
            ></div>
        );
    };

    render() {
        const type_name = 'color';
        let { showColorPicker } = this.state;
        let { search, theme, value } = this.props;
        const valueStr = stringifyVariable(value);
        const start = valueStr.indexOf(search);
        if (start > -1) {
            value = highlightedString(valueStr, start, search.length, theme);
        }
        return (
            <div {...Theme(theme, 'color')}>
                <DataTypeLabel type_name={type_name} {...this.props} />
                <div {...Theme(theme, 'color-picker-row')}>
                    {value}
                    {this.renderColorBox()}
                </div>
                {showColorPicker && this.renderColorPicker()}
            </div>
        );
    }
}

export default onClickOutside(JsonColor);
