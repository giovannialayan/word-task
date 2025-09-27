import { useState } from 'react';
import './App.css';
// import Jobcounter from './components/JobCounter/JobCounter';
import NavBar from './components/NavBar/NavBar';
// import XpCounter from './components/XpCounter/XpCounter';
import BattleCalculator from './components/BattleCalculator/BattleCalculator';
import ItemSearch from './components/ItemSearch/ItemSearch';
import MonsterSearch from './components/MonsterSearch/MonsterSearch';

function App() {
  const [currentTool, setCurrentTool] = useState(-1);
  const [currentToolString, setCurrentToolString] = useState('');

  const ChangeTool = async (tool: number, name: string) => {
    setCurrentTool(tool);
    setCurrentToolString(name);
  };

  return (
    <>
      <NavBar current={currentTool} currentString={currentToolString} onChangeTool={ChangeTool}></NavBar>
      {/* <Jobcounter hide={currentTool != 0}></Jobcounter>
      <XpCounter hide={currentTool != 1}></XpCounter> */}
      <BattleCalculator hide={currentTool != 2}></BattleCalculator>
      <ItemSearch hide={currentTool != 3}></ItemSearch>
      <MonsterSearch hide={currentTool != 4}></MonsterSearch>
    </>
  );
}

export default App;
