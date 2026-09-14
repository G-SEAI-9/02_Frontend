const containerEl = document.getElementById('pokemon-container');

function renderPokeHTML(pokeData) {
  console.log(pokeData);
  const pokeHTML = `
      <article class="bg-teal-900 text-stone-100 flex flex-col items-center rounded-xl shadow">
          <img lazy src="${pokeData.sprites.front_default}" alt="" />
          <h2 class="font-semibold capitalize">${pokeData.name}</h2>
          <div class="flex gap-2 items-center justify-between w-full px-3">
            <label for="hp">HP</label>
            <meter value="${pokeData.stats[0].base_stat}" max="100" id="hp">HP</meter>
          </div>
          <div class="flex gap-2 items-center justify-between w-full px-3">
            <label for="attack">Attack</label>
            <meter class="[&::-webkit-meter-optimum-value]:bg-red-500" value="${pokeData.stats[1].base_stat}" max="100" id="attack">
              Attack
            </meter>
          </div>
          <div class="flex gap-2 items-center justify-between w-full px-3 pb-3">
            <label for="defense">Defense</label>
            <meter class="[&::-webkit-meter-optimum-value]:bg-blue-500" value="${pokeData.stats[2].base_stat}" max="100" id="defense">
              Defense
            </meter>
          </div>
        </article>`;
  return pokeHTML;
}

async function fetchPoke(id) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  if (!res.ok) throw new Error('Fetching Pokémon failed');
  return await res.json();
}

async function main() {
  let pokeHTML = '';
  // fetchen

  let fetchAll = [];
  for (let i = 1; i < 23; i++) {
    // const pokeData = await fetchPoke(i);
    fetchAll.push(fetchPoke(i));
    // HTML zusammensetzen
    // let pokeHTML = renderPokeHTML(pokeData);
  }
  const result = await Promise.all(fetchAll);

  pokeHTML = result.map(renderPokeHTML).join('');

  // pokeHTML += renderPokeHTML(pokeData);

  // in DOM hängen
  containerEl.insertAdjacentHTML('beforeend', pokeHTML);
}

main();
