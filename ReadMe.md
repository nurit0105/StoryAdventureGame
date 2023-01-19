# Read Me

# The Gadventory - Story Adventure Game

## The Developer behind this project

- Laura Nurit Davidowicz - Official Coordinator
- Enes Berk - Official Designer
- Thomas Durlacher - Official Coder

## Languages in use

- Javascript
- CSS
- HTML

## Project Introduction

This project is part of the "Software Engineering" class organized by the University of applied
Sciences ["FH Campus Wien"](https://www.fh-campuswien.ac.at/)
The Player reads a text following different options, which creates the Players Story. To play the Game the Player must
choose
one of the given options.

Depending on the Options that the Player chooses the Game creates a different Graph which results in different endings.

Inside the Game the Player can gain equipment and weapon as well as losing them.
Along the way the Player will encounter different Non-playable-characters and a time challenged mini-game.

## Detailed Decription for Installation and Usage

1. Have an IDE to open this project (because in this context we won't deploy)
2. Have at least one Browser (like Chrome, Firefox, Edge, ...)
3. Inside the IDE go to the file [index.html](index.html) and open the file in your preferred Browser
4. If you want, read the Homepage
5. Click on the Navigation Bar Button "Game"
6. You're welcome to play our main Game - fantasy Game. You can play by reading the texts and clicking on buttons
7. In the end you either lose or win. Afterwards you can restart the Game and try another path.
8. Want more? Try our second game - detective Game, which is in its beta-testing phase.
9. If you want, you may get to know us as well. For that click on the Button in the Navigation Bar "contact"

## MoSCoW Requirements

### Must-criteria

- The system must be able to implement a text-based adventure game based
  on a game model consisting of a graph with a start node and an end node
- The system must provide the player the possibility to make decisions and
  thereby influence which kind of nodes are added to the graph.
- The system must implement start and end nodes connected by a series of
  default nodes.
- The system must be able to visualize the different game states with text and
  buttons in a GUI.

### Should-criteria

- The system should have a time-node where the player only gets a certain time
  to make a decision or play a mini-game and is either rewarded or punished
  depending on the performance of the player
- The system should include nodes in which certain game elements, such as
  NPC’s or equipment, appear with certain probabilities and influence the further
  development of the game

### Could-criteria

- The system could include nodes that have a picture after their text-description
  to provide a visualization of the text-description
- The system could include nodes that have background music
- The system could contain more than one text-based Story Adventure game
- The system could have a node which has a map that the player can open

### Won't-criteria

- The system will not have a functional backend. This means that there will be
  no user or session management
