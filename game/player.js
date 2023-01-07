export class Player {
    constructor(name, mcolor) {
        this.name = name;
        this.mcolor = mcolor;
        this.inventory = new Inventory();
        this.hp = 100;
        this.attack = 10;
        this.defense = 10;
        this.money = 100;
    }

    interactionNPC(NPCitem, reaction) {
        if (reaction === "yes") {
            console.log(NPCitem)
            this.inventory.addItem(NPCitem)
        }
        console.log(this.inventory)
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
        this.items = [];
    }
    addItem(item) {
        this.items.push(item)
        return item;
    }
}

/*export class NPC {
    constructor() {
        this.item = 'Schild';
        this.money = 20;
    }
}*/