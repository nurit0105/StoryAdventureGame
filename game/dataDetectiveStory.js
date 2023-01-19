const dataset = [
    {
        id: 1,
        text: 'Willkommen beim Detective Game. Dieses Spiel ist unser Nebenspiel und wird noch verbessert.' +
            'Alle Hauptfunktionen (Buttons) sollten Funktionieren. Viel Spaß beim Beta-Testen. Deine Aktionen haben Konsequenzen. ' +
            'Du sitzt in deinem Detektiv-Büro und CASE H kommt rein.' +
            'Nimmst du dich dem Mordfall an? (TW: Mord, Blut, Gewalt)',
        type: "default",
        nodename: "Detektiv Büro",
        options: [
            {
                text: 'Ja',
                nextText: 3
            }, {
                text: 'Nein',
                nextText: 2
            }
        ]
    },
    {
        id: 2,
        text: 'Ist eine Detektiv-Story nichts für dich? Probier es vielleicht mit unserem Fantasy Game.',
        type: "default",
        nodename: "another Game?",
        options: [
            {
                text: 'restart',
                nextText: 0
            }
        ]
    },
    {
        id: 3,
        text: 'Der Case H bringt dich in ein Hotelzimmer. Im Hotelzimmer liegt ein Mann ermordet. Noch ist nicht festgestellt was die Mordwaffe ist' +
            'oder wer für diese Tat verantwortlich ist. Wo suchst du nach Hinweisen?',
        type: "default",
        nodename: "Hotelzimmer",
        options: [
            {
                text: 'Zeugen befragen',
                nextText: 4
            }, {
                text: 'Im Hotelzimmer umschauen',
                nextText: 5
            }, {
                text: 'Leiche genauer anschauen',
                nextText: 6
            }
        ]
    },
    {
        id: 4,
        text: 'Wen möchtest du zu den Geschehnissen befragen?',
        type: "default",
        nodename: "Interviews",
        options: [
            {
                text: 'Putzkraft',
                nextText: 411
            }, {
                text: 'Hotel-Rezeption',
                nextText: 412
            }
        ]
    },
    {
        id: 411,
        text: 'Soweit ich weiß war er übers Wochenende da. Jeden Morgen bin ich gekommen um sein Zimmer, so wie alle Zimmer, zu putzen.' +
            'Am ersten Morgen vor seiner Anreise, gestern und naja heute bevor ich aufräumen konnte hab ich ihn tot gefunden.',
        type: "default",
        nodename: "Putzkraft",
        options: [
            {
                text: 'Ist Ihnen etwas bestimmtes aufgefallen?',
                nextText: 4111
            },
            {
                text: 'Danke für Ihre Zeit. Ich befrage jetzt die Hotel-Rezeption',
                nextText: 412
            },
            {
                text: 'Mord auflösen',
                nextText: 99
            }
        ]
    },
    {
        id: 4111,
        text: 'Es war jedes Mal extrem unaufgeräumt. Ich glaub er hatte sehr viel Besuch. Männlichen. Weiblichen. Viel Besuch. Das ist alles was ich weiß',
        type: "default",
        nodename: "Putzkraft",
        options: [
            {
                text: 'Danke für Ihre Zeit, ich befrage jetzt die Hotel-Rezeption',
                nextText: 412
            },
            {
                text: 'Danke für Ihre Zeit, ich gehe und schaue mir das Hotel Zimmer an',
                nextText: 5
            },
            {
                text: 'Danke für Ihre Zeit, ich gehe und schaue mir die Leiche an',
                nextText: 6
            },
            {
                text: 'Mord auflösen',
                nextText: 99
            }
        ]
    },
    {
        id: 412,
        text: 'Schrecklich für den Ruf unseres Hotels. Schrecklich, Schrecklich und einfach nur Furchtbar. Wir werden weniger Kunden in den nächsten' +
            'Monaten haben. Schrecklich.',
        type: "default",
        nodename: "Rezeption",
        options: [
            {
                text: 'Ist Ihnen etwas bestimmtes aufgefallen?',
                nextText: 4121
            }, {
                text: 'Danke für Ihre Zeit. Ich befrage jetzt die Putzkraft.',
                nextText: 411
            }, {
                text: 'Mord auflösen',
                nextText: 99
            }
        ]
    },
    {
        id: 4121,
        text: 'Es war seine Frau, Mrs. Roberta Tent zu besuch, ein Herr, ein Junge - vielleicht sein Sohn - und eine junge Frau. ' +
            'Alles Verdächtige. Von den anderen weiß ich die Namen nicht.',
        type: "default",
        nodename: "Rezeption",
        options: [
            {
                text: 'Danke für Ihre Zeit, ich befrage jetzt die Putzkraft',
                nextText: 411
            },
            {
                text: 'Danke für Ihre Zeit, ich gehe und schaue mir das Hotel Zimmer an',
                nextText: 5
            },
            {
                text: 'Danke für Ihre Zeit, ich gehe und schaue mir die Leiche an',
                nextText: 6
            },
            {
                text: 'Mord auflösen',
                nextText: 99
            }
        ]
    },
    {
        id: 5,
        text: 'Wo im Hotelzimmer willst du dich umschauen?',
        type: "default",
        nodename: "Hotelzimmer",
        options: [
            {
                text: 'Zum Bett',
                nextText: 51
            },
            {
                text: 'Zum Schreibtisch',
                nextText: 52
            },
            {
                text: 'Ins Badezimmer',
                nextText: 53
            }
        ]
    },
    {
        id: 51,
        text: 'Neben dem Bett ist am Boden eine zerschmetterte Nachttischlampe. Viele Scherben liegen rum.',
        type: "default",
        nodename: "Bett",
        options: [
            {
                text: 'Scherben einsammeln',
                setState: {lampFragment: true},
                nextText: 511
            },
            {
                text: 'Zum Schreibtisch',
                nextText: 52
            },
            {
                text: 'Ins Badezimmer',
                nextText: 53
            },
            {
                text: 'Mord auflösen',
                id: 99
            }
        ]
    },
    {
        id: 511,
        text: 'Die Scherben gehören nun zu deinen Beweismittel. Wie geht es weiter?',
        type: "default",
        nodename: "Scherben",
        options: [
            {
                text: 'Zum Schreibtisch',
                nextText: 52
            },
            {
                text: 'Ins Badezimmer',
                nextText: 53
            },
            {
                text: 'Leiche genauer anschauen',
                nextText: 6
            },
            {
                text: 'Zeugen befragen',
                nextText: 4
            },
            {
                text: 'Mord auflösen',
                nextText: 99
            }
        ]
    },
    {
        id: 52,
        text: 'Beim Schreibtisch siehst du zwei Whiskey Gläser, aber keine Flasche. In dem einem Glas ist noch ca. ein Schluck übrig.',
        type: "default",
        nodename: "Schreibtisch",
        options: [
            {
                text: 'Schluck trinken',
                setState: {whiskey: false},
                nextText: 521
            },
            {
                text: 'Schluck in ein Reagenzglas geben und einsammeln',
                setState: {whiskey: true},
                nextText: 522
            },
            {
                text: 'Zum Bett',
                nextText: 51
            },
            {
                text: 'Ins Badezimmer',
                nextText: 53
            },
            {
                text: "Mord auflösen",
                nextText: 99
            }
        ]
    },
    {
        id: 521,
        text: 'Ohje! Das war ein Nuss-Whiskey und du bist extrem stark allergisch. Du stirbst.',
        type: "default",
        nodename: "Sterben",
        options: [
            {
                text: 'restart',
                nextText: 0
            }
        ]
    },
    {
        id: 522,
        text: 'Das Reagenzglas gehört nun zu deinen Beweismitteln. Wie geht es weiter?',
        type: "default",
        nodename: "Reagenzglas",
        options: [
            {
                text: 'Zum Bett',
                nextText: 51
            },
            {
                text: 'Ins Badezimmer',
                nextText: 53
            },
            {
                text: 'Leiche genauer anschauen',
                nextText: 6
            },
            {
                text: 'Zeugen befragen',
                nextText: 4
            },
            {
                text: 'Mord auflösen',
                nextText: 99
            }
        ]
    },
    {
        id: 53,
        text: 'Beim Waschbecken des Badezimmers liegt eine Nagelpfeile mit Blut.',
        nodename: "Nagelpfeile",
        type: "default",
        options: [
            {
                text: 'Nagelpfeile einsammeln',
                setState: {nailFile: true},
                nextText: 531
            },
            {
                text: 'Zum Schreibtisch',
                nextText: 52
            },
            {
                text: 'Zum Bett',
                nextText: 51
            },
            {
                text: 'Mord auflösen',
                id: 99
            }
        ]
    },
    {
        id: 531,
        text: 'Die Nagelpfeile gehören nun zu deinen Beweismittel. Wie geht es weiter?',
        type: "default",
        nodename: "Beweismittel",
        options: [
            {
                text: 'Zum Schreibtisch',
                nextText: 52
            },
            {
                text: 'Zum Bett',
                nextText: 51
            },
            {
                text: 'Leiche genauer anschauen',
                nextText: 6
            },
            {
                text: 'Zeugen befragen',
                nextText: 4
            },
            {
                text: 'Mord auflösen',
                nextText: 99
            }
        ]
    },
    {
        id: 6,
        text: 'Du stehst über der Leiche. Was schaust du dir genauer an?',
        type: "default",
        nodename: "Leiche",
        options: [
            {
                text: 'Den Kopf anschauen',
                nextText: 61
            },
            {
                text: 'Die Taschen anschauen',
                nextText: 62
            },
            {
                text: 'Den Bauchraum anschauen',
                nextText: 63
            }
        ]
    },
    {
        id: 61,
        text: 'Die Augen sind voller Angst. Der Mund ist blau angelaufen.',
        type: "default",
        nodename: "Gesicht",
        options: [
            {
                text: 'Genug Info. Im Zimmer umschauen.',
                nextText: 5
            },
            {
                text: 'Genug Info. Zeugen befragen.',
                nextText: 4
            },
            {
                text: 'Die Taschen anschauen',
                nextText: 62
            },
            {
                text: 'Den Bauchraum anschauen',
                nextText: 63
            },
            {
                text: 'Mord auflösen',
                nextText: 99
            }
        ]
    },
    {
        id: 62,
        text: 'Der Mann hat einen Ausweis. Sein Name ist Mr. John Tent und er ist Pilot. Er ist 45 Jahre alt.',
        type: "default",
        nodename: "Ausweis",
        options: [
            {
                text: 'Genug Info. Im Zimmer umschauen.',
                nextText: 5
            },
            {
                text: 'Genug Info. Zeugen befragen.',
                nextText: 4
            },
            {
                text: 'Den Kopf anschauen',
                nextText: 61
            },
            {
                text: 'Den Bauchraum anschauen',
                nextText: 63
            },
            {
                text: 'Mord auflösen',
                nextText: 99
            }
        ]
    },
    {
        id: 63,
        text: 'Der Mann hat eine Stechwunde. Wohl möglich dadurch gestorben.',
        type: "default",
        nodename: "Wunde",
        options: [
            {
                text: 'Genug Info. Im Zimmer umschauen.',
                nextText: 5
            },
            {
                text: 'Genug Info. Zeugen befragen.',
                nextText: 4
            },
            {
                text: 'Den Kopf anschauen',
                nextText: 61
            },
            {
                text: 'Die Taschen anschauen',
                nextText: 62
            },
            {
                text: 'Mord auflösen',
                nextText: 99
            }
        ]
    },
    {
        id: 99,
        text: 'Du möchtest den Mord auflösen. Hierbei musst du Tatwaffe und Mörder:in nennen. Falls du Beweismittel hast' +
            'darfst du eines davon der Forensik geben. Für mehr haben sie keine Zeit. (Keine Beweismittel = Keine Forensik)',
        type: "default",
        nodename: "Option Forensik",
        options: [
            {
                text: 'Beweismittel der Forensik geben',
                requiredState: (currentState) => currentState.lampFragment,
                nextText: 110
            },
            {
                text: 'Beweismittel der Forensik geben',
                requiredState: (currentState) => currentState.whiskey,
                nextText: 111
            },
            {
                text: 'Beweismittel der Forensik geben',
                requiredState: (currentState) => currentState.nailFile,
                nextText: 112
            },
            {
                text: 'Weiter zur Tatwaffe',
                nextText: 100
            }
        ]
    },
    {
        id: 110,
        text: 'An der Lampenscherbe wurden Haare gefunden. Sie gehören Mrs. Roberta Tent',
        type: "default",
        nodename: "Haare",
        options: [
            {
                text: 'Weiter zur Tatwaffe',
                nextText: 100
            }
        ]
    },
    {
        id: 111,
        text: 'Der Whiskey ist unauffällig. Leider keine Spuren auf Gift oder ähnliches. Der Whiskey stammt aus 1867 mit Nuss-Geschmack',
        type: "default",
        nodename: "Whiskey",
        options: [
            {
                text: 'Weiter zur Tatwaffe',
                nextText: 100
            }
        ]
    },
    {
        id: 112,
        text: 'Auf der Nagelpfeile waren Blutspuren. Person konnte nicht identifiziert werden, aber das Alter. Ca. 25 Jahre alt',
        nodename: "Blutspur",
        type: "default",

        options: [
            {
                text: 'Weiter zur Tatwaffe',
                nextText: 100
            }
        ]
    },
    {
        id: 100,
        text: 'Was war die Tatwaffe?',
        type: "default",
        nodename: "Tatwaffe",
        options: [
            {
                text: 'Ein Messer',
                nextText: 103
            },
            {
                text: 'Die Nagelpfeile aus dem Bad',
                requiredState: (currentState) => currentState.nailFile,
                nextText: 102
            },
            {
                text: 'Die Glasscherbe von der Lampe',
                requiredState: (currentState) => currentState.lampFragment,
                nextText: 102
            },
            {
                text: 'Der Whiskey vom Schreibtisch',
                requiredState: (currentState) => currentState.whiskey,
                nextText: 102
            },
            {
                text: 'Die fehlende Flasche vom Whiskey',
                nextText: 102
            },
            {
                text: 'Eine Pistole',
                nextText: 102
            }
        ]
    },
    {
        id: 102,
        text: 'Die Tatwaffe ist nicht die Richtige. Die Beweislage ist sehr gering.' +
            'Wenn du das folgende Rätsel richtig errätst darfst du noch die Person erraten.' +
            '"Wenn ein Schläger und ein Ball gemeinsam 1,10€ kosten und der Schläger genau 1,00€' +
            'mehr als der Ball kostet, was kostet der Ball?',
        type: "default",
        nodename: "falsche Waffe",
        options: [
            {
                text: '10 cent',
                nextText: 104
            },
            {
                text: '5 cent',
                nextText: 105
            },
            {
                text: '50 cent',
                nextText: 104
            }
        ]
    },
    {
        id: 104,
        text: 'Leider falsch. Du hast im Case H versagt.',
        type: "default",
        nodename: "verloren",
        options: [
            {
                text: 'restart',
                nextText: 0
            }
        ]
    },
    {
        id: 105,
        text: '5 cent is korrekt. Die eigentliche Tatwaffe war das Messer. Du darfst die Person erraten.',
        type: "default",
        nodename: "richitg",
        options: [
            {
                text: 'Person erraten',
                nextText: 103
            }
        ]
    },
    {
        id: 103,
        text: 'Wer hat mit dem Messer den Piloten John Tent umgebracht?',
        type: "default",
        nodename: "Mörder?",
        options: [
            {
                text: 'Seine Ehefrau',
                nextText: 120
            },
            {
                text: 'Ein unbekannter Mann der in seinem Zimmer war',
                nextText: 121
            },
            {
                text: 'Ein Junger Mann der vielleicht sein Sohn ist',
                nextText: 120
            },
            {
                text: 'Eine unbekannte Frau die in seinem Zimmer war',
                nextText: 120
            },
            {
                text: 'Der Rezeptionist',
                nextText: 120
            },
            {
                text: 'Die Putzkraft',
                nextText: 120
            }
        ]
    },
    {
        id: 120,
        text: 'Die Person die du beschuldigt hast wurde im Richtersaal unschuldig gesprochen. Dein Ruf als Detektiv ist stark gesunken. Keine Weiteren Fälle für dich.',
        type: "default",
        nodename: "unschuldig",
        options: [
            {
                text: 'restart',
                nextText: 0
            }
        ]
    },
    {
        id: 121,
        text: 'Korrekt. Der unbekannte Mann hat den Piloten John Tent mit einem Messer umgebracht',
        type: "default",
        nodename: "schuldig",
        options: [
            {
                text: 'Motiv auflösung',
                nextText: 122
            },
            {
                text: 'Skippen und Spiel beenden',
                nextText: 0
            }
        ]
    },
    {
        id: 122,
        text: 'John Tent ist Pilot. Er hatte einen Wochenendaufenthalt in der Stadt. Seine Frau und sein Sohn leben in dieser Stadt. ' +
            'Zurzeit läuft die Scheidung zwischen ihm und seiner Frau - bald Ex-Frau. Roberta Tent kam am Freitag Mittag zu besuch, um über die Scheidung zu reden. ' +
            'Es endete in einer großen Diskussion und schmeißt vor lauter Wut die Lampe zu boden und verschwindet wieder. Die Co-Pilotin Steffanie Muphli kam am ersten Abend' +
            'zu besuch. John Tent und Steffanie Muphli hatten ein Verhältnis. Samstag Mittag kam sein Sohn zu Besuch. Auch er wollte schauen wie es seinem Vater geht.' +
            'Als er ins Bad ging um seine Nägel zu pfeilen hat er nicht aufgepasst und sich aus versehen ein bisschen geschnitten. Nach dem Besuch bei seinem Vater ist er wieder nach' +
            'Hause gegangen. Samstag Nacht kam ein Mann zu Besuch. John Tent ließ ihn rein, weil dieser Mann einer seiner Stewards war. ' +
            'Der Mann führte anfangs ein normales Gespräch bei Whiskey mit John Tent und hatte ein Messer in seiner Hosentasche versteckt.' +
            'Und dann nahm er das Messer und stach auf John Tent ein. Der Grund: Eifersucht. Steffanie Muphli ist doch seine Freundin.' +
            'Erschrocken darüber was er gerade getan hat steckte er das Messer wieder ein und nahm die Whiskey Flasche zum trinken mit. Danke Detektiv, du hast den Fall gelöst',
        type: "default",
        nodename: "Auflösung",
        options: [
            {
                text: 'restart',
                nextText: 0
            }
        ]
    }
]
export const DetectiveStory = dataset;