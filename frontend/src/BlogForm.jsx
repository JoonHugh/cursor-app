import { useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './BlogForm.module.css';
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
import { toast } from 'react-toastify';
import { useMediaQuery } from '@mui/material';


function BlogForm({ blog = null, onSubmitHandler, setEditPopup }) {

    const isMobile = useMediaQuery('(max-width:768px)');

    const DEBUG = import.meta.env.DEBUG;
    
    const { user } = useSelector((state) => state.auth);
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

### Task Lists

- [x] Write Markdown
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

---

## 📊 Tables

| Feature       | Supported |
|---------------|-----------|
| Headers       | ✅        |
| Code Blocks   | ✅        |

---

## 📣 Callouts (via blockquote)

> ⚠️ This is a warning!
> 💡 This is a tip!
> ✅ This is a success message!

---

## 💬 HTML in Markdown

You can even embed **raw HTML**:

\`\`\`html
<div style="color: blue; font-weight: bold;">
  This is raw HTML inside Markdown!
</div>
\`\`\`

---

## Try it out!

Markdown is **simple**, **readable**, and **powerful**. Whether you're writing a README or blog post, it's a fantastic tool to have in your toolbox.

*Written with ❤️ in Markdown.*


Visit [uiwjs/react-md-editor](https://github.com/uiwjs/react-md-editor) for more information.`;

    const [title, setTitle] = useState(blog?.title || "");
    const [slug, setSlug] = useState(blog?.slug || "");
    const [category, setCategory] = useState(
        blog ? { label: blog.category, value: blog.category } : { label: "General", value: "GENERAL" }
      );
    const [tags, setTags] = useState(blog?.tags?.map(t => ({ label: t, value: t })) || []);
    const [published, setPublished] = useState(blog?.published ?? true);
    const [featured, setFeatured] = useState(blog?.featured ?? false);
    const [image, setImage] = useState(blog?.image || null);
    const [content, setContent] = useState(blog?.content || "## Start writing your blog post\n\n" + textSample);
    const [loading, setLoading] = useState(false);
    
    const categories = [
        { label: "General", value: "GENERAL" },
        { label: "Travel", value: "TRAVEL" },
        { label: "Food", value: "FOOD" },
        { label: "Lifestyle", value: "LIFESTYLE" },
        { label: "Fitness", value: "FITNESS" },
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
        
        if (title.trim() === "") {
            toast.error("Why are you trying to break my blog site with a whitespace?");
            return;
        }
        
        if (!image && !blog?.image) {
            toast.error("No image was selected")
            return;
        }
        
        setLoading(true);

        let imageUrl = blog?.image || null;

        if (image) {
            const formData = new FormData();
            formData.append("image", image);

            try {
                if (DEBUG) console.log(`TESTING  IMAGE  UPLOAD: ${import.meta.env.VITE_IMAGE_API_URL}blog`);
                const res = await fetch(`${import.meta.env.VITE_IMAGE_API_URL}blog`, {
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
            } finally {
                setLoading(false);
            }
        } else {
            toast.error("No image was selected.")
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
            setLoading(false);
            navigate('/dashboard');
        } catch (err) {
            console.error(err);
        }
    };

    const handleTitleChange = (e) => {
        const input = e.target.value;

        if (input.length <= 60) {
            setTitle(input);
            const baseSlug = input.toLowerCase()
                .replace(/[^a-z0-9 ]/gi, '')
                .replace(/\s+/g, '-');
            setSlug(baseSlug);
        } else {
            toast.error("Title must be 60 characters or fewer")
        }

    } // handleTitleChange

    const handleTitleBlur = () => {
        if (title.trim()) {
            const randomSuffix = nanoid(6); // generates short uniqueID
            setSlug(`${slug}-${randomSuffix}`)
        }
    }

    const handleCancel = () => {
        if(setEditPopup) {
            setEditPopup(false);
        } else {
            navigate('/dashboard')
        }
    } // handleCancel

    return(
        <section className={styles["form"]}>
            {blog ? (
                <h2>Edit Blog</h2>
            ) : (
                <h2>Create a New Blog</h2>
            )}
            <form onSubmit={onSubmit}>
                <div className={styles['form-group']}>
                    <label>Title</label>
                    <input 
                        type="text" 
                        name="title" 
                        id="title" 
                        value={title} 
                        onChange={handleTitleChange} // onChange
                        onBlur={handleTitleBlur}
                        placeholder='Blog Title'
                        required
                    />
                </div> 
                <div className={styles['form-group']}>
                    <label>Link</label>
                    <input 
                        type="text" 
                        name="slug" 
                        id="slug" 
                        value={slug}
                        placeholder='Blog Link'
                        disabled
                    />
                </div> 
                <div className={styles['form-group']}>
                    <label>Category (optional)</label>

                    <Select 
                        className={styles["select-tags"]}
                        type="text" 
                        name="category" 
                        id="category" 
                        value={category}
                        onChange={setCategory}
                        options={categories}
                        placeholder='Category (optional)'
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
                            option: (base, { isFocused, isSelected }) => ({
                                ...base,
                                backgroundColor: isSelected ? 'aliceblue' : isFocused ? 'aliceblue' : base.backgroundColor,
                                color: '#000', 
                                '&:active': {
                                    backgroundColor: 'hsl(208, 100.00%, 91.60%);'
                                },
                            })
                        }}
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
                                backgroundColor: isFocused ? 'aliceblue' : base.backgroundColor,
                                color: isFocused ? '#000' : base.color, 
                                '&:active': {
                                    backgroundColor: 'hsl(208, 100.00%, 91.60%);'
                                },
                            })
                        }}
                    />

                </div> 
                <div className={styles['form-group']}>
                    <label>Featured Image</label>
                    <ImageUpload 
                        className={styles["image-upload"]}
                        value={image}
                        onImageSelect={(file) => {
                            if (!file) return;
                            if (!ALLOWED_TYPES.includes(file.type)) {
                                toast.error("Only JPG, PNG, or WEBP images allowed.");
                                setImage(null);
                                return;
                            }
                            if (file.size > MAX_IMAGE_SIZE) {
                                toast.error("Image must be under 5MB.");
                                setImage(null);
                                return;
                            }
                            
                            setImage(file);
                            if (DEBUG) console.log("TESTING")
                            if (DEBUG) console.log("image link: ", file)
                        }}

                    />
                    
                </div>

                <div className={styles['form-group']}>
                    <label>Content</label>
                    <MDEditor 
                        height={500}
                        className={styles["content-editor"]} 
                        value={content} 
                        onChange={setContent} 
                        previewOptions={{
                            rehypePlugins: [[rehypeSanitize]],
                        }}
                        preview={isMobile ? 'edit' : 'live'}
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
                                    onClick={handleCancel}
                                >
                                    Cancel
                                </button>
                                <button 
                                    className={styles["btn-block"]} 
                                    type='submit'
                                    disabled={loading}
                                >
                                    {loading ? ("Saving...") : ("Save")}
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className={styles["btn-grid"]}>
                            <button 
                                className={styles["btn-block"]} 
                                type='submit'
                                disabled={loading}
                            >
                                {loading ? ("Uploading...") : ("Publish")}
                            </button>
                        </div>

                    )}
                </div>
            </form>
            
        </section>
        
    );
}


export default BlogForm