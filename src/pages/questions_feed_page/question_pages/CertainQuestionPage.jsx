import { useParams } from 'react-router-dom';
import QuestionCard from '../../../components/q&a_feed/question_cards/QuestionCard';
import { useState, useEffect } from 'react';
import useAxiosFetch from '../../../hooks/useAxiosFetch';
import CommentsSection from '../../../components/q&a_feed/comments/CommentsSection';
 
const CertainQuestionPage = () => {
  const { id } = useParams();
  const API_URL = `/posts/${id}`;
  const { data, isLoading, fetchError } = useAxiosFetch(API_URL);
  const [post, setPost] = useState({});

  useEffect(() => {
    setPost({...data, created_at: new Date(data.created_at)});
  }, [data]);

  return (
    <div className='question-container'>
      { isLoading && <p>Loading...</p> }
      { !isLoading && fetchError && <p style={{color: 'red'}}>{fetchError}</p> }
      { !isLoading && !fetchError && post &&
        <>
          <QuestionCard question={post} setQuestion={setPost} />
          <CommentsSection id={id} post={post} setPost={setPost} />  
        </>
      }
    </div>
  )
};

export default CertainQuestionPage;
