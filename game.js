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
    height: '400px',};

const nodes = new vis.DataSet(options);
const edges = new vis.DataSet(options);

function visualization(nodeID) {
        nodes.add([
            {id: nodeID, label: String(g.AdjList.get(nodeID).nodename)},
        ]);
        for (const edge of g.AdjList.get(nodeID).getEdge()) {
            edges.add([
                {from: nodeID, to: edge},
            ]);
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
    showTextNode(1)
}


function showTextNode(textNodeIndex) {
    console.log("npcnodes", textNodes.find(textNode => textNode.id === textNodeIndex).type)
    g.addNode(textNodeIndex, textNodes.find(textNode => textNode.id === textNodeIndex).type)                        //adding nodes sometimes leads to inconsistencies and error!
    visualization(g.AdjList.get(textNodeIndex).ID)
    g.printGraph()


    switch(g.AdjList.get(textNodeIndex).type) {
        case "timeNode":
            // timeNode function
            break;
        case "probabilityNode":
            // timeNode function
            break;
        case "npcNode":
            npcExchange(g.AdjList.get(textNodeIndex), p, textNodeIndex);
console.log("npc")
p.printPlayer()
            // timeNode function
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
            button.addEventListener('click', () => selectOption(option))
            optionButtonsElement.appendChild(button)
        }
    })
}

function showOption(option) {
    return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {

    //clear screen
    const element = document.getElementById("placehere");
    if (element.firstElementChild !== null) {        element.removeChild(element.firstElementChild);
    }




    const nextTextNodeId = option.nextText
    state = Object.assign(state, option.setState)

    if (nextTextNodeId <= 0) { //Everything equal or smaller than 0 restarts the Game
        for (let i = 0; i < g.AdjList.size; i++) {
            edges.clear()
            nodes.clear()
        }
        return startGame()
    }
    showTextNode(nextTextNodeId)

}

function npcExchange(npcNode, player, textNodeIndex) {
    if (g.AdjList.get(textNodeIndex).npc === "Königsfamilie") {
        console.log("npcnode?", g.AdjList.get(textNodeIndex))
        buttonItem(g.AdjList.get(textNodeIndex), player);
        p.printPlayer();
    }
    console.log("imag§", g.AdjList.get(textNodeIndex).options)

}

function displayPicture(urlpicture) {
    console.log("urlpicture?", urlpicture)

    var elem = document.createElement("img");
    elem.setAttribute("height", "76");
    elem.setAttribute("width", "102");
    elem.src = urlpicture;


    document.getElementById("placehere").appendChild(elem);


    const optionButtonsElement = document.getElementById('option-buttons')

}

function buttonItem(node, player) {
    let button = document.createElement('button')
    button.innerHTML = `<img src=${node.image}  alt="Item"  width="102" height="76"/>`;
    button.classList.add('btn')
    button.addEventListener('click', () => selectItem(node, player), {once : true})
    optionButtonsElement.appendChild(button)
    document.getElementById("placehere").appendChild(button);
}

function selectItem(node, player) {
    console.log("urlpicture?", node)
    player.interactionNPC(node, "yes");
    console.log("urlpicture?")

}



startGame()