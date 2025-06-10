import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './BlogForm.module.css';
import { createBlog } from './features/blogs/blogSlice.js';
import MDEditor from "@uiw/react-md-editor";
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

function BlogForm() {
    
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch()

    const textSample = `# Welcome to the Markdown Editor!

    This is a sample of the **React Markdown Editor**.

    ## ✨ Features
    - Real-time preview
    - Custom styling support
    - Code highlighting
    - Auto focus at the end of the text

    ## 📦 Sample Code

    \`\`\`javascript
    function hello() {
    console.log("Hello, world!");
    }
    \`\`\`

    ## 🔗 Links

    Visit [uiwjs/react-md-editor](https://github.com/uiwjs/react-md-editor) for more information.
    `;

    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");
    const [category, setCategory] = useState({ label: "General", value: "GENERAL" });
    const [tags, setTags] = useState([]);
    const [published, setPublished] = useState(true);
    const [featured, setFeatured] = useState(false);
    const [image, setImage] = useState("");
    const [content, setContent] = useState("## Start writing your blog post\n\n" + textSample);
    
    const categories = [
        { label: "General", value: "GENERAL" },
        { label: "Interior", value: "INTERIOR" },
        { label: "Lifestyle", value: "LIFESTYLE" },
        { label: "Style", value: "STYLE" },
        { label: "Travel", value: "TRAVEL" },
        { label: "Other", value: "OTHER" },
    ];

    const onSubmit = (e) => {
        e.preventDefault();

        const blog = {
            title,
            slug: title.toLowerCase().replace(/[^a-z0-9 ]/gi, '').replace(/\s+/g, '-'),
            user: user.name,
            category: category.value,
            tags: tags.map(tag => tag.value),
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
            <h2>Create a New Blog</h2>
            <form onSubmit={onSubmit}>
                <div className={styles['form-group']}>
                    <label>Title</label>
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
                    <label>Slug</label>
                    <input 
                        type="text" 
                        name="slug" 
                        id="slug" 
                        value={title.toLowerCase().replace(/[^a-z0-9 ]/gi, '').replace(/\s+/g, '-')}
                        onChange={(e) => setSlug(e.target.value)}
                        placeholder='Blog Link'
                        required
                    />
                </div> 
                <div className={styles['form-group']}>
                    <label>Category</label>

                    <Select 
                        className={styles["select-tags"]}
                        type="text" 
                        name="category" 
                        id="category" 
                        value={category}
                        onChange={setCategory}
                        options={categories}
                        placeholder='Category (optional)'
                    />
                </div> 
                <div className={styles['form-group']}>
                    <label>Tags</label>
                    <CreatableSelect
                        className={styles["select-tags"]}
                        type="text"
                        isMulti
                        value={tags}
                        onChange={setTags}
                        placeholder="Select or create tags..."
                        formatCreateLabel={(inputValue) => `Add "${inputValue}"`}
                        noOptionsMessage={() => "Type to create a new tag"}
                        options={categories}
                    />

                </div> 
                {/* <div className={styles['form-group']}>
                    <input 
                        type="text" 
                        name="image" 
                        id="image" 
                        value={image} 
                        onChange={(e) => setImage(e.target.value)}
                        placeholder='Image URL (optional)'
                    />
                </div>  */}

                <div className={styles['form-group']}>
                    <label>Content</label>
                    <MDEditor 
                        height="500px"
                        className={styles["content-editor"]} 
                        value={content} 
                        onChange={setContent} 
                        visibleDragbar={false}
                    />
                </div>

                {/* <div className={styles['form-group']}>
                    <label className={styles["checkbox"]}>
                        <input 
                            type="checkbox" 
                            name="published" 
                            id="published" 
                            checked={published} 
                            onChange={() => setPublished(!published)}
                        />
                        <div>
                            Publish immediately
                        </div>

                    </label>
                </div> 
                <div className={styles['form-group']}>
                    <label className={styles["checkbox"]}>
                        <input 
                            type="checkbox" 
                            name="featured" 
                            id="featured" 
                            checked={featured} 
                            onChange={() => setFeatured(!featured)}
                        />
                        
                        <div>
                            Feature this post
                        </div>
                    </label>
                </div>  */}
                <FormGroup className={styles["check-group"]}>
                    <FormControlLabel control={<Checkbox 
                                                defaultChecked 
                                                onChange={() => setPublished(!published)}
                                                sx={{
                                                    color: 'rgb(255, 195, 117);',
                                                    '&.Mui-checked': {
                                                        color: 'rgb(255, 195, 117);',
                                                    },
                                                }}
                                            />} 
                                      label={<span className={styles["label"]}>Publish immediately</span>}/>
                    <FormControlLabel control={<Checkbox 
                                                onChange={() => setFeatured(!featured)}
                                                sx={{
                                                color: 'rgb(255, 195, 117);',
                                                '&.Mui-checked': {
                                                    color: 'rgb(255, 195, 117);',
                                                },
                                                }}
                                                />}
                                                label={<span 
                                                    className={styles["label"]}>Feature this post </span>}/>
                </FormGroup>
                <div className={styles['form-group']}>
                    <button 
                        className={styles["btn-block"]} 
                        type='submit'>Publish
                    </button>
                </div>
            </form>
            
        </section>
        
    );
}


export default BlogForm