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
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    preserveAspectRatio="xMidYMid meet"
                >
                    <g>
                        <path d="M19,3H14.82C14.25,1.44 12.53,0.64 11,1.2C10.14,1.5 9.5,2.16 9.18,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M12,3A1,1 0 0,1 13,4A1,1 0 0,1 12,5A1,1 0 0,1 11,4A1,1 0 0,1 12,3M7,7H17V5H19V19H5V5H7V7M17,11H7V9H17V11M15,15H7V13H15V15Z" />
                    </g>
                </svg>
            </span>
        );
    }
}

export class Paste extends React.PureComponent {
    render() {
        const {props} = this;
        const {style, ...rest} = props;
        return (
            <span {...rest}>
                <svg {...getIconStyle(style)}
                    viewBox="0 0 502 502"
                    fill="currentColor"
                    preserveAspectRatio="xMidYMid meet"
                >
                    <g>
                        <path d="M467.35,190.176l-70.468-70.468c-1.876-1.875-4.419-2.929-7.071-2.929h-23.089V49c0-5.523-4.478-10-10-10h-115v-2.41
                c0-20.176-16.414-36.59-36.59-36.59h-11.819c-20.176,0-36.591,16.415-36.591,36.59V39h-115c-5.522,0-10,4.477-10,10v386
                c0,5.523,4.478,10,10,10h146.386v47c0,5.523,4.478,10,10,10h262.171c5.522,0,10-4.477,10-10V197.247
                C470.279,194.595,469.225,192.051,467.35,190.176z M399.811,150.921l36.326,36.326h-36.326V150.921z M144.721,59h47
                c5.522,0,10-4.477,10-10s-4.478-10-10-10h-15v-2.41c0-9.148,7.442-16.59,16.591-16.59h11.819c9.147,0,16.59,7.442,16.59,16.59V49
                c0,5.523,4.478,10,10,10h22v20h-109V59z M198.107,116.779c-5.522,0-10,4.477-10,10V425H51.721V59h73v30c0,5.523,4.478,10,10,10
                h129c5.522,0,10-4.477,10-10V59h73v57.779H198.107z M450.278,482H208.107V136.779H379.81v60.468c0,5.523,4.478,10,10,10h60.468
                V482z"/>
                        <path d="M243.949,253.468h125.402c5.522,0,10-4.477,10-10c0-5.523-4.478-10-10-10H243.949c-5.522,0-10,4.477-10,10
                C233.949,248.991,238.427,253.468,243.949,253.468z"/>
                        <path d="M414.437,283.478H243.949c-5.522,0-10,4.477-10,10s4.478,10,10,10h170.487c5.522,0,10-4.477,10-10
                S419.959,283.478,414.437,283.478z"/>
                        <path d="M414.437,333.487H243.949c-5.522,0-10,4.477-10,10s4.478,10,10,10h170.487c5.522,0,10-4.477,10-10
                S419.959,333.487,414.437,333.487z"/>
                        <path d="M414.437,383.497H243.949c-5.522,0-10,4.477-10,10s4.478,10,10,10h170.487c5.522,0,10-4.477,10-10
                S419.959,383.497,414.437,383.497z"/>
                        <path d="M397.767,253.468h16.67c5.522,0,10-4.477,10-10c0-5.523-4.478-10-10-10h-16.67c-5.522,0-10,4.477-10,10
                C387.767,248.991,392.245,253.468,397.767,253.468z"/>
                    </g>
                </svg>
            </span>
        );
    }
}

export class Cut extends React.PureComponent {
    render() {
        const {props} = this;
        const {style, ...rest} = props;
        
        return (
            <span>
                <svg {...getIconStyle(style)}
                    viewBox="0 0 309.694 309.694"
                    fill="currentColor"
                    preserveAspectRatio="xMidYMid meet"
                >
                    <g>
                        <path d="M169.941,182.463l125.645,40.038c1.703,0.543,3.566,0.102,4.846-1.145c1.28-1.248,1.767-3.1,1.268-4.816
		c-5.93-20.375-21.613-36.46-41.832-42.903l-103.221-32.893l-8.899-27.925c0.832-0.193,1.656-0.416,2.472-0.676
		c20.449-6.517,30.154-31.434,22.095-56.726c-7.803-24.488-30.171-40.075-50.842-33.485c-19.629,6.254-30.345,30.837-22.096,56.728
		c0.017,0.052,0.035,0.102,0.052,0.153l15.499,48.637l-48.583-15.481c-0.069-0.022-0.137-0.048-0.206-0.07
		c-24.616-7.844-50.126,1.376-56.729,22.097c-6.516,20.449,8.193,42.781,33.485,50.841c24.63,7.848,50.126-1.384,56.727-22.095
		c0.262-0.821,0.477-1.646,0.671-2.472l27.929,8.899l22.001,69.042h37.483L169.941,182.463z M76.755,155.453
		c-2.157,6.771-14.017,10.517-26.572,6.515c-13.105-4.176-19.955-14.255-17.905-20.688c2.154-6.763,14.004-10.52,26.574-6.516
		C71.957,138.94,78.805,149.019,76.755,155.453z M128.76,44.799c6.577-2.101,16.574,4.996,20.688,17.905
		c4.176,13.104-0.082,24.521-6.515,26.571c-6.595,2.106-16.585-5.024-20.688-17.903C118.267,58.891,121.972,46.962,128.76,44.799z
		 M151.869,164.391c-3.945,3.945-10.343,3.945-14.288,0c-3.946-3.946-3.946-10.343,0-14.289c3.945-3.945,10.343-3.945,14.288,0
		C155.816,154.048,155.816,160.444,151.869,164.391z"/>
                        <path d="M56.5,264.278H19.904H12.5c-6.903,0-12.5,5.597-12.5,12.5c0,6.903,5.597,12.5,12.5,12.5h7.404H56.5
		c6.903,0,12.5-5.597,12.5-12.5C69,269.875,63.403,264.278,56.5,264.278z"/>
                        <path d="M136.732,264.278h-44c-6.903,0-12.5,5.597-12.5,12.5c0,6.903,5.597,12.5,12.5,12.5h44c6.903,0,12.5-5.597,12.5-12.5
		C149.232,269.875,143.635,264.278,136.732,264.278z"/>
                        <path d="M216.963,264.278h-44c-6.903,0-12.5,5.597-12.5,12.5c0,6.903,5.597,12.5,12.5,12.5h44c6.903,0,12.5-5.597,12.5-12.5
		C229.463,269.875,223.866,264.278,216.963,264.278z"/>
                        <path d="M301.893,265.199c-1.451-0.589-3.035-0.921-4.698-0.921h-44c-6.903,0-12.5,5.597-12.5,12.5c0,6.903,5.597,12.5,12.5,12.5
		h44c1.663,0,3.247-0.332,4.698-0.921c4.573-1.858,7.802-6.339,7.802-11.579C309.694,271.538,306.466,267.058,301.893,265.199z"/>
                    </g>
                </svg>
            </span>
        );
    }
}

export class CancelIcon extends React.PureComponent {
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

export class RemoveIcon extends React.PureComponent {
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
                    <g>
                        <path d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z" />
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
