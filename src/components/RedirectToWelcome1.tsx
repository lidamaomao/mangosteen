import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function RedirectToWelcome1() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate('/welcome/1', { replace: true });
  }, [navigate]);

  return null;
}
