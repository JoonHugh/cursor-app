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
import { useNavigate } from 'react-router-dom';
import { nanoid } from 'nanoid';
import rehypeSanitize from "rehype-sanitize";

function BlogForm({ blog = null, onSubmitHandler, setEditPopup }) {
    
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch()
    const navigate = useNavigate();

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

Visit [uiwjs/react-md-editor](https://github.com/uiwjs/react-md-editor) for more information.

---

## \`Inline Code\`

You can include \`inline code\` like \`const x = 5;\`.

---

## 📦 Code Blocks

\`\`\`js
// JavaScript code block
function greet(name) {
  return \`Hello, \${name}!\`;
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

    const [title, setTitle] = useState(blog?.title || "");
    const [titleError, setTitleError] = useState(false);
    const [showCountdown, setShowCountdown] = useState(false);
    const [slug, setSlug] = useState(blog?.slug || "");
    const [category, setCategory] = useState(
        blog ? { label: blog.category, value: blog.category } : { label: "General", value: "GENERAL" }
      );
    const [tags, setTags] = useState(blog?.tags?.map(t => ({ label: t, value: t })) || []);
    const [published, setPublished] = useState(blog?.published ?? true);
    const [featured, setFeatured] = useState(blog?.featured ?? false);
    const [image, setImage] = useState(blog?.image || null);
    const [imageError, setImageError] = useState('');
    const [content, setContent] = useState(blog?.content || "## Start writing your blog post\n\n" + textSample);

    
    const categories = [
        { label: "General", value: "GENERAL" },
        { label: "Travel", value: "TRAVEL" },
        { label: "Food", value: "FOOD" },
        { label: "Lifestyle", value: "LIFESTYLE" },
        { label: "Fashion", value: "FASHION" },
        { label: "Technology", value: "TECHNOLOGY" },
        { label: "Photography", value: "PHOTOGRAPHY" },
        { label: "Education", value: "EDUCATION" },
        { label: "Music", value: "MUSIC" },
        { label: "Interior", value: "INTERIOR" },
        { label: "Other", value: "OTHER" },
    ];

    const TAGS = [
        // General Purpose
        {
            label: "General Purpose",
            options: [
                { value: 'TUTORIAL', label: 'Tutorial' },
                { value: 'HOW_TO', label: 'How-to' },
                { value: 'GUIDE', label: 'Guide' },
                { value: 'TIPS', label: 'Tips' },
                { value: 'TRICKS', label: 'Tricks' },
                { value: 'RESOURCES', label: 'Resources' },
                { value: 'PRODUCTIVITY', label: 'Productivity' },
                { value: 'INSPIRATION', label: 'Inspiration' },
                { value: 'OPINION', label: 'Opinion' },
                { value: 'REVIEW', label: 'Review' },
                { value: 'CASE_STUDY', label: 'Case Study' },
                { value: 'INTERVIEW', label: 'Interview' },
                { value: 'NEWS', label: 'News' },
                { value: 'UPDATE', label: 'Update' },
                { value: 'ANNOUNCEMENT', label: 'Announcement' },
                { value: 'REFLECTION', label: 'Reflection' },
            ]
        },

        // Technical/Development
        {
            label: "Technical/Development",
            options: [
                { value: 'JAVASCRIPT', label: 'JavaScript' },
                { value: 'REACT', label: 'React' },
                { value: 'NODE_JS', label: 'Node.js' },
                { value: 'PYTHON', label: 'Python' },
                { value: 'DJANGO', label: 'Django' },
                { value: 'HTML', label: 'HTML' },
                { value: 'CSS', label: 'CSS' },
                { value: 'FRONTEND', label: 'Frontend' },
                { value: 'BACKEND', label: 'Backend' },
                { value: 'API', label: 'API' },
                { value: 'DATABASE', label: 'Database' },
                { value: 'DEVOPS', label: 'DevOps' },
                { value: 'SECURITY', label: 'Security' },
                { value: 'TESTING', label: 'Testing' },
                { value: 'PERFORMANCE', label: 'Performance' },
                { value: 'MOBILE', label: 'Mobile' },
                { value: 'WEB', label: 'Web' },
                { value: 'UI_UX', label: 'UI/UX' },
                { value: 'DESIGN', label: 'Design' },
                { value: 'ALGORITHMS', label: 'Algorithms' },
                { value: 'DATA_STRUCTURES', label: 'Data Structures' },
                { value: 'GIT', label: 'Git' },
                { value: 'GITHUB', label: 'GitHub' },
            ]
        },
      
      
        // Lifestyle & Personal Growth
        {
            label: "Lifestyle & Personal Growth",
            options: [
                { value: 'SELF_IMPROVEMENT', label: 'Self-improvement' },
                { value: 'MOTIVATION', label: 'Motivation' },
                { value: 'MINDFULNESS', label: 'Mindfulness' },
                { value: 'HABITS', label: 'Habits' },
                { value: 'CAREER', label: 'Career' },
                { value: 'REMOTE_WORK', label: 'Remote Work' },
                { value: 'FREELANCING', label: 'Freelancing' },
                { value: 'ENTREPRENEURSHIP', label: 'Entrepreneurship' },
                { value: 'TRAVEL', label: 'Travel' },
                { value: 'FOOD', label: 'Food' },
                { value: 'HEALTH', label: 'Health' },
                { value: 'FITNESS', label: 'Fitness' },
                { value: 'MENTAL_HEALTH', label: 'Mental Health' },
                { value: 'BOOKS', label: 'Books' },
                { value: 'READING', label: 'Reading' },
                { value: 'WRITING', label: 'Writing' },
                { value: 'CREATIVITY', label: 'Creativity' },
                { value: 'PHOTOGRAPHY', label: 'Photography' },
                { value: 'MUSIC', label: 'Music' },
                { value: 'ART', label: 'Art' },
            ]
        },
      
        // Business & Marketing
        {
            label: "Business & Marketing",
            options: [
                { value: 'STARTUP', label: 'Startup' },
                { value: 'MARKETING', label: 'Marketing' },
                { value: 'SEO', label: 'SEO' },
                { value: 'CONTENT', label: 'Content' },
                { value: 'SOCIAL_MEDIA', label: 'Social Media' },
                { value: 'BRANDING', label: 'Branding' },
                { value: 'E_COMMERCE', label: 'E-commerce' },
                { value: 'ANALYTICS', label: 'Analytics' },
                { value: 'GROWTH', label: 'Growth' },
                { value: 'SALES', label: 'Sales' },
                { value: 'LEADERSHIP', label: 'Leadership' },
                { value: 'MANAGEMENT', label: 'Management' },
                { value: 'FINANCE', label: 'Finance' },
                { value: 'INVESTING', label: 'Investing' },
                { value: 'SIDE_HUSTLE', label: 'Side Hustle' },
            ]
        },
      
        // Technology Trends
        {
            label: "Technology Trends",
            options: [
                { value: 'AI', label: 'AI' },
                { value: 'MACHINE_LEARNING', label: 'Machine Learning' },
                { value: 'BLOCKCHAIN', label: 'Blockchain' },
                { value: 'WEB3', label: 'Web3' },
                { value: 'CRYPTOCURRENCY', label: 'Cryptocurrency' },
                { value: 'AR_VR', label: 'AR/VR' },
                { value: 'IOT', label: 'IoT' },
                { value: 'CYBERSECURITY', label: 'Cybersecurity' },
                { value: 'CLOUD_COMPUTING', label: 'Cloud Computing' },
                { value: '5G', label: '5G' },
                { value: 'AUTOMATION', label: 'Automation' }
            ]
        },
      ];

    const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
    const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

    const onSubmit = async (e) => {
        e.preventDefault();

        if (!image && !blog?.image) {
            setImageError('No image selected');
            setShowCountdown(true);
            setTimeout(() => {
              setImageError('');
              setShowCountdown(false);
            }, 5000);
            return;
        }

        let imageUrl = blog?.image || null;

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
        } else {
            setImageError('No image selected')
            setShowCountdown(true);
            setTimeout(() => (setImageError(''), setShowCountdown(false)), 5000);
            return;
        }

        const blogData = {
            // ...blog,
            _id: blog?._id,
            title,
            slug,
            user: user._id,
            category: category.value,
            tags: tags.map(tag => tag.value),
            published,
            featured,
            image: imageUrl,
            content,
        };

        try {
            await onSubmitHandler(blogData);
            navigate('/dashboard');
        } catch (err) {
            console.error(err);
        }
    };


    const handleCancel = () => {
        if(setEditPopup) {
            setEditPopup(false);
        } else {
            navigate('/dashboard')
        }
    }
        // dispatch(createBlog(blog))
        //     .unwrap()
        //     .then(() => {
        //         navigate('/dashboard');
        //     })
        //     .catch((err) => console.error(err))
        // setTitle('');
        // setImage('');
        // setContent(textSample);
        
    

    return(
        <section className={styles["form"]}>
            {blog ? (
                <h2>Edit Blog</h2>
            ) : (
                <h2>Create a New Blog</h2>
            )}
            <form onSubmit={onSubmit}>
                <div className={styles['form-group']}>
                    <label>Title
                        {titleError && (
                            <div className={styles["error-container"]}>
                                <span className={styles["error-message"]}> 
                                    Title must be 70 characters or fewer
                                </span>
                                {showCountdown && (
                                    <div className={`${styles["countdown"]} ${styles["animate"]}`}></div>
                                )}
                            </div>
                        )}
                    </label>
                    <input 
                        type="text" 
                        name="title" 
                        id="title" 
                        value={title} 
                        onChange={(e) => {
                            const input = e.target.value;

                            if (input.length <= 70) {
                                setTitle(input);
                                const baseSlug = input.toLowerCase().replace(/[^a-z0-9 ]/gi, '').replace(/\s+/g, '-');
                                const randomSuffix = nanoid(6); // generates short uniqueID
                                setSlug(`${baseSlug}-${randomSuffix}`)

                            } else {
                                if (!titleError) {
                                    setTitleError(true);
                                    setShowCountdown(true);
                        
                                    setTimeout(() => {
                                        setTitleError(false);
                                        setShowCountdown(false);
                                    }, 5000); // match with CSS transition
                                }
                            }
                        }} // onChange
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
                        value={slug}
                        // onChange={(e) => setSlug(e.target.value)}
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
                        name="tags"
                        className={styles["select-tags"]}
                        type="text"
                        isMulti
                        value={tags}
                        onChange={setTags}
                        placeholder="Select or create tags..."
                        formatCreateLabel={(inputValue) => `Add "${inputValue}"`}
                        formatGroupLabel={(group) => (
                            <div className={styles["group-styles"]}>
                              <span>{group.label}</span>
                              <span className={styles["group-badge-styles"]}>
                                {group.options.length}
                              </span>
                            </div>
                        )}
                        noOptionsMessage={() => "Type to create a new tag"}
                        options={TAGS}
                        styles={{
                            group: (base) => ({
                              ...base,
                              padding: 0
                            }),
                            groupHeading: (base) => ({
                              ...base,
                              fontSize: '14px',
                              marginBottom: '4px',
                              backgroundColor: '#f8f9fa'
                            }),
                            option: (base, { isFocused }) => ({
                                ...base,
                                backgroundColor: isFocused ? 'hsl(35, 100.00%, 95%);' : base.backgroundColor,
                                color: isFocused ? '#000' : base.color, 
                                '&:active': {
                                    backgroundColor: 'hsl(34, 100%, 91%);'
                                },
                            })
                        }}
                    />

                </div> 
                <div className={styles['form-group']}>
                    <label>Featured Image
                        {imageError && (
                            <div className={styles["error-container"]}>
                                <span className={styles["error-message"]}> 
                                    {imageError}
                                </span>
                                {showCountdown && (
                                    <div className={`${styles["countdown"]} ${styles["animate"]}`}></div>
                                )}
                            </div>
                        )}
                    </label>
                    <ImageUpload 
                        className={styles["image-upload"]}
                        value={image}
                        onImageSelect={(file) => {
                            if (!file) return;
                            
                            if (!ALLOWED_TYPES.includes(file.type)) {
                                setImageError("Only JPG, PNG, or WEBP images allowed");
                                setImage(null);
                                setShowCountdown(true);
                                setTimeout(() => (setImageError(''), setShowCountdown(false)), 5000);
                                return;
                            }

                            if (file.size > MAX_IMAGE_SIZE) {
                                setImageError("Image must be under 5MB.");
                                setImage(null);
                                setShowCountdown(true);
                                setTimeout(() => (setImageError(''), setShowCountdown(false)), 5000);
                                return;
                            }
                            
                            setImageError('');
                            setImage(file);
                            console.log("TESTING")
                            console.log("image link: ", file)
                        }}

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
                        previewOptions={{
                            rehypePlugins: [[rehypeSanitize]],
                        }}
                    />
                </div>
                <FormGroup className={styles["check-group"]}>
                    <FormControlLabel control={<Checkbox 
                                                defaultChecked={published}
                                                onChange={() => setPublished(!published)}
                                                sx={{
                                                    color: 'rgb(255, 195, 117);',
                                                    '&.Mui-checked': {
                                                        color: 'rgb(255, 195, 117);',
                                                    },
                                                }}
                                            />} 
                                      label={<span className={styles["label"]}>Public</span>}/>
                    <FormControlLabel control={<Checkbox 
                                                defaultChecked={featured}
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
                    {blog ? (
                        <>
                            <div className={styles["btn-grid"]}>
                                <button 
                                    className={styles["btn-block"]} 
                                    onClick={handleCancel}>
                                    Cancel
                                </button>
                                <button 
                                    className={styles["btn-block"]} 
                                    type='submit'>
                                    Save
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className={styles["btn-grid"]}>
                            <button 
                                className={styles["btn-block"]} 
                                type='submit'>
                                Publish
                            </button>
                        </div>

                    )}
                </div>
            </form>
            
        </section>
        
    );
}


export default BlogForm