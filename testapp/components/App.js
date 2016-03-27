import React, {Component} from 'react';
import {render} from 'react-dom';
import Form from './Form';

export default class App extends Component {
  render() {
    return (
      <div id='App'>
        App
        <Form />
      </div>
    )
  }
}

render(<App />, document.getElementById('main-container'));
