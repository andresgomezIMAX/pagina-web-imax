// ADMINISTRADOR GENERAR BOLETA
const generarBoleta = document.querySelector('.generate-ticket');
const user = () => firebase.auth().currentUser;

const currentUser = () => firebase.auth().currentUser;
  const addTicked = document.querySelector('.addTicked')
  console.log(addTicked)
  if(addTicked){
    addTicked.addEventListener('change', (e) => {
      console.log('CLICK SUBIR IMAGEN', e.target.files[0]);
      // Get file
      file = e.target.files[0];
      if(file){
        const storageRef = firebase.storage().ref(`tickedFile/${currentUser().email}/${file.name}`);
        const task = storageRef .put(file);
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

generarBoleta.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log('hola');
    const userLogueado = firebase.auth().currentUser;
    console.log(userLogueado)
    const useruid = userLogueado.uid;
    const nameWorker = document.querySelector('.nameWorker').value;
    const month = document.querySelector('.month').value; 
    const totalPage = document.querySelector('.totalPage').value;
    const urlBoleta = sessionStorage.getItem('fileNewTicked');
    console.log(nameWorker,month,totalPage, urlBoleta)
    if(urlBoleta){
      saveBoleta(nameWorker, month, totalPage, urlBoleta, useruid).then(() => {
        // sessionStorage.removeItem('fileNewTicked');
        console.log('se registró boleta');
        generarBoleta.reset();
        alert('se registró boleta');
      });
      
    }
    
});

const saveBoleta = (nameWorker, month, totalPage, urlBoleta, useruid) => {
    const firestore = firebase.firestore();
    return firestore.collection('pages').add({
        nameWorker,
        month,
        totalPage,
        urlBoleta,
        useruid,
    });
};

// para mostrar los datos en la tabla'pages'
const onGetPages = (callback) => firebase.firestore().collection('pages').onSnapshot(callback);
const getUsers = () => firebase.firestore().collection('users').get();
const getPages = () => firebase.firestore().collection().get();
const deletePost = id => firebase.firestore().collection('pages').doc(id).delete();

const pageContainer = document.querySelector('.table-page')
window.addEventListener('DOMContentLoaded', async(e) => {
  onGetPages((querySnapshot)=>{
    pageContainer.innerHTML='';
    querySnapshot.forEach(doc => {
      const page = doc.data();
      console.log(page)
      page.id = doc.id;
      const user = firebase.auth().currentUser;
      pageContainer.innerHTML +=  `
                              <tr>
                                <td> ${page.nameWorker}</td>  
                                <td> ${page.month}</td>
                                <td><a href=${page.urlBoleta} download="Boleta.pdf"><button><i class="fas fa-download"></i> Imprimir</button></a></td>
                                <td><input type="checkbox" name="fieldName" value="Check Value" readonly="readonly" onclick="javascript: return false;"/></td>
                                <td><i class="fas fa-edit"></i> <i class="fas fa-trash-alt"></i></td>
                              </tr>
                             `;


                  const btnsRemove = document.querySelectorAll('.btnRemove');
                  btnsRemove.forEach(btn => {
                    btn.addEventListener('click', async (e) => {
                 
                     await deletePost(e.target.dataset.id)
                    })
                  });

                  // const btnsEdit = document.querySelectorAll('.btnEdit');
                  // btnsEdit.forEach((btn) => {
                  //   btn.addEventListener('click', async(e) => {
                  //    const doc = await getPostEdit(e.target.dataset.id)
                  //    console.log(doc.data())
                  //    const post = doc.data();
                  //    editStatus = true;
                  //    id = doc.id;
                  //    const inputTextArea = document.querySelector ('.textarea');
                  //    inputTextArea.value = post.content;
                  //    btnNewPost.innerHTML = 'Actualizar'
                  //   })
                  // });
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



