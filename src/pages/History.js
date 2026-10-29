import { formatMoney } from '../data';

const History = ({ history, onClear }) => {
  const sorted = [...history].sort((a, b) => b.prize - a.prize);

  const maxPrize = history.reduce((max, h) => (h.prize > max ? h.prize : max), 0);
  const totalPrize = history.reduce((sum, h) => sum + h.prize, 0);

  return (
    <div>
      <h2>Lịch sử các lượt chơi</h2>

      {history.length === 0 ? (
        <p>Chưa có lượt chơi nào</p>
      ) : (
        <div>
          <p>Số lượt chơi: {history.length}</p>
          <p>Tiền thưởng cao nhất: {formatMoney(maxPrize)}</p>
          <p>Tổng tiền thưởng: {formatMoney(totalPrize)}</p>

          <button onClick={onClear} style={{ marginBottom: 12 }}>
            Xóa lịch sử
          </button>

          <table border="1" cellPadding="8" style={{ borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th>Người chơi</th>
                <th>Số câu đúng</th>
                <th>Tiền thưởng</th>
                <th>Thời gian</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((h) => (
                <tr key={h.id}>
                  <td>{h.name}</td>
                  <td>{h.correctCount}</td>
                  <td>{formatMoney(h.prize)}</td>
                  <td>{h.playedAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default History;