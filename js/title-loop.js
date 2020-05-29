/*
export default class TitleLoop {
    constructor(){
        this.output = document.querySelector("#title-output")
        this.display = s => this.output.innerText = s;
        this.delayLoop = (fn, delay) => {
            return (x, i) => {
              setTimeout(() => {
                fn(x);
              }, i * delay);
            };
          };
        this.titles = [
            "ÆDELMETALFORMGIVER",
            "KUNSTHÅNDVÆRKER",
            "GULDSMED",
            "PRODUKT DESIGNER"
        ]
    }
    LoopTitles(){
    this.titles.forEach(this.delayLoop(this.display, 1000));
    }
}

*/

export default class TitleLoop {
    constructor(){
        this.output = document.querySelector("#title-output")
        this.titles = [
            "ÆDELMETALFORMGIVER",
            "KUNSTHÅNDVÆRKER",
            "GULDSMED",
            "PRODUKT DESIGNER"
        ]
    }
    
    
    LoopTitles(){
        let titles = this.titles
        let output = this.output
        
        for (let i=0; i < titles.length; i++) {
            setTimeout( function timer(){
                output.innerHTML = titles[i]
            }, i*3000); 
    }
    }
    

}
