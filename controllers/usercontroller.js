import { User } from "../model/userSchema.js";
import { createToken } from "../services/JWTcreateandvalidate.js"
import {Blog} from "../model/blogSchema.js"

export const homeview = async (req, res) => {
    const allCards = await Blog.find({});
    res.render("homemultiplevideos", {user: req.user, firstName: req.firstName, cards: allCards, currentPath: req.path});
}

export const getsignup = (req, res) => {
    res.render("signup", {user: req.user, currentPath: req.path});
}

export const postsignup = async (req, res) => {
    const { fullname, email, password } = req.body;
    
    await User.create({
        fullname,
        email,
        password,
        profileImageUrl: `/profile_photo/${req.file.filename}`,
    })
    return res.redirect("/user/login");
}

export const getsignin = async (req, res) => {
    res.render("login", {user: req.user, currentPath: req.path});
}

//we can directly use this function if we do have salt value in database
// const validatePassword = async function (password, hashedPassword) {
//     try {
//         const ismatched = await bcrypt.compare(password, hashedPassword);
//         return ismatched;
//     }
//     catch (err) {
//         console.log(err);
//     }
// };

export const postsignin = async (req, res) => {

    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.render("login", {
        error: "user not found",
    });
    //we are using this User.validdatePassword for bcrypt package is installed in userSchema.js
    const isMatch = await User.validatePassword(password, user.password);
    if (!isMatch) return res.render("login", {
        error: "Invalid password",
    });

    const token = await createToken(user);
    if (!token) return res.render("login");

    res.cookie("token", token).redirect("/user");

}

export const getlogout = async (req, res) => {
    res.clearCookie("token");
    res.redirect("/");
}