import { useParams, useNavigate } from 'react-router-dom';
import { LEVELS, LETTERS } from '../data';

const QuestionDetail = ({ questions }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const q = questions.find((item) => item.id === Number(id));

  if (!q) {
    return (
      <div>
        <p>Không tìm thấy câu hỏi</p>
        <button onClick={() => navigate(-1)}>Quay lại</button>
      </div>
    );
  }

  return (
    <div>
      <h2>
        Câu hỏi số {q.id} ({LEVELS[q.level]})
      </h2>
      <p>{q.question}</p>

      {q.options.map((option, index) => {
        const isCorrect = index === q.answer;
        return (
          <div
            key={index}
            style={{
              padding: 8,
              margin: '4px 0',
              background: isCorrect ? 'lightgreen' : 'transparent',
            }}
          >
            {LETTERS[index]}. {option}
            {isCorrect && ' (Đáp án đúng)'}
          </div>
        );
      })}

      <button onClick={() => navigate(-1)}>Quay lại</button>
    </div>
  );
};

export default QuestionDetail;