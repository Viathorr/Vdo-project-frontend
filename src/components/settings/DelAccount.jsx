import { useNavigate } from "react-router-dom";
import useDelete from "../../hooks/useDelete";

const DelAccount = ({ deleteClicked, setDeleteClicked }) => {
  const deleteAcc = useDelete();
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      const res = await deleteAcc();
      console.log(res);
      setDeleteClicked(false);
      navigate('/');
    } catch (err) {
      console.log(err.response.data.message);
    }
  };

  return (
    <div className={ deleteClicked ? 'delete-window open' : 'delete-window' }>
      <div className='delete-window-content'>
        <p>You want to delete your account.</p>
        <p>Are you sure?</p>
          <div className='buttons-container'>
            <button className='btn no-btn' onClick={() => setDeleteClicked(false)}>No, Just Kidding</button>
            <button className='btn yes-btn' onClick={() => handleDelete()}>Yes, Delete My Account</button>
          </div>
      </div>
    </div>
  )
}

export default DelAccount;
