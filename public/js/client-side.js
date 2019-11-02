window.addEventListener("load", function() {
console.log("in clien-side.js");
document.getElementById("txtUsername").addEventListener("input", async function() {


    let response = await fetch("./signup.json");
    console.log(response);
    let json = await response.json();

    let usernameInput = document.querySelector("#txtUsername").value;
    
    console.log(usernameInput);
for (let counter=0; counter < json.length; counter++) {
        if (JSON.stringify(json[counter].username) == `"${usernameInput}"`) {
            document.querySelector("#user-exist").innerHTML = "username exists, please try another username";
            document.querySelector("#user-exist").style.color = 'red';
        } else{
            document.querySelector("#user-exist").innerHTML = "username available";
            document.querySelector("#user-exist").style.color = 'green';
        }
}
    })

})
