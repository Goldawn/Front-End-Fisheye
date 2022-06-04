/* eslint-disable no-undef */
const defaultData = {
    "name": "no data",
    "id": -1,
    "city": "",
    "country": "",
    "tagline": "",
    "price": -1,
    "portrait": "account.png"
}

// Fonction de fetch sur les datas des photographes
async function getPhotographers() {
    const result = await fetch('data/photographers.json')
    const data = await result.json()
    return data.photographers? data.photographers : [defaultData];
}

// Fonction qui récupère les éléments générés du DOM et les affiche sur la page
async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
}

// Procédure de lancement à l'initialisation
async function init() {
    const photographers = await getPhotographers()
    displayData(photographers);
}

init();
