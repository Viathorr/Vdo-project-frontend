import { useState } from "react";
import NavigationSideBar from "../../components/q&a_feed/NavigationSideBar";
import AllQuestions from "../../components/q&a_feed/AllQuestions";
import UsersQuestions from "../../components/q&a_feed/UsersQuestions";
import SavedQuestions from "../../components/q&a_feed/SavedQuestions";
import './Feed.css';

const QuestionsFeed = () => {
  const [activeLink, setActiveLink] = useState('/all_questions');

  return (
    <div className='feed-container'>
      <NavigationSideBar activeLink={activeLink} setActiveLink={setActiveLink} />
      <div className="questions-container">
        { activeLink === '/all_questions' ? <AllQuestions />
          : activeLink === '/my_questions' ? <UsersQuestions /> 
            : <SavedQuestions />
        }
      </div>
    </div>
  )
}

export default QuestionsFeed
