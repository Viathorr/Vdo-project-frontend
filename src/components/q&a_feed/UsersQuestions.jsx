import { useState, useEffect } from 'react';
import FeedQuestionCard from './FeedQuestionCard';
import { IoIosArrowDown } from "react-icons/io";
import { useSelector } from 'react-redux';
import useAxiosFetch from '../../hooks/useAxiosFetch';
import { useNavigate } from 'react-router-dom';

const UsersQuestions = () => {
  const [url, setUrl] = useState('/posts/my');
  const navigate = useNavigate();
  const { data, isLoading, fetchError } = useAxiosFetch(url);
  const user = useSelector(state => state.user.value);
  const [page, setPage] = useState(1);
  const [nextPage, setNextPage] = useState(null);
  const [posts, setPosts] = useState([]); 

  useEffect(() => {
    setNextPage(data.nextPage ? data.nextPage : null);
    console.log(data.posts);
    setPosts(prev => [...prev,
    ...(data.posts
      ? data.posts.map(post => ({ ...post, createdAt: new Date(post.createdAt), username: user.name, userProfileImageURL: user.profileImage }))
      : [])]);
  }, [data]);

  useEffect(() => {
    setUrl(`/posts/my?page=${page}`);
  }, [page]);

  const handleClick = (id) => {
    navigate(`/my_questions/${id}`);
  }

  const handleUploadMore = async () => {
    try {
      setPage(prev => prev + 1);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className='questions-feed'>
      {isLoading && <p>Loading ...</p>}
      {!isLoading && fetchError && <p style={{ color: 'red' }}>{fetchError}</p>}
      {
        !isLoading && !fetchError &&
        <>
          {posts.length ? posts.map(question => (<FeedQuestionCard question={question} handleClick={handleClick} />)) : <p>No posts.</p>}
          {nextPage ?
            <div className='view-questions-btn' onClick={() => handleUploadMore()}>
              View more questions
              <IoIosArrowDown className='icon arrow-down' />
            </div>
            : null
          }
        </>
      }
    </div>
  )
}

export default UsersQuestions
