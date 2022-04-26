// aca voy a fabricar el custom element

class SaludoBasicoElement extends HTMLElement{
    constructor(){
        super(); //es para preparar la etiqueta apropiadamente

        this.saludo = "Hola que tal";
        this.pintado = false;
    }

    connectedCallback(){
        this.pintado = true;
        this.innerHTML = this.saludo;
    }

    disconnectedCallback(){
        console.log("sacado de la pagina")
    }

    attributeChangedCallback(nombre, viejoValor, nuevoValor){
        //console.log(`${nombre} ha cambiado de ${viejoValor} a ${nuevoValor}`); 
        if(nombre ==="nombre"){
            this.saludo = `Hola ${nuevoValor}`
        }
    }

    static get observedAttributes(){//esto es el getter
        return ['nombre'];
    }
}


window.customElements.define("saludo-basico", SaludoBasicoElement)//este es el lugar donde se van a registrar los elementos

//saludo-basico <-- las custom elements tienen que ser conformadas por al menos dos palabras separadas con un guion y html promete que nunca va a crear una etiqueta con esa estructura