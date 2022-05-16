function photographerFactory(data) {
    console.log(data)
    const { name, portrait, id, city, country, tagline, price } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const a = document.createElement( 'a' );
        a.setAttribute("href", "photographer.html?id="+id)
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        a.appendChild(img);
        a.appendChild(h2);
        const cityCountryText = document.createElement( 'p' );
        const taglineText = document.createElement( 'p' );
        const priceText = document.createElement( 'p' );
        cityCountryText.textContent = city+", "+country;
        taglineText.textContent = tagline;
        priceText.textContent = price+"€/jour";
        article.appendChild(a);
        article.appendChild(cityCountryText)
        article.appendChild(taglineText)
        article.appendChild(priceText)
        return (article);
    }
    return { name, picture, getUserCardDOM }
}