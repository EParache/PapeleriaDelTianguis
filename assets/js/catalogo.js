//Mostrar Imagenes en Catalogo Js
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

      queryImages();

 }

main();