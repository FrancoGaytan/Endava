class ProgressBar extends HTMLElement{
    static css = `
        :host{
            display: block;
            width: 250px;
            height: 40px;
            background: #eeeeee;
            border-radius: 4px;
            overflow: hidden;
        }
        .fill{
            width: 0%;
            height: 100%;
            background: #009578;
            transition: width 0.25s;
        }
        .inputValue{
            width: 100px;
            height: 40px;
            background-color: green;
            border-radius: 2px;
            border-color:#000;
            visibility: visible;
        }
        .btnSubmit{
            visibility:visible;
            border-color:#000;
            width: 50px;
            height: 40px;
            background-color: #000;
        }
    `;

    static get observedAttributes(){
        return["percent"];
    }

    constructor(){
        super();
        this.attachShadow({mode: "open"});
        
        const style = document.createElement("style");
        const fill = document.createElement("div");

        const inputValue = document.createElement("input");
        inputValue.placeholder = "ingrese valor";
        inputValue.title = "valorEntrada";
        const btnSubmit = document.createElement("button");
        btnSubmit.title = "submit";
        btnSubmit.type = "submit";

        style.innerHTML = ProgressBar.css;
        fill.classList.add("fill");
        inputValue.classList.add("inputValue");
        btnSubmit.classList.add("btnSubmit");

        this.shadowRoot.append(style, fill);//le agrego los dos elementos al shadowroot
        this.shadowRoot.append(inputValue, btnSubmit);
    }

    get percent(){
        const value = this.getAttribute("percent");
        if(isNaN(value)){
            return 0;
        }
        if(value < 0){
            return 0;
        }
        if(value > 100){
            return 100;
        } 
        return Number(value);
    }

    set percent(value){
        btnSubmit.addEventListener("click",()=>{
            console.log(inputValue.value);
            this.setAttribute("percent", inputValue.value)
        });
        this.setAttribute("percent", value);
    }

    attributeChangedCallback(name){
        if(name === "percent"){
            this.shadowRoot.querySelector(".fill").style.width = `${ this.percent }%`;
        }
    }
}

customElements.define("progress-bar", ProgressBar);


//parte del boton de entrada
/* 
const btnSubmit = document.querySelector('.boton-submit');
const numeroEntrada = document.querySelector('.entrada');

btnSubmit.addEventListener("click", ()=>{
    const valueEntrada = numeroEntrada.value;
    console.log(valueEntrada);
    ProgressBar.percent(valueEntrada);
}); */