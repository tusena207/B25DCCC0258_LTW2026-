import { PRIZES, MILESTONES, formatMoney } from '../data';

const MoneyLadder = ({ currentIndex }) => (
  <div style={{ display: 'flex', flexDirection: 'column-reverse', minWidth: 220 }}>
    {PRIZES.map((prize, i) => {
      const number = i + 1;
      return (
        <div
          key={number}
          style={{
            padding: '4px 8px',
            background: i === currentIndex ? 'gold' : 'transparent',
            fontWeight: MILESTONES.includes(number) ? 'bold' : 'normal',
          }}
        >
          {number}. {formatMoney(prize)}
        </div>
      );
    })}
  </div>
);

export default MoneyLadder;