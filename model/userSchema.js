import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        required: true,
    },

    salt: {
        type: String,
    },

    profileImageUrl: {
        type: String,
        default: "/images/default_profile.jpg",
    },
    role: {
        type: String,
        enum: ["admin", "author", "viewer"],
        default: "viewer"
    },

}, { timestamps: true });

userSchema.pre("save", async function (next) {
    if (!this.isModified("password"))
        return next();
    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(this.password, salt);
        this.password = hash;
        this.salt = salt;
        next();
    } catch (err) {
        return next(err);
    }
});

userSchema.statics.validatePassword = async function (requestedPassword, hashedPassword) {
    try {
        const ismatch = await bcrypt.compare(requestedPassword, hashedPassword);
        return ismatch;
    }
    catch (err) {
        console.log(err);
    }
};

export const User = mongoose.model("user", userSchema);