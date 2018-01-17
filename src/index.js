import React from 'react';
import { render } from 'react-dom';
import AppComponent from './AppComponent';

const styles = {
  fontFamily: 'sans-serif',
  textAlign: 'center',
};

const App = () => (
  <div style={styles}>
    <AppComponent name="CodeSandbox" />
  </div>
);

render(<App />, document.getElementById('root'));
