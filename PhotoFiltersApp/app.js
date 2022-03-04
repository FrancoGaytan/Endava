const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let img = new Image();
let fileName = '';

const downloadBtn = document.getElementById('download-btn');
const uploadFile = document.getElementById('upload-file');
const revertBtn = document.getElementById('revert-btn');


//variables del drag and drop

const dropArea = document.querySelector(".drop-area");
const dragText = dropArea.querySelector("h4");
const input = dropArea.querySelector("#input-file");

//variables del drag and drop


// add filters and effects

document.addEventListener('click', e =>{
    if( e.target.classList.contains('filter-btn') || e.target.classList.contains('adition-btn')){
        if(e.target.classList.contains('brightness-add')){
            Caman('#canvas', img, function(){ //caman es una manipulacion de canvas en js, se le pasa el canvas, la imagen y lo que se quiera hacer con ella
                this.brightness(5).render();//al caman lo tuve que descargar y lo vincule en el html
            });
        } else if(e.target.classList.contains('brightness-remove')){
            Caman('#canvas', img, function(){
                this.brightness(-5).render();
            });
        }
        else if(e.target.classList.contains('contrast-add')){
            Caman('#canvas', img, function(){
                this.contrast(5).render();
            });
        }
        else if(e.target.classList.contains('contrast-remove')){
            Caman('#canvas', img, function(){
                this.contrast(-5).render();
            });
        }
        else if(e.target.classList.contains('saturation-add')){
            Caman('#canvas', img, function(){
                this.saturation(5).render();
            });
        }
        else if(e.target.classList.contains('saturation-remove')){
            Caman('#canvas', img, function(){
                this.saturation(-5).render();
            });
        }
        else if(e.target.classList.contains('vibrance-add')){
            Caman('#canvas', img, function(){
                this.vibrance(5).render();
            });
        }
        else if(e.target.classList.contains('vibrance-remove')){
            Caman('#canvas', img, function(){
                this.vibrance(-5).render();
            });
        }


        else if(e.target.classList.contains('vintage-add')){
            Caman('#canvas', img, function(){
                this.vintage().render();
            });
        }
        else if(e.target.classList.contains('lomo-add')){
            Caman('#canvas', img, function(){
                this.lomo().render();
            });
        }
        else if(e.target.classList.contains('clarity-add')){
            Caman('#canvas', img, function(){
                this.clarity().render();
            });
        }
        else if(e.target.classList.contains('sincity-add')){
            Caman('#canvas', img, function(){
                this.sinCity().render();
            });
        }
    }
});


// revertir filtros

revertBtn.addEventListener('click', (e) =>{
    Caman('#canvas', img, function(){
        this.revert();
    })
})

//upload file

uploadFile.addEventListener('change', (e)=> {
    //get file
    const file = document.getElementById('upload-file').files[0];

    //init filereader
    const reader = new FileReader();

    if(file){
        //set file name
        fileName = file.name;
        //read the data as URL
        reader.readAsDataURL(file);
    }

    //agrego la imagen a canvas
    reader.addEventListener('load', ()=>{
        //crear imagen
        img = new Image();

        img.src = reader.result;

        img.onload = function(){
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0, img.width, img.height);
            canvas.removeAttribute('data-caman-id');
        };
    },false);
});


// descargar evento

downloadBtn.addEventListener('click', (e) => {
    //obtener la extencion del archivo

    const fileExtension = fileName.slice(-4);

    //inicializar un nuevo nombre de archivo

    let newFileName;

    // chequear el tipo de archivo

    if(fileExtension === 'jpg' || fileExtension === 'png'){
        newFileName = fileName.substring(0, fileName.length - 4) + '-edited.jpg';
        console.log(newFileName);
    }
    //llamar a la funcion download

    download(canvas, newFileName);//descarga la nueva imagen con su nuevo nombre de archivo
});


function download(canvas, filename){
    let e;
    //creo el link
    const link = document.createElement('a');//el a xq quiero crear un link

    link.download = filename ?? "imagenEditada";
    link.href = canvas.toDataURL('image/jpeg', 0.8);

    //creo un nuevo mouseEvent

    e = new MouseEvent('click');
    link.dispatchEvent(e);
    
}


//funcionamiento del drag and drop

input.addEventListener("change", (e)=> {
    files = this.files;
    dropArea.classList.add("active");
    showFiles(files);
    dropArea.classList.remove("active");
});


dropArea.addEventListener("dragover", (e)=> {
    e.preventDefault();
    dropArea.classList.add("active");
    dragText.textContent = "Suelta para subir tu imagen";
});


dropArea.addEventListener("dragleave", (e)=> {
    e.preventDefault();
    dropArea.classList.remove("active");
    dragText.textContent = "Arrastra y suelta tu imagen aqui";
});


dropArea.addEventListener("drop", (e)=> {
    e.preventDefault();
    files = e.dataTransfer.files;//esto es para que obtenga las referencias de las img
    showFiles(files);
    dropArea.classList.remove("active");
    dragText.textContent = "Arrastra y suelta tu imagen aqui";
});


function showFiles(files){
    if(files.length === 1){
        processFile(files[0]);
    }else{
        alert("Insertar solamente un archivo");
    }
}

function processFile(file){
    const docType = file.type;
    const validExtensions = ["image/jpg", "image/jpeg", "image/png"];

    if(validExtensions.includes(docType)){
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        
        fileReader.onloadend = ()=>{
            
            const img = new Image();
            img.src = fileReader.result;
            img.onload = function(){/*cuando esta fuente se carga le pongo la funcion para que la pase al canvas*/
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0, img.width, img.height);
            canvas.removeAttribute('data-caman-id');
        };
        }

    }else{
        alert("tipo de archivo invalido");
    }
}
