const COLORS = {
  default: '#fff',
  locked: 'orange',
  correct: 'limegreen',
  wrong: 'red',
};

const AnswerButton = ({ letter, text, state, disabled, onClick }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    style={{
      padding: 12,
      fontSize: 16,
      textAlign: 'left',
      color: '#000',
      background: COLORS[state],
      border: '1px solid #888',
      borderRadius: 6,
      cursor: disabled ? 'not-allowed' : 'pointer',
    }}
  >
    {letter}. {text}
  </button>
);

export default AnswerButton;