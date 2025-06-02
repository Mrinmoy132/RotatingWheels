import { State } from "../model/stateSchema.js";

function capitalizeWords(str) {
    return str
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

export const getaddState = (req, res) => {
    res.render("addState", { user: req.user, firstName: req.firstName, country: req.params.countryname, currentPath: req.path })
}

export const postaddState = async (req, res) => {
    const { statename, cityname, stateorUt, stateTitle, stateDescription } = req.body;
    const stateAdventures = req.body["stateAdventures"];
    await State.create({
        statename: capitalizeWords(statename),
        cityname: capitalizeWords(cityname),
        statethumbnail: `/state_thumbnail/${req.file.filename}`,
        country: capitalizeWords(req.params.countryname),
        stateorUt,
        stateAdventures,
        stateTitle: capitalizeWords(stateTitle),
        stateDescription,
    });    
    res.redirect(`/explore/${req.params.countryname}`);
}

export const Country = async (req, res) => {
    const allStateUTs = await State.find({});
    
    const allStatesbeforeSort = allStateUTs.filter(item => item.stateorUt === 'State');
    const allStates = allStatesbeforeSort.sort((a,b)=>{
        const x = a.statename;
        const y = b.statename;
        if(x<y) return -1;
        else if(x>y) return 1;
        else return 0;
    });

    const allUTsbeforeSort = allStateUTs.filter(item => item.stateorUt === 'UT');
    const allUTs = allUTsbeforeSort.sort((a,b)=>{
        const x = a.statename;
        const y = b.statename;
        if(x<y) return -1;
        else if(x>y) return 1;
        else return 0;
    });

    return res.render(`${req.params.countryname}`, { user: req.user, firstName: req.firstName, allStateUTs, allStates, allUTs, country: req.params.countryname, currentPath: req.path });
    // return res.render(`country`, { user: req.user, firstName: req.firstName, allStateUTs, allStates, allUTs, country: req.params.countryname });
}

export const geteditState = async (req, res) => {
    try {
        const state = await State.findOne({ statename: req.params.statename });
        if (!state) {
            return res.status(404).send('state not found');
        }
        res.render('editState', { state, user: req.user, firstName: req.firstName, country: req.params.countryname, currentPath: req.path });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
}

export const posteditState = async (req, res) => {
    try {
        const { statename, cityname, stateTitle, stateorUt, stateDescription } = req.body;
        const stateAdventures = req.body["stateAdventures"];
        const updateData = {
            statename: capitalizeWords(statename),
            cityname: capitalizeWords(cityname),
            stateTitle: capitalizeWords(stateTitle),
            stateorUt,
            stateAdventures,
            stateDescription,
        };
        if (req.file) {
            updateData.statethumbnail = `/state_thumbnail/${req.file.filename}`;
        }
        await State.findOneAndUpdate({ statename: req.params.statename }, updateData, { new: true });
        res.redirect(`/explore/${req.params.countryname}`);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
}