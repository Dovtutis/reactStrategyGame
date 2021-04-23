import React, { useState, useEffect } from 'react';

function UserCard(props) {
    const upgradeGoldCost = (props.building.level * 5) * props.building.cost['gold'];
    const upgradeWoodCost = (props.building.level * 5) * props.building.cost['wood'];
    const upgradeStoneCost = (props.building.level * 5) * props.building.cost['stone'];


    function upgrade() {
        const level = (props.building.level + 1);
        const gold = (props.building.profit['gold'] * level).toFixed(1);
        const wood = (props.building.profit['wood'] * level).toFixed(1);
        const stone = (props.building.profit['stone'] * level).toFixed(1);
        props.upgradeBuilding(props.building.name, gold, wood, stone, level, upgradeGoldCost, upgradeWoodCost, upgradeStoneCost);
    }

    return (
        <div className="player-building-card">
            <img src={props.building.image} alt=""/>
            <div className="player-building-card-info-container">
                <div>
                    <span>Name: {props.building.name}</span>
                    <span>Level: {props.building.level}</span>
                </div>
                <div>
                    <span>Profits:</span>
                    <span>Gold: {props.building.profit['gold']}</span>
                    <span>Wood: {props.building.profit['wood']}</span>
                    <span>Stone: {props.building.profit['wood']}</span>
                </div>
                <div>
                    <span>Upgrade price:</span>
                    <span>Gold: {upgradeGoldCost}</span>
                    <span>Wood: {upgradeWoodCost}</span>
                    <span>Stone: {upgradeStoneCost}</span>
                </div>
            </div>
            <div>
                <button onClick={upgrade}>Upgrade</button>
                <button onClick={() => props.sellBuilding(props.building.name, props.building.cost['gold']/2, 
                    props.building.cost['wood']/2, props.building.cost['stone']/2)}>Sell</button>
            </div>
        </div>
    );
}


export default UserCard;


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