const anc__form = document.getElementById('anc__form')
const cv__form = document.getElementById('cv__form')
const post__type = document.getElementById('post__type')

post__type.addEventListener('change', e=>{
    console.log(e.target.value);
    if (e.target.value == "cv") {
        anc__form.style.display = "none"
        cv__form.style.display = "block"
    }
    else if (e.target.value == "anc"){
        anc__form.style.display = "block"
        cv__form.style.display = "none"
    }
    else{
        anc__form.style.display = "none"
    } 
})