function photographerMediaFactory(data) {

    const photographerData = data[0]
    const photographerMediaList = data[1]
    const { name, city, country, tagline, portrait} = photographerData;

    // Génération du DOM du bandeau top de la page avec les détails du photographe
    function getUserCardDOM() {

        const picture = `assets/photographers/${portrait}`;

        const photographInfo = document.createElement( 'div' );
        photographInfo.classList.add( 'photograph-infos')
        const photographProfilePic = document.createElement( 'div' );
        photographProfilePic.classList.add( 'photograph-profile-pic')
        const contactBtn = document.createElement( 'div' );
        contactBtn.classList.add( 'contact-btn')
        const h1 = document.createElement( 'h1' );
        const cityCountry = document.createElement( 'p' );
        const taglineText = document.createElement( 'p' );
        h1.textContent = name;
        cityCountry.textContent = city + country;
        taglineText.textContent = tagline;
        photographInfo.appendChild(h1);
        photographInfo.appendChild(cityCountry);
        photographInfo.appendChild(taglineText);
        const contactButton = document.createElement( 'button');
        contactButton.classList.add( 'contact_button' );
        contactButton.setAttribute( 'onclick', `displayModal()`)
        contactButton.textContent = 'Contactez-moi';
        contactBtn.appendChild(contactButton)
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        img.setAttribute("alt", name)
        photographProfilePic.appendChild(img)
        return ([photographInfo, contactBtn, photographProfilePic]);
    }

    // Génération du DOM de la bibliothèque des médias
    function getMediaDOM(sortOpt = "popularity") {
    
    const allMediaContainer = document.createElement('div');
    allMediaContainer.setAttribute("id", "media-container")

    switch (sortOpt) {
        case "popularity":
            // trier par popularité
            photographerMediaList.sort(function(a, b) {
            return a.likes - b.likes
            })
            break;
        case "date":
            // trier par date
            photographerMediaList.sort(function(a, b) {
                const dateA = a.date; // ignore upper and lowercase
                const dateB = b.date; // ignore upper and lowercase
                if (dateA < dateB) {
                    return -1;
                }
                if (dateA > dateB) {
                    return 1;
                }
                // names must be equal
                return 0;
            });
            break;
        case "title":
            // trier par titre
            photographerMediaList.sort(function(a, b) {
                const titleA = a.title.toUpperCase(); // ignore upper and lowercase
                const titleB = b.title.toUpperCase(); // ignore upper and lowercase
                if (titleA < titleB) {
                    return -1;
                }
                if (titleA > titleB) {
                    return 1;
                }
                // names must be equal
                return 0;
            });
            break;
        }
    
    photographerMediaList.forEach( media => {
        const article = document.createElement('article');
        const mediaTitle = document.createElement( 'p' );
        mediaTitle.textContent = media.title;
        const mediaLikeCounter = document.createElement( 'p' );
        mediaLikeCounter.innerHTML = `<span class="likes-counter">${media.likes}</span> <i class="fa-solid fa-heart like-icon"></i>`;


        if (media.image) {
            const thumbnail = `assets/images/${name}/${media.image}`;
            const img = document.createElement( 'img' );
            img.setAttribute("src", thumbnail)
            img.setAttribute("alt", media.title)
            img.setAttribute("class", `media ${media.id}`)
            article.appendChild(img)
            article.appendChild(mediaTitle)
            article.appendChild(mediaLikeCounter)
            allMediaContainer.appendChild(article)
        }
        else if (media.video) {
            const video = document.createElement('video')
            video.setAttribute("src", `assets/images/${name}/${media.video}`)
            video.setAttribute("class", "media")
            video.setAttribute("aria-label", `${media.video}`)
            article.appendChild(video)
            article.appendChild(mediaTitle)
            article.appendChild(mediaLikeCounter)
            allMediaContainer.appendChild(article)
        }
        else {
            console.log(media)
        }
    })
    return (allMediaContainer)
    }

    // Génération du DOM du bandeau en bas de page avec la somme des likes
    function getBannerDOM() {
        const bannerText = document.createElement("p")
        bannerText.setAttribute("id", "banner-container")
        let totalLikes = 0;
        photographerMediaList.forEach( media => totalLikes += media.likes )
        bannerText.innerHTML = `<span id="total-likes-counter">${totalLikes}</span> <i class="fa-solid fa-heart"></i> ${photographerData.price}€/jour`
        return(bannerText)
    }

    return { getUserCardDOM, getMediaDOM, getBannerDOM }
}
