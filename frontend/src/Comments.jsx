import styles from './Comments.module.css';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchComments, addComment } from './features/blogs/blogSlice.js';
import { formatDistanceToNow } from 'date-fns';
import { BsChatLeftTextFill } from "react-icons/bs";
import { IoIosMore } from "react-icons/io";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';



function Comments({ blog, user }) {

    const [comment, setComment] = useState('')
    const [showReplyForm, setShowReplyForm] = useState(null);
    const [replyText, setReplyText] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { comments, isLoading } = useSelector(state => state.blogs);

    useEffect(() => {
        if (blog?._id) {
            dispatch(fetchComments({ _id: blog._id }));
        }
    }, [blog?._id, dispatch]);


    const onSubmit = async (e) => {
        e.preventDefault();
        // blog.comments.push({ user: user, text: comment })
        try {
            if (!comment.trim()) return;
    
            await dispatch(addComment({ _id: blog._id, text: comment })).unwrap();
            console.log("comments:", comments);
            setComment('');
            toast.success('Comment posted');
        } catch (error) {
            toast.error('Failed to post comment');
        }
    }

    const handleReplySubmit = (e, parentId) => {
        e.preventDefault();
        if (!replyText.trim()) return;
      
        dispatch(addComment({ _id: blog._id, text: replyText, parentId }));
        setReplyText('');
        setShowReplyForm(null);
      };

    return(
        <div className={styles["container"]}>
            <p className={styles["section-name"]}>Leave a comment</p>
            {user ? (
                <form onSubmit={onSubmit} className={styles["form-container"]}>
                    <textarea 
                        className={styles["comment-area"]} 
                        value={comment} onChange={(e) => setComment(e.target.value)} 
                        placeholder='Add comment...' 
                        required 
                    />
                    <button type="submit" className={styles["submit"]}>Post comment</button>
                </form>
            ) : (
                <div className={styles["login"]}>
                    <p className={styles["login-prompt"]}>Log in or register to leave a comment</p>
                    <div className={styles["button-group"]}>
                        <button onClick={() => navigate('/login')}>Login</button>
                        <button onClick={() => navigate('/register')}>Register</button>
                    </div>
                </div>
            )}

            {isLoading && <p>Loading comments...</p>}

            <div className={styles["comment-list"]}>
                {comments?.length > 0 ? (
                    comments.map((comment, index) => (
                        <div key={index} className={styles["comment"]}>
                            <div className={styles["user-info"]}>
                                <img 
                                    src={comment.user?.image || "/assets/defaultprofilepic.jpg"} 
                                    alt="avatar" 
                                    className={styles["avatar"]}/>
                                <div>
                                    <p className={styles["comment-meta"]}>
                                        <span className={styles["username"]}>{comment.user?.username}</span>
                                        <span className={styles["user-meta"]}>
                                            {(comment.user.gender || comment.user.country) &&
                                                <span>
                                                    ({comment.user.gender && `${comment.user.gender}, `} 
                                                    {comment.user.country && `${comment.user.country}`})
                                                </span>
                                            }
                                            <span>
                                                {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                                            </span>
                                        </span>
                                    </p>
                                </div>
                            </div>
                            <div className={styles["text"]}>
                                <p>{comment.text}</p>
                                <div className={styles["actions"]}>
                                    <button className={styles["reply-button"]} onClick={() => setShowReplyForm((prev) => (prev === comment._id ? null : comment._id))}><BsChatLeftTextFill />Reply</button>
                                    <button className={styles["more"]}><IoIosMore /></button>
                                </div>

                                {showReplyForm === comment._id && (
                                    <form onSubmit={(e) => handleReplySubmit(e, comment._id)}>
                                        <textarea 
                                        value={replyText}
                                        onChange={(e) => setReplyText(e.target.value)}
                                        className={styles["reply-input"]}
                                        placeholder="Write a reply..."
                                        />
                                        <button type="submit" className={styles["submit"]}>Reply</button>
                                    </form>
                                )}

                                {comment.replies && comment.replies.length > 0 && (
                                <div className={styles["replies-container"]}>
                                    {comment.replies.map((reply, rIndex) => (
                                    <div key={rIndex} className={styles["reply"]}>
                                        <div className={styles["user-info"]}>
                                            <img 
                                                src={reply.user?.image || "/assets/defaultprofilepic.jpg"} 
                                                alt="avatar" 
                                                className={styles["avatar"]}
                                            />
                                            <div>
                                                <p className={styles["comment-meta"]}>
                                                    <span className={styles["username"]}>{reply.user?.username}</span>
                                                    <span className={styles["user-meta"]}>
                                                        {(reply.user.gender || reply.user.country) &&
                                                        <span>
                                                            ({reply.user.gender && `${reply.user.gender}, `} 
                                                            {reply.user.country && `${reply.user.country}`})
                                                        </span>
                                                        }
                                                        <span>
                                                            {formatDistanceToNow(new Date(reply.createdAt), { addSuffix: true })}
                                                        </span>
                                                    </span>
                                                </p>
                                            </div>
                                        </div>
                                        <div className={styles["text"]}>
                                            <p>{reply.text}</p>
                                        </div>
                                    </div>
                                    ))}
                                </div>
                                )}


                            </div>
                        </div>
                    ))
                ) : (
                    <div className={styles["no-comments"]}>
                        <p>No comments yet!</p>
                    </div>
                )}

            </div>
        </div>
    );
}

export default Comments