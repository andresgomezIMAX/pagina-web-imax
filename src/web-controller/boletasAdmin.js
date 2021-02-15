let editStatus = false;
let id = '';

//Para colaboradores el jefe inmediato por defecto
const boxNameWorker = document.querySelector('.nameWorker');
console.log(boxNameWorker)
boxNameWorker.innerHTML = '',
  firebase.firestore().collection('users').onSnapshot((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      // console.log(`${doc.id} => ${doc.data().leader}`);
      const userLogueado = firebase.auth().currentUser;
      const useruid = userLogueado.uid;
      boxNameWorker.innerHTML += `
                <option value="${doc.data().name}">${doc.data().name}</option>`



    })
  })


// GUARDANDO URL DEL PDF DE LA BOLETA
let file;
const currentUser = () => firebase.auth().currentUser;
const urlBoleta = document.querySelector('.addTicked')
if (urlBoleta) {
  urlBoleta.addEventListener('change', (e) => {
    console.log('CLICK SUBIR IMAGEN', e.target.files[0]);
    // Get file
    let file = e.target.files[0];
    if (file) {
      const storageRef = firebase.storage().ref(`tickedFile/${currentUser().email}/${file.name}`);
      const task = storageRef.put(file);
      console.log(task)
      let urlBoleta = '';
      // Update progress bar
      task.on('state_changed', () => {
        task.snapshot.ref.getDownloadURL()
          .then((url) => {
            console.log('File available at', url);
            urlBoleta = url;
            console.log('holaaaaaaaaaaaa', urlBoleta);
            sessionStorage.setItem('fileNewTicked', urlBoleta);
          })

      });

    }
  })
}

// ADMINISTRADOR GENERAR BOLETA
const btnGenerarBoleta = document.querySelector('.btn-generar-boleta');
const generarBoleta = document.querySelector('.generate-ticket');

  btnGenerarBoleta.addEventListener('click', generarBoletaFn = (e) => {
  e.preventDefault();
  console.log('hola');
  // const userLogueado = firebase.auth().currentUser;
  // console.log(userLogueado)
  // const useruid = userLogueado.uid;
  const nameWorker = document.querySelector('.nameWorker').value;
  const month = document.querySelector('.month').value;
  const totalPage = document.querySelector('.totalPage').value;
  const urlBoleta = sessionStorage.getItem('fileNewTicked');
  console.log(nameWorker, month, totalPage, urlBoleta)
  if (urlBoleta) {
    if (!editStatus) {
      saveBoleta(nameWorker, month, totalPage, urlBoleta).then(() => {
        // sessionStorage.removeItem('fileNewTicked');
        console.log('se registró boleta');
        generarBoleta.reset();
        alert('se registró boleta');
      });
    }
    else {
          updatePage(id, {
              nameWorker : nameWorker, 
              month : month, 
              totalPage : totalPage, 
              urlBoleta :  urlBoleta
            } )

            alert('se actualizó boleta');
            generarBoleta.reset();
   
    }

    editStatus = false;
    id = '';
    btnGenerarBoleta.innerHTML = 'Generar'

  }

});




//FUNCIÓN DE FIREBASE PARA CREAR LA COLECCION DE BOLETAS 
const saveBoleta = (nameWorker, month, totalPage, urlBoleta) => {
  const firestore = firebase.firestore();
  return firestore.collection('pages').add({
    nameWorker,
    month,
    totalPage,
    urlBoleta,
  });
};

//PARA MOSTRAR LAS BOLETAS GUARDADAS EN LA TABLA DE 'PAGES'
const onGetPages = (callback) => firebase.firestore().collection('pages').onSnapshot(callback);
const getPagesEdit = (id) => firebase.firestore().collection('pages').doc(id).get();
const getUsers = () => firebase.firestore().collection('users').get();
const deletePageId = id => firebase.firestore().collection('pages').doc(id).delete();
const updatePage = (id, contentPage) => firebase.firestore().collection('pages').doc(id).update(contentPage);

const pageContainer = document.querySelector('.table-page')
window.addEventListener('DOMContentLoaded', async (e) => {
  onGetPages((querySnapshot) => {
    pageContainer.innerHTML = '';
    querySnapshot.forEach(doc => {
      const page = doc.data();
      console.log(page)
      page.id = doc.id;
      const user = firebase.auth().currentUser;
      pageContainer.innerHTML += `
                              <tr>
                                <td> ${page.nameWorker}</td>  
                                <td> ${page.month}</td>
                                <td><a href=${page.urlBoleta} download="Boleta.pdf"><button><i class="fas fa-download"></i> Descargar</button></a></td>
                                <td><input type="checkbox" name="fieldName" value="Check Value" readonly="readonly" onclick="javascript: return false;"/></td>
                                <td><i data-id="${page.id}" class="btnEdit fas fa-edit"></i> <i class="deletePage fas fa-trash-alt" data-id="${page.id}"></i></td>
                              </tr>
                             `;


      const deletePage = document.querySelectorAll('.deletePage');
      deletePage.forEach(btn => {
        btn.addEventListener('click', async (e) => {
          const r = confirm('¿Quieres eliminar esta Boleta de Pago?')
          if (r == true) {
            await deletePageId(e.target.dataset.id)
          } 
        })
      });

      const btnsEdit = document.querySelectorAll('.btnEdit');
      btnsEdit.forEach(btn => {
        btn.addEventListener('click', async (e) => {
          const doc = await getPagesEdit(e.target.dataset.id)
          console.log(doc.data())
          const page = doc.data();
          id = doc.id;
          console.log(id)
          editStatus = true;

          const nameWorker = document.querySelector('.nameWorker');
          nameWorker.value = page.nameWorker;
          const month = document.querySelector('.month');
          month.value = page.month;
          const totalPage = document.querySelector('.totalPage');
          totalPage.value = page.totalPage;
          const urlBoleta = document.querySelector('.addTicked');

          console.log(nameWorker.value, month.value, totalPage.value, urlBoleta.file)

          let res;
          

          firebase.firestore().collection('pages').onSnapshot(async (querySnapshot) => {
            querySnapshot.forEach((doc) => {
              console.log(`${doc.id} => ${doc.data().urlBoleta}`);
              const boleta = doc.data();
              boleta.id = doc.id;
              console.log(boleta.id)
              console.log(id)
              if (boleta.id === id) {
                res = boleta.urlBoleta;
                console.log(res)
                console.log('jaaaa')
                console.log(res)
                console.log(urlBoleta.file = res)
                urlBoleta.file = res;
                console.log(nameWorker.value, month.value, totalPage.value, urlBoleta.file)
                editStatus = true;
              

              }
            })
           


          
          })
          btnGenerarBoleta.innerHTML = 'Actualizar'
        })
      });

      const filterPageWorker = (data, texto) => {
        const longNameWorker = texto.length;
        // const dataName =  fs.collection('users').get().then((snapshot) => {console.log(snapshot.docs);
        //     // setupPosts(snapshot.docs)
        // });
        const dataName = page.nameWorker;
        const filterName = dataName.filter((worker) => (
          texto === dataName.toLowerCase().substring(0, longNameWorker)
        ));
        return filterName; // retornamos el array de objetos encontrados
      };

      const searchName = document.querySelector('.searchName');
      searchName.addEventListener('input', (evt) => {
        const texto = evt.target.value.toLowerCase(); // extraemos el valor de la caja de texto
        console.log(texto)
        const filtroNameWorker = filterPageWorker(page, texto);
      });
    });
  })

})



// firebase.auth().onAuthStateChanged(user => {
//     if (user) {
//       fs.collection('users')
//       .get()
//       .then((snapshot) => {
//           console.log(snapshot.docs);
//           setupPosts(snapshot.docs)
//       })
//     } else {
//       console.log('auth: sign out');
//       setupPosts([])
//     }
// });