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
    console.log(data)
    return data.photographers? data.photographers : [defaultData];
}

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
    displayData(photographers);
}

init();
