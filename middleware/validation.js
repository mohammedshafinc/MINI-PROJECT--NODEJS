function isVallidEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
}

function validatesingup(req, res, next) {
    const { fullname, email, password, confirmpassword } = req.body;
    // console.log(fullname, email, password, confirmpassword);
    const errors = {};

    //validate incoming data
    if (!fullname || !email || !password || !confirmpassword) {
        errors.fullname = "pleasse provide all fileds";
    }

    //validate email

    if (!isVallidEmail(email)) {
        errors.email = "invalid email address";
    }
    console.log(email);
    console.log(password);

    if (password.length < 6) {
        errors.password = "password should atleast 6 characters";
    }

    if (password !== confirmpassword) {
        errors.confirmpassword = "password an comfirm password not match";
    }

    req.validationErrors = errors;
    next();
}

module.exports = { validatesingup };
