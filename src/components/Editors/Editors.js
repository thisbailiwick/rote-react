import React, {Component} from 'react';
import BeginButtons from '../BeginButtons';
import EditorModeSelection from '../EditorModeSelection';
import MainEditor from '../MainEditor';
import OriginalEditor from '../OriginalEditor';
import PercentageComplete from '../PercentageComplete';
import SampleTextSelection from '../SampleTextSelection';
import update from 'immutability-helper';

export default class Editors extends Component {
	constructor(props) {
		super(props);
		this.state = {
			prefilledPercentageSlider: 60,
			activeModeType: 1,
			mainEditor: {
				instance: null,
				content: '',
				placeholder: 'Begin typing what you remember from the used text',
				displayed: false
			},
			originalEditor: {
				instance: null,
				content: '',
				placeholder: 'Enter the text you want to learn by rote here. Alternatively, choose a text from the Sample Texts dropdown.',
				wordCount: 0,
				displayed: true
			},
			prefilledDisplayed: false
		};
	}

	updateState = (stateEdits) => {
		let newState = update(this.state, stateEdits);
		this.setState(newState);
	};

	// setLength = (editorName, stateItem, length) => {
	// 	this.updateState({editorName: {stateItem: {$set: length}}});
	// };

	updateMainEditorInstance = (editor, next) => {
		this.updateState({mainEditor: {instance: {$set: editor}}});
	};


	handleMainEditorOnBeforeChange = (editor, data, value) => {
		this.updateState({mainEditor: {content: {$set: value}}});
	};

	updateOriginalEditorInstance = (editor, next) => {
		this.updateState({originalEditor: {instance: {$set: editor}}});
	};

	updateOriginalEditorWordCount = (count) => {
		this.updateState({orginalEditor: {wordCount: count}});
	};

	handleOriginalEditorOnBeforeChange = (editor, data, value) => {
		this.updateState({originalEditor: {content: {$set: value}}});
	};

	handleModeSelection = (event, index, value) => {
		this.setState({activeModeType: value});
	};

	handlePrefillClick = (event, value) => {

	};

	handleBeginClick = (event) => {
		console.log(event);
		OriginalEditor.process_original();
		if (this.editorHasContent(this.state.originalEditor.content)) {
			if (this.state.activeModeType === 1) {
				// mode is original
				console.log('rote-editor-basic');
				let newState = update(this.state, {
					mainEditor: {displayed: {$set: true}},
					originalEditor: {displayed: {$set: false}}
				});
				this.setState(newState);
			} else {
				// mode is prefilled
			}
		} else {
			alert('no content in original editor!')
		}

	};

	editorHasContent = (content) => {
		return content.trim() !== '';
	};

	handlePrefillPercentageSliderChange = (event, value) => {
		this.setState({prefilledPercentageSlider: value});
	};

	setEditorContent = (editorName, content) => {
		this.updateState({[editorName]: {content: {$set: content}}});
	};

	render() {
		const state = this.state;
		return (
			<div id="editors_wrap" className="row container-fluid">
				<div className="row btn-toolbar" role="toolbar" id="options">
					{/*editor mode selection here*/}
					<EditorModeSelection activeModeType={state.activeModeType}
						handleModeSelection={this.handleModeSelection}/>
					{/*sample text selection here*/}
					<SampleTextSelection setEditorContent={this.setEditorContent}/>
				</div>

				{/*begin buttons here*/}
				<BeginButtons prefilledDisplayed={state.prefilledDisplayed}
					handlePrefillPercentageSliderChange={this.handlePrefillPercentageSliderChange}
					handleBeginClick={this.handleBeginClick}
					prefilledPercentageSlider={state.prefilledPercentageSlider}
					activeModeType={state.activeModeType}/>
				{/*main editor here*/}
				<MainEditor state={state.mainEditor}
					originalEditorWordCount={state.originalEditor.wordCount}
					updateMainEditorInstance={this.updateMainEditorInstance}
					handleMainEditorOnBeforeChange={this.handleMainEditorOnBeforeChange}
					setLength={this.setLength}/>
				{/*original editor here*/}
				<OriginalEditor state={state.originalEditor}
					updateOriginalEditorWordCount={this.updateOriginalEditorWordCount}
					updateOriginalEditorInstance={this.updateOriginalEditorInstance}
					handleOriginalEditorOnBeforeChange={this.handleOriginalEditorOnBeforeChange}/>
				{/*percentage done here*/}
				<PercentageComplete/>
			</div>
		);
	}
}