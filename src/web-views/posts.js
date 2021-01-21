const savePost = (email, date, datetime, content,  url, useruid) => {
    const firestore = firebase.firestore();
    return firestore.collection('posts').add({
      email,
      date,
      datetime,
      content,
      url,
      useruid,
    });
};

// const loadPostHome = (callback) => {
//   firebase.firestore().collection('posts')
//     .orderBy('orderDate', 'desc')
//     .onSnapshot((querySanpshot) => {
//       const post = [];
//       querySanpshot.forEach((doc) => {
//         post.push({ id: doc.id, ...doc.data() });
//       });
//       callback(post);
//     });
// };

// const templatePost = (objPost) => {
//   const user = firebase.auth().currentUser;
//   const divElement = document.createElement('div');
//   divElement.className = 'userPost';
//   divElement.innerHTML = `
//   <div>
//   <div class="postHeader">
//       <div class="user-info">
//         <div class= "dateUser">
//           <p id="nameUser"> Publicado por: ${objPost.user}</p>
//           <time datetime="date">${objPost.date} </time>
//         </div>
//       </div>
//       ${(user.uid === objPost.useruid) ? `
//       <div class="option-edit-post">
//         <span>...</span>
//           <ul class="optionPost"> 
//             <li class="btnEdit">Editar</li>
//             <li class="btnRemove">Eliminar</li>
//           </ul>
//       </div>  ` : ''}      
//   </div>
//   <div class= "editPostOption">
//     <div class="contentPost">
//       <p contenteditable="false" id="editPost" >${objPost.content}</p>
//       ${objPost.url ? `<img id="photoPost" src="${objPost.url}">` : ''}
//     </div>
//     <button class="hide" hidden id="btnSave">💾</button>
//     <button class="hide" hidden id="btnCancel">✖️</button>
//  </div>
// </div>`;
//   return divElement;
// };

// const loadPostHome = () => {
//   const postsList = document.querySelector('container-post');
//   const userLogueado = firebase.auth().currentUser;
//   const useruid = userLogueado.uid;
//   allPost.innerHTML = '';
//   const db = firebase.firestore();
//   const postDB = db.collection('posts');

//   postDB.orderBy('datetime', 'desc').onSnapshot((querySnapshot) => {
//     querySnapshot.forEach((doc) => {
//       const post = doc.data();
//       const postElement = templatePost(post);
//       if (post.useruid === useruid) {
//         const btnDelete = postElement.querySelector('.btnRemove');
//         btnDelete.addEventListener('click', () => {
//           deletePost(post.id).then(() => {
//             loadPostHome();
//           });
//         });

//         const btnEdit = postElement.querySelector('.btnEdit');
//         const btnSave = postElement.querySelector('#btnSave');
//         const btnCancel = postElement.querySelector('#btnCancel');
//         btnEdit.addEventListener('click', () => {
//           const editable = postElement.querySelector('#editPost');
//           editable.contentEditable = 'true';
//           btnSave.hidden = false;
//           btnCancel.hidden = false;
//         });
//       }
//       const btnUpdatePost = postElement.querySelector('#btnSave');
//       btnUpdatePost.addEventListener('click', () => {
//         const update = postElement.querySelector('#editPost').innerHTML;
//         editPost(post.id, update).then(() => {
//           loadPostHome();
//         });
//       });

//       const btnCancelEdit = postElement.querySelector('#btnCancel');
//       btnCancelEdit.addEventListener('click', () => {
//         loadPostHome();
//       });
//     });
//   });
// };
// loadPostHome();
  
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
      savePost(email,  date, datetime, textToPost, url, useruid).then(() => {
        // if (userLogueado !== null) {
        //   loadPostHome();
        // }
        
        sessionStorage.removeItem('imgNewPost');
        const pic = document.querySelector('.picPost');
        pic.parentNode.classList.add('hide');
        console.log('con foto')
      });
    } else {
      savePost( email, date, datetime, textToPost, null, useruid).then(() => {
        // if (userLogueado !== null) {
        // //   loadPostHome();
        console.log('no jodadddssasaa')
        // }
      });
    }
    inputTextArea.value = '';
    btnAddImage.value = '';
  });




const editPost = (id, content) => firebase.firestore().collection('posts').doc(id).update({ content });
const deletePost = id => firebase.firestore().collection('posts').doc(id).delete(); 

const postsList = document.querySelector('.posts');
const setupPosts = data => {
    if (data.length) {
        let posts = '';
        const user = firebase.auth().currentUser;
        data.forEach(doc=> {
            const post = doc.data();
            console.log(post)
            const li = `
            <div>
              <div class="postHeader">
                  <div class="user-info">
                    <div class= "dateUser">
                      <p id="nameUser"> Publicado por: ${post.email}</p>
                      <time datetime="date">${post.date} </time>
                    </div>
                  </div>
                  ${(user.uid === post.useruid) ? `
                  <div class="option-edit-post">
                    <span>...</span>
                      <ul class="optionPost"> 
                        <li class="btnEdit">Editar</li>
                        <li class="btnRemove">Eliminar</li>
                      </ul>
                  </div>  ` : ''}      
              </div>
              <div class= "editPostOption">
                <div class="contentPost">
                  <p contenteditable="false" id="editPost" >${post.content}</p>
                  ${post.url ? `<img id="photoPost" src="${post.url}">` : ''}
                </div>
                <button class="hide" hidden id="btnSave">💾</button>
                <button class="hide" hidden id="btnCancel">✖️</button>
              </div>
            </div>`;

            posts += li;
        });

        postsList.innerHTML= posts;
    } else {
        postsList.innerHTML= `<p>No existen post en este momento</p>`;
    }
}

firebase.auth().onAuthStateChanged(user => {
    if (user) {
      fs.collection('posts')
      .get()
      .then((snapshot) => {
          console.log(snapshot.docs);
          setupPosts(snapshot.docs)
      })
    } else {
      console.log('auth: sign out');
      setupPosts([])
    }
  });

 