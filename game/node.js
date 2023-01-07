import {
    textNodes
} from "./data.js";

class Node {
    constructor(nodeID, textNodes) {
        this.edge = [];
        this.ID = nodeID;
        this.text = textNodes.find(textNode => textNode.id === nodeID).text //the node gets data from textNodes according to the ID
        this.options = textNodes.find(textNode => textNode.id === nodeID).options
        this.type = textNodes.find(textNode => textNode.id === nodeID).type
        this.nodename = textNodes.find(textNode => textNode.id === nodeID).nodename
        this.image = textNodes.find(textNode => textNode.id === nodeID).image
        this.image2 = textNodes.find(textNode => textNode.id === nodeID).image2

    }
    addEdge(nextNodeID) {
        this.edge.push(nextNodeID); // the number of the edge is the number of the node the edge is directed towards
    }
    getEdge() {
        return this.edge;
    }
}
export class timeNode extends Node {
    constructor(nodeID, time) {
        super(nodeID, textNodes);
        this.time = time;
    }
}
export class probabilityNode extends Node {
    constructor(nodeID, probability) {
        super(nodeID, textNodes);
        this.probability = probability;
    }
}
export class npcNode extends Node {
    constructor(nodeID) {
        super(nodeID, textNodes);
        this.npc = textNodes.find(textNode => textNode.id === nodeID).npc;
        this.npcitem1 = 'Schild';
        this.npcitem2 = 'Schwert';
        this.npcmoney = 20;

    }

}
export class defaultNode extends Node {
    constructor(nodeID) {
        super(nodeID, textNodes);
    }
}