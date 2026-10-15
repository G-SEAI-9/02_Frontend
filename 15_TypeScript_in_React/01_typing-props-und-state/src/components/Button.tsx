import type { ComponentProps } from 'react';

type ButtonProps = {
  children?: React.ReactNode;
  type: 'button' | 'reset' | 'submit';
  // onClick: () => void;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

// export default function Button({ children, type, onClick }: ButtonProps) {
//   return (
//     <button type={type} onClick={onClick}>
//       {children}
//     </button>
//   );
// }

type MyButtonProps = ComponentProps<'button'> & { username: string };

export default function Button({ children, username, ...rest }: MyButtonProps) {
  return (
    <button type={rest.type} onClick={rest.onClick} {...rest}>
      <span>{username}</span>
      {children}
    </button>
  );
}
