import { Outlet } from 'react-router';

export default function SecondLayout() {
  return (
    <div>
      <h1>Second layout</h1>

      <Outlet />
    </div>
  );
}
