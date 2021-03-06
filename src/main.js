import { changeView } from './views-controler/router.js';

const init = () =>{
    const firebaseConfig = {
        apiKey: "AIzaSyAPvuYSkfkOfaRObLXvtDiZjVoQGYDIacc",
        authDomain: "web-imax.firebaseapp.com",
        projectId: "web-imax",
        storageBucket: "web-imax.appspot.com",
        messagingSenderId: "114819498377",
        appId: "1:114819498377:web:02e7671a7255f711cf6158",
        measurementId: "G-P8W33C2X62"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    changeView(window.location.hash)
    window.addEventListener('hashchange', ()=> changeView(window.location.hash))

};
window.addEventListener('load', init);





window.addEventListener('load', init)
