import { LETTERS } from '../data';

const AudienceChart = ({ percents }) => (
  <div style={{ margin: '12px 0', maxWidth: 400 }}>
    {percents.map((p, i) => (
      <div
        key={i}
        style={{
          width: `${p}%`,
          background: 'skyblue',
          color: '#000',
          margin: '4px 0',
          padding: '2px 0',
          whiteSpace: 'nowrap',
        }}
      >
        {LETTERS[i]}: {p}%
      </div>
    ))}
  </div>
);

export default AudienceChart;