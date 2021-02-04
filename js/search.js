async function procurarPokemon() {
    const nomePokemon = document.getElementById('input');

    if (nomePokemon && nomePokemon.value) {
        console.log('nome setado >>> ', nomePokemon.value);

        const name = nomePokemon.value.trim().toLowerCase();

        const pokemon = await getData(`https://pokeapi.co/api/v2/pokemon/${name}`);

        if (pokemon) {

            const list = document.getElementById('pokeList');
            list.innerHTML = "";

            var div = document.createElement('div');

            div.onclick = function() { openModal(pokemon) }
            
            div.setAttribute('class', `pokemon ${pokemon.types[0].type.name}`);

            var imagem = document.createElement('img');
            var nome = document.createElement('p');

            nome.innerHTML = pokemon.name;

            imagem.setAttribute('src', pokemon.sprites.other['official-artwork'].front_default);

            div.appendChild(imagem);
            div.appendChild(nome);

            list.appendChild(div);
        }


        console.log('POKEMON ENCONTRADO >>> ', pokemon);

    }

}

function getData(ajaxurl) {
    return $.ajax({
        url: ajaxurl,
        type: 'GET',
    });
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