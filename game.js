import {Player} from "./game/player.js";
import {Graph} from "./game/graph.js";
import {FantasyStory} from "./game/dataFantasyStory.js";
import {DetectiveStory} from "./game/dataDetectiveStory.js";


/*erledigte To-Do's:
- HTML files (Titel, Container, Navbar, Homepage)
- CSS (Padding, Flexbox, Footer)
- Fantasy Game Dataset (ID 8 führt im Kreis gelöst, Node Namen verbessert)
- Detective Game Dataset (Node Namen, Schlüssigkeit größtenteils überprüft, Kommentar am Anfang mit "Beta-Testing" (siehe Dataset))
Noch offene To-DO's:
- die drei nodetypen an anderen stellen einfügen und story entsprechend anpassen (müsste man ausprobieren)
- node 17 redundante items entfernen
- game.js aufräumen */


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

    let var1 = nodes.get(nodeID);
    console.log(var1)
    if (var1 === null) {
        nodes.add([{
            id: nodeID,
            label: String(g.AdjList.get(nodeID).nodename)
        },]);
        for (const edge of g.AdjList.get(nodeID).getEdge()) {
            edges.add([{
                from: nodeID,
                to: edge
            },]);
        }
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
const image = document.createElement('image')


var dataset = document.getElementById("dataset");


let textNodes = FantasyStory


function onChange() {
    var value = dataset.value;
    if (value === 'Detective Story') {
        textNodes = DetectiveStory
        for (let i = 0; i < g.AdjList.size; i++) {
            edges.clear()
            nodes.clear()
        }

        p.resetValues("ich", "blue")
        g.resetValues()
        stopAudio()
        console.log(value, text);


    } else {
        textNodes = FantasyStory
        for (let i = 0; i < g.AdjList.size; i++) {
            edges.clear()
            nodes.clear()
        }

        p.resetValues("thomas", "blue")
        g.resetValues()
        stopAudio()

    }
    var text = dataset.options[dataset.selectedIndex].text;


    startGame()
}

dataset.onchange = onChange;
let state = {}


let g = new Graph();
let p = new Player("ich", "blue");


function preGame() {
    onChange();


}

preGame()

p.printPlayer();


function startGame() {
    state = {}


    displayGame(1)
}


function displayGame(textNodeIndex) {


    console.log("index", textNodeIndex)
    g.addNode(textNodeIndex, textNodes.find(textNode => textNode.id === textNodeIndex).type, textNodes) //adding nodes sometimes leads to inconsistencies and error!
    g.printGraph()
    visualization(g.AdjList.get(textNodeIndex).ID)


    while (image.firstChild) {
        image.removeChild(image.firstChild)
    }


    if (g.AdjList.get(textNodeIndex).image !== undefined) {
        image.innerHTML = `<img src=${g.AdjList.get(textNodeIndex).image}  alt="Image"  width="254" height="202"/>` //add image to button
        document.getElementById("image").appendChild(image); //add buttons to html document
    }


    //p.printPlayer()

    switch (g.AdjList.get(textNodeIndex).type) {
        case "timeNode":
            miniGame();
            // timeNode function
            break;
        case "probabilityNode":
            probabilityEvent();
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

    displayStats()
    playAudio(g.AdjList.get(textNodeIndex));

}

let audio = new Audio('music/schloss.mp3')


function playAudio(node) {
    try {
        if (node.music !== undefined) {
            audio = new Audio(node.music)
            audio.play()
        }
    } catch (err) {
    }
}


function stopAudio() {
    try {
        audio.pause()
    } catch (err) {
    }
}


function displayImage(node) {
    console.log("etes", node)

    if (node.image !== undefined) {
        let button = document.createElement('itemButton')
        button.innerHTML = `<img src=${node.image}  alt="Image"  width="254" height="202"/>` //add image to button
        document.getElementById("image").appendChild(button); //add buttons to html document
    }
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

    console.log(p.hp, p.value)
    if (p.hp < 100 && p.value <= 0) { //HP equal or smaller than 0 restarts the Game
        p.value = p.value + 1
        return displayGame(14)
    }


    if (nextTextNodeId <= 0) { //Everything equal or smaller than 0 restarts the Game
        for (let i = 0; i < g.AdjList.size; i++) {
            edges.clear()
            nodes.clear()
        }

        p.resetValues("thomas", "blue")
        g.resetValues()
        stopAudio()
        return startGame()
    }


    displayGame(nextTextNodeId)

}

function displayStats() {

    let inventory = document.createElement("inv"); //add buttons to html document

    var child = document.getElementById("inventory").lastElementChild;
    while (child) {
        document.getElementById("inventory").removeChild(child);
        child = document.getElementById("inventory").lastElementChild;
    }

    inventory.innerHTML = "Player " + "<br />" + "HP: " + p.hp //add image to button

    document.getElementById("inventory").appendChild(inventory); //add buttons to html document


    let items = document.createElement("inv2"); //add buttons to html document

    if (p.inventory.items != null) {
        console.log(p.inventory.items)
        p.inventory.items.forEach(item => //add buttons to html document
            items.innerHTML = "<br />" + "Item " + item) //add buttons to html document

    }

    document.getElementById("inventory").appendChild(items) //add buttons to html document


}

//Minigame functions


function miniGame() {
    let button = document.createElement('itemButton')

    const clicksElement = document.getElementById('clicks');
    button.classList.add('btn')
    button.innerText = "Click!"
    let clicks = 0;
    let timeLeft = 7; // changed from 10

    button.addEventListener('click', () => {
        clicks++;
        //clicksElement.textContent = clicks;
    });

    const countdown = setInterval(() => {
        timeLeft--;
        if (timeLeft === 0 && clicks >= 30) {
            clearInterval(countdown);
            alert(`You won! You got ${clicks} clicks. Good luck!`);
        } else if (timeLeft === 0 && clicks < 30) {
            clearInterval(countdown);
            p.hp = 0;
            console.log(p)
            alert(`You lost! You got ${clicks} clicks.`);
        }
    }, 1000);
    let btn = document.getElementById("item").appendChild(button); //add buttons to html document
}


//NPC functions

function npcMeeting(npcNode, player) {
    if (npcNode.items != null) {
        displayItemButtons(npcNode, player);
    } //add item buttons only if npc has items
    if (npcNode.stats != null) {
        player.playerFight(npcNode)

    } //fight
}

function probabilityEvent() {
    let rand = Math.floor(Math.random() * 10)
    if (rand >= 5) {
        p.addItemInventory("Axe")
    } else {
        p.hp = p.hp - 20;
    }
}


//Functions to display items and create buttons
function displayItemButtons(node, player) {
    node.items.forEach(item => createItemButton(item, player)); //go through all items in the node and add buttons for each item
}

function createItemButton(item, player) {
    let button = document.createElement('itemButton')
    button.innerHTML = `<img src=${item.image}  alt="Item"  width="102" height="76"/>` //add image to button
    button.classList.add('btn')
    button.addEventListener('click', () => {
        player.addItemInventory(item.item);
        displayStats()
    }, {
        once: true
    }) //event listener calls function to add item to player inventory
    document.getElementById("item").appendChild(button); //add buttons to html document

}