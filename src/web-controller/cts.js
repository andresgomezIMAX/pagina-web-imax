// para mostrar los datos en la tabla'pages'
const onGetCts = (callback) => fs.collection('cts').onSnapshot(callback);

const getUsers = () => fs.collection('users').get();
const getCts = () => fs.collection().get();

const ctsContainer = document.querySelector('.table-cts')
window.addEventListener('DOMContentLoaded', async(e) => {
    onGetCts((querySnapshot)=>{
    ctsContainer.innerHTML='';
    querySnapshot.forEach(doc => {
      const cts = doc.data();
      console.log(cts)
      cts.id = doc.id;
      const userLogueado = firebase.auth().currentUser;
      console.log(userLogueado.uid)
      if (cts.idWorkerCts === userLogueado.uid) {
        ctsContainer.innerHTML +=  `
        <tr>
        <td>${cts.monthCts}</td>
        <td>${cts.pageCts}</td>
        <td><a href=${cts.urlBoleta} download="Boleta.pdf"><button><i class="fas fa-download"></i> Descargar</button></a></td>
        <td><input type="checkbox" id="cbox2" value="conformidad">  </td>
     `;
      }
    
    });
  })
 
})