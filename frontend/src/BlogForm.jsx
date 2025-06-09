import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './BlogForm.module.css';
import { createBlog } from './features/blogs/blogSlice.js';
import MDEditor from "@uiw/react-md-editor";

function BlogForm() {

    const { user } = useSelector((state) => state.auth);
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("General");
    const [tags, setTags] = useState("");
    const [published, setPublished] = useState(false);
    const [featured, setFeatured] = useState(false);
    const [image, setImage] = useState("");
    const [content, setContent] = useState("## Start writing your blog post");
    
    const dispatch = useDispatch()

    const onSubmit = (e) => {
        e.preventDefault();

        const blog = {
            title,
            slug: title.toLowerCase().replace(/\s+/g, "-"),
            user: user.name,
            category,
            tags: tags.split(", ").map((tag) => tag.trim()),
            published,
            featured,
            image,
            content,
        };

        dispatch(createBlog(blog))

        setTitle('')
    }

    return(
        <section className={styles["form"]}>
            <h2>New Blog</h2>
            <form onSubmit={onSubmit}>
                <div className={styles['form-group']}>
                    <input 
                        type="text" 
                        name="title" 
                        id="title" 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder='Blog Title'
                        required
                    />
                </div> 
                <div className={styles['form-group']}>
                    <input 
                        type="text" 
                        name="category" 
                        id="category" 
                        value={category} 
                        onChange={(e) => setCategory(e.target.value)}
                        placeholder='Category (optional)'
                    />
                </div> 
                <div className={styles['form-group']}>
                    <input 
                        type="text" 
                        name="tags" 
                        id="tags" 
                        value={tags} 
                        onChange={(e) => setTags(e.target.value)}
                        placeholder='Tags (comma-separated)'
                    />
                </div> 
                <div className={styles['form-group']}>
                    <input 
                        type="text" 
                        name="image" 
                        id="image" 
                        value={image} 
                        onChange={(e) => setImage(e.target.value)}
                        placeholder='Image URL (optional)'
                    />
                </div> 
                <div className={styles['form-group']}>
                    <label>
                        <input 
                            type="checkbox" 
                            name="published" 
                            id="published" 
                            checked={published} 
                            onChange={() => setPublished(!published)}
                        />
                        Publish immediately
                    </label>
                </div> 
                <div className={styles['form-group']}>
                    <label>
                        <input 
                            type="checkbox" 
                            name="featured" 
                            id="featured" 
                            checked={featured} 
                            onChange={() => setFeatured(!featured)}
                        />
                        Feature this post
                    </label>
                </div> 

                <div className={styles['form-group']}>
                    <MDEditor value={content} onChange={setContent} />
                </div>

                <div className={styles['form-group']}>
                    <button 
                        className={styles["btn-block"]} 
                        type='submit'>Add Blog
                    </button>
                </div>
            </form>
        </section>
    );
}

// title: {
//     type: String,
//     required: [true, 'Please add a title'],
//     trim: true,
// },
// slug: {
//     type: String,
//     unique: true,
//     lowercase: true,
//     trim: true,
// },
// user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: [true, 'Must provide author'],
// },
// category: {
//     type: String,
//     default: 'General',
// },
// tags: [String],
// published: {
//     type: Boolean,
//     default: false,
// },
// content: {
//     type: String,
//     required: [true, 'Please add a text value'],
// },
// image: {
//     type: String,
//     default: '',
// },
// readTime: {
//     type: Number,
//     default: content ? countWords(content) : 0,
// },
// likes: {
//     type: Number,
//     default: 0,
// },
// views: {
//     type: Number,
//     default: 0,
// },
// featured: {
//     type: Boolean,
//     default: false,
// },
// comments: {
//     user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//     text: String,
//     createdAt: {type: Date, default: Date.now },
// },
// createdAt: {
//     type: Date,
//     default: Date.now,
// },
// updatedAt: {
//     type: Date,
//     default: Date.now,
// },

export default BlogForm