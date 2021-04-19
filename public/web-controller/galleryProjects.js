
const onGetProjects = (callback) =>
    fs.collection("projects").onSnapshot(callback);

const projectContainer = document.querySelector(".box-par");
console.log(projectContainer);
window.addEventListener("DOMContentLoaded", async (e) => {
    onGetProjects((querySnapshot) => {
        projectContainer.innerHTML = "";
        querySnapshot.forEach((doc) => {
            const project = doc.data();
            project.id = doc.id;
            const user = firebase.auth().currentUser;
            projectContainer.innerHTML += `
            
      <div class="square">
                    <figure>
                        <img src=${project.urlCarrusel} alt="">
                        <div class="capa-detailed">
                            <div class="capa1">
                                <div class="capa-icon"><a href="./individual.html"><i class="fas fa-link"></i></a></div>
                                <div class="capa-icon" ><a href=""><i class="fas fa-search-plus"></i></a></div>
                                
                            </div>
                            <div class="capa2">
                                <p class="title-project">${project.nombre}</p>
                                <p>Tasación</p>
                   
                            </div>
                        </div>
                    </figure>
                </div>`;

            const btnsRemove = document.querySelectorAll(".btnRemove");
            btnsRemove.forEach((btn) => {
                btn.addEventListener("click", async (e) => {
                    const r = confirm("¿Quieres eliminar esta noticia?");
                    if (r == true) {
                        await deletePost(e.target.dataset.id);
                    }
                });
            });

            const btnsEdit = document.querySelectorAll(".btnEdit");
            btnsEdit.forEach((btn) => {
                btn.addEventListener("click", async (e) => {
                    const doc = await getPostEdit(e.target.dataset.id);
                    console.log(doc.data());
                    const post = doc.data();
                    editStatus = true;
                    id = doc.id;
                    const inputTextArea = document.querySelector(".textarea");
                    inputTextArea.value = post.content;
                    btnNewPost.innerHTML = "Actualizar";
                });
            });
        });
    });
});