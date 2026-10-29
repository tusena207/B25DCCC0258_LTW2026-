import { useState } from 'react';
import { Link } from 'react-router-dom';
import { LEVELS } from '../data';

const QuestionBank = ({ questions }) => {
  const [level, setLevel] = useState('all');
  const [query, setQuery] = useState('');

  const handleQueryShift = (e) => setQuery(e.target.value);

  const filtered = questions
    .filter((q) => level === 'all' || q.level === Number(level))
    .filter((q) => q.question.toLowerCase().includes(query.toLowerCase()));

  return (
    <div>
      <h2>Ngân hàng câu hỏi</h2>

      <div style={{ marginBottom: 12 }}>
        <label>
          Mức độ:{' '}
          <select value={level} onChange={(e) => setLevel(e.target.value)}>
            <option value="all">Tất cả</option>
            <option value="1">Dễ</option>
            <option value="2">Trung bình</option>
            <option value="3">Khó</option>
          </select>
        </label>{' '}
        <label>
          Tìm kiếm:{' '}
          <input
            type="text"
            value={query}
            onChange={handleQueryShift}
            placeholder="Nhập nội dung câu hỏi..."
          />
        </label>
      </div>

      <p>Có {filtered.length} câu hỏi</p>

      <table border="1" cellPadding="8" style={{ borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>STT</th>
            <th>Mức độ</th>
            <th>Câu hỏi</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((q, index) => (
            <tr key={q.id}>
              <td>{index + 1}</td>
              <td>{LEVELS[q.level]}</td>
              <td>
                <Link to={`/questions/${q.id}`}>{q.question}</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default QuestionBank;