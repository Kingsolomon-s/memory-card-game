const BASE_URL = "https://pokeapi.co/api/v2/pokemon";
const MAX_CACHE_SIZE = 50;

async function fetchData() {
  try {
    const ListResponse = await fetch(`${BASE_URL}?limit=100`);
    const listData = await ListResponse.json();
    const allData = listData.results;
    // console.log(allData);

    const selectedPokemon = [];
    const totalPokemonCount = allData.length;
    const usedIndices = new Set();

    while (selectedPokemon.length < MAX_CACHE_SIZE) {
      const randomIndex = Math.floor(Math.random() * totalPokemonCount);

      if (!usedIndices.has(randomIndex)) {
        selectedPokemon.push(allData[randomIndex]);
        usedIndices.add(randomIndex);
      }
    }

    //fetch each selected pokemon details together

    const detailPromises = selectedPokemon.map(async (pokemon) => {
      const detailResponse = await fetch(pokemon.url);
      const detailData = await detailResponse.json();

      const pokemonId = detailData.id;

      const reliableImageUrl = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${String(pokemonId).padStart(3, "0")}.png`;

      return {
        id: detailData.id,
        name: detailData.name,
        imageUrl: reliableImageUrl,
      };
    });

    const cardData = await Promise.all(detailPromises);
    return cardData;
    // console.log(cardData);
  } catch (e) {
    console.error("Error fetching data due to", e);
  }
}

export default fetchData;
