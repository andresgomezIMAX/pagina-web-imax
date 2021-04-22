const $form = document.querySelector(".form-contact-single");
console.log($form);

$form.addEventListener("submit", sendEmail);

function sendEmail(e) {
  e.preventDefault();
  const name = document.querySelector(".name").value;
  const company = document.querySelector(".company").value;
  const phone = document.querySelector(".phone").value;
  const email = document.querySelector(".email").value;
  const message = document.querySelector(".message").value;


  var templateParams = {
    name,
    company,
    phone,
    email,
    message
  };
  emailjs.send("gmailMessage","template_b5amrsu",templateParams,"user_0loQaVMyGMBSx2TKKJJQW")
  .then(
    function (response) {
      console.log("SUCCESS!", response.status, response.text);
      $form.reset();
      document.querySelector("#success").innerHTML = "Email enviado con éxito.";
    },
    function (error) {
      console.log("FAILED...", error);
    }
  );

};