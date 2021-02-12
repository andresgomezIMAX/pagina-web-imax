
//CAPTURANDO EL URL DE LA FIRMA ELECTRONICA
let file;
const currentUser = () => firebase.auth().currentUser;
console.log(currentUser.email)
const firmRegister = document.querySelector('.firm-register');
  console.log(firmRegister)
  if(firmRegister){
    firmRegister.addEventListener('change', (e) => {
      console.log('CLICK SUBIR IMAGEN', e.target.files[0]);
      // Get file
      let file = e.target.files[0];
      if(file){
        const storageRef = firebase.storage().ref(`firmRegister/${currentUser().email}/${file.name}`);
        const task = storageRef.put(file);
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
    alert('Se agregó un nuevo colaborador'); 
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
const deleteUserReg = id => firebase.firestore().collection('users').doc(id).delete();
const editPost = (id, name, checkAdmin, dni, phone, email, password, area,leader,entryDay,salarioAdmin) => firebase.firestore().collection('posts').doc(id).update({ 
  name, 
  checkAdmin, 
  dni, 
  phone, 
  email, 
  password, 
  area,
  leader,
  entryDay,
  salarioAdmin });

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
                                <tr class="row-users" contenteditable="false" data-id="${user.id}">
                                  <td data-id="${user.id}" class="nameUser"> ${user.name}</td>  
                                  <td data-id="${user.id}" class="dniUser">${user.dni}</td>
                                  <td data-id="${user.id}" class="phoneUser">${user.phone}</td>
                                  <td data-id="${user.id}" class="emailUser">${user.email}</td>  
                                  <td data-id="${user.id}" class="passwordUser">${user.password}</td>
                                  <td data-id="${user.id}" class="areaUser">${user.area}</td>  
                                  <td data-id="${user.id}" class="leaderUser">${user.leader}</td>
                                  <td data-id="${user.id}" class="fechaUser">${user.entryDay}</td>  
                                  <td data-id="${user.id}" class="salarioAdminUser">${user.salarioAdmin}</td>
                                  <td><a href=${user.urlfirmRegister} download="Boleta.pdf"><button><i class="fas fa-download"></i>Descargar</button></a></td>
                                  <td data-id="${user.id}" class="checkUser">${user.checkAdmin}</td>
                                  <td><i data-id="${user.id}" class="btn-editUser fas fa-edit"></i> <button data-id="${user.id}" class="btnSaveFile" id="btnSaveFile">💾</button> <i class="btn-delUser fas fa-trash-alt" data-id="${user.id}"></i></td>
                                </tr>  
                             `;


                  const deleteUser = document.querySelectorAll('.btn-delUser');
                  deleteUser.forEach(btn => {
                    btn.addEventListener('click', async (e) => {
                      const r = confirm('¿Quieres eliminar este colaborador@?');
                      if (r == true) {
                        await deleteUserReg(e.target.dataset.id);
                      } else {
                        console.log('nose eliminó')
                      }    
                    })
                  });

                  const btnEditRow = document.querySelectorAll('.btn-editUser');
                  const btnUpdateRow = document.querySelectorAll('.btnSaveFile');
                  const editableRow = document.querySelectorAll('.row-users');
                  
                  btnEditRow.forEach(edit => {
                    edit.addEventListener('click', (e) => {
                      console.log('clickeando editar');
                      console.log(e.target.dataset.id);
                      console.log(doc.data());
                      fs.collection('users').get().then((querySnapshot)=>{
                            querySnapshot.forEach(doc => {
                              console.log(doc.id)
                              if(e.target.dataset.id === doc.id){
                                console.log(e.target.dataset.id);
                                console.log(doc.id);
                                editableRow.contentEditable = 'true';
                                editableRow.forEach(row => {
                                  console.log('holay')
                                  row.addEventListener('click', (e) => {
                                    console.log('holassss')
                                    console.log(e.target.dataset.id);
                                    console.log(doc.id);
                                    if(e.target.dataset.id === doc.id){
                                      row.contentEditable = 'true';
                                      row.focus()='true';
                                    }
                                  })
                                })
                                // btnUpdateRow.forEach(btn => {
                                //   console.log(btnUpdateRow)
                                //   btn.addEventListener('click', async (e) => {
                                //     console.log(e.target.dataset.id);
                                //     console.log(doc.id);
                                //     if(e.target.dataset.id === doc.id){
                                //       btnUpdateRow.hidden = false;
                                //     }
                                //   })
                                // })
                              }
                            })
                      })
                      
                    });
                  })  

                    // btnEditRow.addEventListener('click', () => {
                    //   console.log('clickeando editar');
                    //   const editableRow = document.querySelector('.row-users');
                    //   editableRow.contentEditable = 'true';
                    //   btnUpdateRow.hidden = false;
                    // });


                  btnUpdateRow.forEach(update => {
                    console.log(btnUpdateRow)
                    update.addEventListener('click', (e) =>{
                    console.log(update);
                    const docId = e.target.dataset.id;
                    editableRow.forEach(row => {
                      console.log('holay')
                      row.addEventListener('click', (e) => {
                        if(e.target.dataset.id === docId){
                          console.log('aaaaaaaaaa')
                          const name = row.querySelector('.nameUser').innerHTML;
                          const checkAdmin = row.querySelector('.checkUser').innerHTML;
                          const dni = row.querySelector('.dniUser').innerHTML;
                          const phone= row.querySelector('.phoneUser').innerHTML;
                          const email = row.querySelector('.emailUser').innerHTML;
                          const password = row.querySelector('.passwordUser').innerHTML;
                          const area = row.querySelector('.areaUser').innerHTML;
                          const leader = row.querySelector('.leaderUser').innerHTML;
                          const entryDay = row.querySelector('.fechaUser').innerHTML;
                          const salarioAdmin= row.querySelector('.salarioAdminUser').innerHTML;
                          console.log(name, checkAdmin, dni, phone, email, password, area,leader,entryDay,salarioAdmin)
                          const cityRef = firebase.firestore().collection('users').doc(docId );
                          const res = cityRef.update({
                            name, 
                            checkAdmin,
                            dni, 
                            phone, 
                            email, 
                            password, 
                            area,
                            leader,
                            entryDay,
                            salarioAdmin
      
                         }, { merge: true });
                         alert('Se han actualizado los datos')
                        }
                      
                      })
                    })

                    // fs.collection('users').get().then((querySnapshot)=>{
                    //   querySnapshot.forEach(doc => {
                    //     console.log(doc.id)
                    //     console.log(e.target.dataset.id)
                    //     if(e.target.dataset.id === doc.id){
                    //       const name = document.querySelector('.nameUser').innerHTML;
                    //       const checkAdmin = document.querySelector('.checkUser').innerHTML;
                    //       const dni = document.querySelector('.dniUser').innerHTML;
                    //       const phone= document.querySelector('.phoneUser').innerHTML;
                    //       const email = document.querySelector('.emailUser').innerHTML;
                    //       const password = document.querySelector('.passwordUser').innerHTML;
                    //       const area = document.querySelector('.areaUser').innerHTML;
                    //       const leader = document.querySelector('.leaderUser').innerHTML;
                    //       const entryDay = document.querySelector('.fechaUser').innerHTML;
                    //       const salarioAdmin= document.querySelector('.salarioAdminUser').innerHTML;
                    //       console.log(name, checkAdmin, dni, phone, email, password, area,leader,entryDay,salarioAdmin)
                    //       const cityRef = firebase.firestore().collection('users').doc(doc.id);
                    //       const res = cityRef.update({
                    //         name, 
                    //         checkAdmin,
                    //         dni, 
                    //         phone, 
                    //         email, 
                    //         password, 
                    //         area,
                    //         leader,
                    //         entryDay,
                    //         salarioAdmin
      
                    //      });
                    //     }
                    //   })
                    // })  
                
                    })
                  })
                    
                  // btnUpdateRow.addEventListener('click', () => {
                  //   console.log('UPDATE');
                  //   const name = document.querySelector('.nameUser').innerHTML;
                  //   const checkAdmin = document.querySelector('.checkUser').innerHTML;
                  //   const dni = document.querySelector('.dniUser').innerHTML;
                  //   const phone= document.querySelector('.phoneUser').innerHTML;
                  //   const email = document.querySelector('.emailUser').innerHTML;
                  //   const password = document.querySelector('.passwordUser').innerHTML;
                  //   const area = document.querySelector('.areaUser').innerHTML;
                  //   const leader = document.querySelector('.leaderUser').innerHTML;
                  //   const entryDay = document.querySelector('.fechaUser').innerHTML;
                  //   const salarioAdmin= document.querySelector('.salarioAdminUser').innerHTML;
                  //   console.log(name, checkAdmin, dni, phone, email, password, area,leader,entryDay,salarioAdmin)
                  //   const cityRef = firebase.firestore().collection('users').doc(doc.id);
                  //   const res = cityRef.update({
                  //     name, 
                  //     checkAdmin,
                  //     dni, 
                  //     phone, 
                  //     email, 
                  //     password, 
                  //     area,
                  //     leader,
                  //     entryDay,
                  //     salarioAdmin

                  //  }, { merge: true });
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



