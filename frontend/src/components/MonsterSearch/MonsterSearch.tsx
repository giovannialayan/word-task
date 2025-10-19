import { useState } from 'react';
import './MonsterSearch.css';
import Search from '../Search/Search';

interface Props {
  hide: boolean;
}

interface Monster {
  name: string;
  level: string;
  hp: string;
  at: string;
  df: string;
  mg: string;
  sp: string;
  skill: string;
  offMagic: string;
  defMagic: string;
  xp: string;
  gold: string;
  drops: string[];
  locations: string;
  special: string;
  aiAttack: string;
  aiOffMagic: string;
  aiStrike: string;
  aiSkill: string;
  aiDefend: string;
  aiDefMagic: string;
  aiCounter: string;
}

//prettier-ignore
const monsterDisplayList = ['Rogue','Berserker','Barbarian','Bandit','Halfling','Assassin','Ninja','Magician','Summoner','Wizard','Gnome','Dwarf','Kobold','Kobold King','Goblin','Orc','Hobgoblin','Lizardman','Thunder Lizard','Wear Tiger','Dark Knight','Dullahan','Troll','Ogre','Giant','Minotaur','Cyclops','Heckhound','Fenrir','Cerberus','Gorgon','Behemoth','Treasure Hawk','Gryffon','Sphynx','Manticore','Chimera','King Chimera','Salamander','Basilisk','Cockatrice','Roc','Phoenix','Bat','Demon Bat','Dragon','Zombie Dragon','Elder Dragon','Tiamat','Scorpion-G','Sea Scorpion','Spider-G','Tarantula','Crawler','Worm','Pixie','Fairie','Sylph','Unseelie','Dryad','Treant','Ent','Mycopath','Fungalore','Wisp','Shade','Killer Fish','Gunfish','Merman','Kelpie','Mermaid','Celine','Undine','Sea Serpent','Leviathan','Hydra','Squilla','Kraken','Skeleton','Red Bones','Bone Knight','Zombie','Wight','Ghoul','Mummy','Golem','Iron Golem','Wraith','Doppelganger','Lich','Ghost','Spirit','Specter','Ghast','Death Cloud','Flame Eater','Imp','Gremlin','Incubus','Gargoyle','Night Gaunt','Demon','Arch Demon','Pazuzu',"Demon's Guard",'Ifrit','Fire Genie','Banshee','Succubus','Medusa','Lamia','Naga','Giant Eyeball','Gazer','Slime','Jelly','Grey Goo','Gel Splatter','Rico Jr.','Overlord Rico','Overlord Rico (True Form)','Comacho','Wabbit','Wallace','Chimpy','Robo-Sassin',];
//prettier-ignore
const monsterList = ['rogue','berserker','barbarian','bandit','halfling','assassin','ninja','magician','summoner','wizard','gnome','dwarf','kobold','koboldking','goblin','orc','hobgoblin','lizardman','thunderlizard','weartiger','darkknight','dullahan','troll','ogre','giant','minotaur','cyclops','heckhound','fenrir','cerberus','gorgon','behemoth','treasurehawk','gryffon','sphynx','manticore','chimera','kingchimera','salamander','basilisk','cockatrice','roc','phoenix','bat','demonbat','dragon','zombiedragon','elderdragon','tiamat','scorpiong','seascorpion','spiderg','tarantula','crawler','worm','pixie','fairie','sylph','unseelie','dryad','treant','ent','mycopath','fungalore','wisp','shade','killerfish','gunfish','merman','kelpie','mermaid','celine','undine','seaserpent','leviathan','hydra','squilla','kraken','skeleton','redbones','boneknight','zombie','wight','ghoul','mummy','golem','irongolem','wraith','doppelganger','lich','ghost','spirit','specter','ghast','deathcloud','flameeater','imp','gremlin','incubus','gargoyle','nightgaunt','demon','archdemon','pazuzu','demonsguard','ifrit','firegenie','banshee','succubus','medusa','lamia','naga','gianteyeball','gazer','slime','jelly','greygoo','gelsplatter','ricojr','overlordrico','overlordricotrueform','comacho','wabbit','wallace','chimpy','robosassin',];

function MonsterSearch({ hide }: Props) {
  const [searchText, setSearchText] = useState('');
  const [monsterName, setMonsterName] = useState('');
  const [monster, setMonster] = useState({} as Monster);

  const getMonster = async (searchInput: string) => {
    if (searchInput.length == 0) {
      return;
    }

    const modifiedSearch = searchInput
      .replace(/[ .\-'()]/g, '')
      .replace('plus', '+')
      .toLowerCase();
    let firstSearchResult = '';
    let displaySearchResult = '';

    for (let i = 0; i < monsterDisplayList.length; i++) {
      if (monsterList[i].includes(modifiedSearch)) {
        displaySearchResult = monsterDisplayList[i];
        firstSearchResult = monsterList[i];
        break;
      }
    }

    if (firstSearchResult == '') {
      return;
    }

    setSearchText(displaySearchResult);

    if (displaySearchResult == monsterName) {
      return;
    }

    const res = await fetch('/dokaponcompanion/monster/' + firstSearchResult);

    if (res.ok) {
      const newMonster = await res.json();

      newMonster.gold = newMonster.gold.replace('W', ' multiplied by current week');

      setMonsterName(newMonster.name);
      setMonster(newMonster);
    }
  };

  return (
    <div className={hide ? 'hide' : ''}>
      <Search
        searchText={searchText}
        setSearchText={setSearchText}
        dataList={monsterList}
        dataDisplayList={monsterDisplayList}
        searchCallback={getMonster}
      ></Search>
      {monster && monsterName != '' && (
        <div>
          <p>{monsterName}</p>
          <p>Level: {monster.level}</p>
          <div>
            <p>HP: {monster.hp}</p>
            <p>AT: {monster.at}</p>
            <p>DF: {monster.df}</p>
            <p>MG: {monster.mg}</p>
            <p>SP: {monster.sp}</p>
          </div>
          <div>
            <p>Skill: {monster.skill}</p>
            <p>Offensive magic: {monster.offMagic == '' ? 'None' : monster.offMagic}</p>
            <p>Defensive magic: {monster.defMagic == '' ? 'None' : monster.defMagic}</p>
          </div>
          <p>XP: {monster.xp}</p>
          <p>Gold: {monster.gold}</p>
          <p>Drops: {monster.drops.join(', ')}</p>
          <p>Locations: {monster.locations}</p>
          {monster.special != '' && <p>Special: {monster.special}</p>}
          <div>
            <div>
              <p>Attack: {monster.aiAttack}</p>
              <p>Strike: {monster.aiStrike}</p>
              <p>Battle skill: {monster.aiSkill}</p>
              <p>Offensive magic: {monster.aiOffMagic}</p>
            </div>
            <div>
              <p>Defend: {monster.aiDefend}</p>
              <p>Counter: {monster.aiCounter}</p>
              <p>Defensive magic: {monster.aiDefMagic}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MonsterSearch;
