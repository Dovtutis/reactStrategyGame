# Simple strategy game by using REACT.

lets make strategy building game
make a game where player can buy and build buildings
every building costs gold, wood and stone
also every building will generate specific amount of materials profit per second

player should be able to buy buildings and place them on building blocks
there is only file building blocks on the map

player should be able to upgrade buildings -
building upgrade price function is : (level * 5) * material
for example make tent to lvl 2 cost (gold: 50, wood: 25, stone: 20)
when building is upgraded it makes (level*profit)
for example lvl 2 tent would make (gold: 0.2, wood: 0.2, stone: 0.2)

player should be able to sell building (half the cost price)

there some buildings which player can build only if he has particular
buildings on the map already

be smart, make all your data to be in single component,
and child components to control that data
