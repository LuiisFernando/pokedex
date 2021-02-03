
$(document).ready(function () {
    console.log('pronto!!');
    carregarPokemons();
});

async function carregarPokemons() {
    const pokemons = await getData('https://pokeapi.co/api/v2/pokemon?limit=100&offset=0');

    const arrPromisse = pokemons.results.map(poke => {
        return getData(poke.url)
    });

    const requestAll = await Promise.all(arrPromisse)

    console.log(requestAll)

    const list = document.getElementById('pokeList');

    let htmlList = '';

    requestAll.map(poke => {
        htmlList += `
            <div class='pokemon ${poke.types[0].type.name}'>
                <img src="${poke.sprites.other['official-artwork'].front_default}" alt="">            
                <p>${poke.name}</p>
            </div>
        `
    });
    list.innerHTML = htmlList;
}

function getData(ajaxurl) {
    return $.ajax({
        url: ajaxurl,
        type: 'GET',
    });
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