
export default class TitleLoop {
    constructor(){
        this.output = document.querySelector("#title-output")
        this.outputMette = document.querySelector("#title-output-mette")
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
        let outputMette = this.outputMette
        for (let i=0; i < titles.length; i++) {
            setTimeout( function timer(){
                output.innerHTML = titles[i]
                outputMette.innerHTML = titles[i]
            }, i*3000); 
    }
    
    }
    

}
