
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


// const loadPosts = () => {
//     const postsList = document.querySelector('.posts');
//     const userLogueado = firebase.auth().currentUser;
//     const useruid = userLogueado.uid;
//     allPost.innerHTML = '';
//     const db = firebase.firestore();
//     const postDB = db.collection('posts');
// }




// const setupPosts = data => {
//     if (data.length) {
//         let posts = '';
//         data.forEach(doc=> {
//             const post = doc.data();
//             const li = `
//             <li class="box-post">
//             <h3>${post.title}</h5>
//             <p>${post.description}</p>
//             </li>`;

//             posts += li;
//         });

//         postsList.innerHTML= posts;
//     } else {
//         postsList.innerHTML= `<p>No existen post en este momento</p>`;
//     }
// }

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