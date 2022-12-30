const dataset = [
    {
        id: 1,
        text: 'Willkommen beim Fantasy Adventure Game. Es ist dein erster Tag im neuen Dorf und du befindest dich am Marktplatz. Wohin willst du?',
        image: "https://us.123rf.com/450wm/algolonline/algolonline1211/algolonline121100006/16245775-medieval-oder-fantasy-stadtplatz-und-marktplatz-3d-%C3%BCbertrug-digital-abbildung.jpg",
        type: "default",
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
        text: 'Du läufst durch den Wald und findest Pilze. Hebst du sie auf?',
        image: "https://www.tierwelt.ch/fileadmin/user_upload/tierwelt/artikel-bilder/woodwing/18-2022/88324be8351701e4a2e08bb2e9801331a7edc59865c4ad6b6994b97d143ea5cc.jpg",
        type: "default",
        options: [
            {
                text: 'Pilze mitnehmen',
                setState: {mushrooms: true},
                nextText: 27
            }, {
                text: 'Pilze ignorieren',
                setState: {mushrooms: false},
                nextText: 27
            }
        ]
    },
    {
        id: 27,
        text: 'Du bekommst sehr starken Hunger!',
        image: "https://medlexi.de/images/thumb/Hunger.jpg/400px-Hunger.jpg",
        type: "default",
        options: [
            {
                text: 'Die gesammelten Pilze essen',
                requiredState: (currentState) => currentState.mushrooms,
                setState: {mushrooms: false},
                nextText: 5
            },
            {
                text: 'Im Wald nach Essen suchen',
                nextText: 6
            }
        ]
    },
    {
        id: 5,
        text: 'Die Pilze waren giftig! Du halluzinierst und stirbst.',
        image: "https://thumbs.dreamstime.com/b/t%C3%BCr-zu-den-halluzinationen-buntes-licht-und-pilze-190072429.jpg",
        type: "default",
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
        text: 'Du kaufst dir einen magischen schwarzen Teppich und entscheidest dich mit dem Teppich weiter zu fliegen',
        type: "default",
        options: [
            {
                text: 'zum Schloss reisen',
                nextText: 12
            },
            {
                text: 'zum nächsten Dorf reisen',
                nextText: 13
            }
        ]
    },
    {
        id: 10,
        text: 'In der Marktschmiede kaufst du dir eine Waffe',
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
            }
        ]
    },
    {
        id: 28,
        text: 'Mit deiner neuen Waffe meldest du dich zu einem Kampf an. Du stehst deinem Gegner jetzt gegenüber.',
        type: "default",
        options: [
            {
                text: 'kämpfen!',
                requiredState: (currentState) => currentState.axe,
                nextText: 14
            },
            {
                text: 'kämpfen!',
                requiredState: (currentState) => currentState.sword,
                nextText: 15
            }
        ]
    },
    {
        id: 11,
        text: 'Du hast dir ein Zimmer in der Schlafstube genommen. Du schläfst ein und wachst plötzlich wieder im Wald auf.',
        type: "default",
        options: [
            {
                text: 'aufwachen',
                nextText: 2
            }
        ]
    },
    {
        id: 12,
        text: 'Du fliegst mit dem Teppich zum Schloss.',
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
        options: [
            {
                text: 'Restart',
                nextText: 0 //0 symbolises restarting the Game
            }
        ]
    },
    {
        id: 14,
        text: 'Du verlierst beim Kampf und stirbst!',
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
            ' Beim Verssuch den König zu vergiften wurdest du vergiftet.' +
            'Du stribst',
        type: "default",
        options:[
            {
                text: 'Restart',
                nextText: 0 //0 symbolises restarting the Game
            }
        ]
    },
    {
        id: 22,
        text: 'Weiter zum Essen. Erbsen oder Schnitzel zuerst?',
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
        options: [
            {
                text: 'Restart',
                nextText: 0 //0 symbolises restarting the Game
            }
        ]
    }
]
export const textNodes = dataset;