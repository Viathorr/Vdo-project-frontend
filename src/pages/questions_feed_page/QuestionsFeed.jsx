import { useState } from "react";
import NavigationSideBar from "../../components/q&a_feed/NavigationSideBar";
import AllQuestions from "../../components/q&a_feed/AllQuestions";
import UsersQuestions from "../../components/q&a_feed/UsersQuestions";
import SavedQuestions from "../../components/q&a_feed/SavedQuestions";
import { useSelector } from 'react-redux';
import './Feed.css';
import AddQuestion from "../../components/q&a_feed/AddQuestion";

const QuestionsFeed = () => {
  const user = useSelector(state => state.user.value);
  const [activeLink, setActiveLink] = useState('/all_questions');
  const [addQuestionClicked, setAddQuestionClicked] = useState(false);

  return (
    <div className='feed-container'>
      <NavigationSideBar activeLink={activeLink} setActiveLink={setActiveLink} />
      <div className="questions-feed-container">
        <div className="main-ask-container">
          <img src={user.profileImage ? user.profileImage : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'} alt="profile-image" />
          <div className="input-alternative" onClick={() => setAddQuestionClicked(true)}>
            <div>What do you want to ask or share?</div>
          </div>
        </div>
        <div className="questions-container">
          { activeLink === '/all_questions' ? <AllQuestions />
            : activeLink === '/my_questions' ? <UsersQuestions /> 
              : <SavedQuestions />
          }
        </div>
      </div>
      <AddQuestion addQuestionClicked={addQuestionClicked} setAddQuestionClicked={setAddQuestionClicked} user={user}/>  
    </div>
  )
}

export default QuestionsFeed
