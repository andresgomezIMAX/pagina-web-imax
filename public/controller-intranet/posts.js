let editStatus = false;
let id = '';

const savePost = (email, date, datetime, content,  url, useruid) => {
    return fs.collection('posts').add({
      email,
      date,
      datetime,
      content,
      url,
      useruid,
    });
};

const getPosts = () => fs.collection('posts').orderBy('orderDate', 'desc').get();

const getPostEdit = (id) => fs.collection('posts').doc(id).get();

const onGetPost = (callback) => fs.collection('posts').orderBy('datetime', 'desc').onSnapshot(callback);

const deletePost = id => fs.collection('posts').doc(id).delete();

const editPost = (id, contentPost) => fs.collection('posts').doc(id).update(contentPost);



const postContainer = document.querySelector('.container-post')
window.addEventListener('DOMContentLoaded', async(e) => {
  onGetPost((querySnapshot)=>{
    postContainer.innerHTML='';
    querySnapshot.forEach(doc => {
      const post = doc.data();
      post.id = doc.id;
      const user = firebase.auth().currentUser;
      postContainer.innerHTML +=  `
                  <div class="eachPost">
                    <div class="postHeader">
                        <div class="user-info">
                          <div class="circle-user"> <i class="user-icon fas fa-user"></i> </div> 
                          <div class= "dateUser">
                            <p id="nameUser"> Publicado por: ${post.email}</p>
                            <time datetime="date">${post.date} </time>
                          </div>
                        </div>
                        ${(user.uid === post.useruid) ? `
                        <div class="option-edit-post">
                          <span>...</span>
                            <ul class="optionPost"> 
                              <li class="btnEdit" data-id="${post.id}"> <i class="fas fa-edit"></i> Editar</li>
                              <li class="btnRemove" data-id="${post.id}"> <i class="fas fa-trash-alt"></i> Eliminar</li>
                            </ul>
                        </div>  ` : ''}      
                    </div>
                    <div class= "editPostOption">
                      <div class="contentPost">
                        <p contenteditable="false" id="editPost" >${post.content}</p>
                        ${post.url ? `<img id="photoPost" src="${post.url}">` : ''}
                      </div>
                    </div>
                  </div>`;


                  const btnsRemove = document.querySelectorAll('.btnRemove');
                  btnsRemove.forEach(btn => {
                    btn.addEventListener('click', async (e) => {
                      const r = confirm('¿Quieres eliminar esta noticia?')
                      if (r == true) {
                        await deletePost(e.target.dataset.id)
                      } 
                    })
                  });

                  const btnsEdit = document.querySelectorAll('.btnEdit');
                  btnsEdit.forEach((btn) => {
                    btn.addEventListener('click', async(e) => {
                     const doc = await getPostEdit(e.target.dataset.id)
                     console.log(doc.data())
                     const post = doc.data();
                     editStatus = true;
                     id = doc.id;
                     const inputTextArea = document.querySelector('.textarea');
                     inputTextArea.value = post.content;
                     btnNewPost.innerHTML = 'Actualizar'
                    })
                  });
    });
  })
 
})


  
  //evento para subir imagen
  let file;
  const currentUser = () => firebase.auth().currentUser;
  const btnAddImage = document.querySelector('#addImage');
  if(btnAddImage){
    btnAddImage.addEventListener('change', (e) => {
      console.log('CLICK SUBIR IMAGEN', e.target.files[0]);
      // Get file
      file = e.target.files[0];
      if (file) {
        const storageRef = firebase.storage().ref(`postImage/${currentUser().email}/${file.name}`);
        // Upload file
        const task = storageRef.put(file);
        console.log(task)
        // Update progress bar
        let url = '';
        task.on('state_changed', (snapshot) => {
          const percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          const progress = document.querySelector('.progressline');
          progress.parentNode.classList.add('show');
          progress.innerText = `${percent.toFixed(0)}%`;
          progress.style.width = `${percent}%`;
        }, () => {
        }, () => {
          task.snapshot.ref.getDownloadURL().then((downloadURL) => {
            console.log('File available at', downloadURL);
            url = downloadURL;
            sessionStorage.setItem('imgNewPost', url);
            const pic = document.querySelector('.picPost');
            pic.parentNode.classList.remove('hide');
            pic.setAttribute('src', url)
          })
          setTimeout(() => {
            const progress = document.querySelector('.progressline');
            progress.parentNode.classList.remove('show');
          }, 2500);
        });
      }
    });
  };

  

  const  btnNewPost = document.querySelector('.btnNewPost');  
  const inputTextArea = document.querySelector ('.textarea');
  const progress = document.querySelector('.progressline');
  const f = new Date();
  const date = (`${f.getDate()}/${f.getMonth() + 1}/${f.getFullYear()}`);

//boton publicar nuevo post
  btnNewPost.addEventListener('click', (event) => {
    event.preventDefault();
    const userLogueado = firebase.auth().currentUser;
    console.log(userLogueado)
    const useruid = userLogueado.uid;
    const url = sessionStorage.getItem('imgNewPost');
    const email = userLogueado.providerData[0].email;
    const textToPost = inputTextArea.value;
    const hours = new Date();
    const datetime = (`${hours.getFullYear()}${hours.getMonth() + 1}${hours.getDate()}${hours.getHours()}${hours.getMinutes()}${hours.getSeconds()}`);
    if(url){
      if(!editStatus){
        savePost(email,  date, datetime, textToPost, url, useruid).then(() => {
          // if (userLogueado !== null) {
          //   loadPostHome();
          // }
          sessionStorage.removeItem('imgNewPost');
          const pic = document.querySelector('.picPost');
          pic.parentNode.classList.add('hide');
          console.log('con foto')
        });
        sendEmail(email,  date, url, textToPost)
        console.log(url)
        sessionStorage.removeItem('imgNewPost');
        
      } else{
        
       editPost(id,{
          content:textToPost,
        })

        editStatus = false;
        id = '';
        btnNewPost.innerHTML = 'Publicar'
       }
      
    } else {

      if(!editStatus){
        savePost( email, date, datetime, textToPost, null, useruid).then(() => {
          // if (userLogueado !== null) {
          // //   loadPostHome();
          
          console.log('se publicó post')
          // }
          
        });
        sendEmail(email,  date, null,  textToPost)
      }else{
        
        editPost(id,{
          content:textToPost,
        })

       editStatus = false;
        id = '';
       
        btnNewPost.innerHTML = 'Publicar'
       }
   
    }
    getPosts();
    inputTextArea.value = '';
    btnAddImage.value = '';
  });


  function sendEmail(email,  date, url, textToPost, ) {

    var templateParams = {
        email,
        date,
        url,
        textToPost,
        
    };
    emailjs.send("service_4llabe1", "template_2b12rnk", templateParams, "3i6EULkFX3J_cpr8j")
        .then(
            function (response) {
                console.log("SUCCESS!", response.status, response.text);
                if (response.status === 200) {
                    console.log("se envió correo")
                }

            },
            function (error) {
                console.log("FAILED...", error);
            }
        );
}





  const delFileStorage = (file) => firebase.storage().ref().child(`postImage/${currentUser().email}/${file.name}`).delete();

  const btnDeleteImg = document.querySelector('.deleteImg');
  if (btnDeleteImg) {
    btnDeleteImg.addEventListener('click', () => {
      const objFile =  sessionStorage.getItem('imgNewPost');;
      delFileStorage(objFile);
      sessionStorage.removeItem('imgNewPost');
      btnDeleteImg.parentNode.classList.add('hide');
    });
  }


// firebase.auth().onAuthStateChanged(user => {
//     if (user) {
//       fs.collection('posts')
//       .get()
//       .then((snapshot) => {
//           console.log(snapshot.docs);
//           setupPosts(snapshot.docs)
//       })
//     } else {
//       console.log('auth: sign out');
//       setupPosts([])
//     }
//   });

//Obteniendo fecha actual
var dateToday = new Date();
console.log(dateToday);

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    console.log([day, month, year].join('-'))

    return [day, month, year].join('-');
}


 
    fs.collection('users').onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // console.log(`${doc.id} => ${doc.data().entryDay}`);
            const userLogueado = firebase.auth().currentUser;
            const useruid = userLogueado.uid;
            const user = doc.data();
            user.id = doc.id;

            if (useruid === user.id) {
                let vacationPending;
                let newDateExpire;
                //Obteniendo fecha de ingreso
                const entryDay = doc.data().entryDay;
                console.log(entryDay)
                const yearOfEntry = entryDay.slice(6);
                console.log(yearOfEntry);

                //año vigente 
                const cYear = dateToday.getFullYear()
                const currentYear = cYear.toString();
                console.log(currentYear)

                if (yearOfEntry === currentYear) {
                    //A la fecha de ingreso, sumarle un año
                    // const vec = entryDay.split('-');
                    // console.log(vec)
                    // var fecha = new Date(vec[2], vec[1] - 1, vec[0]);
                    // console.log(fecha)
                    // var año = dateToday.getFullYear() + 1;
                    // console.log(año)
                    // let mes = fecha.getMonth();
                    // if (fecha.getMonth() < 10) {
                    //     mes = `${fecha.getMonth()+1}`
                    //       if (mes.length < 2)
                    //         mes = '0' + mes;
                    // } else {
                    //     mes = `${fecha.getMonth()+1}`
                    //         if (mes.length < 2)
                    //         mes = '0' + mes;
                    // }
                    // let dia = fecha.getDate();
                    // if (fecha.getDate() < 10) {
                    //     dia = `${fecha.getDate()}`
                    //         if (dia.length < 2)
                    //         dia = '0' + dia;
                    // } else {
                    //     dia = `${fecha.getDate()}`
                    //         if (dia.length < 2)
                    //         dia = '0' + dia;
                    // }

                    const yearOfEntry = parseInt(entryDay.slice(6))+1;
                    const dayOfEntry = entryDay.slice(0,2);
                    const monthOfEntry = entryDay.slice(3,5);
                    
                  
                    console.log(monthOfEntry);
                    console.log(dayOfEntry);

                    newDateExpire = dayOfEntry + '-' + monthOfEntry + '-' + yearOfEntry;
                    console.log(newDateExpire)

                   

                    const cityRef = fs.collection('users').doc(doc.id);
                    const res = cityRef.set({
                        newDateExpire,
                 

                    }, {
                        merge: true
                    });


                } else {

                   

                    // //A la fecha de ingreso, sumarle un año
                    // const vec = entryDay.split('-');
                    // var fecha = new Date(vec[0], vec[1] - 1, vec[2]);
                    // console.log(fecha)
                    // // var año = dateToday.getFullYear() + 1;
                    // // console.log(año)
                    // let mes = fecha.getMonth();
                    // if (fecha.getMonth() < 10) {
                    //     mes = `${fecha.getMonth()+1}`
                    // } else {
                    //     mes = `${fecha.getMonth()+1}`
                    // }
                    // let dia = fecha.getDate();
                    // if (fecha.getDate() < 10) {
                    //     dia = `${fecha.getDate()}`
                    // } else {
                    //     dia = `${fecha.getDate()}`
                    // }
                    
                    //año vigente 
                    const yearOfEntry = parseInt(currentYear) + 1
                    
                     
                    const dayOfEntry = entryDay.slice(0,2);
                    const monthOfEntry = entryDay.slice(3,5);
                    
             
                    console.log(monthOfEntry);
                    console.log(dayOfEntry);

                  
                

                  


                    newDateExpire = dayOfEntry + '-' + monthOfEntry + '-' + yearOfEntry;
                    console.log(newDateExpire)
                    

                    const cityRef = fs.collection('users').doc(doc.id);
                    const res = cityRef.set({
                        newDateExpire,
                  

                    }, {
                        merge: true
                    });

                }



            }


        })
    })