import { Blog } from "../model/blogSchema.js";
import { Comment } from "../model/commentSchema.js";

function capitalizeWords(str) {
    return str
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

export const all_blogs = async (req, res) => {
    const allCardsbeforesort = await Blog.find({});
    const allCards = allCardsbeforesort.sort((a, b) => {
        const x = a.title;
        const y = b.title;
        if (x < y) return -1;
        else if (x > y) return 1;
        else return 0;
    });
    if (req.user) {
        return res.render("all_blogs", { user: req.user, firstName: req.firstName, cards: allCards, currentPath: req.path });
    } else {
        return res.redirect("/user/createaccount")
    }
}

export const individualBlog = async (req, res) => {
    const blog = await Blog.findById(req.params.id).populate("createdBy");
    const comments = await Comment.find({ blogID: req.params.id }).populate("createdBy");
    if (blog.youtubeLink.includes("youtu.be")) {
        const id = blog.youtubeLink.split("youtu.be/")[1].split("?")[0];
        blog.youtubeLink = `https://www.youtube.com/embed/${id}`;
    } else if (blog.youtubeLink.includes("watch?v=")) {
        const id = blog.youtubeLink.split("v=")[1].split("&")[0];
        blog.youtubeLink = `https://www.youtube.com/embed/${id}`;
    }
    return res.render("individualblog", { user: req.user, firstName: req.firstName, blog, comments, currentPath: req.path });
}

export const geteditBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res.status(404).send('Blog not found');
        }
        res.render('editBlog', { blog, user: req.user, firstName: req.firstName, currentPath: req.path });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
}

export const posteditBlog = async (req, res) => {
    try {
        const { title, body, eventDate, youtubeLink } = req.body;
        const updateData = {
            title: capitalizeWords(title),
            body,
            eventDate,
            youtubeLink
        };
        if (req.file) {
            updateData.coverPhoto = `/blogs_coverphoto/${req.file.filename}`;
        }
        await Blog.findByIdAndUpdate(req.params.id, updateData, { new: true });
        res.redirect('/all_blogs');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
}

export const addComment = async (req, res) => {
    await Comment.create({
        content: req.body.content,
        blogID: req.params.id,
        createdBy: req.user._id
    });
    res.redirect(`/all_blogs/${req.params.id}`)
}
