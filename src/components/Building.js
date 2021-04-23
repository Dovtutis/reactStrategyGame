import React from 'react';

function UserCard(props) {

    return (
        <div className="building-card">
            <img src={props.building.image} alt="" />
            <div className="container">
                <div className="info-container">
                    <div className="text-container">
                        <span>Name: {props.building.name}</span>
                        <span>Building costs:</span>
                        <span>Gold: {props.building.cost['gold']}</span>
                        <span>Wood: {props.building.cost['wood']}</span>
                        <span>Stone: {props.building.cost['stone']}</span>
                    </div>
                    <div className="text-container">
                        <span>Profits:</span>
                        <span>Gold: {props.building.profit['gold']}</span>
                        <span>Wood: {props.building.profit['wood']}</span>
                        <span>Stone: {props.building.profit['stone']}</span>
                        <span>Requires: {props.building.requires.map( item => item)}</span>
                    </div>
                </div>
                <button className="buy-button" onClick={() => props.buyBuilding(props.building.name)}>BUY</button>
            </div>

        </div>
    );
}


export default UserCard;

