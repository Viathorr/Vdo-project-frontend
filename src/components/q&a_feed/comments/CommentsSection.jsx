import { useState } from 'react';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import { useSelector } from 'react-redux';
import CommentCard from './CommentCard';
import { IoIosArrowDown } from "react-icons/io";

const CommentsSection = ({ id, post, setPost }) => {
  const axiosJWT = useAxiosPrivate();
  const user = useSelector(state => state.user.value);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([
    {
      id: 1,
      username: 'TestUser2',
      content: 'Hi, Nice to meet you>',
      created_at: new Date('2024-04-08T22:30:00'),
      userIsCreator: false,
      userProfileImageURL: ''
    },
    {
      id: 2,
      username: user.name,
      content: 'Hi, how are you?)',
      created_at: new Date('2024-04-07T10:00:00'),
      userIsCreator: true,
      userProfileImageURL: user.profileImage
    },
    {
      id: 3,
      username: 'Constellation',
      content: 'Yoy yoy yoy, what are you up to?',
      created_at: new Date('2024-04-05T23:00:00'),
      userIsCreator: false,
      userProfileImageURL: ''
    },
  ]);
  const [page, setPage] = useState(1);
  const [nextPage, setNextPage] = useState(2);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setComments(prev => [...prev, {
        id: prev[prev.length - 1]?.id ? id + 1 : 1,
        content: comment,
        userIsCreator: true,
        created_at: new Date(),
        userProfileImageURL: user.profileImage,
        username: user.name
      }]);
      setPost(prev => ({ ...prev, comments: prev.comments + 1 }));
    } catch (err) {
      alert(err.message);
    }

    setComment('');
  }

  const handleDelete = async (id) => {
    try {
      setComments(prev => prev.filter(comment => comment.id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  const handleUploadMore = async () => {
    try {
      setPage(prev => prev + 1);
      setNextPage(null);
    } catch (err) {
      console.log(err.message);
    }
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
      <div className='comments-feed'>
        { comments.length
          ? comments.map(comment => (
          <CommentCard comment={comment} setComments={setComments} handleDelete={handleDelete}/>))
          : <p>No comments.</p>
        }
      </div>
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
