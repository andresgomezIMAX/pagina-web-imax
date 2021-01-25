// ADMINISTRADOR GENERAR CTS

const generarCts = document.querySelector('.btn-generar-cts');
const user = () => firebase.auth().currentUser;

const currentUser = () => firebase.auth().currentUser;
  const addCts = document.querySelector('.addImagCts');
  if(addCts){
    addCts.addEventListener('change', (e) => {
      console.log('CLICK SUBIR IMAGEN', e.target.files[0]);
      // Get file
      file = e.target.files[0];
})
}

generarCts.addEventListener('click', (e) => {
    e.preventDefault();
    console.log('hola');
    const userLogueado = firebase.auth().currentUser;
    console.log(userLogueado)
    const useruid = userLogueado.uid;
    const nameWorkerCts = document.querySelector('.nameWorkerCts').value;
    const monthCts = document.querySelector('.month-Cts').value; 
    const pageCts = document.querySelector('.page-cts').value;
    console.log(nameWorkerCts,monthCts,pageCts)
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
              .catch(() => {
                console.log('ocurrió un error');
              });
          });
        saveCts(nameWorker, month, totalPage, urlCts, useruid).then(() => {
            sessionStorage.removeItem('fileNewCts');
            console.log('con foto')
          });
    }
    getUsers();
});

const saveCts = (nameWorker, month, totalPage, urlCts, useruid) => {
    const firestore = firebase.firestore();
    return firestore.collection('cts').add({
        nameWorker,
        month,
        totalPage,
        urlCts,
        useruid,
    });
};
