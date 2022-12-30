import {defaultNode} from "./node.js";
import {probabilityNode} from "./node.js";
import {timeNode} from "./node.js";
import {npcNode} from "./node.js";

export class Graph {
    constructor() {
        this.AdjList = new Map(); // main data structure for the graph
        this.activeNode = 0; // the first active node has the nodeID 0
    }
    addNode(nodeID, nodeType) {
        switch(nodeType) {
            case "timeNode":
                this.AdjList.set(nodeID, new timeNode(nodeID)); //create new node
                break;
            case "probabilityNode":
                this.AdjList.set(nodeID, new probabilityNode(nodeID)); //create new node
                break;
            case "npcNode":
                this.AdjList.set(nodeID, new npcNode(nodeID)); //create new node
                break;
            default:
                this.AdjList.set(nodeID, new defaultNode(nodeID)); //create new node
        }
        this.AdjList.get(nodeID).options.forEach(option => {
            this.AdjList.get(nodeID).addEdge(option.nextText);})
        this.activeNode = nodeID;
    }

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


/*countEdges(){
    let numberOfEdges = 0;
    for (let j = 0; j < this.AdjList.size; j++) {
        if (this.AdjList.get(j)  !== undefined) {
            numberOfEdges += this.AdjList.get(j).getEdge().length;
        }
    }
    return numberOfEdges;
}*/

