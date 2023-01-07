export class Player {

    constructor(name, mcolor) {
        this.name = name;
        this.mcolor = mcolor;
        this.inventory = new Inventory();
        this.hp = 100;
        this.attack = 10;
        this.defense = 10;
        this.money = 100;
        this.value = 0
    }

    addItemInventory(item) {
        this.inventory.addItem(item)
    }

    playerFight(npcNode){
        this.hp = 100 - npcNode.stats[0].attack;
        console.log(npcNode);

        if (this.hp<0) {
            console.log("you are dead")
        }
    }

    printPlayer() {
        console.log(this);
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