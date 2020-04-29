const UserModel = require('../models/user');


exports.show_users = (req, res) => {

    UserModel.find({}).then(result => {
        res.send(result);

    }).catch(err => {
        res.send(err);

    });
};


exports.sign_up = async (req, res) => {
    let error_msgs = [];
    try {

        let user = await UserModel.exists({ email: req.body.email });
        if (user) {
            error_msgs.push( {msg:'email is already there'});
        }
        if (req.body.password != req.body.password2) {

            error_msgs.push({msg:'password do not match'});
        }
        if(req.body.password.length < 6){
            error_msgs.push({msg:'password is less than 6'});
        }

        if(error_msgs.length > 0){

         res.render('signup',{error_msgs: error_msgs});

        }else{
        const User = new UserModel({
            email: req.body.email,
            password: req.body.password
        })

        await User.save();
        req.flash('log', 'the sign up went successfully now you can log in!');
        res.redirect('login');

    }
    } catch (err) {
        res.send(err)
    }


};


exports.log_in = (req, res) => {

    req.flash('log', 'the user logged in successfully!');
    res.redirect('/');
};