const $registerForm = document.querySelector(".register-form");

$registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  sendData()
});


async function sendData(){

    const formData = new FormData($registerForm);
    const bodyData = {
      firstName: formData.get("firstname"),
      lastName: formData.get("lastname"),
      email: formData.get("email"),
      password: formData.get("apipassword"),
    };
  

    const res = await fetch(
        "https://prime-garfish-currently.ngrok-free.app/users",
        {
          method: "POST",
          headers: {
            "ngrok-skip-browser-warning": "1",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bodyData),
        }
      )
      
      if(res.ok){
        window.location.href = "/";
      }else{
        const err = await res.json();
        console.log(`Erreur : ${err}`); 
      }
  
}