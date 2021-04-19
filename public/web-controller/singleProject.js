// const onGetProjects = (callback) => fs.collection("projects").onSnapshot(callback);

// const projectContainer = document.querySelector(".single-project");
// console.log(projectContainer)
// window.addEventListener("DOMContentLoaded", async (e) => {
//   onGetProjects((querySnapshot) => {
//     projectContainer.innerHTML = "";
//     querySnapshot.forEach((doc) => {
//       const project = doc.data();
//       project.id = doc.id;
//       const user = firebase.auth().currentUser;
//       projectContainer.innerHTML += `

//       <div class="head-project">
//                 <h1>${project.nombre} (${project.servicio})</h1>
//                 <div><i class="fas fa-long-arrow-alt-left"></i> <a href="./proyectos.html">Volver</a></div>
//       </div>
//       <div class="box-img"><img src="${project.urlProject}" alt=""></div>
            
//       <div class="text-project">
//           <p>${project.content}
//           </p>
//       </div>`;

   
//     });
//   });
// });
