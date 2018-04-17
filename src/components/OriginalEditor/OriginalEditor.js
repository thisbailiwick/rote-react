import React, {Component} from 'react';
import {Controlled as CodeMirror} from 'react-codemirror2';
import originalDisplay from "../../lib/originalDisplay";

require('codemirror/lib/codemirror.css');
require('codemirror/theme/material.css');
require('codemirror/theme/neat.css');
require('codemirror/mode/xml/xml.js');
require('codemirror/mode/javascript/javascript.js');
require('codemirror/addon/display/placeholder.js');

class OriginalEditor extends Component {

	constructor(props) {
		super(props);

		// old wordMap vars
		this.editor_words = [];
		this.editor_objects = [];
		this.editor_length = 0;
		this.original_text = '';
		this.original_words = [];
		this.original_objects = [];
		this.original_length = 0;
	}

	// state = {
	// 	content: '',
	// 	placeholder: 'Enter the text you want to learn by rote here. Alternatively, choose a text from the Sample Texts dropdown.',
	// 	instance: null
	// };

	// handleEditorDidMount = (editor, next) => {
	// 	this.instance = editor;
	// 	this.process_original();
	// };

	handleEditorOnBeforeChange = (editor, data, value) => {
		this.setState({content: value});
	};

	// handleEditorOnChange = (editor, data, value) => {
	// 	this.process_original();
	// };

	process_original = () => {
		//this is where we put all of the words in an array to compare to the words in the editor
		this.setState({original_words: [], original_objects: [], original_length: 0});
		originalDisplay.elements = [];

		// TODO: this will need to be in prefilled
		// this.original_text = this.instance.getValue();

		// this.original_text = text;
		let wraps = document.querySelectorAll('.original.editor .CodeMirror-code');
		let wraps_length = wraps.length;
		let total_count = 1;
		for (let k = 0; k < wraps_length; k++) {
			let words = wraps[k].getElementsByClassName('cm-word');
			let words_length = words.length;
			for (let j = 0; j < words_length; j++) {
				let word = words[j].innerText || words[j].textContent;
				this.original_words[total_count] = word;
				//let $new_span = $('<span data-state="default" data-count="' + total_count + '">' + word + '</span>');
				// originalDisplay.handle.appendChild($new_span).append(' ');

				originalDisplay.elements.push({
					'word': word,
					'word_state': 'default'
				});
				total_count++;
			}
		}
		this.original_length = total_count - 1;
		this.props.updateOriginalEditorWordCount(this.original_length);
		//force reparse on editor
		this.props.state.instance.setOption('mode', this.props.state.instance.getOption('mode'));
	};

	customModeSetup = () => {
		return {
			startState: function () {
				return {
					last_compare: {
						original: null,
						editor: null
					},
					line_numbers: 0
				};
			},
			token: function (stream) {

				let found = stream.match(/(\b[^\s]+[']*(?!\z))/);

				if (found) {
					return 'word';
				} else {
					stream.next();
				}

			}
		};
	};

	render() {
		let props = this.props.state;
		return (
			<div id="original-editor">
				{props.displayed === true &&
				<CodeMirror
					className="editor original"
					value={props.content}
					editorDidMount={this.props.updateOriginalEditorInstance}
					onChange={this.handleEditorOnChange}
					onBeforeChange={this.props.handleOriginalEditorOnBeforeChange}
					defineMode={{name: 'rote-original', fn: this.customModeSetup}}
					options={{
						lineWrapping: true,
						lineNumbers: false,
						mode: 'rote-original',
						theme: 'material',
						viewportMargin: Infinity,
						readOnly: false,
						placeholder: props.placeholder
					}}
				/>
				}
			</div>
		);
	}
}

export default OriginalEditor