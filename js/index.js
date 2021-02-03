function teste() {

}

function buscarInfo() {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", "https://pokeapi.co/api/v2/pokemon/bulbasaur", false); // false for synchronous request
    xmlHttp.send();
    console.log(xmlHttp.responseText);
}

function abrirMenu() {
    document.getElementById("mySidebar").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
}


function openModal() {
    var modal = document.getElementById("myModal");
    modal.style.display = "block";
}

function closeModal() {
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
}