// para mostrar los datos en la tabla'pages'
const onGetPages = (callback) => fs.collection('pages').onSnapshot(callback);
const getUsers = () => fs.collection('users').get();
const getPages = () => fs.collection().get();

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
                                <td>${page.totalPage}</td>
                                <td><a href=${page.urlBoleta} download="Boleta.pdf"><button><i class="fas fa-download"></i> Descargar</button></a></td>
                                <td><input type="checkbox" id="cbox2" value="conformidad">  </td>
                             `;
    });
  })
 
})