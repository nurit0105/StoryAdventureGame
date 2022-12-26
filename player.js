export class Player {
    constructor(name, mcolor) {
        this.name = name;
        this.mcolor = mcolor
        this.inventory = new Inventory();
    }
    printPlayer() {
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

export class Inventory {
    constructor() {

    }
}