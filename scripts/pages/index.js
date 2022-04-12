const defaultData = {
    "name": "no data",
    "id": -1,
    "city": "",
    "country": "",
    "tagline": "",
    "price": -1,
    "portrait": "account.png"
}

async function getPhotographers() {
    const result = await fetch('data/photographers.json')
    const data = await result.json()
    console.log(data.photographers)
    return data.photographers? data.photographers : [defaultData];
}

// async function getPhotographers () {
//     return fetch('data/photographers.json')
//         .then(res => res.json())
//         .then(res => res.photographers)
//         .catch(err => console.log('erreur rencontrée', err))
// }


async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        console.log(userCardDOM);
        photographersSection.appendChild(userCardDOM);
    });
};

async function init() {
    const photographers = await getPhotographers()
    // console.log(photographers)
    displayData(photographers);
}

init();

module.exports = {
    defaultData
}
