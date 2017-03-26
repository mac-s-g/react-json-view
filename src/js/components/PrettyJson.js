import React from "react";
import PrettyObject from './PrettyObject';

require('./../../style/app-globals.scss');

export default class extends React.Component {
	constructor(props) {
		super(props)
		console.log(props)
	}

	render = () => {
		const {src} = this.props;
		return (
		<div class="pretty-json-container">
			<PrettyObject depth={0} >{src}</PrettyObject>
		</div>
		);
	}
}