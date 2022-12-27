import {textNodes} from "./data.js";
import {Player} from "./player.js";
import {Inventory} from "./player.js";

// import vis from "./node_modules/vis/dist/vis.js";


class Node {
    constructor(nodeID, nodeType) {
        this.edge = [];
        this.ID = nodeID;
        this.text = textNodes.find(textNode => textNode.id === nodeID).text //the node gets data from textNodes according to the ID
                                                                            //maybe there is the possibility to make this dynamic by changing addNode logic and story data
        this.options = textNodes.find(textNode => textNode.id === nodeID).options
    }
    addEdge(nextNodeID){
        this.edge.push(nextNodeID); // the number of the edge is the number of the node the edge is directed towards
    }
    getEdge(){
        return this.edge;
    }
}

/* Add different types of nodes: extend Node class, change addNode logic to include nodeType
class TimeNode extends Node {
    constructor(nodeID, nodeType) {
}
}

 */

class Game {
    constructor() {
        this.AdjList = new Map(); // main data structure for the graph
        this.activeNode = 0; // the first active node has the nodeID 0
    }
    addNode(nodeID) {
        if (this.AdjList.size === 0) { //start node //can probably be shorter
            this.AdjList.set(nodeID, new Node(nodeID)); //create new node
            this.AdjList.get(nodeID).options.forEach(option => {
                this.AdjList.get(nodeID).addEdge(option.nextText);
                })
            this.activeNode = nodeID;
        } else {
            this.AdjList.set(nodeID, new Node(nodeID)); //create new node
            this.AdjList.get(nodeID).options.forEach(option => {
                this.AdjList.get(nodeID).addEdge(option.nextText);
            })
            this.activeNode = nodeID;
        }
    }
    /*countEdges(){
        let numberOfEdges = 0;
        for (let j = 0; j < this.AdjList.size; j++) {
            if (this.AdjList.get(j)  !== undefined) {
                numberOfEdges += this.AdjList.get(j).getEdge().length;
            }
        }
        return numberOfEdges;
    }*/
    printGraph() {
        console.log(this);
       /* for (const element of this.AdjList.keys()) {
            console.log("Node", element);
        }
        for (const element of this.AdjList.values()) {
            for (const edge of element.getEdge()) {
                console.log("Edge", edge);
            }
        }*/
    }
}







// Using the above implemented graph class
let g = new Game();
let p = new Player("thomas", "blue");
p.printPlayer();

/*
vis.js is used to visualize the graph, visualization() is used to update the visualization //maybe class?
 */

const options = {
    autoResize: false,
    height: '400px',};
const nodes = new vis.DataSet(options);
const edges = new vis.DataSet(options);

function visualization(nodeID) {
        nodes.add([
            {id: nodeID, label: String(g.AdjList.get(nodeID).ID)},
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
Game - based on old code // maybe individual class
 */

const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {} // the current state symbolises the Player's Inventory
// document.getElementById("statePrint").innerHTML = state; first try for visualizing the Inventory

function startGame() {
    state = {}
    showTextNode(1)
}


function showTextNode(textNodeIndex) {
    g.addNode(textNodeIndex)                        //adding nodes sometimes leads to inconsistencies and error!
    visualization(g.AdjList.get(textNodeIndex).ID)
    g.printGraph()
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
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

startGame()