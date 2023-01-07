import {Player} from "./game/player.js";
import {Inventory} from "./game/player.js";
import {Graph} from "./game/graph.js";
import {textNodes} from "./game/data.js";
//import vis from "./node_modules/vis/dist/vis.js";

/*
vis.js is used to visualize the graph, visualization() is used to update the visualization
 */
const options = {
    autoResize: false,
    height: '400px',
};

const nodes = new vis.DataSet(options);
const edges = new vis.DataSet(options);

function visualization(nodeID) {
    nodes.add([{
        id: nodeID,
        label: String(g.AdjList.get(nodeID).nodename)
    }, ]);
    for (const edge of g.AdjList.get(nodeID).getEdge()) {
        edges.add([{
            from: nodeID,
            to: edge
        }, ]);
    }
}

const container = document.getElementById("mynetwork");
const data = {
    nodes: nodes,
    edges: edges,
};

const network = new vis.Network(container, data, options);

/*
Functions for the game
 */

const activenode = document.getElementById('activenode')
const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}
let g = new Graph();
let p = new Player("thomas", "blue");
p.printPlayer();

function startGame() {
    state = {}
    displayGame(1)
}

function displayGame(textNodeIndex) {
    console.log("index", textNodeIndex)
    g.addNode(textNodeIndex, textNodes.find(textNode => textNode.id === textNodeIndex).type) //adding nodes sometimes leads to inconsistencies and error!
    g.printGraph()
    visualization(g.AdjList.get(textNodeIndex).ID)

    //p.printPlayer()

    switch (g.AdjList.get(textNodeIndex).type) {
        case "timeNode":
            // timeNode function
            break;
        case "probabilityNode":
            // probabilityNode function
            break;
        case "npcNode":
            npcMeeting(g.AdjList.get(textNodeIndex), p);

            // npcNode function
            break;
        default:
            break
    }



    activenode.innerText = g.activeNode
    textElement.innerText = g.AdjList.get(textNodeIndex).text
    while (optionButtonsElement.firstChild) {
        optionButtonsElement.removeChild(optionButtonsElement.firstChild)
    }

    g.AdjList.get(textNodeIndex).options.forEach(option => {
        if (showOption(option)) {
            const button = document.createElement('button')
            button.innerText = option.text
            button.classList.add('btn')
            button.addEventListener('click', () => selectOption(option, p))
            optionButtonsElement.appendChild(button)
        }
    })
}

function showOption(option) {
    return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {

    //Remove item buttons
    const element = document.getElementById("item");
    let child = element.lastElementChild;
    while (child) {
        element.removeChild(child);
        child = element.lastElementChild;
    }


    const nextTextNodeId = option.nextText
    state = Object.assign(state, option.setState)


    if ( p.hp < 100 && p.value > 0) { //HP equal or smaller than 0 restarts the Game
        p.value = p.value + 1
        return displayGame(14)
    }


    if (nextTextNodeId <= 0 ) { //Everything equal or smaller than 0 restarts the Game
        for (let i = 0; i < g.AdjList.size; i++) {
            edges.clear()
            nodes.clear()
        }
        return startGame()
    }


    displayGame(nextTextNodeId)

}




//NPC functions

function npcMeeting(npcNode, player) {
    if (npcNode.items != null) {displayItemButtons(npcNode, player);}  //add item buttons only if npc has items
    if (npcNode.stats != null) {player.playerFight(npcNode)

    }  //fight
}




//Functions to display items and create buttons
function displayItemButtons(node, player) {
    node.items.forEach(item => createItemButton(item, player)); //go through all items in the node and add buttons for each item
}
function createItemButton(item, player) {
    let button = document.createElement('itemButton')
    button.innerHTML = `<img src=${item.image}  alt="Item"  width="102" height="76"/>`  //add image to button
    button.classList.add('btn')
    button.addEventListener('click', () => player.addItemInventory(item.item), {once: true})  //event listener calls function to add item to player inventory
    document.getElementById("item").appendChild(button);  //add buttons to html document
}





startGame()