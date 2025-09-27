import { useState } from 'react';
import './BattleCalculator.css';
import { CheckNumberInput } from '../../utils';

//https://dokapon.fandom.com/wiki/Damage_(Kingdom)

interface Props {
  hide: boolean;
}

const offenseMagicDict: { [key: string]: number } = {
  scorch: 1.95,
  sorcher: 2.65,
  gigablaze: 3.7,
  zap: 2.25,
  zapper: 3.15,
  lectrobeam: 4.45,
  chill: 2.1,
  chiller: 2.9,
  icebarrage: 4.1,
  gust: 2.45,
  guster: 3.2,
  f5storm: 4.75,
  mirrorimage: 2.4,
  teleport: 3,
  aurora: 5,
  curse: 1.6,
  sleepy: 1.1,
  blind: 1.4,
  banish: 2.5,
  drain: 0,
  swap: 0,
  pickpocket: 1.5,
  rust: 3.6,
};

const defenseMagicDict: { [key: string]: number } = {
  mguard: 0.2,
  'mguard+': 0.6,
  mguardplus: 0.6,
  mguarddx: 0.9,
  refresh: 0.2,
  'refresh+': 0.35,
  refreshplus: 0.35,
  refreshdx: 0.5,
  supercure: 0.5,
  sealmagic: 0.3,
  'sealmagic+': 0.5,
  sealmagicplus: 0.5,
  shock: 0.6,
  mirror: 0.5,
  mgcharge: 0.35,
  atcharge: 0.35,
  dfcharge: 0.35,
  spcharge: 0.35,
  chargeall: 0.6,
  charm: 0.7,
  bounce: 0,
  superbounce: 0,
};

function BattleCalculator({ hide }: Props) {
  const [playerAttack, setPlayerAttack] = useState(0);
  const [playerDefense, setPlayerDefense] = useState(0);
  const [playerMagic, setPlayerMagic] = useState(0);
  const [playerSpeed, setPlayerSpeed] = useState(0);
  const [playerHealth, setPlayerHealth] = useState(0);
  const [playerProficiency, setPlayerProficiency] = useState(false);
  const [playerOffenseMagic, setPlayerOffenseMagic] = useState('');
  const [playerDefenseMagic, setPlayerDefenseMagic] = useState('');
  const [enemyAttack, setEnemyAttack] = useState(0);
  const [enemyDefense, setEnemyDefense] = useState(0);
  const [enemyMagic, setEnemyMagic] = useState(0);
  const [enemySpeed, setEnemySpeed] = useState(0);
  const [enemyHealth, setEnemyHealth] = useState(0);
  const [enemyProficiency, setEnemyProficiency] = useState(false);
  const [enemyOffenseMagic, setEnemyOffenseMagic] = useState('');
  const [enemyDefenseMagic, setEnemyDefenseMagic] = useState('');

  const getAttackDamage = (attackerAt: number, defenderDf: number, guard: number, proficiency: boolean, random: number) => {
    return Math.round((attackerAt * 2.8 - defenderDf * 1.2) * guard * (proficiency ? 1.3 : 1) * random);
  };

  const getMagicDamage = (attackerMg: number, defenderMg: number, offenseMagic: string, defenseMagic: string, guard: number, random: number) => {
    let offensePower = 0;
    let defensePower = 0;

    if (offenseMagicDict.hasOwnProperty(offenseMagic)) {
      offensePower = offenseMagicDict[offenseMagic];
    }

    if (defenseMagicDict.hasOwnProperty(defenseMagic)) {
      defensePower = defenseMagicDict[defenseMagic];
    }

    return Math.round((attackerMg * 2.4 - defenderMg) * offensePower * (1 - defensePower) * guard * random);
  };

  const getStrikeDamage = (
    attackerAt: number,
    attackerMg: number,
    attackerSp: number,
    defenderDf: number,
    defenderMg: number,
    defenderSp: number,
    guard: number,
    proficiency: boolean,
    random: number
  ) => {
    const attacker = attackerAt + attackerMg + attackerSp;
    const defender = defenderDf + defenderMg + defenderSp;
    return Math.round((attacker * 2.5 - defender) * guard * (proficiency ? 1.3 : 1) * random);
  };

  const getCounterDamage = (
    attackerAt: number,
    attackerDf: number,
    defenderAt: number,
    defenderMg: number,
    defenderSp: number,
    proficiency: boolean,
    random: number
  ) => {
    const attacker = attackerAt - attackerDf;
    const defender = defenderAt + defenderMg + defenderSp;
    return Math.round((defender * 4 + attacker * 2) * (proficiency ? 1.3 : 1) * random);
  };

  return (
    <div className={'battleCalcContainer' + (hide ? ' hide' : '')}>
      <div>
        <p>your stats</p>
        <StatsInput
          attack={playerAttack}
          defense={playerDefense}
          magic={playerMagic}
          speed={playerSpeed}
          health={playerHealth}
          proficiency={playerProficiency}
          offenseMagic={playerOffenseMagic}
          defenseMagic={playerDefenseMagic}
          setAttack={setPlayerAttack}
          setDefense={setPlayerDefense}
          setMagic={setPlayerMagic}
          setSpeed={setPlayerSpeed}
          setHealth={setPlayerHealth}
          setProficiency={setPlayerProficiency}
          setOffenseMagic={setPlayerOffenseMagic}
          setDefenseMagic={setPlayerDefenseMagic}
        ></StatsInput>
      </div>
      <div>
        <p>their stats</p>
        <StatsInput
          attack={enemyAttack}
          defense={enemyDefense}
          magic={enemyMagic}
          speed={enemySpeed}
          health={enemyHealth}
          proficiency={enemyProficiency}
          offenseMagic={enemyOffenseMagic}
          defenseMagic={enemyDefenseMagic}
          setAttack={setEnemyAttack}
          setDefense={setEnemyDefense}
          setMagic={setEnemyMagic}
          setSpeed={setEnemySpeed}
          setHealth={setEnemyHealth}
          setProficiency={setEnemyProficiency}
          setOffenseMagic={setEnemyOffenseMagic}
          setDefenseMagic={setEnemyDefenseMagic}
        ></StatsInput>
      </div>
      <div>
        <p>
          you attack vs they defend: {getAttackDamage(playerAttack, enemyDefense, 1, playerProficiency, 0.95)} or{' '}
          {getAttackDamage(playerAttack, enemyDefense, 1, playerProficiency, 1.05)}
        </p>
        <p>
          you attack vs they magic defend: {getAttackDamage(playerAttack, enemyDefense, 1.4, playerProficiency, 0.95)} or{' '}
          {getAttackDamage(playerAttack, enemyDefense, 1.4, playerProficiency, 1.05)}
        </p>
        <p>
          you attack vs they counter: {getAttackDamage(playerAttack, enemyDefense, 1.8, playerProficiency, 0.95)} or{' '}
          {getAttackDamage(playerAttack, enemyDefense, 1.8, playerProficiency, 1.05)}
        </p>
        <p>
          you strike vs they defend:{' '}
          {getStrikeDamage(playerAttack, playerMagic, playerSpeed, enemyDefense, enemyMagic, enemySpeed, 1.6, playerProficiency, 0.95)} or{' '}
          {getStrikeDamage(playerAttack, playerMagic, playerSpeed, enemyDefense, enemyMagic, enemySpeed, 1.6, playerProficiency, 1.05)}
        </p>
        <p>
          you strike vs they magic defend:{' '}
          {getStrikeDamage(playerAttack, playerMagic, playerSpeed, enemyDefense, enemyMagic, enemySpeed, 1.7, playerProficiency, 0.95)} or{' '}
          {getStrikeDamage(playerAttack, playerMagic, playerSpeed, enemyDefense, enemyMagic, enemySpeed, 1.7, playerProficiency, 1.05)}
        </p>
        <p>
          you strike vs they counter: {getCounterDamage(playerAttack, playerDefense, enemyAttack, enemyMagic, enemySpeed, enemyProficiency, 0.95)} or{' '}
          {getCounterDamage(playerAttack, playerDefense, enemyAttack, enemyMagic, enemySpeed, enemyProficiency, 1.05)}
        </p>
        <p>
          you use magic vs they defend: {getMagicDamage(playerMagic, enemyMagic, playerOffenseMagic, enemyDefenseMagic, 1.4, 0.95)} or{' '}
          {getMagicDamage(playerMagic, enemyMagic, playerOffenseMagic, enemyDefenseMagic, 1.4, 1.05)}
        </p>
        <p>
          you use magic vs they magic defend: {getMagicDamage(playerMagic, enemyMagic, playerOffenseMagic, enemyDefenseMagic, 1, 0.95)} or{' '}
          {getMagicDamage(playerMagic, enemyMagic, playerOffenseMagic, enemyDefenseMagic, 1, 1.05)}
        </p>
        <p>
          you use magic vs they counter: {getMagicDamage(playerMagic, enemyMagic, playerOffenseMagic, enemyDefenseMagic, 1.8, 0.95)} or{' '}
          {getMagicDamage(playerMagic, enemyMagic, playerOffenseMagic, enemyDefenseMagic, 1.8, 1.05)}
        </p>
      </div>
      <div>
        <p>
          they attack vs you defend: {getAttackDamage(enemyAttack, playerDefense, 1, enemyProficiency, 0.95)} or{' '}
          {getAttackDamage(enemyAttack, playerDefense, 1, enemyProficiency, 1.05)}
        </p>
        <p>
          they attack vs you magic defend: {getAttackDamage(enemyAttack, playerDefense, 1.4, enemyProficiency, 0.95)} or{' '}
          {getAttackDamage(enemyAttack, playerDefense, 1.4, enemyProficiency, 1.05)}
        </p>
        <p>
          they attack vs you counter: {getAttackDamage(enemyAttack, playerDefense, 1.8, enemyProficiency, 0.95)} or{' '}
          {getAttackDamage(enemyAttack, playerDefense, 1.8, enemyProficiency, 1.05)}
        </p>
        <p>
          they strike vs you defend:{' '}
          {getStrikeDamage(enemyAttack, enemyMagic, enemySpeed, playerDefense, playerMagic, playerSpeed, 1.6, enemyProficiency, 0.95)} or{' '}
          {getStrikeDamage(enemyAttack, enemyMagic, enemySpeed, playerDefense, playerMagic, playerSpeed, 1.6, enemyProficiency, 1.05)}
        </p>
        <p>
          they strike vs you magic defend:{' '}
          {getStrikeDamage(enemyAttack, enemyMagic, enemySpeed, playerDefense, playerMagic, playerSpeed, 1.7, enemyProficiency, 0.95)} or{' '}
          {getStrikeDamage(enemyAttack, enemyMagic, enemySpeed, playerDefense, playerMagic, playerSpeed, 1.7, enemyProficiency, 1.05)}
        </p>
        <p>
          they strike vs you counter: {getCounterDamage(enemyAttack, enemyDefense, playerAttack, playerMagic, playerSpeed, playerProficiency, 0.95)}{' '}
          or {getCounterDamage(enemyAttack, enemyDefense, playerAttack, playerMagic, playerSpeed, playerProficiency, 1.05)}
        </p>
        <p>
          they use magic vs you defend: {getMagicDamage(enemyMagic, playerMagic, enemyOffenseMagic, playerDefenseMagic, 1.4, 0.95)} or{' '}
          {getMagicDamage(enemyMagic, playerMagic, enemyOffenseMagic, playerDefenseMagic, 1.4, 1.05)}
        </p>
        <p>
          they use magic vs you magic defend: {getMagicDamage(enemyMagic, playerMagic, enemyOffenseMagic, playerDefenseMagic, 1, 0.95)} or{' '}
          {getMagicDamage(enemyMagic, playerMagic, enemyOffenseMagic, playerDefenseMagic, 1, 1.05)}
        </p>
        <p>
          they use magic vs you counter: {getMagicDamage(enemyMagic, playerMagic, enemyOffenseMagic, playerDefenseMagic, 1.8, 0.95)} or{' '}
          {getMagicDamage(enemyMagic, playerMagic, enemyOffenseMagic, playerDefenseMagic, 1.8, 1.05)}
        </p>
      </div>
    </div>
  );
}

export default BattleCalculator;

interface StatsInputProps {
  attack: number;
  defense: number;
  magic: number;
  speed: number;
  health: number;
  proficiency: boolean;
  offenseMagic: string;
  defenseMagic: string;
  setAttack: (a: number) => void;
  setDefense: (d: number) => void;
  setMagic: (m: number) => void;
  setSpeed: (s: number) => void;
  setHealth: (h: number) => void;
  setProficiency: (p: boolean) => void;
  setOffenseMagic: (om: string) => void;
  setDefenseMagic: (dm: string) => void;
}

function StatsInput({
  attack,
  defense,
  magic,
  speed,
  health,
  proficiency,
  offenseMagic,
  defenseMagic,
  setAttack,
  setDefense,
  setMagic,
  setSpeed,
  setHealth,
  setProficiency,
  setOffenseMagic,
  setDefenseMagic,
}: StatsInputProps) {
  return (
    <div>
      <div>
        <div className='inputLabelContainer'>
          <p>AT: </p>
          <input
            type='text'
            value={attack}
            onChange={(e) => {
              CheckNumberInput(e.currentTarget.value.toString(), setAttack);
            }}
          ></input>
        </div>
        <div className='inputLabelContainer'>
          <p>DF: </p>
          <input
            type='text'
            value={defense}
            onChange={(e) => {
              CheckNumberInput(e.currentTarget.value.toString(), setDefense);
            }}
          ></input>
        </div>
        <div className='inputLabelContainer'>
          <p>MG: </p>
          <input
            type='text'
            value={magic}
            onChange={(e) => {
              CheckNumberInput(e.currentTarget.value.toString(), setMagic);
            }}
          ></input>
        </div>
        <div className='inputLabelContainer'>
          <p>SP: </p>
          <input
            type='text'
            value={speed}
            onChange={(e) => {
              CheckNumberInput(e.currentTarget.value.toString(), setSpeed);
            }}
          ></input>
        </div>
        <div className='inputLabelContainer'>
          <p>HP: </p>
          <input
            type='text'
            value={health}
            onChange={(e) => {
              CheckNumberInput(e.currentTarget.value.toString(), setHealth);
            }}
          ></input>
        </div>
        <div className='inputLabelcontainer'>
          <p>Offensive magic</p>
          <input
            type='text'
            value={offenseMagic}
            onChange={(e) => {
              setOffenseMagic(e.currentTarget.value.toString());
            }}
          ></input>
        </div>
        <div className='inputLabelcontainer'>
          <p>Defensive magic</p>
          <input
            type='text'
            value={defenseMagic}
            onChange={(e) => {
              setDefenseMagic(e.currentTarget.value.toString());
            }}
          ></input>
        </div>
        <div className='inputLabelContainer'>
          <p>Proficient weapon: </p>
          <input
            type='checkbox'
            checked={proficiency}
            onChange={() => {
              setProficiency(!proficiency);
            }}
          ></input>
        </div>
      </div>
    </div>
  );
}
