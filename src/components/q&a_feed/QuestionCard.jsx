import { FaRegBookmark, FaBookmark } from "react-icons/fa6";
import { BiLike, BiSolidLike } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa";
import parseTimeInfo from "./utilities/parseTime";
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import CommentsSection from "./CommentsSection";

const QuestionCard = ({ question, setQuestion }) => {
  const axiosJWT = useAxiosPrivate();
  const handleLike = async () => {
    setQuestion(prev => ({ ...prev, liked: !prev.liked, numOfLikes: !prev.liked ? prev.numOfLikes + 1 : prev.numOfLikes - 1 }));
  };

  const handleSave = async () => {
    setQuestion(prev => ({ ...prev, saved: !prev.saved }));
  };

  return (
    <div className="feed-question-card">
      <div className="question-header">
        <img src={question.userProfileImageURL ? question.userProfileImageURL : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'} alt="profile image" />
        <p className="username">{question.username}</p>
        <div className="dot"></div>
        <p className="created-label">{parseTimeInfo(question.created_at)}</p>
      </div>
      <div className="question-content">
          {(question.content).length <= 100
          ? question.content
          : `${(question.content).slice(0, 100)}...`}
      </div>
      <div className="question-footer">
        <div>
          <div className="icon-container">
            { question.liked ? <BiSolidLike className="icon like" onClick={() => handleLike()}/> : <BiLike className="icon like" onClick={() => handleLike()}/> }
            <p>{question.numOfLikes}</p>
          </div>
          <div className="icon-container">
            <FaRegComment className="icon comment" />
            <p>{question.comments}</p>
          </div>
        </div>
        <div className="bookmark">
          {
             question.saved ? <FaBookmark className="icon bookmark" onClick={() => handleSave()}/> : <FaRegBookmark className="icon bookmark" onClick={() => handleSave()} />
          }
        </div>
      </div>
    </div>
  )
};

export default QuestionCard;
