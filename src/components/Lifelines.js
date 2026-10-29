const Lifelines = ({ used, disabled, onFifty, onAudience, onQuit }) => (
  <div style={{ display: 'flex', gap: 8, margin: '12px 0' }}>
    <button onClick={onFifty} disabled={disabled || used.fifty}>
      50:50
    </button>
    <button onClick={onAudience} disabled={disabled || used.audience}>
      Hỏi khán giả
    </button>
    <button onClick={onQuit} disabled={disabled}>
      Dừng cuộc chơi
    </button>
  </div>
);

export default Lifelines;