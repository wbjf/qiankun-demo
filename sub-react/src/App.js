import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Button } from 'antd';

function App() {
  const isInQiankun = window.__POWERED_BY_QIANKUN__
  function openSubReact() {
    console.log(isInQiankun)
    if (!isInQiankun) {
      alert('当前已经是单独运行的子应用')
      return
    }
    window.open(window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__)
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {isInQiankun && <Button type='primary' onClick={openSubReact}>独立打开react子应用</Button>}
      </header>
    </div>
  );
}

export default App;
