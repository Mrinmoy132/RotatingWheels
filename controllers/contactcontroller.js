export const contact = async (req, res) => {
    res.render("contact", { user: req.user, firstName: req.firstName, currentPath: req.path });
}