//Importerer ES6 classes 

import SpaService from "./spa-service.js";
import TitleLoop from "./title-loop.js";

let _titleLoop = new TitleLoop();
let _spaService = new SpaService("forside");

// En function der der skal mimic et "infinite loop"
// Dette bliver brugt til title-loopet anvendt på både forsiden og metteøstberg siden
// Det er en simpelt for loop med som kører 1000 gange før den stopper
// Der er en setTimeout som kalder functionen LoopTitles() fra classen / title-loop.js, med et delay på 12000ms = 12 sek
function infLoop() {
    for (let n = 0; n < 1000; n++) {
        setTimeout(function timer() {
            _titleLoop.LoopTitles();
        }, n * 12000);
    }
}
// Kalder infLoop, når main.js bliver loadet
infLoop();

// vores SPA pagechange.
window.pageChange = function () {
    _spaService.pageChange();
}

// På vores burger-bar i HTML har vi tilføjet en onClick funtion der bliver udformet her
// Ved click på burgerbar toggler vi classen "active", der gør vores menu
// bliver vist frem på siden.
// samtidigt vil vores burger-btn toggle classen "open" der ændrer fra burger og til et kryds med animationer.

window.bigMac = function () {
    let bar = document.getElementById("burgerbar");
    bar.classList.toggle("active");

    let btn = document.getElementById("burger-btn")
    btn.classList.toggle("open")
}