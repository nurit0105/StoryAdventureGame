const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

function startGame() {
    state = {}
    showTextNode(1)
}

function showTextNode(textNodeIndex) {
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
    textElement.innerText = textNode.text
    while (optionButtonsElement.firstChild) {
        optionButtonsElement.removeChild(optionButtonsElement.firstChild)
    }
    textNode.options.forEach(option => {
        if (showOption(option)) {
            const button = document.createElement('button')
            button.innerText = option.text
            button.classList.add('btn')
            button.addEventListener('click', () => selectOption(option))
            optionButtonsElement.appendChild(button)
        }
    })
}

function showOption(option) {
    return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
    const nextTextNodeId = option.nextText
    state = Object.assign(state, option.setState)

    if (nextTextNodeId <= 0) { //Everything equal or smaller than 0 restarts the Game
        return startGame()
    }
    showTextNode(nextTextNodeId)

}

const textNodes = [
    {
        id: 1,
        text: 'Willkommen beim Fantasy Adventure Game. Es ist dein erster Tag im neuen Dorf und du befindest dich am Marktplatz. Wohin willst du?',
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
        options: [
            {
                text: 'Restart',
                nextText: -1 //-1 symbolises restarting the Game
            }
        ]
    },
    {
        id: 6,
        text: 'Du findest mitten im Wald ein einsames Restaurant.',
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
        options: [
            {
                text: 'Restart',
                nextText: -1 //-1 symbolises restarting the Game
            }
        ]
    },
    {
        id: 8,
        text: 'Das Restaurant ist fast voll. Drinnen bekommst du eine gute Mahlzeit. Plötzlich beginnen alle sich zu prügeln. Der Ausgang ist blockiert. Du siehst einen Tunnel in der Ecke',
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
        options: [
            {
                text: 'Restart',
                nextText: -1 //-1 symbolises restarting the Game
            }
        ]
    },
    {
        id: 14,
        text: 'Du verlierst beim Kampf und stirbst!',
        options: [
            {
                text: 'Restart',
                nextText: -1 //-1 symbolises restarting the Game
            }
        ]
    },
    {
        id: 15,
        text: 'Du gewinnst den Kampf und bekommst 1000 Stück Gold',
        options: [
            {
                text: 'Restart',
                nextText: -1 //-1 symbolises restarting the Game
            }
        ]
    },
    {
        id: 3,
        text: 'Das Schloss hat einen großen Fluss um sich herum, mit einer Mauer und einem einzigen Tor. Wie kommst du rein?',
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
        options: [
            {
                text: 'Restart',
                nextText: -1 //-1 symbolises restarting the Game
            }
        ]
    },
    {
        id: 17,
        text: 'Nachdem du an der Tür angeklopft hast öffnet dir die Garde das Tor und die Königsfamilie möchte dich empfangen. Dein nächster Schritt?',
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
        options: [
            {
                text: 'Restart',
                nextText: -1 //-1 symbolises restarting the Game
            }
        ]
    },
    {
        id: 19,
        text: 'Du hast die Bewerbung bestanden! Du arbeitest ab sofort für die Königsfamilie, have fun!',
        options: [
            {
                text: 'Restart',
                nextText: -1 //-1 symbolises restarting the Game
            }
        ]
    },
    {
        id: 21,
        text: 'Nach dem Empfang wirst du zum Abendessen eingeladen. Was trinkst du?',
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
        options:[
            {
                text: 'Restart',
                nextText: -1 //-1 symbolises restarting the Game
            }
        ]
    },
    {
        id: 22,
        text: 'Weiter zum Essen. Erbsen oder Schnitzel zuerst?',
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
        options: [
            {
                text: 'Restart',
                nextText: -1 //-1 symbolises restarting the Game
            }
        ]
    },
    {
        id: 26,
        text: 'Im Fluss zu schwimmen welcher das Schloss bewacht ist keine kluge Idee. Ein Alligator zerfleischt dich und du stirbst.',
        options: [
            {
                text: 'Restart',
                nextText: -1 //-1 symbolises restarting the Game
            }
        ]
    }
]

startGame()