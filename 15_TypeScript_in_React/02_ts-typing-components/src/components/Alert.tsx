// components/Alert.tsx
// This component should receive `message` (string) and possible alert are "info", "warn","error"
// If the application is in development mode, output the message to the console as well using the appropriate method

type AlertProps = {
  message: string;
  type: 'info' | 'warn' | 'error';
};

const Alert: React.FC<AlertProps> = ({ message, type }) => {
  if (import.meta.env.DEV) {
    console.log(type, message);
  }

  return <div className={`alert ${type}`}>{message}</div>;
};

export default Alert;

// const bla : string = "test"

// const MyArrowFunc: () => void = () => console.log("yeeha")
