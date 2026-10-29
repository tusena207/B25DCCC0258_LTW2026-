import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import QuestionCard from '../components/QuestionCard';
import Timer from '../components/Timer';
import MoneyLadder from '../components/MoneyLadder';
import Lifelines from '../components/Lifelines';
import AudienceChart from '../components/AudienceChart';
import { LETTERS, TIME_PER_QUESTION } from '../data';
import { calcPrize, makeAudience } from '../utils';

const DEFAULT_TITLE = 'Ai là triệu phú';

const Game = ({ questions, playerName, addHistory }) => {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [status, setStatus] = useState('answering');
  const [selected, setSelected] = useState(null);
  const [timeLeft, setTimeLeft] = useState(TIME_PER_QUESTION);
  const [used, setUsed] = useState({ fifty: false, audience: false, stop: false });
  const [hidden, setHidden] = useState([]);
  const [audience, setAudience] = useState(null);

  const total = questions.length;
  const question = questions[index];

  const finish = (correctCount, reason) => {
    setStatus('ended');
    const prize = calcPrize(correctCount, reason);
    addHistory({
      id: Date.now(),
      name: playerName,
      prize,
      correctCount,
      playedAt: new Date().toLocaleString('vi-VN'),
    });
    navigate('/result', {
      replace: true,
      state: { name: playerName, prize, correctCount, reason },
    });
  };

  const handleChoose = (i) => {
    if (status !== 'answering' || hidden.includes(i)) return;
    setSelected(i);
    setStatus('locked');
  };

  useEffect(() => {
    if (status !== 'answering') return;
    const id = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(id);
  }, [status, index]);

  useEffect(() => {
    if (status === 'answering' && timeLeft <= 0) finish(index, 'timeout');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft, status]);

  useEffect(() => {
    if (status === 'locked') {
      const id = setTimeout(() => setStatus('revealed'), 1000);
      return () => clearTimeout(id);
    }
    if (status === 'revealed') {
      const id = setTimeout(() => {
        if (selected !== question.answer) {
          finish(index, 'wrong');
        } else if (index + 1 === total) {
          finish(total, 'win');
        } else {
          setIndex((i) => i + 1);
          setStatus('answering');
          setSelected(null);
          setTimeLeft(TIME_PER_QUESTION);
          setHidden([]);
          setAudience(null);
        }
      }, 2000);
      return () => clearTimeout(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      const i = LETTERS.indexOf(e.key.toUpperCase());
      if (i !== -1) handleChoose(i);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, hidden, index]);

  useEffect(() => {
    document.title = `Câu ${index + 1}/${total} - ${playerName}`;
    return () => {
      document.title = DEFAULT_TITLE;
    };
  }, [index, total, playerName]);

  const handleFifty = () => {
    const wrongs = [0, 1, 2, 3].filter((i) => i !== question.answer);
    const toHide = [...wrongs].sort(() => Math.random() - 0.5).slice(0, 2);
    setHidden(toHide);
    setUsed((u) => ({ ...u, fifty: true }));
    if (audience) setAudience(makeAudience(question.answer, toHide));
  };

  const handleAudience = () => {
    setAudience(makeAudience(question.answer, hidden));
    setUsed((u) => ({ ...u, audience: true }));
  };

  const handleStop = () => {
    setUsed((u) => ({ ...u, stop: true }));
    finish(index, 'stop');
  };

  const getState = (i) => {
    if (status === 'locked') return i === selected ? 'selected' : '';
    if (status === 'revealed') {
      if (i === question.answer) return 'correct';
      if (i === selected) return 'wrong';
    }
    return '';
  };

  return (
    <div className="play">
      <div>
        <Timer timeLeft={timeLeft} />
        <QuestionCard
          number={index + 1}
          total={total}
          question={question}
          hidden={hidden}
          disabled={status !== 'answering'}
          getState={getState}
          onChoose={handleChoose}
        />
        <Lifelines
          used={used}
          disabled={status !== 'answering'}
          onFifty={handleFifty}
          onAudience={handleAudience}
          onStop={handleStop}
        />
        {audience && <AudienceChart percents={audience} />}
      </div>
      <MoneyLadder current={index + 1} />
    </div>
  );
};

const Play = ({ questions, loading, error, playerName, addHistory }) => {
  if (playerName.trim() === '') return <Navigate to="/" replace />;
  if (loading) return <p>Đang tải câu hỏi...</p>;
  if (error || questions.length === 0) return <p>Không tải được câu hỏi</p>;
  return <Game questions={questions} playerName={playerName} addHistory={addHistory} />;
};

export default Play;