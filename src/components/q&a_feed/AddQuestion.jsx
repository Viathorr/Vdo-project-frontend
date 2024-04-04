import { useState, useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAxiosFetch from "../../hooks/useAxiosFetch";
import { useDispatch } from 'react-redux';
import { setUser } from '../../features/auth/user';
import { IoCloseOutline } from "react-icons/io5";

const AddQuestion = ({ addQuestionClicked, setAddQuestionClicked, user }) => {
  const { data } = useAxiosFetch('/user');
  const [question, setQuestion] = useState('');
  const axiosJWT = useAxiosPrivate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setUser({ ...user, name: data.name, country: data.country, email: data.email, phoneNumber: data.phoneNum, profileImage: data.profilePicture }));
  }, [data, dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

    } catch (err) {
      console.log(err.message);
    }

    setQuestion('');
  }

  return (
    <div className={addQuestionClicked ? "add-question-container open" : "add-question-container"}>
      <div className="add-question-content">
        <div className="header">
          <IoCloseOutline className="close-btn" onClick={() => {
            setAddQuestionClicked(false);
            setQuestion('');
          }
          }/>
          <p>Add Question</p>
        </div>
        <form>
          <div className="main-content">
            <img src={user.profileImage ? user.profileImage : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'} alt="profile-image" />
            <input type="text" value={question} onChange={(e) => setQuestion(e.target.value)} placeholder="Start your question with 'What', 'How', 'Why', etc. (min 10 characters)"/>
          </div>
          <div className="btns-container">
            <button type="button" className="btn" onClick={() => {
              setAddQuestionClicked(false);
              setQuestion('');
            }
            }>Cancel</button>
            <button type="submit" className="btn" disabled={question?.length > 10 ? false : true } onClick={(e) => handleSubmit(e)}>Submit</button>
          </div>
        </form>
      </div>
    </div>
  )
};

export default AddQuestion;
