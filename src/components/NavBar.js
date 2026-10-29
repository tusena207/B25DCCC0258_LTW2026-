import { NavLink } from 'react-router-dom';

const linkStyle = ({ isActive }) => ({
  color: isActive ? 'red' : 'black',
  fontWeight: isActive ? 'bold' : 'normal',
  textDecoration: 'none',
  marginRight: 20,
});

const NavBar = () => (
  <nav style={{ padding: 16, borderBottom: '1px solid #ccc' }}>
    <NavLink to="/" end style={linkStyle}>Trang chủ</NavLink>
    <NavLink to="/questions" style={linkStyle}>Ngân hàng câu hỏi</NavLink>
    <NavLink to="/history" style={linkStyle}>Lịch sử</NavLink>
  </nav>
);

export default NavBar;