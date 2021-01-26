// para mostrar los datos en la tabla'pages'
const onGetPages = (callback) => firebase.firestore().collection('pages').onSnapshot(callback);
const getUsers = () => firebase.firestore().collection('users').get();
const getPages = () => firebase.firestore().collection().get();

const pageContainer = document.querySelector('.table-page')
window.addEventListener('DOMContentLoaded', async(e) => {
  onGetPages((querySnapshot)=>{
    pageContainer.innerHTML='';
    querySnapshot.forEach(doc => {
      const page = doc.data();
      console.log(page)
      page.id = doc.id;
      const user = firebase.auth().currentUser;
      pageContainer.innerHTML +=  `

                                    <tr>
                                <td>${page.month}</td>
                                <td>3000.00</td>
                                <td><a href=${page.urlBoleta} download="Boleta.pdf"><button><i class="fas fa-download"></i> Imprimir</button></a></td>
                                <td><input type="checkbox" id="cbox2" value="conformidad">  </td>
                             `;


                  const btnsRemove = document.querySelectorAll('.btnRemove');
                  btnsRemove.forEach(btn => {
                    btn.addEventListener('click', async (e) => {
                 
                     await deletePost(e.target.dataset.id)
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
                     const inputTextArea = document.querySelector ('.textarea');
                     inputTextArea.value = post.content;
                     btnNewPost.innerHTML = 'Actualizar'
                    })
                  });
    });
  })
 
})