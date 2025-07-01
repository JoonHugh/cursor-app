import styles from './Comments.module.css';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchComments, addComment } from './features/blogs/blogSlice.js';

function Comments({ blog, user }) {

    const [comment, setComment] = useState('')
    const dispatch = useDispatch();

    const { comments, isLoading } = useSelector(state => state.blog);

    useEffect(() => {
        if (blog?._id) {
            dispatch(fetchComments({ _id: blog._id }));
        }
    }, [blog?._id, dispatch]);


    const onSubmit = (e) => {
        e.preventDefault();
        // blog.comments.push({ user: user, text: comment })
        if (!comment.trim()) return;

        dispatch(addComment({ _id: blog._id, text: comment }));
        console.log(blog.comments);
        setComment('');
    }

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
                <p>
                    Must be logged in to comment!
                </p>
            )}

            {isLoading && <p>Loading comments...</p>}

            <div className={styles["comment-list"]}>
                {comments?.length > 0 ? (
                    comments.map((comment, index) => {
                        <div key={index} className={styles["comment"]}>
                            <div className={styles["user-info"]}>
                                <img src={comment.user?.image || "/assets/defaultprofilepic.jpc"} alt="avatar" />
                                <div>
                                    <p className={styles["username"]}>{comment.user?.username}</p>
                                    <p className={styles["meta"]}>
                                        {comment.user?.gender && `${comment.user.gender}, `} 
                                        {comment.user?.country}
                                    </p>
                                </div>
                            </div>
                            <p className={styles["text"]}>{comment.text}</p>
                            <p className={styles["date"]}>
                                {new Date(comment.createdAt).toLocaleDateString()}
                            </p>
                        </div>
                    })
                ) : (
                    <p>No comments yet</p>
                )}

            </div>
        </div>
    );
}

export default Comments