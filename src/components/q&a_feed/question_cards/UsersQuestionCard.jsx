import { useEffect, useState } from "react";
import { BiLike, BiSolidLike } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa";
import parseTimeInfo from "../utilities/parseTime";
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import { BsThreeDotsVertical } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const UsersQuestionCard = ({ question, setQuestion }) => {
  const axiosJWT = useAxiosPrivate();
  const navigate = useNavigate();
  const [questionContent, setQuestionContent] = useState(question.content);
  const [showMenu, setShowMenu] = useState(false);
  const [updateClicked, setUpdateClicked] = useState(false);

  useEffect(() => {
    setQuestionContent(question.content);
  }, [question]);
  
  const handleLike = async () => {
    try {
      if (question.liked) {
        await axiosJWT.delete(`/likes?post_id=${question.id}`);
      } else {
        await axiosJWT.post(`/likes?post_id=${question.id}`);
      }
      setQuestion(prev => ({ ...prev, liked: !prev.liked, numOfLikes: !prev.liked ? prev.numOfLikes + 1 : prev.numOfLikes - 1 }));
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDelete = async () => {
    try {
      await axiosJWT.delete(`/posts/${question.id}`);
      setShowMenu(false);
      navigate('/questions');
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleUpdate = async () => {
    setUpdateClicked(true);
    setShowMenu(false);
  };

  const handleUpdateSubmit = async () => {
    try {
      await axiosJWT.put(`/posts/${question.id}`, { content: questionContent });
      setQuestion(prev => ({ ...prev, content: questionContent }));
    } catch (err) {
      alert(err.message);
      setQuestionContent(question.content);
    }
    setUpdateClicked(false);
  }

  return (
    <div className="feed-question-card">
      <div className="question-header">
        <img src={question.userProfileImageURL ? question.userProfileImageURL : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'} alt="profile image" />
        <p className="username">{question.username}</p>
        <div className="dot"></div>
        <p className="created-label">{parseTimeInfo(question.created_at)}</p>
        <div className="post-dropdown-menu">
          <BsThreeDotsVertical className="icon" onClick={() => {
            if (updateClicked) {
              return;
            } else {
              setShowMenu(prev => !prev);
            }
          }}/>
          <div className={showMenu ? "dropdown" : "dropdown hide"}>
            <button className="btn" onClick={() => handleUpdate()}>Update</button>
            <button className="btn" onClick={() => handleDelete()}>Delete</button>
          </div>
        </div>
      </div> 
      {updateClicked
        ? <textarea className="update-content-textarea" name="update-content-input" id="update-content" cols="26" rows="3" value={questionContent} placeholder="Start your question with 'What', 'How', 'Why', etc. (min 10 characters, max 255)" onChange={(e) => setQuestionContent(e.target.value)}>
          {questionContent}
        </textarea> 
        : <div className="question-content">
            {question.content}
          </div>
        }
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
          { updateClicked
          ? <div>
            <button className="cancel-btn btn" onClick={() => {
              setUpdateClicked(false);
              setQuestionContent(question.content);
            }}>Cancel</button>
            <button className="submit-btn btn" disabled={ questionContent.length < 10 || questionContent.length > 255 || questionContent.replace(/\s/g, '').length == 0 ? true : false } onClick={() => handleUpdateSubmit()}>Submit</button>
            </div>
            : null
          }
      </div>
    </div>
  )
}

export default UsersQuestionCard
