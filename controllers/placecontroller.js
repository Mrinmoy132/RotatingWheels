import { Place } from "../model/placesinStateSchema.js"
import { State } from "../model/stateSchema.js";

function capitalizeWords(str) {
    return str
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

export const individualState = async (req, res) => {
    const state = await State.findOne({ statename: `${req.params.statename}` });
    const placesbeforesort = await Place.find({ stateID: state._id }).populate("stateID");
    const places = placesbeforesort.sort((a,b)=>{
        const x = a.placename;
        const y = b.placename;
        if(x<y) return -1;
        else if(x>y) return 1;
        else return 0;
    });

    return res.render("individualstate", { user: req.user, firstName: req.firstName, state, country: req.params.countryname, places, currentPath: req.path });
}

export const getaddPlace = async (req, res) => {
    return res.render("addPlace", { user: req.user, firstName: req.firstName, state: req.params.statename, country: req.params.countryname, currentPath: req.path })
}

export const postaddPlace = async (req, res) => {
    const { placename, placetitle, placedescription, distancefromcity, youtubeLink } = req.body;
    const placeAdventures = req.body["placeAdventures"];
    const state = await State.findOne({ statename: `${req.params.statename}` })
    await Place.create({
        placename: capitalizeWords(placename),
        placetitle: capitalizeWords(placetitle),
        placeAdventures,
        placedescription,
        distancefromcity,
        placethumbnail: `/place_thumbnail/${req.file.filename}`,
        stateID: `${state._id}`,
        youtubeLink,
    });

    return res.redirect(`/explore/${req.params.countryname}/${req.params.statename}`)
}


export const showindividualPlace = async (req, res) => {
    const place = await Place.findOne({ _id: `${req.params.placeID}` }).populate("stateID");
    
    if (place.youtubeLink.includes("youtu.be")) {
        const id = place.youtubeLink.split("youtu.be/")[1].split("?")[0];
        place.youtubeLink = `https://www.youtube.com/embed/${id}`;
    } else if (place.youtubeLink.includes("watch?v=")) {
        const id = place.youtubeLink.split("v=")[1].split("&")[0];
        place.youtubeLink = `https://www.youtube.com/embed/${id}`;
    }
    
    return res.render("placeview", {
        user: req.user, firstName: req.firstName, country: req.params.countryname, place, currentPath: req.path
    });
}


export const geteditPlace = async (req, res)=>{
    try {
        const place = await Place.findOne({ _id: `${req.params.placeID}` });
        if (!place) {
            return res.status(404).send('place not found');
        }
        res.render('editPlace', { place, user: req.user, firstName: req.firstName, country: req.params.countryname, state: req.params.statename, currentPath: req.path });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
}

export const posteditPlace = async (req, res)=>{
        try {
            const { placename, placetitle, youtubeLink, distancefromcity, placedescription } = req.body;
            const placeAdventures = req.body["placeAdventures"];
            const updateData = {
                placename: capitalizeWords(placename),
                placetitle: capitalizeWords(placetitle),
                placeAdventures,
                placedescription,
                distancefromcity,
                youtubeLink,
            };
            if (req.file) {
                updateData.placethumbnail = `/place_thumbnail/${req.file.filename}`;
            }
            await Place.findOneAndUpdate({ _id: `${req.params.placeID}` }, updateData, { new: true });
            res.redirect(`/explore/${req.params.countryname}/${req.params.statename}`);
        } catch (err) {
            console.error(err);
            res.status(500).send('Server Error');
        }
}