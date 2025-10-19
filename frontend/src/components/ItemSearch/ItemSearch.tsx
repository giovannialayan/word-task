import { useState } from 'react';
import Search from '../Search/Search';

interface Props {
  hide: boolean;
}

interface Item {
  name: string;
  desc?: string;
  sellPrice?: string;
  price?: string;
  at?: string;
  df?: string;
  mg?: string;
  sp?: string;
  hp?: string;
  effect?: string;
  job?: string;
  locations?: string;
  power?: string;
  target?: string;
  stores?: string;
  space?: string;
  type?: string;
}

//prettier-ignore
const itemList = ["2spinner","3spinner","4spinner","5spinner","superspinner","townwarp","storewarp","guidedwarp","fieldwarp","1crystal","2crystal","3crystal","4crystal","5crystal","6crystal","multicrystal","potion","elixir","panacea","soulmop","revival","deathblock","miracleserum","stlbru","phyoose","invigorade","jesta","magicmedicine","cunningdisguise","magickey","magicmirror","mattock","reveal","rockcostume","skeletonkey","trapdodger","vanish","charmpotion","itemtrickster","moneytrickster","trap","roadblockrock","whitearrow","nitroglycerin","bigbug","blackmail","fashionmagazines","losttechnology","angelwings","herolicense","contract","dokaponorb","showticket","goldbug","passport","blackdiamond","wabbit","salamanderbug","monroeflower","castledog","piggybank","royalring","antidote","knife","dagger","longsword","handaxe","rapier","spear","brassknuckle","fairywand","gladius","dragonguandao","mace","smithshammer","sleepbow","sabre","crimsonwand","trident","battlefist","dreamrod","pistolcrossbow","scimitar","silversword","battleaxe","thunderblade","poisonfist","longspear","ichimonjikatana","crossbow","chiknuckle","warhammer","cybersaber","estoc","longbow","flambard","crimsoncandle","dokaqonsword","repeater","thunderaxe","knittenmitten","exorcismspear","shamshir","dancingblade","greataxe","elvenbow","maul","combatknife","greatsword","arbalest","partisan","halberd","deadlydagger","runestaff","drilllance","toyhammer","dragonslayer","darksword","souleater","auraknuckle","underworldstaff","divinefist","norecoilcannon","greattempest","dokaponsword","flarelance","nihilistsword","dracoblade","chevalier","punisher","woodenshield","leathershield","buckler","bronzeshield","leadshield","wabbitshield","scaleshield","coppershield","soldiershield","furryshield","ironshield","shinobishield","largeshield","steelshield","warriorshield","knightshield","blackshield","paladinshield","silvershield","mirrorshield","binder","shellshield","goldenshield","dokaqonshield","ragnarokshield","moonshield","towershield","girlyshield","duralshield","metalguard","sunshield","cursedshield","heroshield","mechaguard","aurashield","athena'sshield","dragonshield","darkshield","dokaponshield","demonshield","scorch","scorcher","gigablaze","zap","zapper","lectrobeam","chill","chiller","icebarrage","gust","guster","f5storm","mirrorimage","teleport","aurora","curse","sleepy","blind","banish","drain","swap","pickpocket","rust","mguard","mguard+","mguarddx","refresh","refresh+","refreshdx","supercure","sealmagic","sealmagic+","shock","mirror","mgcharge","atcharge","dfcharge","spcharge","chargeall","charm","bounce","superbounce","magma","magma+","magmadx","ice","ice+","icedx","volt","volt+","voltdx","flashbomb","atrophy","tenderize","slow","daze","down","timeout","cobrastrike","cobrastorm","fraidycat","blisteredfeet","sleepytime","curse","curseall","lock","lockdown","deathcall","squall","typhoon","transfer","comehere","psychokinesis","conjure","townconjure","conjureall","pursecutter","vacuum","mixup","mystery","powergloves","guardgloves","spiritgloves","speedgloves","vitalgloves","warmgloves","airring","ringofpower","ringofdefense","ringofspeed","ringofmagic","dokaponring","squidring","angelring","firebracelet","icebracelet","elecbracelet","windbracelet","crystalchoker","mirrornecklace","dodgenecklace","angelchoker","galoshes","heartslippers","heroboots","goldshoes","leopardbandana","zebrabandana","niceguybadge","wallacebadge","criminalstuds","dokaponcrown","overlordscrown"];
//prettier-ignore
const itemDisplayList = ["2 Spinner","3 Spinner","4 Spinner","5 Spinner","Super Spinner","Town Warp","Store Warp","Guided Warp","Field Warp","1 Crystal","2 Crystal","3 Crystal","4 Crystal","5 Crystal","6 Crystal","Multi Crystal","Potion","Elixir","Panacea","Soul Mop","Revival","Deathblock","Miracle Serum","Stl-Bru","Phyoose","Invigorade","Jesta","Magic Medicine","Cunning Disguise","Magic Key","Magic Mirror","Mattock","Reveal","Rock Costume","Skeleton Key","Trap Dodger","Vanish","Charm Potion","Item Trickster","Money Trickster","Trap","Roadblock Rock","White Arrow","Nitroglycerin","Big Bug","Blackmail","Fashion Magazines","Lost Technology","Angel Wings","Hero License","Contract","Dokapon Orb","Show Ticket","Gold Bug","Passport","Black Diamond","Wabbit","Salamander Bug","Monroe Flower","Castle Dog","Piggy Bank","Royal Ring","Antidote","Knife","Dagger","Longsword","Hand Axe","Rapier","Spear","Brass Knuckle","Fairy Wand","Gladius","Dragon Guandao","Mace","Smith's Hammer","Sleep Bow","Sabre","Crimson Wand","Trident","Battlefist","Dream Rod","Pistol Crossbow","Scimitar","Silver Sword","Battleaxe","Thunder Blade","Poison Fist","Long Spear","Ichimonji Katana","Crossbow","Chi Knuckle","Warhammer","Cyber Saber","Estoc","Longbow","Flambard","Crimson Candle","Dokaqon Sword","Repeater","Thunder Axe","Knitten Mitten","Exorcism Spear","Shamshir","Dancing Blade","Great Axe","Elven Bow","Maul","Combat Knife","Greatsword","Arbalest","Partisan","Halberd","Deadly Dagger","Rune Staff","Drill Lance","Toy Hammer","Dragonslayer","Dark Sword","Soul Eater","Aura Knuckle","Underworld Staff","Divine Fist","No-Recoil Cannon","Great Tempest","Dokapon Sword","Flare Lance","Nihilist Sword","Draco Blade","Chevalier","Punisher","Wooden Shield","Leather Shield","Buckler","Bronze Shield","Lead Shield","Wabbit Shield","Scale Shield","Copper Shield","Soldier Shield","Furry Shield","Iron Shield","Shinobi Shield","Large Shield","Steel Shield","Warrior Shield","Knight Shield","Black Shield","Paladin Shield","Silver Shield","Mirror Shield","Binder","Shell Shield","Golden Shield","Dokaqon Shield","Ragnarok Shield","Moon Shield","Tower Shield","Girly Shield","Dural Shield","Metal Guard","Sun Shield","Cursed Shield","Hero Shield","Mecha Guard","Aura Shield","Athena's Shield","Dragon Shield","Dark Shield","Dokapon Shield","Demon Shield","Scorch","Scorcher","Giga Blaze","Zap","Zapper","Lectro Beam","Chill","Chiller","Ice Barrage","Gust","Guster","F5 Storm","Mirror Image","Teleport","Aurora","Curse","Sleepy","Blind","Banish","Drain","Swap","Pickpocket","Rust","M Guard","M Guard+","M Guard Dx","Refresh","Refresh+","Refresh Dx","Super Cure","Seal Magic","Seal Magic+","Shock","Mirror","Mg Charge","At Charge","Df Charge","Sp Charge","Charge All","Charm","Bounce","Super Bounce","Magma","Magma+","Magma Dx","Ice","Ice+","Ice Dx","Volt","Volt+","Volt Dx","Flash Bomb","Atrophy","Tenderize","Slow","Daze","Down","Time Out","Cobra Strike","Cobra Storm","Fraidy Cat","Blistered Feet","Sleepy Time","Curse","Curse All","Lock","Lockdown","Death Call","Squall","Typhoon","Transfer","Come Here","Psychokinesis","Conjure","Town Conjure","Conjure All","Purse Cutter","Vacuum","Mix-Up","Mystery","Power Gloves","Guard Gloves","Spirit Gloves","Speed Gloves","Vital Gloves","Warm Gloves","Air Ring","Ring of Power","Ring of Defense","Ring of Speed","Ring of Magic","Dokapon Ring","Squid Ring","Angel Ring","Fire Bracelet","Ice Bracelet","Elec Bracelet","Wind Bracelet","Crystal Choker","Mirror Necklace","Dodge Necklace","Angel Choker","Galoshes","Heart Slippers","Hero Boots","Gold Shoes","Leopard Bandana","Zebra Bandana","Nice Guy Badge","Wallace Badge","Criminal Studs","Dokapon Crown","Overlord's Crown"];

function ItemSearch({ hide }: Props) {
  const [searchText, setSearchText] = useState('');
  const [item, setItem] = useState({} as Item);
  const [itemName, setItemName] = useState('');

  const getItem = async (searchInput: string) => {
    if (searchInput.length == 0) {
      return;
    }

    const modifiedSearch = searchInput
      .replace(/[ .\-'()]/g, '')
      .replace('plus', '+')
      .toLowerCase();
    let firstSearchResult = '';
    let displaySearchResult = '';

    for (let i = 0; i < itemDisplayList.length; i++) {
      if (itemList[i].includes(modifiedSearch)) {
        displaySearchResult = itemDisplayList[i];
        firstSearchResult = itemList[i];
        break;
      }
    }

    if (firstSearchResult == '') {
      return;
    }

    setSearchText(displaySearchResult);

    if (displaySearchResult == itemName) {
      return;
    }

    const res = await fetch('/dokaponcompanion/item/' + firstSearchResult);

    if (res.ok) {
      const newItem = await res.json();

      if (newItem.sellPrice && !newItem.price) {
        newItem.price = (+newItem.sellPrice.substring(0, newItem.sellPrice.length - 1).replace(',', '') * 2).toLocaleString('en-US') + 'G';
      } else if (newItem.price && !newItem.sellPrice) {
        newItem.sellPrice = (+newItem.price.substring(0, newItem.price.length - 1).replace(',', '') / 2).toLocaleString('en-US') + 'G';
      }

      if (newItem.at != '' || newItem.df != '' || newItem.mg != '' || newItem.sp != '' || newItem.hp != '') {
        if (newItem.at == '') {
          newItem.at = '0';
        }
        if (newItem.df == '') {
          newItem.df = '0';
        }
        if (newItem.mg == '') {
          newItem.mg = '0';
        }
        if (newItem.sp == '') {
          newItem.sp = '0';
        }
        if (newItem.hp == '') {
          newItem.hp = '0';
        }
      }

      setItemName(newItem.name);
      setItem(newItem);
    }
  };

  return (
    <div className={hide ? 'hide' : ''}>
      <Search
        searchText={searchText}
        setSearchText={setSearchText}
        dataList={itemList}
        dataDisplayList={itemDisplayList}
        searchCallback={getItem}
      ></Search>
      {item && itemName != '' && (
        <div>
          <p>{itemName}</p>
          {item.desc && <p>{item.desc}</p>}
          {item.price && <p>Price: {item.price}</p>}
          {item.sellPrice && <p>Sell Price: {item.sellPrice}</p>}
          {item.at && <p>AT: {item.at}</p>}
          {item.df && <p>DF: {item.df}</p>}
          {item.mg && <p>MG: {item.mg}</p>}
          {item.sp && <p>SP: {item.sp}</p>}
          {item.hp && <p>HP: {item.hp}</p>}
          {item.effect && <p>Effect: {item.effect}</p>}
          {item.job && <p>Job: {item.job}</p>}
          {item.power && <p>Power: {item.power}</p>}
          {item.target && <p>Target: {item.target}</p>}
          {item.type && <p>Type: {item.type}</p>}
          {item.locations && <p>Locations: {item.locations}</p>}
          {item.stores && <p>Stores: {item.stores}</p>}
          {item.space && <p>Spaces: {item.space}</p>}
        </div>
      )}
    </div>
  );
}

export default ItemSearch;
