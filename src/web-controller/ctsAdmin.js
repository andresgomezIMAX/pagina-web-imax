
// ADMINISTRADOR GENERAR CTS
const generarCts = document.querySelector('.generate-ticket');
const user = () => firebase.auth().currentUser;

let file;
const currentUser = () => firebase.auth().currentUser;
  const addCts = document.querySelector('.addImgCts')
  if(addCts){
    addCts.addEventListener('change', (e) => {
      console.log('CLICK SUBIR IMAGEN', e.target.files[0]);
      // Get file
      file = e.target.files[0];
      if(file){
        const storageRef = firebase.storage().ref(`ctsFile/${currentUser().email}/${file.name}`);
        const task = storageRef .put(file);
        console.log(task)
        let urlCts = '';
        // Update progress bar
          task.on('state_changed', () => {
            task.snapshot.ref.getDownloadURL()
              .then((url) => {
                console.log('File available at', url);
                urlCts = url;
                console.log('holaaaaaaaaaaaa', urlCts);
                sessionStorage.setItem('fileNewCts', urlCts);
              })
          });
       
    }
})
}

generarCts.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log('hola');
    const userLogueado = firebase.auth().currentUser;
    console.log(userLogueado)
    const useruid = userLogueado.uid;
    const nameWorkerCts = document.querySelector('.nameWorkerCts').value;
    const monthCts = document.querySelector('.month-Cts').value; 
    const pageCts = document.querySelector('.page-cts').value;
    const urlCts = sessionStorage.getItem('fileNewCts');
    console.log(nameWorkerCts,monthCts,pageCts, urlCts);
    if(urlCts){
        saveCts(nameWorkerCts,monthCts,pageCts, urlCts, useruid).then(() => {
            // sessionStorage.removeItem('fileNewCts');
            console.log('se registró constancia CTS');
            generarCts.reset();
            alert('se registró constancia CTS');
        });
    }
    

});

const saveCts = (nameWorkerCts,monthCts,pageCts, urlCts,  useruid) => {
    const firestore = firebase.firestore();
    return firestore.collection('cts').add({
        nameWorkerCts,
        monthCts,
        pageCts, 
        urlCts, 
        useruid,
    });
};

// para mostrar los datos en la tabla'cts'
const onGetCts = (callback) => firebase.firestore().collection('cts').onSnapshot(callback);
const getUsers = () => firebase.firestore().collection('users').get();
const deletePost = id => firebase.firestore().collection('cts').doc(id).delete();

const ctsContainer = document.querySelector('.table-cts')
console.log(ctsContainer)
window.addEventListener('DOMContentLoaded', async(e) => {
  onGetCts((querySnapshot)=>{
    ctsContainer.innerHTML='';
    querySnapshot.forEach(doc => {
      const cts = doc.data();
      console.log(cts)
      cts.id = doc.id;
      const user = firebase.auth().currentUser;
      ctsContainer.innerHTML +=  `
                              <tr>
                                <td> ${cts.nameWorkerCts}</td>  
                                <td> ${cts.monthCts}</td>
                                <td><a href=${cts.urlCts} download="Boleta.pdf"><button><i class="fas fa-download"></i> Imprimir</button></a></td>
                                <td><i class="fas fa-edit"></i> <i class="deleteCts fas fa-trash-alt" data-id="${cts.id}"></i></td>
                              </tr>
                             `;


                  const deleteCts = document.querySelectorAll('.deleteCts');
                  deleteCts.forEach(btn => {
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