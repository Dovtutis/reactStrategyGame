import React, { useEffect, useState } from 'react';
import './style.css';
import Gold from './assets/gold.png';
import Wood from './assets/wood.png';
import Stone from './assets/stone.png';
import Building from './components/Building';
import PlayerBuilding from './components/PlayerBuilding.js';

function App() {

  const player = {
    stats: {
      gold: 3000,
      wood: 1500,
      stone: 1300
    },
    buildings: []
  }

  const shop = [
    {
      name: "tent",
      image: "https://media.istockphoto.com/vectors/blue-pixel-art-tent-icon-isolated-on-white-background-camping-shelter-vector-id1267526943",
      level: 1,
      cost: {
        gold: 10,
        wood: 5,
        stone: 4
      },
      profit: {
        gold: 0.1,
        wood: 0.1,
        stone: 0.1
      },
      requires: []
    },
    {
      name: "house",
      image: "https://img.favpng.com/23/5/13/pixel-art-video-games-architecture-png-favpng-bcctUuzq1m7j5ckb6gKWHtzRx.jpg",
      level: 1,
      cost: {
        gold: 50,
        wood: 38,
        stone: 80
      },
      profit: {
        gold: 0.2,
        wood: 0.1,
        stone: 0.2
      },
      requires: ["tent"]
    },
    {
      name: "farm",
      image: "https://pbs.twimg.com/profile_images/1082467691540078592/7EcDN6fY.png",
      level: 1,
      cost: {
        gold: 250,
        wood: 400,
        stone: 500
      },
      profit: {
        gold: 0.3,
        wood: 0.4,
        stone: 0.2
      },
      requires: ["house"]
    },
    {
      name: "church",
      image: "https://img1.pnghut.com/13/7/3/Vcn3n6a376/medieval-architecture-abbey-building-listed-parish.jpg",
      level: 1,
      cost: {
        gold: 3000,
        wood: 500,
        stone: 2000
      },
      profit: {
        gold: 1,
        wood: 0,
        stone: 0
      },
      requires: ["house", ", farm"]
    },
    {
      name: "maxima",
      image: "https://s1.15min.lt/images/photos/2020/08/18/original/vilniuje-lazdyneliu-gatveje-duris-atvere-nauja-maximos-parduotuve-5f3bf2276ea6d.jpg",
      level: 1,
      cost: {
        gold: 10000,
        wood: 2000,
        stone: 2000
      },
      profit: {
        gold: 10,
        wood: 10,
        stone: 10
      },
      requires: ["house", ", farm", ", church"]
    }
  ]

  const [getGold, setGold] = useState(player['stats']['gold']);
  const [getWood, setWood] = useState(player['stats']['wood']);
  const [getStone, setStone] = useState(player['stats']['stone']);
  const [getPlayerBuildings, setPlayerBuildings] = useState(player['buildings']);

  function buyBuilding(name) {
    const messageBoxEl = document.getElementById('message-box');
    messageBoxEl.innerText = "";
    const trigger = getPlayerBuildings.filter(building => building['name'] === name);
    if (trigger.length === 0) {
      const selectedBuilding = shop.filter(building => building['name'] === name);

      if (getGold >= selectedBuilding[0].cost['gold'] && getWood >= selectedBuilding[0].cost['wood'] && getStone >= selectedBuilding[0].cost['stone']) {

        let requirementTrigger = true;
        let playerBuildingsNames = [];

        if (getPlayerBuildings.length === 0) {
          if (selectedBuilding[0].name === "tent") {
            requirementTrigger = true;
          }else {
            requirementTrigger = false;
            messageBoxEl.innerText = "You do not have required buildings";
          }
        } else {
          for (let x = 0; x < getPlayerBuildings.length; x++) {
            playerBuildingsNames.push(getPlayerBuildings[x].name);
            console.log(playerBuildingsNames);
            for (let i = 0; i < selectedBuilding[0].requires.length; i++) {

              if (playerBuildingsNames.includes(selectedBuilding[0].requires[i])) {
                requirementTrigger = true;
              } else {
                requirementTrigger = false;
                messageBoxEl.innerText = "You do not have required buildings";
                break;
              }

            }
          }
        }

        if (requirementTrigger) {
          setPlayerBuildings([...getPlayerBuildings, selectedBuilding[0]]);
          player.buildings.push(selectedBuilding[0]);
          setGold(getGold - selectedBuilding[0].cost['gold']);
          setWood(getWood - selectedBuilding[0].cost['wood']);
          setStone(getStone - selectedBuilding[0].cost['stone']);
        }
      } else {
        messageBoxEl.innerText = "You do not have enough resources"
      }

    }
  }

  function upgradeBuilding(name, gold, stone, wood, level, upgradeGoldCost, upgradeWoodCost, upgradeStoneCost) {
    const selectedBuilding = getPlayerBuildings.filter(building => building['name'] === name);
    const messageBoxEl = document.getElementById('message-box');
    messageBoxEl.innerText = "";

    if (getGold >= upgradeGoldCost && getWood >= upgradeWoodCost && getStone >= upgradeStoneCost) {
      setGold(getGold - upgradeGoldCost);
      setWood(getWood - upgradeWoodCost);
      setStone(getStone - upgradeStoneCost);
      selectedBuilding[0].profit.gold = gold;
      selectedBuilding[0].profit.wood = stone;
      selectedBuilding[0].profit.stone = wood;
      selectedBuilding[0].level = level;
    } else {
      messageBoxEl.innerText = "You do not have enough resources"
    }
  }

  function sellBuilding(name, gold, wood, stone) {
    setPlayerBuildings(getPlayerBuildings.filter(building => building['name'] !== name));
    setGold((Number(getGold) + gold).toFixed(1));
    setWood((Number(getWood) + wood).toFixed(1));
    setStone((Number(getStone) + stone).toFixed(1));
  }

  function calculateProfit() {
    let gold = 0;
    let wood = 0;
    let stone = 0;
    getPlayerBuildings.map(building => {
      gold += Number(building.profit.gold);
      wood += Number(building.profit.wood);
      stone += Number(building.profit.stone);
    });
    setGold((Number(getGold) + gold).toFixed(1));
    setWood((Number(getWood) + wood).toFixed(1));
    setStone((Number(getStone) + stone).toFixed(1));
  }

  useEffect(() => {
    const interval = setInterval(() => {
      calculateProfit();
    }, 1000);
    return () => clearInterval(interval);
  });


  return (
    <div className='app-container'>
      <div className="shop-container">
        <span className="shop-text">Your Resources:</span>
        <div className="resource-container">
          <div className="resource-box">
            <img src={Gold} alt="gold" className="resouce-image" />
            <span className="resource-text">{getGold}</span>
          </div>
          <div className="resource-box">
            <img src={Wood} alt="wood" className="resouce-image" />
            <span className="resource-text">{getWood}</span>
          </div>
          <div className="resource-box">
            <img src={Stone} alt="stone" className="resouce-image" />
            <span className="resource-text">{getStone}</span>
          </div>
        </div>
        <span id="message-box"></span>
        <div className="buildings-container">
          {shop.map((building, index) => {
            return (
              <Building
                key={index}
                building={building}
                buyBuilding={buyBuilding}
              />
            )
          })}
        </div>
        <div className="player-container">
          {getPlayerBuildings.map((building, index) => {
            return (
              <PlayerBuilding
                key={index}
                building={building}
                upgradeBuilding={upgradeBuilding}
                sellBuilding={sellBuilding}
              />
            )
          })}
        </div>
      </div>
    </div>
  );
}


export default App;

// lets make strategy building game
// make a game where player can buy and build buildings
// every building costs gold, wood and stone
// also every building will generate specific amount of materials profit per second

// player should be able to buy buildings and place them on building blocks
// there is only file building blocks on the map

// player should be able to upgrade buildings -
// building upgrade price function is : (level * 5) * material
// for example make tent to lvl 2 cost (gold: 50, wood: 25, stone: 20)
// when building is upgraded it makes (level*profit)
// for example lvl 2 tent would make (gold: 0.2, wood: 0.2, stone: 0.2)

// player should be able to sell building (half the cost price)

// there some buildings which player can build only if he has particular
// buildings on the map already

// be smart, make all your data to be in single component,
// and child components to control that data




