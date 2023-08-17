import React from 'react';

const DEFAULT_WIDTH = 24;
const DEFAULT_HEIGHT = 24;
const DEFAULT_COLOR = '#000000';

export class CircleMinus extends React.PureComponent {
    render() {
        const { props } = this;
        const { style, ...rest } = props;

        return (
            <span {...rest}>
                <svg
                    {...getIconStyle(style)}
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
        const { props } = this;
        const { style, ...rest } = props;

        return (
            <span {...rest}>
                <svg
                    {...getIconStyle(style)}
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
        const { props } = this;
        const { style, ...rest } = props;
        const svgStyle = getIconStyle(style).style;

        return (
            <span {...rest}>
                <svg
                    fill={svgStyle.color}
                    width={svgStyle.height}
                    height={svgStyle.width}
                    style={svgStyle}
                    viewBox="0 0 1792 1792"
                >
                    <path d="M1344 800v64q0 14-9 23t-23 9h-832q-14 0-23-9t-9-23v-64q0-14 9-23t23-9h832q14 0 23 9t9 23zm128 448v-832q0-66-47-113t-113-47h-832q-66 0-113 47t-47 113v832q0 66 47 113t113 47h832q66 0 113-47t47-113zm128-832v832q0 119-84.5 203.5t-203.5 84.5h-832q-119 0-203.5-84.5t-84.5-203.5v-832q0-119 84.5-203.5t203.5-84.5h832q119 0 203.5 84.5t84.5 203.5z" />
                </svg>
            </span>
        );
    }
}

export class SquarePlus extends React.PureComponent {
    render() {
        const { props } = this;
        const { style, ...rest } = props;
        const svgStyle = getIconStyle(style).style;

        return (
            <span {...rest}>
                <svg
                    fill={svgStyle.color}
                    width={svgStyle.height}
                    height={svgStyle.width}
                    style={svgStyle}
                    viewBox="0 0 1792 1792"
                >
                    <path d="M1344 800v64q0 14-9 23t-23 9h-352v352q0 14-9 23t-23 9h-64q-14 0-23-9t-9-23v-352h-352q-14 0-23-9t-9-23v-64q0-14 9-23t23-9h352v-352q0-14 9-23t23-9h64q14 0 23 9t9 23v352h352q14 0 23 9t9 23zm128 448v-832q0-66-47-113t-113-47h-832q-66 0-113 47t-47 113v832q0 66 47 113t113 47h832q66 0 113-47t47-113zm128-832v832q0 119-84.5 203.5t-203.5 84.5h-832q-119 0-203.5-84.5t-84.5-203.5v-832q0-119 84.5-203.5t203.5-84.5h832q119 0 203.5 84.5t84.5 203.5z" />
                </svg>
            </span>
        );
    }
}

export class ArrowRight extends React.PureComponent {
    render() {
        const { props } = this;
        const { style, ...rest } = props;

        return (
            <span {...rest}>
                <svg
                    style={{
                        ...getIconStyle(style).style,
                        paddingLeft: '2px',
                        verticalAlign: 'top'
                    }}
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
        const { props } = this;
        const { style, ...rest } = props;

        return (
            <span {...rest}>
                <svg
                    style={{
                        ...getIconStyle(style).style,
                        paddingLeft: '2px',
                        verticalAlign: 'top'
                    }}
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
        const { props } = this;
        const { style, ...rest } = props;

        return (
            <span {...rest}>
                <svg
                    {...getIconStyle(style)}
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
        const { props } = this;
        const { style, ...rest } = props;

        return (
            <span {...rest}>
                <svg
                    {...getIconStyle(style)}
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

export class AddCircle extends React.PureComponent {
    render() {
        const { props } = this;
        const { style, ...rest } = props;

        return (
            <span {...rest}>
                <svg
                    {...getIconStyle(style)}
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

export class SelectCircle extends React.PureComponent {
    render() {
        const { props } = this;
        const { style, ...rest } = props;

        return (
            <span {...rest}>
                <svg
                    {...getIconStyle(style)}
                    viewBox="0 0 1000 1000"
                    fill="currentColor"
                    preserveAspectRatio="xMidYMid meet"
                >
                    <g>
                        <path d="M819.5,386.3h-2.5c-18.4,0-33.4,5.3-48,14.3c-12.7-37.1-45-63.7-86.6-63.7c-18.4,0-35.9,5.3-50.4,14.3c-12.7-37-45-63.7-86.6-63.7c-16.2,0-31.3,4.1-44.7,11.2v-95.3c0-51.9-39.3-94-91.6-94s-94.7,42.1-94.7,94v365l-57.5-57.3c-37-36.7-102.4-31.5-133.9,0s-52.1,94.9-7,140l264.5,262.7c5.5,5.4,11.5,9.9,17.8,13.8c48.2,39.3,103.5,62.6,220.3,62.6c266.9,0,291.6-144,291.6-321.6v-188C910.1,428.4,871.8,386.3,819.5,386.3z M860.3,668.4c0,150.3-0.7,272.1-241.8,272.1c-102.1,0-163.4-22.8-209.9-68.9L158.3,622.9c-22.2-22.2-16.6-50.5,1.6-68.6c18.1-18.1,51.4-18.8,68.9-1.4c0,0,43.9,43.7,81.8,81.3c28.6,28.5,53.8,53.5,53.8,53.5V213.2c0-24.6,20.1-44.5,44.9-44.5c24.8,0,41.7,19.9,41.7,44.5V515h0.5c-0.3,1.6-0.5,3.3-0.5,5c0,13.7,11.2,24.7,24.9,24.7c13.8,0,24.9-11.1,24.9-24.7c0-1.7-0.2-3.4-0.5-5h0.5V391.3c0-24.6,17.9-44.5,42.7-44.5c0,0,43.9-0.6,43.9,44.5v163.3h0.5c-0.3,1.6-0.5,3.3-0.5,5c0,13.7,11.2,24.7,24.9,24.7c13.8,0,24.9-11.1,24.9-24.7c0-1.7-0.2-3.3-0.5-5h0.5V440.8c0-24.6,17.6-44.5,42.4-44.5c0,0,44.8,2.8,44.8,44.5v143.5h0.5c-0.3,1.6-0.5,3.3-0.5,4.9c0,13.7,11.2,24.7,24.9,24.7c13.8,0,24.3-11.1,24.3-24.7c0-1.7-0.2-3.3-0.5-4.9h0.5v-98c0-24.6,18.5-44.5,43.3-44.5c0,0,43.4-1.8,43.4,44.5C860.3,486.3,860.3,628.4,860.3,668.4z M277.5,343.4v-83.1c-7.9-17.7-12.4-37.3-12.4-58c0-78.8,63.9-142.7,142.7-142.7s142.7,63.9,142.7,142.7c0,10.8-1.3,21.2-3.6,31.3c17.9,0.7,34.1,8.1,45.9,20.1c4.6-16.4,7.3-33.5,7.3-51.4C600,96.1,513.9,10,407.7,10S215.4,96.1,215.4,202.3C215.4,258.1,239.4,308.3,277.5,343.4z" />
                    </g>
                </svg>
            </span>
        );
    }
}

export class Add extends React.PureComponent {
    render() {
        const { props } = this;
        const { style, ...rest } = props;

        return (
            <span {...rest}>
                <svg
                    {...getIconStyle(style)}
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
        const { props } = this;
        const { style, ...rest } = props;

        return (
            <span {...rest}>
                <svg
                    {...getIconStyle(style)}
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
        const { props } = this;
        const { style, ...rest } = props;

        return (
            <span {...rest}>
                <svg
                    {...getIconStyle(style)}
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
    return {
        style: {
            verticalAlign: 'middle',
            ...style,
            color: style.color ? style.color : DEFAULT_COLOR,
            height: '1em',
            width: '1em'
        }
    };
}
