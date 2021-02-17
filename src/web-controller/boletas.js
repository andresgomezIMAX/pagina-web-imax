// para mostrar los datos en la tabla'pages'
const onGetPages = (callback) => fs.collection('pages').onSnapshot(callback);
const getUsers = () => fs.collection('users').get();
const getPages = () => fs.collection().get();

const pageContainer = document.querySelector('.table-page')
window.addEventListener('DOMContentLoaded', async (e) => {
  onGetPages((querySnapshot) => {
    pageContainer.innerHTML = '';
    querySnapshot.forEach(doc => {
      const page = doc.data();
      console.log(page)
      page.id = doc.id;
      const userLogueado = firebase.auth().currentUser;
      console.log(userLogueado)
      if (page.idWorker === userLogueado.uid) {
        pageContainer.innerHTML += `
        <tr>
        <td>${page.month}</td>
        <td>${page.totalPage}</td>
        <td><a href=${page.urlBoleta} download="Boleta.pdf"><button><i class="fas fa-download"></i> Descargar</button></a></td>
        <td>${page.confirmacion === true ? `<input type="checkbox" class="conformidad" value= ${page.confirmacion}  name="conformidad" data-id="${page.id}" disabled="disabled"  checked >` : 
        `<input type="checkbox" class="conformidad" value= ${page.confirmacion}  name="conformidad"  data-id="${page.id}" > `} </td>
        </tr>`
      };
    
      
      

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
              const r = confirm('¿Desea dar conformidad a su Boleta de pago?')
              window.localStorage.setItem(doc.id, check.checked)
              const cityRef = fs.collection('pages').doc(doc.id);
              const res = cityRef.update({
                confirmacion: true
              }, {
                merge: true
              });
             
            }
            
          })

        check.setAttribute("disabled" ,"disabled")
         
        } else {
          querySnapshot.forEach(doc => {
            console.log(doc.id);
            console.log(e.target.dataset.id)
            if (e.target.dataset.id === doc.id) {
              console.log('joalaaa')
              // confirm('¿Desea dar el VB a la solicitud de vacaciones?')
              // window.localStorage.removeItem(doc.id, false)
              // window.localStorage.setItem(doc.id, false)
              const cityRef = fs.collection('pages').doc(doc.id);
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