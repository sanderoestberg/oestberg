import SpaService from "./spa-service.js";
import TitleLoop from "./title-loop.js";

let _titleLoop = new TitleLoop();
let _spaService = new SpaService("forside");

// now you see it - now you dont

function infLoop(){
    for (let n=0; n < 1000; n++) {
        setTimeout( function timer(){
            _titleLoop.output.classList.add('output-animation')
            _titleLoop.outputMette.classList.add('output-animation')
    _titleLoop.LoopTitles();
           }, n*12000); 
    }
}

infLoop();

// vores SPA pagechange.
window.pageChange = function () {
    _spaService.pageChange();
}

// På vores burger-bar i HTML har vi tilføjet en onClick funtion der bliver udformet her
// Ved click på burgerbar toggler vi classen "active", der gør vores menu
// bliver vist frem på siden.
// samtidigt vil vores burger-btn toggle classen "open" der ændrer fra burger og til et kryds med animationer.

window.bigMac = function() {
   let bar = document.getElementById("burgerbar");
    bar.classList.toggle("active");

    let btn = document.getElementById("burger-btn")
    btn.classList.toggle("open")
  }
