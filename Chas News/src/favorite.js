import axios from "axios";

const favorite = document.querySelector('#favorite');
favorite.addEventListener('click',function changeToSolidStar() {
    const starIcon = favorite.querySelector('#starIcon');

    if (starIcon.classList.contains('fa-solid')) {
        starIcon.classList.remove('fa-solid')
    } else {
        starIcon.classList.add('fa-solid')

    }

})