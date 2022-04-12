async function getPhotographers() {
    const result = await fetch('data/photographers.json')
    // const data = await result.json()
    // console.log(data.photographers)
    return result.json().photographers;
        // .then(res => res.json())
        // .then(res => {
        //     console.log(res.photographers)
        //     return res.photographers
        // })
        // .catch(err => console.log('erreur rencontrée', err))
}   

// async function getPhotographers() {
//     // Penser à remplacer par les données récupérées dans le json

//     // const photographers = [
//     //     {
//     //         "name": "Ma data test",
//     //         "id": 1,
//     //         "city": "Paris",
//     //         "country": "France",
//     //         "tagline": "Ceci est ma data test",
//     //         "price": 400,
//     //         "portrait": "account.png"
//     //     },
//     //     {
//     //         "name": "Autre data test",
//     //         "id": 2,
//     //         "city": "Londres",
//     //         "country": "UK",
//     //         "tagline": "Ceci est ma data test 2",
//     //         "price": 500,
//     //         "portrait": "account.png"
//     //     },
//     // ]
//     let photographers;

//     fetch("data/photographers.json")
//     .then(res => res.json())
//     .then(data => photographers = data.photographers)
//     .then( () => {
//         displayData(photographers);
//     })
//     .catch(err => console.log(err))
//     // et bien retourner le tableau photographers seulement une fois
//     // return (photographers)
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

// async function init() {
//     // Récupère les datas des photographes
//     const { photographers } = await getPhotographers();
//     displayData(photographers);
// };


async function init() {
    const photographers = await this.getPhotographers()
    console.log(photographers)
    displayData(photographers);
}

init();
