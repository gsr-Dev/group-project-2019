window.addEventListener('load', function () {
 
    document.getElementById('email_address_input').addEventListener('input', async function () {
        let response = await fetch('./signup.json');

        let fetchJson = await response.json();
        console.log(fetchJson);


        let emailInput = document.querySelector('#email_address_input').value;



        for (let element of fetchJson) {
            console.log(emailInput);
            console.log(element.email);
            if (emailInput != element.email && emailInput) {
                document.querySelector("#email-exist").innerHTML = 'This email does not exist';
                document.querySelector("#email-exist").style.color = 'red';
            } else{
                document.querySelector("#email-exist").innerHTML = '';
                break;
            }
        }

    });
}); 
