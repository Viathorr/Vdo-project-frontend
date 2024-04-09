import { useState, useEffect } from 'react';
import FeedQuestionCard from './FeedQuestionCard';
import { IoIosArrowDown } from "react-icons/io";
import { useSelector } from 'react-redux';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

const UsersQuestions = () => {
  const axiosJWT = useAxiosPrivate();
  const [page, setPage] = useState(1);
  const user = useSelector(state => state.user.value);
  const [nextPage, setNextPage] = useState(2);
  const [posts, setPosts] = useState([
    {
      id: 1,
      content: 'Hello, this is my first post, thanks!',
      created_at: new Date('2024-04-04T23:00:00'),
      username: user.name,
      userImage: user.profileImage,
      likes: 44,
      comments: 3
    },
    {
      id: 2,
      content: 'How can you draw up a productive and correct plan?',
      created_at: new Date('2024-01-22T05:20:00'),
      username: user.name,
      userImage: user.profileImage,
      likes: 11,
      comments: 3
    },
    {
      id: 3,
      content: "Hello, so I want to ask you a question, what is the best practive while organizing all your plans? Because I am always struggling with that and can't help but postpone everything.",
      created_at: new Date('2019-07-14T12:00:00'),
      username: user.name,
      userImage: user.profileImage,
      likes: 25,
      comments: 2
    },
  ]);

  const handleUploadMore = async () => {
    try {
      setPage(prev => prev + 1);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className='questions-feed'>
      {posts.map(question => (<FeedQuestionCard question={question} />))}
      {nextPage ? 
        <div className='view-questions-btn' onClick={() => handleUploadMore()}>
          View more questions
          <IoIosArrowDown className='icon arrow-down'/>
        </div>
        : null
      }
    </div>
  )
}

export default UsersQuestions
