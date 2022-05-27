export class LikesHandler {

    // Fonction qui incrémente ou décrémente les likes au clic de l'utilisateur
    static initLikes() {

        const likeBtn = document.querySelectorAll(".like-icon")  
        const likesCounter = document.querySelectorAll(".likes-counter")
        const totalLikesCounter = document.getElementById("total-likes-counter")
        let likesArray = [];

        likeBtn.forEach( (btn, index) => {

            let likesData = {
                index : index,
                userLiked : false,
            }

            likesArray.push( likesData );

            btn.addEventListener("click", function() {

                if ( likesArray[index].userLiked == true ) {
                    likesArray[index].userLiked = false;
                    likesCounter[index].innerHTML = Number(likesCounter[index].innerHTML)-1
                    totalLikesCounter.innerHTML = Number(totalLikesCounter.innerHTML)-1
                }
                else {
                    likesArray[index].userLiked = true;
                    likesCounter[index].innerHTML = Number(likesCounter[index].innerHTML)+1
                    totalLikesCounter.innerHTML = Number(totalLikesCounter.innerHTML)+1
                }
            })
        })
    }
}