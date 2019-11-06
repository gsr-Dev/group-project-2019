window.addEventListener("load", function () {

    document.getElementById("txtUsername").addEventListener("input", async function () {


        let response = await fetch("./signup.json");
        let json = await response.json();
        let usernameInput = document.querySelector("#txtUsername").value;

        for (let counter = 0; counter < json.length; counter++) {
            if (JSON.stringify(json[counter].username).slice(1, -1) == usernameInput) {
                document.querySelector("#user-exist").innerHTML = "Username already exists";
                document.querySelector("#user-exist").style.color = 'red'; 
                counter = json.length; 
               
            } else {
                document.querySelector("#user-exist").innerHTML = "Username is available";
                document.querySelector("#user-exist").style.color = 'green';
            }
        }
    });


    document.getElementById("txtRePassword").addEventListener("input", async function () {

        let password = document.querySelector("#txtPassword").value;
        let rePassword = document.querySelector("#txtRePassword").value;

            if (password != rePassword) {
                document.querySelector("#password-not-matching").innerHTML = "Password does not match";
                document.querySelector("#password-not-matching").style.color = 'red';
                counter = json.length;
            } else {
                document.querySelector("#password-not-matching").innerHTML = "";
            }
    });

});
