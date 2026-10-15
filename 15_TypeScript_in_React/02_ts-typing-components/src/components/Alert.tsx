// components/Alert.tsx
// This component should receive `message` (string) and possible alert are "info", "warn","error"
// If the application is in development mode, output the message to the console as well using the appropriate method
const Alert = ({ message, type }) => {
  return <div className={`alert ${type}`}>{message}</div>;
};

export default Alert;
