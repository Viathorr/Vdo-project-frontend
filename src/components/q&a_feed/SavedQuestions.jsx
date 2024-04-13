import { useState, useEffect } from 'react';
import FeedQuestionCard from './FeedQuestionCard';
import { IoIosArrowDown } from "react-icons/io";
import useAxiosFetch from '../../hooks/useAxiosFetch';
import { useNavigate } from 'react-router-dom';

const SavedQuestions = () => {
  const [url, setUrl] = useState('/posts/saved');
  const navigate = useNavigate();
  const { data, isLoading, fetchError } = useAxiosFetch(url);
  const [page, setPage] = useState(1);
  const [nextPage, setNextPage] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    setNextPage(data.nextPage ? data.nextPage : null);
    setPosts(prev => [...prev,
    ...(data.posts
      ? data.posts.map(post => ({ ...post, createdAt: new Date(post.createdAt) }))
        : [])]);
  }, [data]);

  useEffect(() => {
    setUrl(`/posts/saved?page=${page}`);
  }, [page]);

  const handleClick = (id) => {
    console.log(id);
    navigate(`/questions/${id}`);
  };
 
  const handleUploadMore = async () => {
    setPage(prev => prev + 1);
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

export default SavedQuestions
