const BUILD_TAG = "tp-4186";
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Layout from './components/Layout';
import Home from './pages/Home';
import Play from './pages/Play';
import Result from './pages/Result';
import History from './pages/History';
import QuestionBank from './pages/QuestionBank';
import QuestionDetail from './pages/QuestionDetail';
import NotFound from './pages/NotFound';
import './App.css';

const HISTORY_KEY = 'ltw_trieuphu_history';

const loadHistory = () => {
  try {
    const saved = localStorage.getItem(HISTORY_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (err) {
    return [];
  }
};

const App = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [playerName, setPlayerName] = useState('');
  const [history, setHistory] = useState(loadHistory);
  useEffect(() => {
    const controller = new AbortController();

    axios
      .get('/data/questions.json', { signal: controller.signal })
      .then((res) => {
        setQuestions(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (axios.isCancel(err)) return;
        setError(true);
        setLoading(false);
      });

    return () => controller.abort();
  }, []);
  useEffect(() => {
    try {
      localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
    } catch (err) {
    }
  }, [history]);

  const addRecord = ({ name, prize, correctCount }) => {
    const record = {
      id: Date.now(),
      name,
      prize,
      correctCount,
      playedAt: new Date().toLocaleString('vi-VN'),
    };
    setHistory((prev) => [...prev, record]);
  };

  const clearHistory = () => setHistory([]);

  return (
    <Routes>
      <Route path="/" element={<Layout loading={loading} error={error} />}>
        <Route
          index
          element={
            <Home
              playerName={playerName}
              setPlayerName={setPlayerName}
              history={history}
            />
          }
        />
        <Route
          path="play"
          element={
            <Play
              questions={questions}
              playerName={playerName}
              onFinish={addRecord}
            />
          }
        />
        <Route path="result" element={<Result />} />
        <Route
          path="history"
          element={<History history={history} onClear={clearHistory} />}
        />
        <Route path="questions" element={<QuestionBank questions={questions} />} />
        <Route path="questions/:id" element={<QuestionDetail questions={questions} />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default App;