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
        <td>${cts.confirmacion === true ? `<input type="checkbox" class="conformidad" value= ${cts.confirmacion}  name="conformidad" data-id="${cts.id}" disabled="disabled"  checked >` : 
        `<input type="checkbox" class="conformidad" value= ${cts.confirmacion}  name="conformidad"  data-id="${cts.id}" > `} </td>
      </tr>`;
      }
    
    });


    const checkboxs = document.querySelectorAll('.conformidad');
    checkboxs.forEach(check => {
      check.addEventListener('click', function (e) {
        if (this.checked) {
          console.log('click pe')
          querySnapshot.forEach(doc => {
            const confir = doc.id
            console.log(doc.id);
            console.log(e.target.dataset.id)
            if (e.target.dataset.id === doc.id) {

              console.log('joalaaa')
              const r = confirm('¿Desea dar conformidad a su Constancia CTS?')
              const cityRef = fs.collection('cts').doc(doc.id);
              const res = cityRef.update({
                confirmacion: true
              }, {
                merge: true
              });
             
            }
            
          })

         
        } else {
          querySnapshot.forEach(doc => {
            console.log(doc.id);
            console.log(e.target.dataset.id)
            if (e.target.dataset.id === doc.id) {
              console.log('joalaaa')
              // confirm('¿Desea dar el VB a la solicitud de vacaciones?')
              // window.localStorage.removeItem(doc.id, false)
              // window.localStorage.setItem(doc.id, false)
              const cityRef = fs.collection('cts').doc(doc.id);
              const res = cityRef.update({
                confirmacion: false
              }, {
                merge: true
              });
            }
          })
        }
      })
    })
  })
 
})