import React from 'react';

const DEFAULT_WIDTH = 24;
const DEFAULT_HEIGHT = 24;
const DEFAULT_COLOR = '#000000';

export class CircleMinus extends React.PureComponent {
    render() {
        const {props} = this;
        const {style, ...rest} = props;

        return (
            <span {...rest}>
                <svg {...getIconStyle(style)}
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    preserveAspectRatio="xMidYMid meet"
                >
                    <path d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M7,13H17V11H7" />
                </svg>
            </span>
        );
    }
}

export class CirclePlus extends React.PureComponent {
    render() {
        const {props} = this;
        const {style, ...rest} = props;

        return (
            <span {...rest}>
                <svg {...getIconStyle(style)}
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    preserveAspectRatio="xMidYMid meet"
                >
                    <path d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M13,7H11V11H7V13H11V17H13V13H17V11H13V7Z" />
                </svg>
            </span>
        );
    }
}

export class SquareMinus extends React.PureComponent {
    render() {
        const {props} = this;
        const {style, ...rest} = props;
        const svgStyle = getIconStyle(style).style;

        return (
            <span {...rest}>
                <svg fill={svgStyle.color}
                    width={svgStyle.height} height={svgStyle.width}
                    style={svgStyle}
                    viewBox="0 0 1792 1792">
                    <path d="M1344 800v64q0 14-9 23t-23 9h-832q-14 0-23-9t-9-23v-64q0-14 9-23t23-9h832q14 0 23 9t9 23zm128 448v-832q0-66-47-113t-113-47h-832q-66 0-113 47t-47 113v832q0 66 47 113t113 47h832q66 0 113-47t47-113zm128-832v832q0 119-84.5 203.5t-203.5 84.5h-832q-119 0-203.5-84.5t-84.5-203.5v-832q0-119 84.5-203.5t203.5-84.5h832q119 0 203.5 84.5t84.5 203.5z"/>
                </svg>
            </span>
        );
    }
}

export class SquarePlus extends React.PureComponent {
    render() {
        const {props} = this;
        const {style, ...rest} = props;
        const svgStyle = getIconStyle(style).style;

        return (
            <span {...rest}>
                <svg fill={svgStyle.color}
                    width={svgStyle.height} height={svgStyle.width}
                    style={svgStyle}
                    viewBox="0 0 1792 1792">
                    <path d="M1344 800v64q0 14-9 23t-23 9h-352v352q0 14-9 23t-23 9h-64q-14 0-23-9t-9-23v-352h-352q-14 0-23-9t-9-23v-64q0-14 9-23t23-9h352v-352q0-14 9-23t23-9h64q14 0 23 9t9 23v352h352q14 0 23 9t9 23zm128 448v-832q0-66-47-113t-113-47h-832q-66 0-113 47t-47 113v832q0 66 47 113t113 47h832q66 0 113-47t47-113zm128-832v832q0 119-84.5 203.5t-203.5 84.5h-832q-119 0-203.5-84.5t-84.5-203.5v-832q0-119 84.5-203.5t203.5-84.5h832q119 0 203.5 84.5t84.5 203.5z"/>
                </svg>
            </span>
        );
    }
}

export class ArrowRight extends React.PureComponent {
    render() {
        const {props} = this;
        const {style, ...rest} = props;

        return (
            <span {...rest}>
                <svg
                    style={{...getIconStyle(style).style, paddingLeft: '2px', verticalAlign: 'top'}}
                    viewBox="0 0 15 15"
                    fill="currentColor"
                >
                    <path d="M0 14l6-6-6-6z"></path>
                </svg>
            </span>
        );
    }
}

export class ArrowDown extends React.PureComponent {
    render() {
        const {props} = this;
        const {style, ...rest} = props;

        return (
            <span {...rest}>
                <svg
                    style={{...getIconStyle(style).style, paddingLeft: '2px', verticalAlign: 'top'}}
                    viewBox="0 0 15 15"
                    fill="currentColor"
                >
                    <path d="M0 5l6 6 6-6z"></path>
                </svg>
            </span>
        );
    }
}

export class Clippy extends React.PureComponent {
    render() {
        const {props} = this;
        const {style, ...rest} = props;

        return (
            <span {...rest}>
                <svg {...getIconStyle(style)}
                    viewBox="0 0 40 40"
                    fill="currentColor"
                    preserveAspectRatio="xMidYMid meet"
                >
                    <g>
                        <path d="m30 35h-25v-22.5h25v7.5h2.5v-12.5c0-1.4-1.1-2.5-2.5-2.5h-7.5c0-2.8-2.2-5-5-5s-5 2.2-5 5h-7.5c-1.4 0-2.5 1.1-2.5 2.5v27.5c0 1.4 1.1 2.5 2.5 2.5h25c1.4 0 2.5-1.1 2.5-2.5v-5h-2.5v5z m-20-27.5h2.5s2.5-1.1 2.5-2.5 1.1-2.5 2.5-2.5 2.5 1.1 2.5 2.5 1.3 2.5 2.5 2.5h2.5s2.5 1.1 2.5 2.5h-20c0-1.5 1.1-2.5 2.5-2.5z m-2.5 20h5v-2.5h-5v2.5z m17.5-5v-5l-10 7.5 10 7.5v-5h12.5v-5h-12.5z m-17.5 10h7.5v-2.5h-7.5v2.5z m12.5-17.5h-12.5v2.5h12.5v-2.5z m-7.5 5h-5v2.5h5v-2.5z" />
                    </g>
                </svg>
            </span>
        );
    }
}

export class RemoveCircle extends React.PureComponent {
    render() {
        const {props} = this;
        const {style, ...rest} = props;

        return (
            <span {...rest}>
                <svg {...getIconStyle(style)}
                    viewBox="0 0 40 40"
                    fill="currentColor"
                    preserveAspectRatio="xMidYMid meet"
                >
                    <g>
                        <path d="m28.6 25q0-0.5-0.4-1l-4-4 4-4q0.4-0.5 0.4-1 0-0.6-0.4-1.1l-2-2q-0.4-0.4-1-0.4-0.6 0-1 0.4l-4.1 4.1-4-4.1q-0.4-0.4-1-0.4-0.6 0-1 0.4l-2 2q-0.5 0.5-0.5 1.1 0 0.5 0.5 1l4 4-4 4q-0.5 0.5-0.5 1 0 0.7 0.5 1.1l2 2q0.4 0.4 1 0.4 0.6 0 1-0.4l4-4.1 4.1 4.1q0.4 0.4 1 0.4 0.6 0 1-0.4l2-2q0.4-0.4 0.4-1z m8.7-5q0 4.7-2.3 8.6t-6.3 6.2-8.6 2.3-8.6-2.3-6.2-6.2-2.3-8.6 2.3-8.6 6.2-6.2 8.6-2.3 8.6 2.3 6.3 6.2 2.3 8.6z" />
                    </g>
                </svg>
            </span>
        );
    }
}

export class Bin extends React.PureComponent {
    render() {
        const {props} = this;
        const {style, ...rest} = props;

        return (
            <span {...rest}>
                <svg {...getIconStyle(style)}
                    viewBox="0 0 438.529 438.529"
                    fill="currentColor"
                    preserveAspectRatio="xMidYMid meet"
                >
                    <g>
                        <path d="M417.689,75.654c-1.711-1.709-3.901-2.568-6.563-2.568h-88.224L302.917,25.41c-2.854-7.044-7.994-13.04-15.413-17.989
                            C280.078,2.473,272.556,0,264.945,0h-91.363c-7.611,0-15.131,2.473-22.554,7.421c-7.424,4.949-12.563,10.944-15.419,17.989
                            l-19.985,47.676h-88.22c-2.667,0-4.853,0.859-6.567,2.568c-1.709,1.713-2.568,3.903-2.568,6.567v18.274
                            c0,2.664,0.855,4.854,2.568,6.564c1.714,1.712,3.904,2.568,6.567,2.568h27.406v271.8c0,15.803,4.473,29.266,13.418,40.398
                            c8.947,11.139,19.701,16.703,32.264,16.703h237.542c12.566,0,23.319-5.756,32.265-17.268c8.945-11.52,13.415-25.174,13.415-40.971
                            V109.627h27.411c2.662,0,4.853-0.856,6.563-2.568c1.708-1.709,2.57-3.9,2.57-6.564V82.221
                            C420.26,79.557,419.397,77.367,417.689,75.654z M169.301,39.678c1.331-1.712,2.95-2.762,4.853-3.14h90.504
                            c1.903,0.381,3.525,1.43,4.854,3.14l13.709,33.404H155.311L169.301,39.678z M347.173,380.291c0,4.186-0.664,8.042-1.999,11.561
                            c-1.334,3.518-2.717,6.088-4.141,7.706c-1.431,1.622-2.423,2.427-2.998,2.427H100.493c-0.571,0-1.565-0.805-2.996-2.427
                            c-1.429-1.618-2.81-4.188-4.143-7.706c-1.331-3.519-1.997-7.379-1.997-11.561V109.627h255.815V380.291z"/>
                        <path d="M137.04,347.172h18.271c2.667,0,4.858-0.855,6.567-2.567c1.709-1.718,2.568-3.901,2.568-6.57V173.581
                            c0-2.663-0.859-4.853-2.568-6.567c-1.714-1.709-3.899-2.565-6.567-2.565H137.04c-2.667,0-4.854,0.855-6.567,2.565
                            c-1.711,1.714-2.568,3.904-2.568,6.567v164.454c0,2.669,0.854,4.853,2.568,6.57C132.186,346.316,134.373,347.172,137.04,347.172z"
                            />
                        <path d="M210.129,347.172h18.271c2.666,0,4.856-0.855,6.564-2.567c1.718-1.718,2.569-3.901,2.569-6.57V173.581
                            c0-2.663-0.852-4.853-2.569-6.567c-1.708-1.709-3.898-2.565-6.564-2.565h-18.271c-2.664,0-4.854,0.855-6.567,2.565
                            c-1.714,1.714-2.568,3.904-2.568,6.567v164.454c0,2.669,0.854,4.853,2.568,6.57C205.274,346.316,207.465,347.172,210.129,347.172z
                            "/>
                        <path d="M283.22,347.172h18.268c2.669,0,4.859-0.855,6.57-2.567c1.711-1.718,2.562-3.901,2.562-6.57V173.581
                            c0-2.663-0.852-4.853-2.562-6.567c-1.711-1.709-3.901-2.565-6.57-2.565H283.22c-2.67,0-4.853,0.855-6.571,2.565
                            c-1.711,1.714-2.566,3.904-2.566,6.567v164.454c0,2.669,0.855,4.853,2.566,6.57C278.367,346.316,280.55,347.172,283.22,347.172z"
                            />
                    </g>
                </svg>
            </span>
        );
    }
}

export class AddCircle extends React.PureComponent {
    render() {
        const {props} = this;
        const {style, ...rest} = props;

        return (
            <span {...rest}>
                <svg {...getIconStyle(style)}
                    viewBox="0 0 40 40"
                    fill="currentColor"
                    preserveAspectRatio="xMidYMid meet"
                >
                    <g>
                        <path d="m30.1 21.4v-2.8q0-0.6-0.4-1t-1-0.5h-5.7v-5.7q0-0.6-0.4-1t-1-0.4h-2.9q-0.6 0-1 0.4t-0.4 1v5.7h-5.7q-0.6 0-1 0.5t-0.5 1v2.8q0 0.6 0.5 1t1 0.5h5.7v5.7q0 0.5 0.4 1t1 0.4h2.9q0.6 0 1-0.4t0.4-1v-5.7h5.7q0.6 0 1-0.5t0.4-1z m7.2-1.4q0 4.7-2.3 8.6t-6.3 6.2-8.6 2.3-8.6-2.3-6.2-6.2-2.3-8.6 2.3-8.6 6.2-6.2 8.6-2.3 8.6 2.3 6.3 6.2 2.3 8.6z" />
                    </g>
                </svg>
            </span>
        );
    }
}

export class Add extends React.PureComponent {
    render() {
        const {props} = this;
        const {style, ...rest} = props;

        return (
            <span {...rest}>
                <svg {...getIconStyle(style)}
                    viewBox="0 0 40 40"
                    fill="currentColor"
                    preserveAspectRatio="xMidYMid meet"
                >
                    <g>
                        <path d="m31.6 21.6h-10v10h-3.2v-10h-10v-3.2h10v-10h3.2v10h10v3.2z" />
                    </g>
                </svg>
            </span>
        );
    }
}

export class Edit extends React.PureComponent {
    render() {
        const {props} = this;
        const {style, ...rest} = props;

        return (
            <span {...rest}>
                <svg {...getIconStyle(style)}
                    viewBox="0 0 40 40"
                    fill="currentColor"
                    preserveAspectRatio="xMidYMid meet"
                >
                    <g>
                        <path d="m19.8 26.4l2.6-2.6-3.4-3.4-2.6 2.6v1.3h2.2v2.1h1.2z m9.8-16q-0.3-0.4-0.7 0l-7.8 7.8q-0.4 0.4 0 0.7t0.7 0l7.8-7.8q0.4-0.4 0-0.7z m1.8 13.2v4.3q0 2.6-1.9 4.5t-4.5 1.9h-18.6q-2.6 0-4.5-1.9t-1.9-4.5v-18.6q0-2.7 1.9-4.6t4.5-1.8h18.6q1.4 0 2.6 0.5 0.3 0.2 0.4 0.5 0.1 0.4-0.2 0.7l-1.1 1.1q-0.3 0.3-0.7 0.1-0.5-0.1-1-0.1h-18.6q-1.4 0-2.5 1.1t-1 2.5v18.6q0 1.4 1 2.5t2.5 1h18.6q1.5 0 2.5-1t1.1-2.5v-2.9q0-0.2 0.2-0.4l1.4-1.5q0.3-0.3 0.8-0.1t0.4 0.6z m-2.1-16.5l6.4 6.5-15 15h-6.4v-6.5z m9.9 3l-2.1 2-6.4-6.4 2.1-2q0.6-0.7 1.5-0.7t1.5 0.7l3.4 3.4q0.6 0.6 0.6 1.5t-0.6 1.5z" />
                    </g>
                </svg>
            </span>
        );
    }
}

export class CheckCircle extends React.PureComponent {
    render() {
        const {props} = this;
        const {style, ...rest} = props;

        return (
            <span {...rest}>
                <svg {...getIconStyle(style)}
                    viewBox="0 0 40 40"
                    fill="currentColor"
                    preserveAspectRatio="xMidYMid meet"
                >
                    <g>
                        <path d="m31.7 16.4q0-0.6-0.4-1l-2.1-2.1q-0.4-0.4-1-0.4t-1 0.4l-9.1 9.1-5-5q-0.5-0.4-1-0.4t-1 0.4l-2.1 2q-0.4 0.4-0.4 1 0 0.6 0.4 1l8.1 8.1q0.4 0.4 1 0.4 0.6 0 1-0.4l12.2-12.1q0.4-0.4 0.4-1z m5.6 3.6q0 4.7-2.3 8.6t-6.3 6.2-8.6 2.3-8.6-2.3-6.2-6.2-2.3-8.6 2.3-8.6 6.2-6.2 8.6-2.3 8.6 2.3 6.3 6.2 2.3 8.6z" />
                    </g>
                </svg>
            </span>
        );
    }
}


function getIconStyle(style) {
    if (!style) {
        style = {};
    }
    return {style:{
        verticalAlign: 'middle',
        ...style,
        color: style.color ? style.color : DEFAULT_COLOR,
        height: '1em',
        width: '1em'
    }};
}
