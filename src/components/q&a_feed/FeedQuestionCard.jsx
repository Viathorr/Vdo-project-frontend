import { BiLike } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa";
import parseTimeInfo from "./utilities/parseTime";

const FeedQuestionCard = ({ question, handleClick }) => {
  return (
    <div className="feed-question-card" onClick={() => handleClick(question.id)}>
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
