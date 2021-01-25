const getUsers = () => firebase.firestore().collection('users').get();

// ADMINISTRADOR GENERAR BOLETA
const generarBoleta = document.querySelector('.generate-ticket');
const user = () => firebase.auth().currentUser;

const currentUser = () => firebase.auth().currentUser;
  const addTicked = document.querySelector('#addImage');
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
    console.log(nameWorker,month,totalPage)
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



