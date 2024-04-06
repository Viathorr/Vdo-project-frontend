import { useState, useEffect } from 'react';
import FeedQuestionCard from './FeedQuestionCard';
import { IoIosArrowDown } from "react-icons/io";

const AllQuestions = () => {
  const [page, setPage] = useState(1);
  const [nextPage, setNextPage] = useState(2);
  const [posts, setPosts] = useState([
    {
      id: 1,
      content: 'Hello, this is my first post, thanks!',
      created_at: new Date('2024-04-04T23:00:00'),
      username: 'SomeUser777',
      userImage: 'https://lh6.googleusercontent.com/proxy/Los6k3tlfanIKNGKsY04z8rbINkN1UnMp1lFpu9D_0ZrmxqTdqvOiw7oeaxWHzR9qIHlHlPvZVqMD7B6Nmmvku6KtxoeZSoYlcJnTVjuRvXG6vD8_Up-wo6g3VVEHG0G0srVGRtX2XQ',
      likes: 34,
      comments: 3
    },
    {
      id: 2,
      content: 'How can you draw up a productive and correct plan?',
      created_at: new Date('2024-01-22T05:20:00'),
      username: 'Sunshine',
      userImage: 'https://img.wattpad.com/69d530e724f5f45d0d0bffbc637a72b4172ae8f5/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f54394b425463734c5a6f535775413d3d2d3931373730373135302e313632303139373835663338376237343730333633353231363839352e6a7067?s=fit&w=720&h=720',
      likes: 21,
      comments: 1
    },
    {
      id: 3,
      content: "Hello, so I want to ask you a question, what is the best practive while organizing all your plans? Because I am always struggling with that and can't help but postpone everything.",
      created_at: new Date('2019-07-14T12:00:00'),
      username: 'Min Miyeon',
      userImage: null,
      likes: 45,
      comments: 6
    },
  ]);

  const handleUploadMore = async () => {
    try {
      setPage(prev => prev + 1);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className='questions-feed'>
      {posts.map(question => (<FeedQuestionCard question={question} />))}
      {nextPage ? 
        <div className='view-questions-btn' onClick={() => handleUploadMore()}>
          View more questions
          <IoIosArrowDown className='icon arrow-down'/>
        </div>
        : null
      }
    </div>
  )
}

export default AllQuestions
