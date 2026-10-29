import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import { formatMoney } from '../data';

const TITLES = {
  win: 'Chúc mừng! Bạn đã trở thành triệu phú',
  wrong: 'Rất tiếc, bạn đã trả lời sai',
  timeout: 'Hết giờ!',
  quit: 'Bạn đã dừng cuộc chơi',
};

const Result = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  // Mở thẳng /result (không có state) thì về trang chủ
  if (!state) return <Navigate to="/" replace />;

  const { name, prize, correctCount, reason } = state;

  return (
    <div>
      <h2>{TITLES[reason]}</h2>
      <p>Người chơi: {name}</p>
      <p>Số câu trả lời đúng: {correctCount}</p>
      <p>Tiền thưởng: {formatMoney(prize)}</p>
      <button onClick={() => navigate('/play')}>Chơi lại</button>{' '}
      <button onClick={() => navigate('/')}>Về trang chủ</button>
    </div>
  );
};

export default Result;