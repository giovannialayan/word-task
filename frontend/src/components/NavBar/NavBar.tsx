import './NavBar.css';

interface Props {
  current: number;
  currentString: string;
  onChangeTool: (toolId: number, toolName: string) => void;
}

function NavBar({ current, currentString, onChangeTool }: Props) {
  return (
    <div className='navContainer'>
      <h2>dokapon companion</h2>
      <div className='navButtons'>
        {/* <button onClick={() => onChangeTool(0, 'job counter')} className={'navButton' + (current == 0 ? ' navSelected' : '')}>
          job counter
        </button>
        <button onClick={() => onChangeTool(1, 'xp counter')} className={'navButton' + (current == 1 ? ' navSelected' : '')}>
          xp counter
        </button> */}
        <button onClick={() => onChangeTool(2, 'battle calculator')} className={'navButton' + (current == 2 ? ' navSelected' : '')}>
          battle calculator
        </button>
        <button onClick={() => onChangeTool(3, 'item search')} className={'navButton' + (current == 3 ? ' navSelected' : '')}>
          item search
        </button>
        <button onClick={() => onChangeTool(4, 'monster search')} className={'navButton' + (current == 4 ? ' navSelected' : '')}>
          monster search
        </button>
        {/* <button onClick={() => onChangeTool(5, 'continent maps')} className={'navButton' + (current == 5 ? ' navSelected' : '')}>
          continent maps
        </button> */}
      </div>
      <h1 className='navCurrent'>{currentString}</h1>
    </div>
  );
}

export default NavBar;
