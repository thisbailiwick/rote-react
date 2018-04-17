import React, {Component} from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
// import {render} from "react-dom";
// import PropTypes from "prop-types";

export default class EditorModeSelection extends Component {
	// handleModeSelection = (event, index, value) => {
	// 	this.setState({
	// 		mode: value
	// 	});
	// };

	// state = {
	// 	mode: 1
	// };

	render() {
		const props = this.props;
		return (
			<div id="editor_mode_selection" className="btn-group" role="group" aria-label="text editor type">
				<h4>Editor Mode</h4>
				<SelectField
					/*floatingLabelText="Editor Mode"*/
					value={props.activeModeType}
					onChange={props.handleModeSelection}
					autoWidth={true}
				>
					<MenuItem value={1} primaryText="Original"/>
					<MenuItem value={2} primaryText="Pre-Filled"/>
				</SelectField>
			</div>
		);
	}
}