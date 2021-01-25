const getUsers = () => firebase.firestore().collection('users').get();

// ADMINISTRADOR GENERAR CTS
const generarCts = document.querySelector('.generate-ticket');
const user = () => firebase.auth().currentUser;

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
