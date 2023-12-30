// function isVallidEmail(email) {
//     const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
//     return emailRegex.test(email);
// }

// function validatesingup(req, res, next) {
//     const { fullname, email, password, confirmpassword } = req.body;

//     console.log(fullname, email, password, confirmpassword);
//     const errors = {};

//     //validate incoming data
//     if (!fullname || !email || !password || !confirmpassword) {
//         errors.fullname = "pleasse provide all fileds";
//     }

//     //validate email

//     if (!isVallidEmail(email)) {
//         errors.email = "invalid email address";
//     }
//     console.log(email);
//     console.log(password);

//     if (password.length < 6) {
//         errors.password = "password should atleast 6 characters";
//     }

//     if (password !== confirmpassword) {
//         errors.confirmpassword = "password an comfirm password not match";
//     }

//     req.validationErrors = errors;
//     next();
// }

// module.exports = { validatesingup };

function authentication(req, res, next) {
    const { email, password, confirmpassword } = req.body;

    const epattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const echeck = epattern.test(email);

    const ppattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/;

    const pcheck = ppattern.test(password);
    const passwordMatch = password === confirmpassword;

    if (echeck && pcheck && passwordMatch) {
        next();
        console.log("if working");
    } else {
        console.log("not matching");

        res.render("user/signup", { errors: "not matching" });
        next();
    }
}

module.exports = authentication;
