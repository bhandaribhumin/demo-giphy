import './style.scss';

import * as React from 'react';

import { IMasonryConfig, IProps } from './type'

import Content from './components/Content/Content';
import DarkModeToggle from './components/header/darkmode/DarkModeToggle';

function App() {
  return (
    <>
      <div className="navbar">
        <DarkModeToggle />
      </div>
      <Content />
    </>
  );
}

export default App;
