//======== TITLE LOOP ======= //

// Eksport og deklaration af ES6 classen og laver variabler i constructoren
// Variabler til begge output: forside og mette østberg side
// titles[] Array med Mette's uddannelses titler, som skal skiftes ud med hinanden i et loop
export default class TitleLoop {
    constructor() {
        this.output = document.querySelector("#title-output")
        this.outputMette = document.querySelector("#title-output-mette")
        this.titles = [
            "ÆDELMETALFORMGIVER",
            "KUNSTHÅNDVÆRKER",
            "GULDSMED",
            "PRODUKT DESIGNER"
        ]
    }


    // function LoopTitles som bliver kaldt fra functionen infLoop fra main.js
    // Her laver vi et for loop ud fra længden af titles-arrayet, hved ver iteration er der en timeout function,
    // som delayer hver iteration med 3000ms = 3sek, så hver titel fra arrayet bliver vist i 3 sek.
    // Denne function bliver så loopet ved hjælp af infLoop så det kører hele tiden.
    LoopTitles() {
        let titles = this.titles
        let output = this.output
        let outputMette = this.outputMette
        for (let i = 0; i < titles.length; i++) {
            setTimeout(function timer() {
                output.innerHTML = titles[i]
                outputMette.innerHTML = titles[i]
            }, i * 3000);
        }

    }


}
