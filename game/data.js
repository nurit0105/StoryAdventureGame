const dataset = [
    {
        id: 1,
        text: 'Willkommen beim Fantasy Adventure Game. Es ist dein erster Tag im neuen Dorf und du befindest dich am Marktplatz. Wohin willst du?',
        type: "default",
        nodename: "Start",
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
        type: "default", //should be probability
        nodename: "Wald",
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
        image: "https://medlexi.de/images/thumb/Hunger.jpg/400px-Hunger.jpg",
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
        text: 'Dein Weg endet bei einem See. Was tust du?',
        type: "default", // should be probability
        nodename: "See",
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
        type: "default", // should be probability
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
        nodename: "sterben",
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
        nodename: "tot",
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
        image: "https://img2.goodfon.com/original/1680x1050/7/39/anime-les-reka-dom.jpg",
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
        nodename: "Wald",
        options: [
            {
                text: 'Restart',
                nextText: 0 //0 symbolises restarting the Game
            }
        ]
    },
    {
        id: 8,
        text: 'Das Restaurant ist fast voll. Drinnen bekommst du eine gute Mahlzeit. Plötzlich beginnen alle sich zu prügeln. Der Ausgang ist blockiert. Du siehst einen Tunnel in der Ecke',
        image: "https://pnpnews.de/wp-content/uploads/2019/06/Eberron5e.jpg",
        type: "default",
        nodename: "Restaurant",
        options: [
            {
                text: 'durch den Tunnel gehen',
                nextText: 4
            }
        ]
    },
    {
        id: 4,
        text: 'Du befindest dich am Marktplatz. Der Marktplatz ist sehr belebt. Du hast verschiedene Sachen, die du dir ansehen kannst. Wohin gehst du?',
        type: "default",
        nodename: "Marktplatz",

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
        nodename: "Abendteuer",
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
        text: 'Wohin willst du mit dem Magic Carpet fliegen?',
        type: "default",
        nodename: "Teppich",
        options: [
            {
                text: 'Zum Schloss',
                nextText: 12
            },
            {
                text: 'Zum nächsten Dorf',
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
        nodename: "Dorf",

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
        text: 'Mit deiner neuen Waffe meldest du dich zu einem Kampf an. Du stehst deinem Gegner jetzt gegenüber.',
        nodename: "Kampf",

        type: "npcNode",
        stats: [
            {
                attack: 110,
            }
        ],
        options: [
            {
                text: 'kämpfen!',
                nextText: 14
            },
            {
                text: 'kämpfen!',
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
        text: 'Du verlierst beim Kampf und stirbst!',
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
        text: 'Das Schloss hat einen großen Fluss um sich herum, mit einer Mauer und einem einzigen Tor. Wie kommst du rein?',
        type: "default",
        nodename: "Tor",

        options: [
            {
                text: 'Über die Mauer klettern',
                nextText: 16
            },
            {
                text: 'Am Tor anklopfen',
                nextText: 17
            },
            {
                text: 'gar nicht. Ich kehre wieder um.',
                nextText: 4
            }
        ]
    },
    {
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
    },
    {
        id: 17,
        text: 'Nachdem du an der Tür angeklopft hast öffnet dir die Garde das Tor und die Königsfamilie möchte dich empfangen. Dein nächster Schritt?',
        type: "npcNode",
        nodename: "Tür",

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
                item: "Schwert",
                image: "https://cdn.vegaoo.de/images/rep_art/gra/310/2/310207/mittelalterliches-krieger-schild-kostumzubehor-mittelalter-braun-40cm.jpg"
            },
            {
                item: "Schwert",
                image: "https://cdn.vegaoo.de/images/rep_art/gra/310/2/310207/mittelalterliches-krieger-schild-kostumzubehor-mittelalter-braun-40cm.jpg"
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
            'Du stribst',
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
        text: 'Im Fluss zu schwimmen welcher das Schloss bewacht ist keine kluge Idee. Ein Alligator zerfleischt dich und du stirbst.',
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
export const textNodes = dataset;