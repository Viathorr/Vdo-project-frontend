import { useParams } from 'react-router-dom';

const CertainQuestionPage = () => {
  const { id } = useParams();
  return (
    <div style={{ margin: '10rem'}}>
      {id}
    </div>
  )
};

export default CertainQuestionPage;
