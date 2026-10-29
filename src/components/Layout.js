import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';

const Layout = ({ loading, error }) => {
  let content = <Outlet />;
  if (loading) content = <p>Đang tải câu hỏi...</p>;
  else if (error) content = <p>Không tải được câu hỏi.</p>;

  return (
    <div>
      <NavBar />
      <main style={{ padding: 16 }}>{content}</main>
    </div>
  );
};

export default Layout;