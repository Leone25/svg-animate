import React from 'react';
import './App.css';
import Ribon from './ribon';
import FileMenu from './fileMenu';

function App() {

  const [isFileMenuOpen, setFileMenu] = React.useState(false);
  
  const openFileMenu = React.useCallback(() => {
    console.log("open")
    setFileMenu(true);
  }, [setFileMenu]);

  const closeFileMenu = React.useCallback(() => {
    console.log("close")
    setFileMenu(false);
  }, [setFileMenu]);

  return (
    <div className="App">
      <Ribon onOpenFileMenu={openFileMenu}/>
      <FileMenu show={isFileMenuOpen} closeCallback={closeFileMenu}/>
    </div>
  );
}

export default App;
