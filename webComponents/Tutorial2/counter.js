//este componente va a tener un solo atributo y un solo metodo utilizandose

class MyCounter extends HTMLElement {
  // esto nos va a proveer de las funcionalidades necesarias para usar componentes
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" }); // es la parte encapsulada de nuestro componente, el modo siempre open
    // evitando así las posibles colisiones y conflictos de estilos y funcionalidades con el resto de elementos.
  }

  get count() {
    //para obtener la cuenta
    return this.getAttribute("count"); // va a ir al html y obtener el valor del atributo
  }

  set count(val) {
    //para setear la cuenta
    this.setAttribute("count", val); //le vamos a asignar el nuevo atributo que le pasamos
  }

  //ahora tenemos que decir que atributos vamos a estar usando

  static get observedAttributes() {
    //se va a utilizar para todas las instancias
    return ["count"]; //en este arreglo van todas las propiedades que querramos usar
  } //esto le dice al sistema, bueno yo quiero observar la cuenta

  //ahora tengo que definir un callback para cuando count cambie podamos hacer lo que queremos

  attributeChangedCallback(prop, oldVal, newVal) {//cuando este cambie haceme esta funcion
    //tres parametros, el nombre de la prop, el valor viejo y el nuevo
    if (prop === "count") {
      this.render(); //actualizamos nuestro componente

      let btn = this.shadow.querySelector("#btn"); //agarro el boton
      btn.addEventListener("click", this.inc.bind(this)); //le agrego la funcionalidad al boton, llamo a la funcion inc y le tengo que bindear el this para que lo reconozca
    }
  }

  connectedCallback() {//cuando se monta
    this.render();

    let btn = this.shadow.querySelector("#btn"); //agarro el boton
    btn.addEventListener("click", this.inc.bind(this)); //le agrego la funcionalidad al boton, llamo a la funcion inc y le tengo que bindear el this para que lo reconozca
  }

  inc() {
    this.count++;
  }

  render() {
    this.shadow.innerHTML = `
        <h1>Counter</h1>
        ${this.count} <!--Esto va a ir al get count para saber el valor-->
        <button id='btn'>Increment</button>
        `;
  }
}

// para registrar el nuestro elemento tenemos que hacer esto:

customElements.define("my-counter", MyCounter); //le paso un nombre para el elemento y la clase
//ahora el tag my-counter lo podemos usar en html
