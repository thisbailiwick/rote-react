import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Slider from 'material-ui/Slider';

export default class BeginButtons extends Component {
	// state = {
	// 	prefilledPercentageSlider: 60
	// };
	// handlePrefillClick = (event, value) => {
	//
	// };
	// handleBeginClick = (event, value) => {
	// 	console.log(this);
	// };
	// handlePrefillPercentageSlider = (event, value) => {
	// 	this.setState({prefilledPercentageSlider: value});
	// };

	render() {
		let props = this.props;
		return (
			<form className="form-inline" id="begin_buttons">
				{props.activeModeType === 2 &&
				<div id="prefilled">
					<div id="prefill_percentage" className="input-group">
						<Slider
							min={20}
							max={100}
							step={1}
							value={props.prefilledPercentageSlider}
							onChange={props.handlePrefillPercentageSliderChange}
						/>
						<span className="input-group-addon"
							id="percentage_addon">{props.prefilledPercentageSlider}%</span>
					</div>
					{props.activeModeType === 2 &&
					<RaisedButton label="Prefill" onClick={this.handlePrefillClick}/>
					}
				</div>
				}
				<RaisedButton label="Begin" onClick={props.handleBeginClick}/>
			</form>
		);
	}
}