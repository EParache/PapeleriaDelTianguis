//Credenciales
firebase.initializeApp({
    apiKey: "AIzaSyDRRiZu6aJwS2bjgQYtdFYqzaYYkUX7YzQ",
    authDomain: "papeleria-deltianguis.firebaseapp.com",
    projectId: "papeleria-deltianguis"
});
// Inizialice Cloud Firestore
var db = firebase.firestore();

//Leer documentos
var tabla = document.getElementById('tabla');
db.collection("files").onSnapshot((querySnapshot) => {
    tabla.innerHTML= '';
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data().first}`);
        tabla.innerHTML += `
        <tr>
            <th scope="row">${doc.id}</th>
            <td>${doc.data().name}</td>
            <td>${doc.data().marca}</td>
            <td>${doc.data().cant}</td>
            <td>${doc.data().costo}</td>
            <td>${doc.data().disp}</td>
            <td>${doc.data().categ}</td>
            <td><button class="btn btn-danger" onclick="eliminar('${doc.id}')">Eliminar</button></td>
            <td><button class="btn btn-warning" onclick="editar('${doc.id}','${doc.data().name}','${doc.data().marca}','${doc.data().cant}','${doc.data().costo}','${doc.data().disp}','${doc.data().categ}')">Editar</button></td>
        </tr>
        
        `
    });
});

//borrar documentos
function eliminar(id){
    db.collection("files").doc(id).delete().then(function() {
        console.log("Document suceessufully deleted");
    }).catch(function(error){
        console.error("Error removing document: ", error);
    });
}

//editar documentos
function editar(id,name,marca,cant,costo,disp,categ){
    document.getElementById("fnombre").value = name;
    document.getElementById("fmarca").value = marca;
    document.getElementById("fpiezas").value = cant;
    document.getElementById("fprecio").value = costo;
    document.getElementById("fdispo").value = disp;
    document.getElementById("fcateg").value = categ;
    var boton = document.getElementById('boton');
    boton.innerHTML= 'Actualizar Registro';

    boton.onclick = function(){
        var washintonRef = db.collection("files").doc(id);

        var nombre = document.getElementById('fnombre').value;
        var marca = document.getElementById('fmarca').value;
        var cant = document.getElementById('fpiezas').value;
        var costo = document.getElementById('fprecio').value;
        var disp = document.getElementById('fdispo').value;
        var categ = document.getElementById('fcateg').value;

        return washintonRef.update({
            name : nombre,
            marca: marca,
            cant: cant,
            costo: costo,
            disp: disp,
            categ: categ
        })
        .then(function(){
            console.log("Document sucessufully update");
            boton.innerHTML= 'Guardar';
        })
        .catch(function (error) { 
            console.log("Error updating doc", error);
        });
    }
}
