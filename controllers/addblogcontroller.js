import { Blog } from "../model/blogSchema.js";

function capitalizeWords(str) {
    return str
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

export const showblogcreatinpage = (req, res) => {
    res.render("addBlog", {
        user: req.user, firstName: req.firstName, currentPath: req.path
    });
}
export const aftercreatingBlog = async (req, res) => {
    const { title, body, eventDate, youtubeLink } = req.body;

    await Blog.create({
        title: capitalizeWords(title),
        body,
        coverPhoto: `/blogs_coverphoto/${req.file.filename}`,
        createdBy: `${req.user._id}`,
        owner: req.user.fullname,
        eventDate,
        youtubeLink,
    });
    res.redirect("/user");
}