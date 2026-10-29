import AnswerButton from './AnswerButton';
import { LETTERS } from '../data';

const QuestionCard = ({ number, total, question, status, selected, hidden, onSelect }) => {
  const getState = (i) => {
    if (status === 'locked' && i === selected) return 'locked';
    if (status === 'revealed') {
      if (i === question.answer) return 'correct';
      if (i === selected) return 'wrong';
    }
    return 'default';
  };

  return (
    <div>
      <h3>
        Câu {number}/{total}
      </h3>
      <p style={{ fontSize: 18 }}>{question.question}</p>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 12,
        }}
      >
        {question.options.map((option, i) =>
          hidden.includes(i) ? (
            <div key={i} />
          ) : (
            <AnswerButton
              key={i}
              letter={LETTERS[i]}
              text={option}
              state={getState(i)}
              disabled={status !== 'answering'}
              onClick={() => onSelect(i)}
            />
          )
        )}
      </div>
    </div>
  );
};

export default QuestionCard;