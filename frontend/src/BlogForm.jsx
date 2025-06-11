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
import ImageUpload from './ImageUpload.jsx';

function BlogForm() {
    
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch()

    const textSample = `
# Welcome to My Markdown Blog Post

## Introduction

Hello, world! This is a **Markdown-rich** blog post written to demonstrate _just about every_ syntax Markdown supports.

### Why Markdown?

Markdown is:

- Lightweight
- Easy to read
- Great for developers
- **Powerful** with extensions
<br>
---

## 📌 Headings

You can write multiple levels of headings:

# H1
## H2
### H3
#### H4
##### H5
###### H6

---

## ✍️ Text Formatting

You can use **bold**, *italic*, ***both***, ~~strikethrough~~, ==highlight== (via plugins).

> Blockquotes are great for pulling attention to a quote or note.

---

## 📟 Lists

### Unordered

- Item one
  - Sub-item
    - Sub-sub-item
- Item two

### Ordered

1. First
2. Second
   1. Nested
   2. Nested

### Task Lists

- [x] Write Markdown
- [x] Test blog renderer
- [ ] Deploy to production

---

## 🖼️ Images and Links

![React Logo](https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg)

Visit [OpenAI](https://openai.com) to learn more about AI and language models.

---

## \`Inline Code\`

You can include \`inline code\` like \`const x = 5;\`.

---

## 📦 Code Blocks

\`\`\`js
// JavaScript code block
function greet(name) {
  return \`Hello, ${name}!\`;
}
console.log(greet("Markdown"));
\`\`\`

\`\`\`python
# Python code block
def greet(name):
    return f"Hello, {name}!"

print(greet("Markdown"))
\`\`\`

---

## 📊 Tables

| Feature       | Supported |
|---------------|-----------|
| Headers       | ✅        |
| Code Blocks   | ✅        |
| Images        | ✅        |
| Tables        | ✅        |

---

## 📣 Callouts (via blockquote)

> ⚠️ This is a warning!
> 💡 This is a tip!
> ✅ This is a success message!

---

## 💬 HTML in Markdown

You can even embed **raw HTML** if your renderer supports it:

\`\`\`html
<div style="color: blue; font-weight: bold;">
  This is raw HTML inside Markdown!
</div>
\`\`\`

---

## 📺 Conclusion

Markdown is **simple**, **readable**, and **powerful**. Whether you're writing a README, blog post, or documentation, it's a fantastic tool to have in your toolbox.

Thanks for reading!

---

*Written with ❤️ in Markdown.*


Visit [uiwjs/react-md-editor](https://github.com/uiwjs/react-md-editor) for more information.`;

    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");
    const [category, setCategory] = useState({ label: "General", value: "GENERAL" });
    const [tags, setTags] = useState([]);
    const [published, setPublished] = useState(true);
    const [featured, setFeatured] = useState(false);
    const [image, setImage] = useState(null);
    const [content, setContent] = useState("## Start writing your blog post\n\n" + textSample);
    
    const categories = [
        { label: "General", value: "GENERAL" },
        { label: "Interior", value: "INTERIOR" },
        { label: "Lifestyle", value: "LIFESTYLE" },
        { label: "Style", value: "STYLE" },
        { label: "Travel", value: "TRAVEL" },
        { label: "Other", value: "OTHER" },
    ];

    const onSubmit = async (e) => {
        e.preventDefault();

        let imageUrl = null;

        if (image) {
            const formData = new FormData();
            formData.append("image", image);

            try {
                const res = await fetch("http://localhost:5000/api/upload", {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                    body: formData,
                });

                const data = await res.json();
                imageUrl = data.imageUrl;
            } catch (err) {
                console.error("Image upload failed:", err);
                return;
            }
        }

        const blog = {
            title,
            slug: title.toLowerCase().replace(/[^a-z0-9 ]/gi, '').replace(/\s+/g, '-'),
            user: user.name,
            category: category.value,
            tags: tags.map(tag => tag.value),
            published,
            featured,
            image: imageUrl,
            content,
        };

        dispatch(createBlog(blog))
        setTitle('');
        setImage('');
        setContent(textSample);
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
                        disabled
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
                <div className={styles['form-group']}>
                    <label>Featured Image</label>
                    <ImageUpload 
                        className={styles["image-upload"]}
                        value={image}
                        onChange={setImage}
                        onImageSelect={(file) => setImage(file)}
                    />
                    
                </div>

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