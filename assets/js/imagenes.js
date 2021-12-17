// Subir Imagenes aFirebase js
var fnombre = "nombre1";
var fmarca = "marca1";
var fpiezas = "piezas1";
var fprecio = "precio1";
var fdispo = "dispo1";
var fcateg = "categ1";

function guardarValores(){
    let formulario = document.forms['uploader'];

    let nombre = formulario['fnombre'].value;
    if (nombre == "") {
        window.alert("nombre esta vacio");
        return false;
      }
    let marca = formulario['fmarca'].value;
    let piezas = formulario['fpiezas'].value;
    let precio = formulario['fprecio'].value;
    let dispo = formulario['fdispo'].value;
    let categ = formulario['fcateg'].value;
    
    fnombre = nombre;
    fmarca = marca;
    fpiezas = piezas;
    fprecio = precio;
    fdispo = dispo;
    fcateg = categ;

    
}

function limpiar() {
    uploader.reset();
  }

const addDoc= async({ collection,data }) =>{

    

    let document = {
        ...data,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
        name: fnombre,
        marca: fmarca,
        cant: fpiezas,
        costo: fprecio,
        disp: fdispo,
        categ: fcateg,

        
    }

    // 1. Una coleccion
    let collectionRef = firebase.firestore().collection(collection);
    limpiar();
    window.alert("Guardado con Exito");
    // 2. Guardar el documento

    return collectionRef.add(document);
}

// Upload Archivo Firebase
const upload = async ({ file }) => {
    // 1.Crear referencia al bucket donde se almacena
    let storageRef = firebase.storage().ref().child(`images/${file.name}`);
    // 2.Subir el archivo
    await storageRef.put(file);
    // 3.Retornar la referencia

    return storageRef;
} 

// Update Coleccion firebase
const publish = async ({ file }) => { 
    let storageRef = await upload({ file });
    return addDoc({ collection: 'files', data: { path: storageRef.fullPath } })

}

// Llamada a Coleccion Firefase
const queryImages = async() =>{
    // 1.Colleccion
    let collection = firebase.firestore().collection('files')
                        .orderBy('createdAt','desc');
    //2. onSnapShot a cambios en los documentos
    collection.onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) =>{
            if(change.type === "added"){
                showImage(change.doc.data());
            }
        });
    });
}

// Mostrar Imagenes 
const showImage = async (docData)=>{
    let node = document.createElement("div");
    node.classList.add("col-lg-4","col-md-3","d-flex","align-items-stretch","portfolio-container");
    node.style.height= "535px";
   
    let url = await firebase.storage().ref(docData.path).getDownloadURL();
    node.innerHTML = ` 
     <article class="entry portfolio-item">
   
       <div class="entry-img ">
           <img src='${url}' alt="" class="img-fluid">
       </div>
       <h2 class="entry-title" style="margin: 0 0 15px 0;">
           <a>${docData.name}</a>
           
       </h2>
       <div class="entry-meta">
           <ul style="padding-bottom: 14px;">
               <li class="d-flex align-items-center"><i class="icofont-book-mark"></i><a>${docData.marca}</a></li>
               <li class="d-flex align-items-center"><i class="icofont-numbered"></i><a>${docData.cant}pz's</a></li>                    
               <li class="d-flex align-items-center"><i class="icofont-dollar"></i><a>${docData.costo}</a></li>               
           </ul>            
           <ul style="padding-bottom: 14px;">
               <li class="d-flex align-items-center"><i class="icofont-checked"></i><a>${docData.disp}</a></li>
               <li class="d-flex align-items-center"><i class="icofont-tags"></i><a>${docData.categ}</a></li>
               
           </ul>
           <a href='${url}' target="_blank" class="btn btn-outline-primary btn-block" role="button">Ver a Detalle</a>
           
       </div>
    
   
   
     </article>
   
       `;
   
   
       // Mostrar Imagenes 
       //contenedor donde va a crear cada nodo identificado por ID
       let container = document.querySelector("#images");
       container.append(node);
   }

async function main() { 
    var firebaseConfig = {
        apiKey: "AIzaSyDRRiZu6aJwS2bjgQYtdFYqzaYYkUX7YzQ",
        authDomain: "papeleria-deltianguis.firebaseapp.com",
        projectId: "papeleria-deltianguis",
        storageBucket: "papeleria-deltianguis.appspot.com",
        messagingSenderId: "761896781329",
        appId: "1:761896781329:web:a6bdf0f3de60f890cdd3b0",
      };
      // Initialize Firebase
      firebase.initializeApp(firebaseConfig);

      let form = document.querySelector("#uploader");

      form.addEventListener("submit",(ev)=>{
        ev.preventDefault();

        let fileInput = form.querySelector("#file");

        let file = fileInput.files[0];

        publish({ file });

      });

      queryImages();

 }

main();