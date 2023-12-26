let password = document.getElementById("password");
let confirmPassword = document.getElementById("confirmPassword");
let showerr = document.getElementById("passerr");
let strongPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/;
let emailCheck = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

let email = document.getElementById("email");

email.onblur = () => {
    if (emailCheck.test(email.value)) {
        showerr.style.display = "none";
    } else {
        showerr.style.display = "block";
        showerr.innerHTML = "email should be valid";
    }
};

password.onblur = () => {
    if (strongPassword.test(password.value)) {
        showerr.style.display = "none";
    } else {
        showerr.style.display = "block";
        showerr.innerHTML = "password should be valid";
        console.log(password.value);
    }
};

confirmPassword.onblur = () => {
    if (confirmPassword.value !== password.value) {
        showerr.style.display = "block";
        showerr.innerHTML = "password and confirm password not equal";
    } else {
        showerr.style.display = "none";
    }
};
