//import {textNodes} from "../dataDetectiveStory.js";


class Node {

    s

    constructor(nodeID, textNodes) {
        this.edge = [];
        this.ID = nodeID;
        this.text = textNodes.find(textNode => textNode.id === nodeID).text //the node gets data from textNodes according to the ID
        this.options = textNodes.find(textNode => textNode.id === nodeID).options
        this.type = textNodes.find(textNode => textNode.id === nodeID).type
        this.nodename = textNodes.find(textNode => textNode.id === nodeID).nodename;
        this.items = textNodes.find(textNode => textNode.id === nodeID).items;
        this.stats = textNodes.find(textNode => textNode.id === nodeID).stats;
        this.music = textNodes.find(textNode => textNode.id === nodeID).music;
        this.image = textNodes.find(textNode => textNode.id === nodeID).image;

    }

    addEdge(nextNodeID) {
        this.edge.push(nextNodeID); // the number of the edge is the number of the node the edge is directed towards
    }

    getEdge() {
        return this.edge;
    }
}

export class timeNode extends Node {

    constructor(nodeID, textNodes, time) {
        super(nodeID, textNodes);
        this.time = time;
    }
}

export class probabilityNode extends Node {

    constructor(nodeID, textNodes, probability) {
        super(nodeID, textNodes);
        this.probability = probability;
    }
}

export class npcNode extends Node {

    constructor(nodeID, textNodes) {
        super(nodeID, textNodes);
        this.npc = textNodes.find(textNode => textNode.id === nodeID).npc;
        this.npcmoney = 20;
    }
}

export class defaultNode extends Node {

    constructor(nodeID, textNodes) {
        super(nodeID, textNodes);
    }
}