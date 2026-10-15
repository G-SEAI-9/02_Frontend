// components/Status.tsx
// This component should receive a `status` prop with one of: "loading", "success" , "error"

import type { ComponentStatus } from '../types';

// type StatusProps = {
//   status: 'loading' | 'success' | 'error';
// };

export type StatusProps = Pick<ComponentStatus, 'status'>;

const Status = ({ status }: StatusProps) => {
  return <p>Status: {status}</p>;
};

export default Status;
