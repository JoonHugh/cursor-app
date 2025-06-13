import { useState, useEffect } from 'react';
import { AiOutlineConsoleSql } from 'react-icons/ai';
import styles from './BlogItem.module.css';
import { IoMdMore } from "react-icons/io";
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux'
import { FaRegTrashCan } from "react-icons/fa6";
import BlogForm from './BlogForm.jsx';
import { updateBlog } from '../src/features/blogs/blogSlice.js';




function BlogItem({ blog }) {

    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    
    const [copySuccess, setCopySuccess] = useState('');
    const [confirm, setConfirm] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false)
    const [deletePopup, setDeletePopup] = useState(false);
    const [editPopup, setEditPopup] = useState(false);
    const [currentBlog, setCurrentBlog] = useState(null);


    const contentLines = blog.content.split('\n');
    const firstLines = contentLines.slice(0, 5).join('\n');
    
    // Truncate to 200 characters if it's too long
    const previewText = firstLines.length > 200
        ? firstLines.slice(0, 200) + "..."
        : firstLines;

    const url = "http://localhost:5000" + blog.image;
    const blogURL = "http://localhost:5001/blog/" + blog.slug;

    const dropdown = (e) => {
        e.stopPropagation();
        setShowDropdown((prev) => !prev);
        console.log("CLICKED");
    }

    const handleCopy  = async () => {
        try {
            await navigator.clipboard.writeText(blogURL);
            setCopySuccess('Copied!')
            setConfirm(true);
            setTimeout(() => (setCopySuccess(''), setConfirm(false)), 2000);
        } catch (error) {
            console.error('Failed to copy text: ', err);
            setCopySuccess('Failed to copy!');
            setConfirm(false);
        }
    }

    const handleDelete = async () => {
        try {
            console.log("blog id::", blog._id);
            await axios.delete(`http://localhost:5000/blogs/${blog._id}`, {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                }
            });
            setDeletePopup(false);
            // Optionally, trigger a refresh or remove this blog from state
            // e.g., call a prop: onDelete(blog._id);
        } catch (err) {
            console.error("Failed to delete blog:", err);
        }
    }

    const handleEdit = async () => {
        console.log("EDIT");
    }



    return(
        <>
            {confirm && 
                <div className={styles["confirmed"]}>
                    <span className={styles["confirm-message"]}> 
                        Copied to clipboard!
                    </span>
                    <div className={`${styles["countdown"]} ${styles["animate"]}`}></div>
                </div>
            }
            {deletePopup && 
                <div className={styles["popup-overlay"]}>
                    <div className={styles["popup-box"]}>
                        <div className={styles["icon-container"]}>
                            <div className={styles["icon"]}><FaRegTrashCan /></div>
                        </div>
                        <h3>Delete Blog?</h3>
                        <div className={styles["text"]}>
                            <p>Are you sure you want to delete this blog?</p>
                            <p>This action cannot be undone.</p>
                        </div>
                        <div className={styles["popup-buttons"]}>
                            <button 
                                onClick={() => setDeletePopup(false)} 
                                className={styles["cancel-button"]}>Cancel</button>
                            <button 
                                onClick={handleDelete} 
                                className={styles["confirm-delete-button"]}>Delete</button>
                        </div>
                    </div>
                </div>
            }
            {editPopup && 
                <div className={styles["popup-overlay"]}>
                    <div className={styles["edit-popup-box"]}>
                            <BlogForm
                                blog={currentBlog}
                                isEdit={true}
                                onSubmitHandler={(updatedBlog) => {
                                    // YOU'RE N OT . GETTINGT HE ID BECAUSE P OSTMAN WORKS???
                                    dispatch(updateBlog({ 
                                        _id: blog._id,  // Use _id instead of id
                                        ...updatedBlog   // This already includes title, slug, etc.
                                    })).unwrap()
                                }}
                            />
                        <div className={styles["popup-buttons"]}>
                            <button 
                                onClick={() => setEditPopup(false)} 
                                className={styles["cancel-button"]}>Cancel
                            </button>
                            <button 
                                onClick={handleEdit} 
                                className={styles["confirm-edit-button"]}>Save
                            </button>
                        </div>
                    </div>

                </div>
            }

            <div className={styles["container"]}>
                <div className={styles["grid"]}>
                    <a className={styles["container-link"]} href={'blog/' + blog.slug}>
                        <div className={styles["image-container"]}>
                            <img src={(blog.image) ? url : "/assets/interior2.jpg"} alt="blog-image"></img>
                        </div>
                    </a>
                    <div className={styles["preview-box"]}>
                        <div className={styles["top-grid"]}>
                            <div>
                                <img src={"/assets/defaultprofilepic.jpg"}></img>
                            </div>
                            <div className={styles["top"]}>
                                <span>{blog.user.name}</span>
                                <span>{new Date(blog.createdAt).toLocaleString('en-US', {month: 'short', day: 'numeric', year: 'numeric'})} &nbsp; • &nbsp; {blog.readTime}</span>
                                <div className={styles["dropdown"]}>
                                    <button className={styles["more"]} onClick={dropdown}><IoMdMore /></button>
                                    {showDropdown && (
                                        <div className={styles["dropdown-content"]} onClick={(e) => e.stopPropagation()} onMouseLeave={() => setShowDropdown(false)}>
                                            <a href={blogURL}><button>Go To Post</button></a>
                                            <button onClick={() => {
                                                setEditPopup(true)
                                                setCurrentBlog(blog)
                                            }}>Edit</button>
                                            <button onClick={handleCopy}>Share</button>
                                            <button onClick={() => setDeletePopup(true)}>Delete</button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <a className={styles["container-link"]} href={'blog/' + blog.slug}>
                            <h3 className={styles["title"]}>{blog.title.length < 45 ? blog.title : blog.title.substring(0, 46) + "..."}</h3>
                        </a>
                        <a className={styles["container-link"]} href={'blog/' + blog.slug}>
                            <p className={styles["content"]}>{previewText}</p>
                        </a>
                        <div className={styles["bottom"]}>
                            <div className={styles["meta"]}>
                                <span className={styles["comments"]}>{Object.keys(blog.comments).length} comments</span>
                                <span className={styles["likes"]}>{blog.likes} likes</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BlogItem