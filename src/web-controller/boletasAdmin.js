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
const addTicked = document.querySelector('.addTicked')
if (addTicked) {
  addTicked.addEventListener('change', (e) => {
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
btnGenerarBoleta.addEventListener('click', (e) => {
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
    saveBoleta(nameWorker, month, totalPage, urlBoleta).then(() => {
      // sessionStorage.removeItem('fileNewTicked');
      console.log('se registró boleta');
      generarBoleta.reset();
      alert('se registró boleta');
    });
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
const deletePost = id => firebase.firestore().collection('pages').doc(id).delete();
const editWorker = (id, nameWorker, month, ) => firebase.firestore().collection('posts').doc(id).update({
  nameWorker,
  month
});

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
                              <tr class="row-pages" contenteditable="false" data-id="${page.id}">
                                <td data-id="${page.id}" class="nameWorkerPage"> ${page.nameWorker}</td>  
                                <td data-id="${page.id}" class="monthPage"> ${page.month}</td>
                                <td data-id="${page.id}" class="totalPage"> ${page.totalPage}</td>
                                <td data-id="${page.id}" class="urlPage"> <a href=${page.urlBoleta} download="Boleta.pdf"><button><i class="fas fa-download"></i> Descargar</button></a></td>
                                <td data-id="${page.id}" class="checkPage"> <input type="checkbox" name="fieldName" value="Check Value" readonly="readonly" onclick="javascript: return false;"/></td>
                                <td><i data-id="${page.id}" class="btnEdit fas fa-edit"></i> <button data-id="${page.id}" class="btnSaveWorker" id="btnSaveWorker">💾</button> <i class="deletePage fas fa-trash-alt" data-id="${page.id}"></i></td>
                              </tr>
                             `;


      const deletePage = document.querySelectorAll('.deletePage');
      deletePage.forEach(btn => {
        btn.addEventListener('click', async (e) => {
          const res = confirm('¿Quieres eliminar esta Boleta de Pago?')
          if (res === true){
            await deletePost(e.target.dataset.id)
          }
        })
      });

      const btnEditWorker = document.querySelectorAll('.btnEdit');
      const btnUpdateWorker = document.querySelectorAll('.btnSaveWorker');
      const editableWorker = document.querySelectorAll('.row-pages');

      btnEditWorker.forEach(edit => {
        edit.addEventListener('click', (e) => {
          console.log('clickeando editar');
          console.log(e.target.dataset.id);
          console.log(doc.data());
          fs.collection('pages').get().then((querySnapshot) => {
            querySnapshot.forEach(doc => {
              console.log(doc.id)
              if (e.target.dataset.id === doc.id) {
                console.log(e.target.dataset.id);
                console.log(doc.id);
                editableWorker.contentEditable = 'true';
                editableWorker.forEach(row => {
                  console.log('holay')
                  row.addEventListener('click', (e) => {
                    console.log('holassss')
                    console.log(e.target.dataset.id);
                    console.log(doc.id);
                    if (e.target.dataset.id === doc.id) {
                      row.contentEditable = 'true';
                      row.focus() = 'true';
                    }
                  })
                })

              }
            })
          })

        });
      });

      btnUpdateWorker.forEach(update => {
        console.log(btnUpdateWorker)
        update.addEventListener('click', (e) => {
          console.log(update);
          const docId = e.target.dataset.id;
          editableWorker.forEach(row => {
            console.log('holay')
            row.addEventListener('click', (e) => {
              if (e.target.dataset.id === docId) {
                console.log('aaaaaaaaaa')
                const nameWorker = row.querySelector('.nameWorkerPage').innerHTML;
                const month = row.querySelector('.monthPage').innerHTML;
                const totalPage = row.querySelector('.totalPage').innerHTML;
                console.log(nameWorker, month, totalPage)
                const cityRef = firebase.firestore().collection('pages').doc(docId);
                const res = cityRef.update({
                  nameWorker,
                  month,
                }, {merge: true});
                alert('Se han actualizado los datos')
              }

            })
          })

        })
      })










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