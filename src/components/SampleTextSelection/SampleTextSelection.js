import React, {Component} from 'react';
// import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

export default class SampleTextSelection extends Component {
	state = {
		prefilled: 0,
		samples: {
			0: "",
			'shakespeare-1': "Good night, good night! Parting is such sweet sorrow, that I shall say good night till it be morrow.",
			'shakespeare-2': "This life, which had been the tomb of his virtue and of his honour, is but a walking shadow; a poor player, that struts and frets his hour upon the stage, and then is heard no more: it is a tale told by an idiot, full of sound and fury, signifying nothing.",
			'paul-simon-slip-slidin-away': "Slip slidin' away\nSlip slidin' away\nYou know the nearer your destination\nThe more you're slip slidin' away\n\nI know a man\nHe came from my home town\nHe wore his passion for his woman\nLike a thorny crown\nHe said delores\nI live in fear\nMy love for you's so overpowering\nI'm afraid that I will disappear\n\nSlip slidin' away\nSlip slidin' away\nYou know the nearer your destination\nThe more you're slip slidin' away\n\nI know a woman\nBecame a wife\nThese are the very words she uses\nTo describe her life\nShe said a good day\nAin't got no rain\nShe said a bad day's when I lie in bed\nAnd think of things that might have been\n\nSlip slidin' away\nSlip slidin' away\nYou know the nearer your destination\nThe more you're slip slidin' away\n\nAnd I know a fa-ther\nWho had a son\nHe longed to tell him all the reasons\nFor the things he'd done\nHe came a long way\nJust to explain\nHe kissed his boy as he lay sleeping\nThen he turned around and headed home again\n\nSlip slidin' away\nSlip slidin' away\nYou know the nearer your destination\nThe more you're slip slidin' away\n\nGod only knows\nGod makes his plan\nThe information's unavailable\nTo the mortal man\nWe work our jobs\nCollect our pay\nBelieve we're gliding down the highway\nWhen in fact we're slip slidin' away\n\nSlip slidin' away\nSlip slidin' away\nYou know the nearer your destination\nThe more you're slip slidin' away\n\nSlip slidin' away\nYou know the nearer your destination\nThe more you're slip slidin' away\nMmm..."
		}
	};

	toggle_button_active_state = (button) => {
		button.classList.add('active');
		button.parentNode.childNodes.forEach(function (child) {
			if (child !== button && child.classList !== undefined) {
				child.classList.remove('active');
			}
		});
	};

	hide_begin_buttons = () => {
		document.querySelectorAll('#prefilled, #begin_classic').forEach(function (element) {
			element.classList.remove('show');
		});
		document.getElementById('begin_buttons').style.display = 'none';
	};

	show_begin_buttons = (event, value) => {
		console.log(event);
		console.log(value);
		let active_button = document.querySelector('#editor_mode_selection .active').getAttribute('id');
		document.getElementById('begin_buttons').style.display = 'block';
		if (active_button === 'original_select') {
			document.getElementById('prefilled').style.display = 'none';
			document.getElementById('begin_classic').style.display = 'block';
		} else {
			document.getElementById('begin_classic').style.display = 'none';
			document.getElementById('prefilled').style.display = 'block';
		}


	};

	handleSampleTextClick = (event, index, value) => {
		console.log(index);
		console.log(this.state.samples[value]);

		this.props.setEditorContent('originalEditor', this.state.samples[value]);


		// this.setState({prefilled: value});

		// let button = event.target;
		// console.log(button);
		// let active = button.classList.contains('active');
		// //run only if clicked button is not already active
		// if (!active) {
		// 	//make sure original editor is showing
		// 	this.show_original_editor();
		//
		// 	// toggle editor mode selection button active states
		// 	this.toggle_button_active_state(button);
		//
		// 	this.show_begin_buttons(button);
		// }
	};

	show_original_editor = () => {
		let original_editor = document.querySelector('.editor.original');
		if (original_editor.style.display === 'none') {
			original_editor.style.display = 'block';
			document.getElementById('main_editor').style.display = 'none';

		}
	};

	render() {
		return (
			<div className="btn-group" id="sample_text">
				<h4>Pre-filled text options</h4>
				<DropDownMenu id="sample_text_button" value={this.state.prefilled}
					onChange={this.handleSampleTextClick}>
					<MenuItem key={'select'} value={0} primaryText="Select"/>
					<MenuItem key={'shakespeare-1'} value={'shakespeare-1'} primaryText="Shakespeare 1"/>
					<MenuItem key={'shakespeare-2'} value={'shakespeare-2'} primaryText="Shakespeare 2"/>
					<Subheader>Shakespeare</Subheader>
					<Divider/>
					<Subheader>Paul Simon</Subheader>
					<MenuItem key={'paul-simon-slip-slidin-away'} value={'paul-simon-slip-slidin-away'} primaryText="Slip Slidin' Away"/>
				</DropDownMenu>
			</div>
		);
	}
}