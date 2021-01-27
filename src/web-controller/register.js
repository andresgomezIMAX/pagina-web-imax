
//CAPTURANDO EL URL DE LA FIRMA ELECTRONICA
const currentUser = () => firebase.auth().currentUser;
const firmRegister = document.querySelector('.firm-register');
  console.log(firmRegister)
  if(firmRegister){
    firmRegister.addEventListener('change', (e) => {
      console.log('CLICK SUBIR IMAGEN', e.target.files[0]);
      // Get file
      file = e.target.files[0];
      if(file){
        const storageRef = firebase.storage().ref(`firmRegister/${currentUser().email}/${file.name}`);
        const task = storageRef .put(file);
        console.log(task)
        let urlfirmRegister = '';
        // Update progress bar
          task.on('state_changed', () => {
            task.snapshot.ref.getDownloadURL()
              .then((url) => {
                console.log('File available at', url);
                urlfirmRegister = url;
                console.log('holaaaaaaaaaaaa', urlfirmRegister);
                sessionStorage.setItem('firmRegister', urlfirmRegister);
              })
             
          });
       
    }
})
}

// REGISTRANDO USUARIOS 
const register = document.querySelector('.box-fill-data');
register.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.querySelector('.name-register').value;
  const checkAdmin = document.querySelector('.checkAdmin').value;
  const dni = document.querySelector('.dni-register').value;
  const phone= document.querySelector('.phone-register').value;
  const email = document.querySelector('.email-register').value;
  const password = document.querySelector('.password-register').value;
  const area = document.querySelector('.area-register').value;
  const leader = document.querySelector('.leader-register').value;
  const entryDay = document.querySelector('.fechaAdmin').value;
  const salarioAdmin= document.querySelector('.salarioAdmin-register').value;
  const urlfirmRegister = sessionStorage.getItem('firmRegister');
  console.log(name, checkAdmin, dni, phone, email, password, area,leader,entryDay,salarioAdmin,urlfirmRegister)
  
  firebase.auth().createUserWithEmailAndPassword(email,  password)
  .then(userCredential => {
    const db = firebase.firestore();
      return db.collection('users').doc(userCredential.user.uid).set({
        name, 
        checkAdmin,
        dni, 
        phone, 
        email, 
        password, 
        area,
        leader,
        entryDay,
        salarioAdmin,
        urlfirmRegister
      });
     
  }).then(() => {
    register.reset();
    alert('Datos guardados'); 
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    if (errorCode === 'auth/weak-password') {
      document.querySelector('#reg_error_inner').innerHTML = 'The password is too weak.';
    } else {
      document.querySelector('#reg_error_inner').innerHTML = errorMessage;
    }
  });

});

// PARA MOSTRAR DATOS EN LA TABLA DE BOLETAS
const onGetUsers = (callback) => firebase.firestore().collection('users').onSnapshot(callback);
const getUsers = () => firebase.firestore().collection('users').get();
// const deletePost = id => firebase.firestore().collection('users').doc(id).delete();

const userContainer = document.querySelector('.table-users')
window.addEventListener('DOMContentLoaded', async(e) => {
  onGetUsers((querySnapshot)=>{
    userContainer.innerHTML='';
    querySnapshot.forEach(doc => {
      const user = doc.data();
      console.log(user)
      user.id = doc.id;
      const users = firebase.auth().currentUser;
      userContainer.innerHTML +=  `
                                  <tr>
                                  <td> ${user.name}</td>  
                                  <td>${user.dni}</td>
                                  <td>${user.email}</td>  
                                  <td>${user.password}</td>
                                  <td>${user.area}</td>  
                                  <td>${user.leader}</td>
                                  <td>${user.entryDay}</td>  
                                  <td>${user.salarioAdmin}</td>
                                  <td><a href=${user.urlfirmRegister} download="Boleta.pdf"><button><i class="fas fa-download"></i>Descargar</button></a></td>
                                  <td>${user.checkAdmin}</td>
                                  <td><i class="fas fa-edit"></i> <i class="fas fa-trash-alt"></i></td>
                                </tr>  
                             `;


                  // const btnsRemove = document.querySelectorAll('.btnRemove');
                  // btnsRemove.forEach(btn => {
                  //   btn.addEventListener('click', async (e) => {
                 
                  //    await deletePost(e.target.dataset.id)
                  //   })
                  // });

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


//funcion para mostrar lista de colaboradores en workerAdmin
const btnlista = document.querySelector('.list-worker');
const btnBack = document.querySelector('.back-worker');
const listWorker = document.querySelector('.container-boletas');
const addworker = document.querySelector('.container-add-worker');
  btnlista.addEventListener('click', () => {
    listWorker.classList.toggle('show');
    addworker.classList.remove('show');
    addworker.classList.toggle('hide');
    console.log('click');
  });

  btnBack.addEventListener('click', () => {
  listWorker.classList.remove('show');
  listWorker.classList.add('hide');
  addworker.classList.remove('hide');
  addworker.classList.toggle('show');
  console.log('click');
});



