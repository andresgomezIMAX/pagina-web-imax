const saveProjects = (nombre, servicio, description, url, content, useruid) => {
  return fs.collection("projects").add({
    nombre,
    servicio,
    description,
    url,
    content,
    useruid,
  });
};

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


  const delFileStorage = (file) => firebase.storage().ref().child(`postImage/${currentUser().email}/${file.name}`).delete();
    
  const btnDeleteImg = document.querySelector(".deleteImg");
    console.log(btnDeleteImg)
    if (btnDeleteImg) {
      btnDeleteImg.addEventListener("click", () => {
        const objFile = sessionStorage.getItem("imgNewPost");
        delFileStorage(objFile);
        sessionStorage.removeItem("imgNewPost");
        btnDeleteImg.parentNode.classList.add("hide");
      });
    }

 const btnNewPost = document.querySelector(".btnNewPost");

//  const progress = document.querySelector(".progressline");




 //boton publicar nuevo post
 btnNewPost.addEventListener("click", (event) => {
   event.preventDefault();
   const userLogueado = firebase.auth().currentUser;
   console.log(userLogueado);
   const useruid = userLogueado.uid;
   const url = sessionStorage.getItem("imgNewPost");
    const nombre = document.querySelector(".nameProject").value;
    console.log(nombre);
    const servicio = document.querySelector(".typeService").value;
    console.log(servicio);
    const description = document.querySelector(".descriptionProject").value;
    console.log(description);
    const content = document.querySelector(".textarea").value;
    console.log(content);
   if (url) {

       saveProjects(nombre, servicio, description, url, content, useruid).then(
         () => {
           // if (userLogueado !== null) {
           //   loadPostHome();
           // }
           sessionStorage.removeItem("imgNewPost");
           const pic = document.querySelector(".picPost");
           pic.parentNode.classList.add("hide");
           console.log("con foto");
         }
       );
   
   } else {
    
       saveProjects(nombre, servicio, description, url, content, useruid).then(
         () => {
           // if (userLogueado !== null) {
           // //   loadPostHome();

           console.log("se publicó post");
           // }
         }
       );
     
     
   }
//    getPosts();
   content.value = "";
   btnAddImage.value = "";
 });
