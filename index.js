let username;

document.getElementById("buttonSubmit").onclick = function() {
    inputString = document.getElementById("buttonInput").value;
    document.getElementById("myP").textContent = "Input string: " + inputString;
}