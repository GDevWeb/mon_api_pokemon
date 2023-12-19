//Projet API pokemon methode GET :

const formPokemon = document
  .getElementById("formPokemon")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const searchPokemon = document.getElementById("searchPokemon").value.trim();

    const infoText = document.querySelector("p.infoText");

    if (searchPokemon.length <= 2) {
      infoText.innerHTML = `Recherche invalide !`;
      return;
    }

    const url = `https://tyradex.vercel.app/api/v1/pokemon/${searchPokemon}`;

    async function getDataPokemon() {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(response.status, response.statusText);
        }
        const data = await response.json();

        console.log(data)

        const pokemonName = document.querySelector("span.pokemonName");
        pokemonName.textContent = data.name?.["fr"];

        const pokemonNickName = document.querySelector("span.pokemonNickName");
        pokemonNickName.textContent = data.category;

        const pokemonGeneration = document.querySelector("span.generation");
        pokemonGeneration.innerHTML = data.generation;

        const pokemonId = document.querySelector("span.pokemonId");
        pokemonId.textContent = data.pokedexId;

        const pokemonTypes = document.querySelector("span.types");
        pokemonTypes.innerHTML = data.types[0]["name"];
        pokemonTypes.color = "red";

        const pokemonPicture = document.querySelector("img.pokemonPicture");
        pokemonPicture.src = data.sprites["regular"];

        const type = data.types[0]["name"];
        const cardPokemon = document.querySelector(".cardPokemon");

        //affichage des résistances au survol via une un tooltyp :
        const weakness = document.querySelector("p.weakness");
        const tooltip = document.getElementById("tooltip");

        weakness.addEventListener("mouseover", function () {
          tooltip.style.visibility = "visible";

          const resistances = data.resistances;

          // Vide le contenu actuel du tooltip
          while (tooltip.firstChild) {
            tooltip.removeChild(tooltip.firstChild);
          }

          for (const resistance of resistances) {
            const li = document.createElement("li");
            li.textContent = `${resistance.name} : ${resistance.multiplier}`;

            tooltip.appendChild(li);
          }
        });

        weakness.addEventListener("mouseout", function () {
          tooltip.style.visibility = "hidden";
        });

        // colorisation des cards selon le type du pokemon :
        switch (type) {
          case "Plante":
            cardPokemon.style.borderColor = "green";
            break;

          case "Eau":
            cardPokemon.style.borderColor = "aqua";
            break;

          case "Feu":
            cardPokemon.style.borderColor = "firebrick";
            break;

          case "Psy":
            cardPokemon.style.borderColor = "violet";
            break;

          case "Spectre":
            cardPokemon.style.borderColor = "darkmagenta";
            break;

          case "Combat":
            cardPokemon.style.borderColor = "crimson";
            break;

          case "Insecte":
            cardPokemon.style.borderColor = "darkgreen";
            break;

          case "Poison":
            cardPokemon.style.borderColor = "darkviolet";
            break;

          case "Électrik":
            cardPokemon.style.borderColor = "yellow";
            break;

          case "Roche":
            cardPokemon.style.borderColor = "sienna";
            break;

          case "Glace":
            cardPokemon.style.borderColor = "lightblue";
            break;
            
            default:
            cardPokemon.style.borderColor = "antiqueWhite";
            break;
        }
      } catch (error) {
        console.error(error);
      }
    }

    getDataPokemon(url);
  });


  //Date dynamique du footer :
const currentYearElement = document.getElementById("currentYear");

const currentYear = new Date().getFullYear();

currentYearElement.textContent = currentYear;
