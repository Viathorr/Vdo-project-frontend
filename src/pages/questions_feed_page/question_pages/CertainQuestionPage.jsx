import { useParams } from 'react-router-dom';
import QuestionCard from '../../../components/q&a_feed/question_cards/QuestionCard';
import { useState } from 'react';
import CommentsSection from '../../../components/q&a_feed/comments/CommentsSection';

const CertainQuestionPage = () => {
  const [post, setPost] = useState({
    id: 1,
    content: 'Hello, this is my first post, thanks!',
    created_at: new Date('2024-04-04T23:00:00'),
    username: 'SomeUser777',
    userProfileImageURL: 'https://lh6.googleusercontent.com/proxy/Los6k3tlfanIKNGKsY04z8rbINkN1UnMp1lFpu9D_0ZrmxqTdqvOiw7oeaxWHzR9qIHlHlPvZVqMD7B6Nmmvku6KtxoeZSoYlcJnTVjuRvXG6vD8_Up-wo6g3VVEHG0G0srVGRtX2XQ',
    numOfLikes: 34,
    comments: 3,
    liked: true,
    saved: true
  });
  const { id } = useParams();
  return (
    <div className='question-container'>
      <QuestionCard question={post} setQuestion={setPost} />
      {/* Add comments section separately, header with label 'Comments (3)' (the amount of comments in brackets) and below comments with the same idea of button 'view more comments' */}
      <CommentsSection id={id} post={post} setPost={setPost} />
    </div>
  )
};

export default CertainQuestionPage;
