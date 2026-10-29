import { MILESTONES, PRIZES } from './data';

// reason: "win" | "wrong" | "timeout" | "stop"
export const calcPrize = (correctCount, reason) => {
  if (reason === 'win' || reason === 'stop') {
    // thắng hoặc dừng cuộc chơi: nhận tiền của câu vừa trả lời đúng gần nhất
    return correctCount === 0 ? 0 : PRIZES[correctCount - 1];
  }
  // sai hoặc hết giờ: chỉ nhận tiền của mốc cao nhất đã vượt qua
  const passed = MILESTONES.filter((m) => m <= correctCount);
  if (passed.length === 0) return 0;
  return PRIZES[Math.max(...passed) - 1];
};

// Tỉ lệ % khán giả: đáp án đúng 40-70%, phần còn lại chia ngẫu nhiên cho đáp án sai còn hiển thị
export const makeAudience = (answer, hidden) => {
  const result = [0, 0, 0, 0];
  const correct = 40 + Math.floor(Math.random() * 31);
  let rest = 100 - correct;
  result[answer] = correct;
  const wrongs = [0, 1, 2, 3].filter((i) => i !== answer && !hidden.includes(i));
  wrongs.forEach((i, k) => {
    if (k === wrongs.length - 1) {
      result[i] = rest; // đáp án cuối nhận phần còn lại để tổng đúng 100%
    } else {
      const v = Math.floor(Math.random() * (rest + 1));
      result[i] = v;
      rest -= v;
    }
  });
  return result;
};