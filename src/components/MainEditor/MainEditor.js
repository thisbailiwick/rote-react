import React, {Component} from 'react';
// import RaisedButton from 'material-ui/RaisedButton';
// import OriginalEditor from './OriginalEditor'
import originalDisplay from '../../lib/originalDisplay'
import {Controlled as CodeMirror} from 'react-codemirror2';


let OriginalDisplay = new originalDisplay();

require('codemirror/lib/codemirror.css');
require('codemirror/theme/material.css');
require('codemirror/theme/neat.css');
require('codemirror/mode/xml/xml.js');
require('codemirror/mode/javascript/javascript.js');
require('codemirror/addon/display/placeholder.js');

class MainEditor extends Component {

	constructor(props) {
		super(props);
		this.state = {
			originalEditorWordCount: this.props.originalEditorWordCount
		}
	}

	// handleEditorDidMount = (editor, next) => {
	// 	this.props.state.instance = editor
	// };

	handleShowOriginalTextClick = (event, value) => {

	};


	// handleEditorOnBeforeChange= (editor, data, value) => {
	// 	this.setState({content: value});
	// };

	handleEditorOnChange = (editor, data, value) => {
		console.log(value);
	};

	customModeSetup() {
		let el = this;
		return {
			startState: function () {
				return {
					last_compare: {
						original: null,
						editor: null
					},
					previous_text: '',
					last_line: 0,
					line_count: 0,
					line_words: [],
					//current_line_length: 0,//track the total length of the line, used to see if characters have been deleted.
					last_line_length: 0,
					// last_stream_length: 0,
					sol: true,
					eol: false,
					total_words: 0,
					first_run: true //use this to only run code at start of parse
				};

			},
			blankLine: function (state) {
				state.line_count++;
			},
			token: function (stream, editorState) { //stream match moves the cursor forward, so the text token will start at the END of "hello" //So if the line of text said: "hello world" one token will be [hello] and the other [ world] //NOTICE: ^ matches the start of the token, not the start of the line!
				// todo: what is OriginalDisplay.elements.length for? Word count of the original editor. Which we are tyring to track in the Editors.js
				if (this.state.originalEditorWordCount > (editorState.total_words)) {
					// still haven't typed as many words as are in the original text
					editorState.line_words[editorState.line_count] = stream.string;
					this.setCurrentLineLength(this.editorState.last_parse_string_length > stream.string.length
					                          ? this.editorState.last_parse_string_length
					                          : stream.string.length);
					editorState.last_line_length = stream.string.length > editorState.last_line_length
					                               ? stream.string.length
					                               : editorState.last_line_length; //editorState.current_line_length;

					editorState.current_line_length = stream.string.length;
					if (editorState.current_line_length == 1 && this.editorState.last_parse_string_length > editorState.current_line_length) {
						//we reset the this.editorState.last_parse_string_length as we are on a new line.
						this.editorState.last_parse_string_length = editorState.current_line_length;
					}
					let char_deleted = false;
					if (this.editorState.last_parse_string_length > editorState.current_line_length) {
						//a character was deleted from the line.
						char_deleted = true;
					}


					// let current_line_count = this.props.editorState.instance.lineCount();
					let string_length = stream.string.length;
					// let previous_text_length = editorState.previous_text.length;

					// let stream_peek_1 = stream.peek();
					let new_line = false;
					if (editorState.first_run === false && stream.sol()) {

						editorState.line_count++;

					} else {
						//this the first run
						editorState.first_run = false;
					}
					let stream_match = stream.match(/(\b[^\s]+[']*)/);

					if (stream.peek() == 'undefined') {
						this.editorState.last_parse_string_length = editorState.current_line_length;
					}

					if (stream_match) {

						let current_cursor = this.props.editorState.instance.getCursor();
						let current_line = current_cursor.line;

						if (editorState.last_line != current_line) {
							current_line = current_line - 1;
							if (stream.eol()) {
								editorState.last_line = current_line + 1;
							}
						} else {
							editorState.last_line = current_line;
							if (stream.eol()) {
								editorState.last_line = current_line;
							}
						}
						let from = {
							line: editorState.line_count,
							ch: stream.start
						};
						let end = {
							line: editorState.line_count,
							ch: stream.pos
						};
						let original_string = OriginalDisplay.getRange(from, end);

						let stream_compare_string = '';
						if (string_length == stream.pos + 1) { //pos is at the end of the string
							stream_compare_string = stream.string.slice(stream.start, stream.pos).trim();

						} else {
							//the pos is less than string length
							stream_compare_string = stream.string.slice(stream.start, stream.pos).trim();
						}
						let stream_compare_string_length = stream_compare_string.length;

						editorState.sol = false;

						new_line = false;
						// let $OriginalDisplay_match_handle = OriginalDisplay.handle;
						// let OriginalDisplay_match_editorState = OriginalDisplay.elements[editorState.total_words].word_editorState;
						let next_line_string = editorState[editorState.line_count + 1];
						if (typeof next_line_string !== 'undefined') {
							next_line_string = next_line_string.trim();
							if (next_line_string != '') {
								//there is a next line and the next line is not blank, so we need to make sure that this last character in this run has the full set of characters
							}
						}

						let current_word_count = editorState.total_words;
						editorState.total_words++;

						let full_string_match = OriginalDisplay.elements[current_word_count].word == stream_compare_string;
						if (original_string == stream_compare_string && full_string_match) {

							if (full_string_match) {
								return OriginalDisplay.set_correct(current_word_count, true);

							} else {
								//we need to compare the individual characters here, if all the characters match we can mark it as correct but not show the word. Once the full word is there it will be shown with the first above if editorStatement.
								//the user would see that the word isn't shown in the display div
								if (char_deleted === true) {
									return OriginalDisplay.set_deleted(current_word_count);
								} else {
									return OriginalDisplay.set_correct(current_word_count, false);
								}
							}

						} else if (original_string == stream_compare_string) {
							if (char_deleted === true) {
								return OriginalDisplay.set_deleted(current_word_count);
							} else {
								//we return default classes and temporary correct class only here as this is not the full word but they have correct characters so far
								return OriginalDisplay.set_correct_default(current_word_count);
							}
						} else {
							return OriginalDisplay.set_incorrect(current_word_count);

						}


					} else {


						stream.next();
						new_line = false;
						editorState.sol = false;
						return 'word empty';
					}
				} else {
					// we're typing more characters then in in the original text
					// todo: set some sort of read only on the editor and tell the user they're done
					stream.next();
					let new_line = false;
					editorState.sol = false;
					return 'word empty';
				}

			}
		};
	};

	render() {
		let props = this.props.state;
		return (
			<div id="main_editor">
				{props.displayed === true &&
				<CodeMirror
					className="editor main-editor"
					value={props.content}
					editorDidMount={this.props.updateMainEditorInstance}
					onChange={this.handleEditorOnChange}
					onBeforeChange={this.props.handleMainEditorOnBeforeChange}
					defineMode={{name: 'rote-editor', fn: this.customModeSetup}}
					options={{
						lineWrapping: true,
						lineNumbers: false,
						mode: 'rote-editor',
						theme: 'material',
						/*mode: 'rote-original',*/
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

export default MainEditor;