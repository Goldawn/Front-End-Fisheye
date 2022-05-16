export class LikesHandler {

    static initLikes() {
        const likeBtn = document.querySelectorAll(".like-icon")  
        const likesCounter = document.querySelectorAll(".likes-counter")
        const totalLikesCounter = document.getElementById("total-likes-counter")
        console.log(likesCounter)
        let likesArray = [];

        likeBtn.forEach( (btn, index) => {

            let likesData = {
                index : index,
                userLiked : false
            }

            likesArray.push( likesData );
            console.log(likesArray)

            btn.addEventListener("click", function() {

                if ( likesArray[index].userLiked == true ) {
                    likesArray[index].userLiked = false;
                    console.log('user disliked')
                    likesCounter[index].innerHTML = Number(likesCounter[index].innerHTML)-1
                    totalLikesCounter.innerHTML = Number(totalLikesCounter.innerHTML)-1
                }
                else {
                    likesArray[index].userLiked = true;
                    console.log('user liked')
                    likesCounter[index].innerHTML = Number(likesCounter[index].innerHTML)+1
                    totalLikesCounter.innerHTML = Number(totalLikesCounter.innerHTML)+1
                }
            })
        })

    }

}