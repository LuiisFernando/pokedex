
$(document).ready(function () {
    localStorage.setItem('page', '1')
});

$(window).scroll(function () {

    var scrollHeight = $(document).height();
    var scrollPosition = $(window).height() + $(window).scrollTop();
    
    console.log(scrollHeight);
    console.log(scrollPosition);

	if ((scrollHeight - scrollPosition) / scrollHeight === 0) {
	    let page = Number(localStorage.getItem('page'));

        if (page) {
            page += 1;
            carregarPokemons(page)
        }
	}


    // if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {

        
    // }
});

async function carregarPokemons(page) {

    const offset = page > 1 ? page * 10 : 0;

    const pokemons = await getData(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=${offset}`);

    const arrPromisse = pokemons.results.map(poke => {
        return getData(poke.url)
    });

    const requestAll = await Promise.all(arrPromisse);

    const list = document.getElementById('pokeList');

    // let htmlList = '';

    requestAll.map(poke => {

        var div = document.createElement('div');

        div.setAttribute('class', `pokemon ${poke.types[0].type.name}`);

        div.onclick = function() { openModal(poke) }


        var imagem = document.createElement('img');
        var nome = document.createElement('p');

        nome.innerHTML = poke.name;

        imagem.setAttribute('src', poke.sprites.other['official-artwork'].front_default);

        div.appendChild(imagem);
        div.appendChild(nome);

        list.appendChild(div);
        // htmlList += `
        //     <div class='pokemon ${poke.types[0].type.name}'>
        //         <img src="${poke.sprites.other['official-artwork'].front_default}" alt="">            
        //         <p>${poke.name}</p>
        //     </div>
        // `
    });
    // list.innerHTML = htmlList;

    if (page > 1) {
        localStorage.setItem('page', page);
    }
}

async function carregarMeusPokemons() {

    const myListPokemons = await localStorage.getItem('pokemons');

    let html = '';

    if (!myListPokemons) {
        html = `
            <p>Ainda não existe nenhum pokemon na sua pokedex</p>
        `
    }
    else {
        html = `
            <p>Tem pokemon</p>
        `;
    }

    const list = document.getElementById('meusPokes');

    list.innerHTML = html;

    localStorage.setItem('poke', JSON.stringify({ teste: true }));
}

async function addPokemon() {
    const pokes = localStorage.getItem('poke');
    console.log(JSON.parse(pokes));
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


function openModal(pokemon) {
    var modal = document.getElementById("myModal");
    var imgModal = document.getElementById('img-modal');

    imgModal.src = pokemon.sprites.other['official-artwork'].front_default;

    console.log(pokemon);
    document.getElementById('pokeName').innerHTML = pokemon.name;

    modal.style.display = "block";
}

function closeModal() {
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
}