document.addEventListener("DOMContentLoaded", () => {
    const pokemonNumberInput = document.getElementById("pokemonNumber");
    const fetchButton = document.getElementById("fetchPokemon");
    const pokemonContainer = document.getElementById("pokemonContainer");

    fetchButton.addEventListener("click", () => {
        const pokemonNumber = pokemonNumberInput.value;
        if (pokemonNumber === "") {
            renderErrorMessage("Por favor, ingresa un número de Pokémon.");
        } else {
            fetchPokemonData(pokemonNumber);
        }
    });

    function fetchPokemonData(number) {
        fetch(`https://pokeapi.co/api/v2/pokemon/${number}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("No se encontró ningún Pokémon con ese número.");
                }
                return response.json();
            })
            .then((data) => {
                renderPokemonCard(data);
            })
            .catch((error) => {
                renderErrorMessage(error.message);
            });
    }

    function renderPokemonCard(data) {
        const { name, types, height, weight, sprites } = data;
        const typeNames = types.map((type) => type.type.name).join(", ");
        const heightInMeters = (height / 10).toFixed(1);
        const weightInKilograms = (weight / 10).toFixed(1);

        const cardHTML = `
            <div class="pokemon-card">
                <img src="${sprites.front_default}" alt="${name}" />
                <h2>${name}</h2>
                <p><strong>Tipo:</strong> ${typeNames}</p>
                <p><strong>Altura:</strong> ${heightInMeters} m</p>
                <p><strong>Peso:</strong> ${weightInKilograms} kg</p>
            </div>
        `;

        pokemonContainer.innerHTML = cardHTML;
    }

    function renderErrorMessage(message) {
        const errorHTML = `<p class="error">${message}</p>`;
        pokemonContainer.innerHTML = errorHTML;
    }
});
