import { BsThreeDotsVertical } from "react-icons/bs";
import parseTimeInfo from "./utilities/parseTime";
import { useState } from "react";

const CommentCard = ({ comment, setComments, handleDelete }) => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="comment-card">
      <div className="comment-header">
        <p className="username">{comment.username}</p>
        <div className="dot"></div>
        <p className="created-label">{parseTimeInfo(comment.created_at)}</p>
        {comment.userIsCreator ? <>
          <BsThreeDotsVertical className="icon" onClick={() => setShowMenu(prev => !prev)}/>
          <div className={showMenu ? "dropdown" : "dropdown hide"}>
            <button className="btn" onClick={() => handleDelete(comment.id)}>Delete</button>
          </div>
        </> : null}
        
      </div>
      <div className="comment-content">
          { comment.content }
      </div>
    </div>
  )
};

export default CommentCard;
