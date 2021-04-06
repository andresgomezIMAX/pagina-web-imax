const { Router } = require('express');

const router = Router();

router.post('/send-email', (req, res) => {
    const {name, company, phone, email, message} = req.body;

    contentHTML = `
    <h1> User information </h1>
    <ul>
            <li> User name: ${name}</li>
            <li> User company: ${company} </li>
            <li> User phone: ${phone} </li>
            <li> User email: ${email} </li>
            
    </ul>
    <p> User Message: ${message} </p>
    
    `; 

    console.log(contentHTML);



    res.send('received')
})

module.exports = router;