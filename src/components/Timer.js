const Timer = ({ timeLeft }) => (
  <p
    style={{
      fontSize: 20,
      fontWeight: 'bold',
      color: timeLeft <= 10 ? 'red' : 'black',
    }}
  >
    Còn {Math.max(timeLeft, 0)} giây
  </p>
);

export default Timer;