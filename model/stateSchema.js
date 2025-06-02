import mongoose from "mongoose";

const stateSchema = new mongoose.Schema({
    statethumbnail: {
        type: String,
        required: true,
        default: "/images/n3vzlebhovk.webp",
    },

    statename: {
        type: String,
        required: true,
        unique: true
    },

    stateDescription:{
        type:String,
        required: true,
    },

    cityname: {
        type: String,
        required: true,
    },

    stateorUt: {
        type: String,
        required: true
    },
    country:{
        type:String,
        required:true
    },
    stateTitle:{
        type:String,
        required:true
    },
    stateAdventures:{
        type: [String],
        enum: ["Beach", "Mountains", "Culture", "Wildlife", "Adventure"],
        default: [],
    }

}, { timestamps: true });

export const State = mongoose.model("state", stateSchema);