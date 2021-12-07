const loginBtn = document.getElementById('Login');
const errorTxt = document.getElementById('text-error');

loginBtn.addEventListener('click', ()=>{
    location.href('http://localhost:8080/auth/facebook')
});