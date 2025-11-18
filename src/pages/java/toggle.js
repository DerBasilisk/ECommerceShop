//Funcio de visibilidad contraseña

document.getElementById('toggle-password').addEventListener('click',function(){

    const passwordInput=document.getElementById('password');
    const eyeOpen=document.getElementById('eye-icon-open');
    const eyeClosed=document.getElementById('eye-icon-closed')

    //Verificar Si Esta Oculta
    const isHidden = passwordInput.type==='password';

    //Cambiar a visible
    passwordInput.type=isHidden ? 'text' : 'password';

    //alterar del ojito
    eyeOpen.classList.toggle('hidden', !isHidden);
    eyeClosed.classList.toggle('hidden', isHidden);
})