import { useState } from 'react';
import styles from './BlogItem.module.css';
import { IoMdMore } from "react-icons/io";
import { useSelector, useDispatch } from 'react-redux'
import { FaRegTrashCan } from "react-icons/fa6";
import BlogForm from './BlogForm.jsx';
import { updateBlog, deleteBlog } from '../src/features/blogs/blogSlice.js';
import { toast } from 'react-toastify';
import { useMediaQuery } from '@mui/material';
import removeMd from 'remove-markdown';


function BlogItem({ blog }) {
    
    const DEBUG = import.meta.env.DEBUG;

    const isMobile = useMediaQuery('(max-width:768px)');

    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

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

    const url = blog.image?.startsWith('http') ? blog.image : '/assets/interior.jpg';
    if (DEBUG) console.log(`URL IN BLOGITEMS: ${url}`)
    const blogURL = `https://cursor-app.onrender.com/blog/` + blog.slug;
    if (DEBUG) console.log(`BLOGURL IN BLOGITEMS: ${blogURL}`)


    const dropdown = (e) => {
        e.stopPropagation();
        setShowDropdown((prev) => !prev);
        if (DEBUG) console.log("CLICKED");
    }

    const handleUpdateBlog = async (updatedBlog) => {
        try {
            dispatch(updateBlog({ 
                _id: blog._id,  // Use _id instead of id
                ...updatedBlog   // This already includes title, slug, etc.
            })).unwrap()
            toast.success("Blog updated!")
        } catch (error) {
            toast.error("Blog could not be updated");
        }
    }

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(blogURL);
            toast.success("Copied to clipboard!")
        } catch (error) {
            console.error('Failed to copy text: ', err);
            toast.error("Failed to copy text");
        }
    }

    const handleDelete = async () => {
        setDeletePopup(true)
    }

    const handleDeleteConfirm = async () => {
        try {
            dispatch(deleteBlog({_id: blog._id}));
            toast.success("Blog successfully deleted")
        } catch (error) {
            toast.success("Blog could not be deleted")
        }
        setDeletePopup(false);
    }

    return(
        <>
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
                                className={styles["cancel-button"]}>No, Cancel</button>
                            <button 
                                onClick={handleDeleteConfirm} 
                                className={styles["confirm-delete-button"]}>Yes, Delete</button>
                        </div>
                    </div>
                </div>
            }
            {editPopup && 
                <div className={styles["popup-overlay"]}>
                    <div className={styles["edit-popup-box"]}>
                            <BlogForm
                                blog={currentBlog}
                                setEditPopup={setEditPopup}
                                onSubmitHandler={handleUpdateBlog}
                            />
                    </div>

                </div>
            }

            <div className={styles["container"]}>
                <div className={styles["grid"]}>
                    <a className={styles["container-link"]} href={'blog/' + blog.slug}>
                        <div className={styles["image-container"]}>
                            <img src={(blog.image) ? url : "/assets/interior2.jpg"} alt="blog-image" />
                        </div>
                    </a>
                    <div className={styles["preview-box"]}>
                        <div className={styles["top-grid"]}>
                            <div>
                                <img src={user?.image || "/assets/defaultprofilepic.jpg"} />
                            </div>
                            <div className={styles["top"]}>
                                <span>{blog.user.username}</span> {isMobile && <span>&nbsp; • &nbsp;{new Date(blog.createdAt).toLocaleString('en-US', {month: 'short', day: 'numeric', year: 'numeric'})} &nbsp; • &nbsp; {blog.readTime}</span>}
                                {!isMobile && <span>{new Date(blog.createdAt).toLocaleString('en-US', {month: 'short', day: 'numeric', year: 'numeric'})} &nbsp; • &nbsp; {blog.readTime}</span>}
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
                                            <button onClick={handleDelete}>Delete</button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <a className={styles["container-link"]} href={'blog/' + blog.slug}>
                            <h3 className={styles["title"]}>{blog.title.substring(0, 470)}</h3>
                        </a>
                        <a className={styles["container-link"]} href={'blog/' + blog.slug}>
                            <p className={styles["content"]}>{removeMd(previewText.replace(/\n+/g, '\n').trim())}</p>
                        </a>
                        <div className={styles["bottom"]}>
                            <div className={styles["meta"]}>
                                <span className={styles["comments"]}>{Object.keys(blog.comments).length} comments</span>
                                <span className={styles["likes"]}>{blog.likes?.length || 0} likes</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BlogItem