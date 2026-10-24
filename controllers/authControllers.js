exports.getLogin = (req, res, next)=>{
    res.status(200).render('auth/login', {
        pageTitle : "Login Page",
        isLoggedIn : false,
    });
}

exports.postLogin = (req, res, next)=>{
    console.log(req.body);
    req.session.isLoggedIn = true;
    // res.cookie("isLoggedIn", true);
    // req.isLoggedIn = true;
    console.log(req.get('Cookie').split('=')[1]);
    res.status(200).redirect('/');
}

exports.postLogout = (req, res, next)=>{
    // req.session.isLoggedIn = false;
    // res.cookie("isLoggedIn", false);
    req.session.destroy(()=>{
        res.status(200).redirect('/login');
    })
} 