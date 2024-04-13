import { useState, useEffect } from 'react';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import { useSelector } from 'react-redux';
import CommentCard from './CommentCard';
import { IoIosArrowDown } from "react-icons/io";
import useAxiosFetch from '../../../hooks/useAxiosFetch';

const CommentsSection = ({ post, setPost }) => {
  const axiosJWT = useAxiosPrivate();
  const user = useSelector(state => state.user.value);
  const [url, setUrl] = useState(`/comments?post_id=${post.id}`);
  const { data, isLoading, fetchError } = useAxiosFetch(url);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [page, setPage] = useState(1);
  const [nextPage, setNextPage] = useState(null);

  useEffect(() => {
    setNextPage(data.nextPage ? data.nextPage : null);
    setComments(prev => [...prev,
    ...(data.comments
      ? data.comments.map(comment => ({ ...comment, created_at: new Date(comment.created_at) }))
      : [])]);
  }, [data]);

  useEffect(() => {
    setUrl(`/comments?post_id=${post.id}&page=${page}`);
  }, [page, post]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosJWT.post(`/comments?post_id=${post.id}`, { content: comment });
      setComments([]);
      if (url === `/comments?post_id=${post.id}&page=1`) {
        setUrl(`/comments?post_id=${post.id}`);
      } else if (url === `/comments?post_id=${post.id}`) {
        setUrl(`/comments?post_id=${post.id}&page=1`);
      } else {
        setPage(1);
      }
      setPost(prev => ({ ...prev, comments: prev.comments + 1 }));
    } catch (err) {
      alert(err.message);
    }
    setComment('');
  }
 
  const handleDelete = async (id) => {
    try {
      await axiosJWT.delete(`/comments?post_id=${post.id}&comment_id=${id}`);
      setComments(prev => prev.filter(comment => comment.id !== id));
      setPost(prev => ({ ...prev, comments: prev.comments - 1 }));
    } catch (err) {
      alert(err.message);
    }
  };

  const handleUploadMore = async () => {
    setPage(prev => prev + 1);
  };

  return (
    <div className='comments-container'>
      <div className='comments-header'>
        {post.comments} {post.comments === 1 ? 'Comment' : 'Comments' }
      </div>
      <div className='add-comment-container'>
        <img src={user.profileImage ? user.profileImage : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'} alt="profile-image" />
        <form>
          <input
            className='comment-input'
            type="text"
            placeholder='Add a comment... (min 10 characters, max 255 characters)'
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button className='btn' type="submit" onClick={(e) => handleSubmit(e)} disabled={comment.length < 10 || comment.length > 255 || comment.replace(/\s/g, '').length == 0 ? true : false }>Comment</button>
        </form>
      </div>
        { isLoading && <p>Loading...</p> }
        { !isLoading && fetchError && <p style={{ color: 'red' }}>{fetchError}</p> }
        { !isLoading && !fetchError &&
          <div className='comments-feed'>
            {comments.length
              ? comments.map(comment => (
                <CommentCard comment={comment} setComments={setComments} handleDelete={handleDelete} />))
              : <p className='no-comments-label'>No comments.</p>
            }
          </div>
        }
      {nextPage ? 
        <div className='view-questions-btn' onClick={() => handleUploadMore()}>
          View more questions
          <IoIosArrowDown className='icon arrow-down'/>
        </div>
        : null
      }
    </div>
  )
};

export default CommentsSection;
