import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const VerifyEmail = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:4500/api/auth/verify/${token}`)
      .then(res => {
        alert(res.data.message);
        navigate('/login');
      })
      .catch(err => {
        alert(err.response?.data?.message || 'Verification failed');
      });
  }, [token, navigate]);

  return <div className="text-center mt-20 text-xl">Verifying...</div>;
};

export default VerifyEmail;
