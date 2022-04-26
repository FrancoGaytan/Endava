class MyLogin extends HTMLElement {
    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: "open" });
    }

    get user(){
        return this.getAttribute("user");
    }

    get password(){
        return this.getAttribute("password");
    }

    static get observedAttributes() {
        return ["user","password"]; 
    }

    connectedCallback() {
        this.render();
    
        let btn = this.shadow.querySelector("#btn"); 
        btn.addEventListener("click", this.submit.bind(this));
    }

    submit(){
        //let usuario = document.querySelector('input');
        let usuario = document.getElementById("user");
        //let contrasena = document.querySelector('input');
        let contrasena = document.getElementById("password");
        console.log(`usuario: ${this.usuario}, contrasena:${this.contrasena}`);
    }

    render() {
        this.shadow.innerHTML = `
            <h1>Login</h1>
            <input class="login-input" type="text" name="user" placeholder="user" id="user" />
            <input class="login-input" type="password" name="password" placeholder="password" id="password" />
            <button id='btn'>Submit</button>
            `;
      }
}

customElements.define("my-login", MyLogin);