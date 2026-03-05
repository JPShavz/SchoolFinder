import {niveles, municipios, escuelas} from "/data.js";

console.log("Loaded main script")

const municipiosSelector = document.querySelector("#municipios-selector");
const nivelesSelector = document.querySelector("#niveles-selector");

const input1 = document.querySelector("#full-name");
const searchBtn = document.querySelector("#search-btn");

const resultsContainer = document.querySelector(".search-results");
let filteredValues = [];

function loadFilters() {

    document.addEventListener('DOMContentLoaded', () => {
        for(let j = 0; j < municipios.total; j++) {
            const municipio1 = document.createElement("option");
            municipio1.textContent = municipios.data[j];
            municipiosSelector.appendChild(municipio1);
        }

        for(let i = 0; i < niveles.total; i++) {
            const nivel1 = document.createElement("option");
            nivel1.textContent = niveles.data[i];
            nivelesSelector.appendChild(nivel1);
        }
    })

    console.log("Load Filters");
}

function search() {
    event.preventDefault();
    const searchValue = input1.value.toLowerCase();
    console.log(searchValue)

    const filtered = escuelas.data.filter( 
        data1 => data1.nombre.toLowerCase() === searchValue ||
        data1.municipio === municipiosSelector.value || 
        data1.nivel === nivelesSelector.value
    );

    console.log("Success")
    console.log(filtered)
    filteredValues = filtered;
}

function createCards() {
    resultsContainer.innerHTML = "";
    filteredValues.forEach(escuela => {
        const resultHTML = `
            <div class="result-card">
                <h2>${escuela.nombre}</h2>
                <p><strong>Clave:</strong> ${escuela.clave}</p>
                <p><strong>Location:</strong> ${escuela.municipio}</p>
                <h3>${escuela.control}</h3>
            </div>
        `;
        resultsContainer.innerHTML += resultHTML;
    })
}


loadFilters();
searchBtn.addEventListener("click", () => {
    search();
    console.log("Filtered values final:")
    console.log(filteredValues)
    createCards() 
});


