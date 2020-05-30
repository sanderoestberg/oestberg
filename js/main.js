import SpaService from "./spa-service.js";
import TitleLoop from "./title-loop.js";

let _titleLoop = new TitleLoop();
let _spaService = new SpaService("forside");


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

window.pageChange = function () {
    _spaService.pageChange();
   
}