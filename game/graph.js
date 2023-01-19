import {defaultNode} from "./node.js";
import {probabilityNode} from "./node.js";
import {timeNode} from "./node.js";
import {npcNode} from "./node.js";

export class Graph {

    constructor() {
        this.AdjList = new Map(); // main data structure for the graph
        this.activeNode = 0; // the first active node has the nodeID 0
    }

    addNode(nodeID, nodeType, textNodes) {
        switch (nodeType) {
            case "timeNode":
                this.AdjList.set(nodeID, new timeNode(nodeID, textNodes)); //create new node
                break;
            case "probabilityNode":
                this.AdjList.set(nodeID, new probabilityNode(nodeID, textNodes)); //create new node
                break;
            case "npcNode":
                this.AdjList.set(nodeID, new npcNode(nodeID, textNodes)); //create new node
                break;
            default:
                this.AdjList.set(nodeID, new defaultNode(nodeID, textNodes)); //create new node
        }
        this.AdjList.get(nodeID).options.forEach(option => { //add edges to the node
            this.AdjList.get(nodeID).addEdge(option.nextText);
        })
        this.activeNode = nodeID;
    }

    printGraph() {
        console.log(this);
    }

    resetValues() {
        this.AdjList = new Map(); // main data structure for the graph
        this.activeNode = 0; // the first active node has the nodeID 0
    }
}
