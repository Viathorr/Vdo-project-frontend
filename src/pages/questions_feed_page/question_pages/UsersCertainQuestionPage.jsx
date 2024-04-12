import { useParams } from 'react-router-dom';
import { useState } from 'react';
import CommentsSection from '../../../components/q&a_feed/comments/CommentsSection';
import UsersQuestionCard from '../../../components/q&a_feed/question_cards/UsersQuestionCard';

const UsersCertainQuestionPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState({
    id: 1,
    content: 'Hello, this is my first post, thanks!',
    created_at: new Date('2024-04-04T23:00:00'),
    username: 'Viathorr',
    userProfileImageURL: 'https://firebasestorage.googleapis.com/v0/b/time-management-app-b9519.appspot.com/o/profile-images%2Fmy-image-file_dateVal_1712321170552_ab67706c0000da84a402967cf5837c9ed53ed278.jpeg?alt=media&token=743e21d9-de2c-48c6-bc02-55c3e3529634',
    numOfLikes: 44,
    comments: 3,
    liked: false
  });

  return (
    <div className='question-container'>
      <UsersQuestionCard question={post} setQuestion={setPost} />
      {/* Add comments section separately, header with label 'Comments (3)' (the amount of comments in brackets) and below comments with the same idea of button 'view more comments' */}
      <CommentsSection id={id} post={post} setPost={setPost} />
    </div>
  )
}

export default UsersCertainQuestionPage
