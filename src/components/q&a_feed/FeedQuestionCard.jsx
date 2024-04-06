import { BiLike, BiSolidLike } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const FeedQuestionCard = ({ question }) => {
  const navigate = useNavigate();
  const parseTimeInfo = () => {
    const now = new Date();
    const timeDiff = now.getTime() - question.created_at.getTime();
    
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    if (days >= 30) {
      const months = Math.floor(days / 30);
      if (months >= 12) {
        const years = Math.floor(months / 12);
        return `${years} year${years > 1 ? 's' : ''} ago`;
      }
      return `${months} month${months > 1 ? 's' : ''} ago`;
    } else if (days >= 1) {
      return `${days} day${days > 1 ? 's' : ''} ago`;
    }
    
    const hours = Math.floor(timeDiff / (1000 * 60 * 60));
    if (hours >= 1) {
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    }
    
    const minutes = Math.floor(timeDiff / (1000 * 60));
    return `${minutes} minute${minutes > 1 || !minutes ? 's' : ''} ago`;
  };

  const handlClick = () => {
    navigate(`/questions/${question.id}`);
  }

  return (
    <div className="feed-question-card" onClick={() => handlClick()}>
      <div className="question-header">
        <img src={question.userImage ? question.userImage : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'} alt="profile image" />
        <p className="username">{question.username}</p>
        <div className="dot"></div>
        <p className="created-label">{parseTimeInfo()}</p>
      </div>
      <div className="question-content">
          {(question.content).length <= 100
          ? question.content
          : `${(question.content).slice(0, 100)}...`}
      </div>
      <div className="question-footer">
        <div>
          <BiLike className="icon like" />
          <p>{question.likes}</p>
        </div>
        <div>
          <FaRegComment className="icon comment" />
          <p>{question.comments}</p>
        </div>
      </div>
    </div>
  )
};

export default FeedQuestionCard;
