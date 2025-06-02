import mongoose, { Schema } from "mongoose";

const placeSchema = new mongoose.Schema({
    placename: {
        type: String,
        required: true,
    },

    placetitle:{
        type:String,
        required: true,
    },

    placeAdventures:{
        type: [String],
        enum: ["Beach", "Mountains", "Culture", "Wildlife", "Adventure"],
        default: [],
    },

    placethumbnail: {
        type: String,
        default: "/images/default_profile.jpg",
    },

    stateID: {
        type: Schema.Types.ObjectId,
        ref: "state",
    },

    youtubeLink: {
        type: String,
        required: true,
      },

    placedescription: {
        type: String,
        required: true,
    },
    distancefromcity:{
        type:String,
        required: true
    }

}, { timestamps: true });

export const Place = mongoose.model("place", placeSchema);