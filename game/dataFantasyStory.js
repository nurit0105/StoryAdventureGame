const dataset = [
    {
        id: 1,
        text: 'Willkommen beim Fantasy Adventure Game. Es ist dein erster Tag im neuen Dorf und du befindest dich am Marktplatz. Wohin willst du?',
        type: "default",
        nodename: "Dorf",
        options: [
            {
                text: 'Richtung Wald',
                nextText: 2
            }, {
                text: 'Richtung Schloss',
                nextText: 3
            }, {
                text: 'Am Marktplatz bleiben',
                nextText: 4
            }
        ]
    },
    {
        id: 2,
        text: 'Du läufst durch den Wald und findest unter einer Fichte mehrere Pilze. Sammelst du sie ein?',
        image: "https://www.tierwelt.ch/fileadmin/user_upload/tierwelt/artikel-bilder/woodwing/18-2022/88324be8351701e4a2e08bb2e9801331a7edc59865c4ad6b6994b97d143ea5cc.jpg",
        type: "probabilityNode", //should be probability
        music: "music/wald.mp3",
        nodename: "Pilze",
        options: [
            {
                text: 'Pilze mitnehmen', // new inventory equipment
                setState: {mushrooms: true},
                nextText: 29
            }, {
                text: 'Pilze ignorieren',
                setState: {mushrooms: false},
                nextText: 27
            }
        ]
    },
    {
        id: 27,
        text: 'Du gehst weiter durch den Wald und siehst plötzlich einen blauen Apfelbaum. Pflügst du ein paar Äpfel?',
        type: "default",
        nodename: "Apfelbaum",
        options: [
            {
                text: 'Äpfel pflücken', // new inventory equipment
                setState: {apples: true},
                nextText: 31
            },
            {
                text: 'Äpfel ignorieren',
                setState: {apples: false},
                nextText: 6
            }
        ]
    },
    {
        id: 29,
        text: 'Auf deinem Pfad stolperst du. Du schaust zu Boden. Ein verrosteter Speer liegt dir zu Füßen. Hebst du ihn auf?',
        type: "default", //should be probability
        nodename: "Speer",
        options: [
            {
                text: 'Speer aufheben',
                setState: {spear: true}, // new inventory weapon
                nextText: 30
            },
            {
                text: 'Speer liegen lassen',
                setState: {spear: false},
                nextText: 31
            }
        ]
    },
    {
        id: 30,
        text: 'Mit deinem Sperr in der Hand und Pilzen im Rucksack wanderst du weiter durch den Wald. Die Sonne geht langsam unter. ' +
            'am boden siehst du etwas Leuchten. Du gehst hin. Es sind leuchtende Früchte. Nimmst du sie mit?',
        type: "default",
        nodename: "Früchte",
        options: [
            {
                text: 'Leuchtende Früchte mitnehmen',
                setState: {fruits: true}, // new inventory equipment
                nextText: 31
            },
            {
                text: 'Leuchtende Früchte nicht mitnehmen',
                setState: {fruits: false},
                nextText: 31
            }
        ]
    },
    {
        id: 31,
        text: 'Dein Weg endet bei einem Fluss. Was tust du?',
        type: "probabilityNode", // should be probability
        nodename: "Fluss",
        options: [
            {
                text: 'Fisch versuchen zu fangen',
                nextText: 32
            },
            {
                text: 'Fluss überqueren',
                nextText: 33
            },
            {
                text: 'Umkehren',
                nextText: 5
            }
        ]
    },
    {
        id: 33, //probability node player-dependent
        text: 'Beim Versuch den Fluss zu überqueren hält dich ein See Monster auf. Entweder du gibst dem Monster was zum essen oder es isst dich!',
        type: "probabilityNode", // should be probability
        nodename: "Monster",
        options: [
            {
                text: 'Pilze zum essen geben',
                requiredState: (currentState) => currentState.mushrooms, // requires to have certain equipment for this option
                setState: {mushrooms: false}, //give equipment away
                nextText: 36
            },
            {
                text: 'Äpfel zum essen geben',
                requiredState: (currentState) => currentState.apples, // requires to have certain equipment for this option
                setState: {apples: false}, //give equipment away
                nextText: 34
            },
            {
                text: 'Leuchtende Früchte zum essen geben',
                requiredState: (currentState) => currentState.fruits, // requires to have certain equipment for this option
                setState: {fruits: false}, //give equipment away
                nextText: 34
            },
            {
                text: 'Gar nichts (Rucksack ist leer oder einfach keine Lust)',
                nextText: 35
            }
        ]
    },
    {
        id: 35,
        text: 'Das Monster ist sauer und isst dich auf! Du bist tot.',
        type: "default",
        nodename: "ende",
        options: [
            {
                text: 'Restart',
                nextText: 0 //0 symbolises restarting the Game
            }
        ]
    },
    {
        id: 36,
        text: 'Du hast das Monster mit den Pilzen vergiftet! Es stirbt.',
        type: "default",
        nodename: "vergiften",
        options: [
            {
                text: 'weitergehen',
                nextText: 34
            }
        ]
    },
    {
        id: 32, //probability node player-dependent
        text: 'Du versuchst Fisch zu fangen',
        type: "default", // should be probability
        nodename: "Fish",
        options: [
            {
                text: 'Speer verwenden',
                requiredState: (currentState) => currentState.spear, // requires to have certain weapon for this option
                setState: {fish: true}, // new inventory equipment
                nextText: 34
            },
            {
                text: 'Mit den Händen fangen',
                setState: {fish: false},
                nextText: 34
            }
        ]
    },
    {
        id: 34, //probability node player-dependent
        text: 'Du gehst weiter durch den Wald und bekommst sehr starken Hunger. Was aus deinem Rucksack isst du? ',
        type: "default", // should be probability
        nodename: "Hunger",
        options: [
            {
                text: 'Pilze von unter der Fichte',
                requiredState: (currentState) => currentState.mushrooms, // requires to have certain equipment for this option
                setState: {mushrooms: false}, // eat inventory equipment
                nextText: 40
            },
            {
                text: 'Leuchtende Früchte',
                requiredState: (currentState) => currentState.fruits, // requires to have certain equipment for this option
                setState: {fruits: false}, // eat inventory equipment
                nextText: 38
            },
            {
                text: 'blaue Äpfel',
                requiredState: (currentState) => currentState.apples, // requires to have certain equipment for this option
                setState: {apples: false}, // eat inventory equipment
                nextText: 38
            },
            {
                text: 'Fische vom Fischfang',
                requiredState: (currentState) => currentState.fish, // requires to have certain equipment for this option
                setState: {fish: false}, // eat inventory equipment
                nextText: 38
            },
            {
                text: 'Gar nichts (Rucksack ist leer oder einfach keine Lust)',
                nextText: 37
            }
        ]
    },
    {
        id: 37,
        text: 'Du verhungerst und stirbst.',
        type: "default",
        nodename: "verhungert",
        options: [
            {
                text: 'restart',
                nextText: 0 //0 symbolises restarting the Game
            }
        ]
    },
    {
        id: 40,
        text: 'Die Pilze waren giftig. Du halluzinierst und stirbst.',
        type: "default",
        nodename: "Halluzinationen",
        options: [
            {
                text: 'restart',
                nextText: 0 //0 symbolises restarting the Game
            }
        ]
    },
    {
        id: 38,
        text: 'Dein Hunger ist gesättigt. Du bist am Ende des Waldes und siehst ein Schild mit zwei Richtungen.' +
            ' "Links: Schloss, Rechts: Marktplatz". Wohin gehst du?',
        type: "default",
        nodename: "Weggabelung",
        options: [
            {
                text: 'Nach Links',
                nextText: 3
            },
            {
                text: 'Nach Rechts',
                nextText: 4
            }
        ]
    },
    {
        id: 5,
        text: 'Du bist so tief im Wald. Du verirrst dich und findest nicht mehr raus. Plötzlich greift dich eine Schattengestalt aus dem Nichts an. Du stirbst.',
        type: "default",
        nodename: "Schatten",
        options: [
            {
                text: 'Restart',
                nextText: 0 //0 symbolises restarting the Game
            }
        ]
    },
    {
        id: 6,
        text: 'Du findest mitten im Wald ein einsames Restaurant.',
        // image: "https://img2.goodfon.com/original/1680x1050/7/39/anime-les-reka-dom.jpg",
        type: "default",
        nodename: "Restaurant",
        options: [
            {
                text: 'hineingehen',
                nextText: 8
            }, {
                text: 'ignorieren und weitergehen',
                nextText: 7
            }
        ]
    },
    {
        id: 7,
        text: 'Du hast solange im Wald nach Essen gesucht, dass du dich verlaufen hast. Du findest aus dem Wald nicht hinaus und stirbst an Hunger.',
        image: "https://s1.1zoom.me/big0/588/346054-blackangel.jpg",
        type: "default",
        nodename: "verlaufen",
        options: [
            {
                text: 'Restart',
                nextText: 0 //0 symbolises restarting the Game
            }
        ]
    },
    {
        id: 8,
        text: 'Das Restaurant ist fast voll. Drinnen bekommst du eine gute Mahlzeit. Plötzlich beginnen alle sich zu prügeln. Du bekommst einen auf den Deckel. Du wirst ohnmächtig.',
        image: "https://pnpnews.de/wp-content/uploads/2019/06/Eberron5e.jpg",
        type: "default",
        nodename: "Restaurant",
        options: [
            {
                text: 'Restart',
                nextText: 0
            }
        ]
    },
    {
        id: 4,
        text: 'Du befindest dich am Marktplatz. Der Marktplatz ist sehr belebt. Du hast verschiedene Sachen, die du dir ansehen kannst. Wohin gehst du?',
        image: "https://cdna.artstation.com/p/assets/images/images/020/107/772/large/samantha-kung-medieval-marketplace.jpg?1566397964",
        type: "probabilityNode",
        nodename: "Marktplatz",
        music: "music/marktplatz.mp3",
        options: [
            {
                text: 'Geschäft der Mystik',
                nextText: 9
            },
            {
                text: 'Schmiede des Marktplatzes für das allgemeine Volk',
                nextText: 10
            },
            {
                text: 'Schlafstube Ho-Tel',
                nextText: 11
            }
        ]
    },
    {
        id: 9,
        text: 'Im Geschäft der Mystik kannst du dir eines von drei Gegenständen leisten. Was kaufst du dir?',
        type: "default",
        nodename: "Mystik",
        options: [
            {
                text: 'Magic Carpet',
                setState: {magicCarpet: true}, //new inventory equipment
                nextText: 41
            },
            {
                text: 'Magic Lamp',
                setState: {magicLamp: true}, //new inventory equipment
                nextText: 41
            },
            {
                text: 'Magic Instrument',
                setState: {magicInstrument: true}, //new inventory equipment
                nextText: 41
            }
        ]
    },
    {
        id: 41, //probability node player-dependent
        text: 'Du gehst aus dem Geschäft raus und befindest dich wieder am Marktplatz. Möchtest du deinen Gegenstand verwenden?',
        type: "default", //should be probability
        nodename: "Gegenstand",
        options: [
            {
                text: 'Magic Carpet verwenden',
                requiredState: (currentState) => currentState.magicCarpet, // requires to have certain equipment for this option
                nextText: 42
            },
            {
                text: 'Magic Lamp verwenden',
                requiredState: (currentState) => currentState.magicLamp, // requires to have certain equipment for this option
                nextText: 43
            },
            {
                text: 'Magic Instrument verwenden',
                requiredState: (currentState) => currentState.magicInstrument, // requires to have certain equipment for this option
                nextText: 44
            },
            {
                text: 'Nein, den Gegenstand nicht verwenden',
                nextText: 45
            }
        ]
    },
    {
        id: 45,
        text: 'Ohne den Gegenstand verwendet zu haben stehst du weiter am Marktplatz. Was machst du?',
        type: "default",
        nodename: "Abenteuer",
        options: [
            {
                text: 'Zum Wald',
                nextText: 2
            },
            {
                text: 'Zum Schloss',
                nextText: 3
            },
            {
                text: 'Schmiede des Marktplatzes für das allgemeine Volk',
                nextText: 10
            },
            {
                text: 'Schlafstube Ho-Tel',
                nextText: 11
            }
        ]
    },
    {
        id: 43,
        text: 'Die Lampe verwandelt sich in eine gefährliche riesen Schlange und verschlingt dich. Du stirbst',
        type: "default",
        nodename: "Lampe",
        options: [
            {
                text: 'Restart',
                nextText: 0 //0 symbolises restarting the Game
            }
        ]
    },
    {
        id: 44,
        text: 'Die Musik die du spielst lässt dich auf die Größe einer Maus schrumpfen. Kaum realisierst du was passiert ist frisst dich eine Katze. Du bist tot.',
        type: "default",
        nodename: "Instrument",
        options: [
            {
                text: 'Restart',
                nextText: 0 //0 symbolises restarting the Game
            }
        ]
    },
    {
        id: 42,
        text: 'Der Magic Carpet erfordert hohes körperliches Geschick. Klicke den Button möglichst schnell um deine Fähigkeiten zu zeigen. Wohin willst du mit dem Magic Carpet fliegen?',
        type: "timeNode",
        nodename: "Teppich",
        options: [
            {
                text: 'Versuche zum Schloss zu kommen',
                nextText: 12
            },
            {
                text: 'Versuche das nächsten Dorf zu erreichen',
                nextText: 13
            }
        ]
    },
    {
        id: 12,
        text: 'Du fliegst mit dem Teppich zum Schloss.',
        nodename: "Schloss",

        type: "default",
        options: [
            {
                text: 'beim Schloss vom Teppich steigen',
                nextText: 3
            }
        ]
    },
    {
        id: 13,
        text: 'Du fällst vom schwarzen magischen Teppich bevor du im nächsten Dorf ankommen konntest und stirbst von der Fallhöhe.',
        type: "default",
        nodename: "fliegen",

        options: [
            {
                text: 'Restart',
                nextText: 0 //0 symbolises restarting the Game
            }
        ]
    },
    {
        id: 10,
        text: 'In der Marktschmiede kaufst du dir eine Waffe',
        nodename: "Marktschmiede",

        type: "default",
        options: [
            {
                text: 'Axt',
                setState: {axe: true},
                nextText: 28
            },
            {
                text: 'Schwert',
                setState: {sword: true},
                nextText: 28
            },
            {
                text: 'Ich kauf mir nichts. Mir reicht der Speer aus dem Wald',
                requiredState: (currentState) => currentState.spear, // requires to have certain weapon for this option
                nextText: 28
            }
        ]
    },
    {
        id: 28,
        text: 'Mit deiner neuen Waffe meldest du dich zu einem Kampf an. Du stehst einem grimmigen Axtkämpfer jetzt gegenüber.',
        nodename: "Kampf",

        type: "npcNode",
        stats: [
            {
                attack: 110,
            }
        ],
        options: [
            {
                text: 'Wie geht der Kampf aus?',
                nextText: 15
            },

            {
                text: 'kämpfen!',
                requiredState: (currentState) => currentState.spear, // requires to have certain weapon for this option
                nextText: 15
            }
        ]
    },
    {
        id: 11,
        text: 'Du hast dir ein Zimmer in der Schlafstube genommen. Du schläfst ein und wachst plötzlich wieder im Wald auf.',
        nodename: "Schlafstube",

        type: "default",
        options: [
            {
                text: 'aufwachen',
                nextText: 2
            }
        ]
    },
    {
        id: 14,
        text: 'Du erliegts deinen Verletzungen und stirbst!',
        nodename: "Kampf",

        type: "default",
        options: [
            {
                text: 'Restart',
                nextText: 0 //0 symbolises restarting the Game
            }
        ]
    },
    {
        id: 15,
        text: 'Du gewinnst den Kampf und bekommst 1000 Stück Gold',
        nodename: "Kampf",

        type: "default",
        options: [
            {
                text: 'Restart',
                nextText: 0 //0 symbolises restarting the Game
            }
        ]
    },
    {
        id: 3,
        text: 'Click!!! Das Schloss hat einen großen Fluss um sich herum, mit einer Mauer und einem einzigen Tor. Du versuchst den Fluss schwimmend zu überqueren. ' +
            'Stelle deine Schwimmfähigkeiten durch Button mashing unter Beweis! Klick bis die Benachrichtigung kommt.',
        image: "data:image/jpeg;base64,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",
        type: "timeNode",
        nodename: "Tor",
        music: "music/schloss.mp3",
        options: [

            {
                text: 'Hast du den Fluss überlebt?',
                nextText: 17
            },

        ]
    },
    /* {
        id: 16,
        text: 'Beim Versuch über die Mauer zu klettern denkt die Garde des Schlosses, dass du ein Eindringling bist. ' +
            'Sie schießen einen großen Pfeil auf dich und du stirbst.',
        nodename: "Mauer",

        type: "default",
        options: [
            {
                text: 'Restart',
                nextText: 0 //0 symbolises restarting the Game
            }
        ]
    }, */
    {
        id: 17,
        text: 'Nachdem du an der Tür angeklopft hast öffnet dir die Garde das Tor und die Königsfamilie möchte dich empfangen. ' +
            'Die Garde erlaubt dir entweder ein Schwert oder ein Schild zu nehmen. Dein nächster Schritt?',
        type: "npcNode",
        nodename: "Am Tor",

        items: [
            {
                item: "Schwert",
                image: "https://cdn.vegaoo.de/images/rep_art/gra/310/2/310207/mittelalterliches-krieger-schild-kostumzubehor-mittelalter-braun-40cm.jpg"
            },
            {
                item: "Schild",
                image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Trp-Sword-14226124129-v06.png/800px-Trp-Sword-14226124129-v06.png"
            },
            {
                item: "Helm",
                image: "http://atlas-content-cdn.pixelsquid.com/stock-images/helmet-medieval-aqOQEVC-600.jpg",
            },
        ],
        npc: "Königsfamilie",
        options: [
            {
                text: 'Die Königsfamilie darum bitten, dich zum Ritter zu schlagen',
                nextText: 18
            },
            {
                text: 'Dich als Schmied bei der Schmiede des Schlosses für die Köngigsfamilie bewerben',
                nextText: 19
            },
            {
                text: 'Dich für den Empfang bedanken und diesen annehmen',
                nextText: 21
            }
        ]
    },
    {
        id: 18,
        text: 'Der König willigt ein dich zum Ritter zu schlagen. Allerdings ist er dabei so besoffen, dass er ausruscht' +
            'und statt dich zum Ritter zu schlagen dabei dich ersticht und du stirbst.',
        type: "default",
        nodename: "König",

        options: [
            {
                text: 'Restart',
                nextText: 0 //0 symbolises restarting the Game
            }
        ]
    },
    {
        id: 19,
        text: 'Du hast die Bewerbung bestanden! Du arbeitest ab sofort für die Königsfamilie, have fun!',
        type: "default",
        nodename: "Bewerbung",

        options: [
            {
                text: 'Restart',
                nextText: 0 //0 symbolises restarting the Game
            }
        ]
    },
    {
        id: 21,
        text: 'Nach dem Empfang wirst du zum Abendessen eingeladen. Was trinkst du?',
        type: "default",
        nodename: "Abendessen",

        options: [
            {
                text: 'Wein',
                nextText: 20
            },
            {
                text: 'Wasser',
                nextText: 20
            },
            {
                text: 'Bier',
                nextText: 22
            }
        ]
    },
    {
        id: 20,
        text: 'Ohje! Das war eigentlich für den König gedacht aber es wurde vertauscht.' +
            ' Beim Versuch den König zu vergiften wurdest du vergiftet.' +
            'Du stirbst',
        type: "default",
        nodename: "tödliche Verwechslung",

        options: [
            {
                text: 'Restart',
                nextText: 0 //0 symbolises restarting the Game
            }
        ]
    },
    {
        id: 22,
        text: 'Weiter zum Essen. Erbsen oder Schnitzel zuerst?',
        nodename: "Essen",

        type: "default",
        options: [
            {
                text: 'Erbsen',
                nextText: 20
            },
            {
                text: 'Schnitzel',
                nextText: 24
            }
        ]
    },
    {
        id: 24,
        text: 'Du bist fertig mit dem Essen und bist vom Schloss hinausgegangen. Jetzt befindest du dich im Gelände des Schlosses.' +
            'Wohin willst du als nächstes gehen?',
        type: "default",
        nodename: "Essen",

        options: [
            {
                text: 'Wieder zurück zum Marktplatz',
                nextText: 4
            },
            {
                text: 'Den Wald jetzt erkunden',
                nextText: 2
            },
            {
                text: 'Schloss Gelände erkunden',
                nextText: 25
            }
        ]
    },
    {
        id: 25,
        text: 'Du schaust dich im Gelände des Schlosses um und möchtest gerne etwas unternehmen:',
        type: "default",
        nodename: "Schloss",

        options: [
            {
                text: 'Zur Schmiede der Königsfamilie gehen und dich als Schmied bewerben',
                nextText: 19
            },
            {
                text: 'spazieren',
                nextText: 23
            },
            {
                text: 'schwimmen',
                nextText: 26
            }
        ]
    },
    {
        id: 23,
        text: 'Du gehst beim Gelände spazieren und dir passiert weiter nichts. Das Spiel ist zu Ende und das ist die langweiligste Option',
        type: "default",
        nodename: "Schloss",
        options: [
            {
                text: 'Restart',
                nextText: 0 //0 symbolises restarting the Game
            }
        ]
    },
    {
        id: 26,
        text: 'Im Fluss zum Spaß zu schwimmen welcher das Schloss bewacht ist keine kluge Idee. Ein Alligator zerfleischt dich und du stirbst.',
        type: "default",
        nodename: "Fluss",

        options: [
            {
                text: 'Restart',
                nextText: 0 //0 symbolises restarting the Game
            }
        ]
    }
]
export const FantasyStory = dataset;