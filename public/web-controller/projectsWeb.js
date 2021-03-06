const saveProjects = (nombre, servicio, description, urlCarrusel, urlProject, checkProjectHome,  content, useruid) => {
  return fs.collection("projects").add({
    nombre,
    servicio,
    description,
    urlCarrusel,
    urlProject, 
    checkProjectHome,
    content,
    useruid,
  });
};

let dataFile;
  const currentUser = () => firebase.auth().currentUser;
  const btnImgCarrusel = document.querySelector('#addImgCarrusel');
  if(btnImgCarrusel){
    btnImgCarrusel.addEventListener('change', (e) => {
      console.log('CLICK SUBIR IMAGEN', e.target.files[0]);
      // Get file
      dataFile = e.target.files[0];
      if (dataFile) {
        const storageRef = firebase.storage().ref(`projectCarrusel/${currentUser().email}/${dataFile.name}`);
        // Upload data
        const task = storageRef.put(dataFile);
        console.log(task)
        // Update progress bar
        let urlCarrusel= '';
        task.on(
          "state_changed",
          (snapshot) => {
            const percent =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            const progressCarrusel = document.querySelector(
              ".progresslineCarrusel"
            );
            progressCarrusel.parentNode.classList.add("show");
            progressCarrusel.innerText = `${percent.toFixed(0)}%`;
            progressCarrusel.style.width = `${percent}%`;
          },
          () => {},
          () => {
            task.snapshot.ref.getDownloadURL().then((downloadURL) => {
              console.log("File available at", downloadURL);
              urlCarrusel = downloadURL;
              sessionStorage.setItem("imgCarrusel", urlCarrusel);
            });
          }
        );
      }
    });
  };

  let file;
  const btnImgLarge = document.querySelector("#addImgLarge");
  if(btnImgLarge){
    btnImgLarge.addEventListener('change', (e) => {
      console.log('CLICK SUBIR IMAGEN', e.target.files[0]);
      // Get file
      file = e.target.files[0];
      if (file) {
        const storageRef = firebase.storage().ref(`projectLarge/${currentUser().email}/${file.name}`);
        // Upload data
        const task = storageRef.put(file);
        console.log(task)
        // Update progress bar
        let urlProjectLarge= '';
        task.on(
          "state_changed",
          (snapshot) => {
            const percent =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            const progressCarrusel = document.querySelector( ".progressline");
            progressCarrusel.parentNode.classList.add("show");
            progressCarrusel.innerText = `${percent.toFixed(0)}%`;
            progressCarrusel.style.width = `${percent}%`;
          },
          () => {},
          () => {
            task.snapshot.ref.getDownloadURL().then((downloadURL) => {
              console.log("File available at", downloadURL);
              urlProjectLarge = downloadURL;
              sessionStorage.setItem("imgProjectLarge", urlProjectLarge);
            });
          }
        );
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

 const generateProject = document.querySelector(".generate-project");

//  const progress = document.querySelector(".progressline");




 //boton publicar nuevo post
 generateProject.addEventListener("submit", (event) => {
   event.preventDefault();
   const userLogueado = firebase.auth().currentUser;
   console.log(userLogueado);
   const useruid = userLogueado.uid;
   const urlCarrusel = sessionStorage.getItem("imgCarrusel");
   const urlProject = sessionStorage.getItem("imgProjectLarge");
   const nombre = document.querySelector(".nameProject").value;
   console.log(nombre);
   const servicio = document.querySelector(".typeService").value;
   console.log(servicio);
   const description = document.querySelector(".descriptionProject").value;
   console.log(description);
    const checkProjectHome = document.querySelector(".checkProjectHome").value;
    console.log(checkProjectHome);
   const content = document.querySelector(".textarea").value;
   console.log(content);
   if (urlProject && urlCarrusel) {
     saveProjects(
       nombre,
       servicio,
       description,
       urlCarrusel,
       urlProject,
       checkProjectHome,
       content,
       useruid
     ).then(() => {
       // if (userLogueado !== null) {
       //   loadPostHome();
       // }
       sessionStorage.removeItem("imgCarrusel");
       sessionStorage.removeItem("imgProjectLarge");
       //  const pic = document.querySelector(".picPost");
       //  pic.parentNode.classList.add("hide");
       console.log("con foto");
       generateProject.reset();
       alert("Se guard?? proyecto nuevo");
     });
   } else {
     alert("Por favor ingrese todos los datos");
   }
 
 });



 // FUNCIONES PARA FORMULARIO DE NOTICIAS ******************************************************

 const saveArticle = (nameArticle,urlArticle,descriptionArticle, contentArticle) => {
   return fs.collection("articles").add({
     nameArticle,
     urlArticle,
     descriptionArticle,
     contentArticle,
    
   });
 };

 let fileArticle;
 const btnImgArticle = document.querySelector("#addImgArticle");
 if (btnImgArticle) {
   btnImgArticle.addEventListener("change", (e) => {
     console.log("CLICK SUBIR IMAGEN", e.target.files[0]);
     // Get file
     fileArticle = e.target.files[0];
     if (fileArticle) {
       const storageRef = firebase
         .storage()
         .ref(`projectArticle/${currentUser().email}/${fileArticle.name}`);
       // Upload data
       const task = storageRef.put(fileArticle);
       console.log(task);
       // Update progress bar
       let urlArticle = "";
       task.on(
         "state_changed",
         (snapshot) => {
           const percent =
             (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
           const progressArticle = document.querySelector(
             ".progresslineArticle"
           );
           progressArticle.parentNode.classList.add("show");
           progressArticle.innerText = `${percent.toFixed(0)}%`;
           progressArticle.style.width = `${percent}%`;
         },
         () => {},
         () => {
           task.snapshot.ref.getDownloadURL().then((downloadURL) => {
             console.log("File available at", downloadURL);
             urlArticle = downloadURL;
             sessionStorage.setItem("imgArticle", urlArticle);
           });
         }
       );
     }
   });
 }

 
//  const delFileStorage = (file) =>
//    firebase
//      .storage()
//      .ref()
//      .child(`postImage/${currentUser().email}/${file.name}`)
//      .delete();

//  const btnDeleteImg = document.querySelector(".deleteImg");
//  console.log(btnDeleteImg);
//  if (btnDeleteImg) {
//    btnDeleteImg.addEventListener("click", () => {
//      const objFile = sessionStorage.getItem("imgNewPost");
//      delFileStorage(objFile);
//      sessionStorage.removeItem("imgNewPost");
//      btnDeleteImg.parentNode.classList.add("hide");
//    });
//  }

 const generateArticle = document.querySelector(".generate-article");

 //  const progress = document.querySelector(".progressline");

 //boton publicar nuevo post
 generateArticle.addEventListener("submit", (event) => {
   event.preventDefault();
   const userLogueado = firebase.auth().currentUser;
   console.log(userLogueado);
   const useruid = userLogueado.uid;
   const urlArticle = sessionStorage.getItem("imgArticle");
   const nameArticle = document.querySelector(".nameArticle").value;
   const descriptionArticle = document.querySelector(".descriptionArticle").value;
   const contentArticle = document.querySelector(".newArticle").value;

   if (urlArticle) {
     saveArticle(nameArticle, urlArticle, descriptionArticle, contentArticle,  useruid).then(() => {
       // if (userLogueado !== null) {
       //   loadPostHome();
       // }
       sessionStorage.removeItem("imgArticle");
       //  const pic = document.querySelector(".picPost");
       //  pic.parentNode.classList.add("hide");
       console.log("noticia con foto");
       generateArticle.reset();
       alert("Se guard?? una noticia nueva");
     });
   } else {
     alert("Por favor ingrese todos los datos");
   }
 });


