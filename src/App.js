import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Editors from './components/Editors';

import CodeMirror from 'codemirror';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class App extends Component {
  render() {
    return (
			<MuiThemeProvider>
      <div className="App">
					<div id="warning_danger"></div>
					<div id="page_wrap" className="container-fluid">
						<Editors />
      </div>
				</div>
			</MuiThemeProvider>
    );
  }
}

export default App;
