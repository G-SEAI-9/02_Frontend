// components/Avatar.tsx
// This component should receive `url` (string) and `altText` (string)
const Avatar = ({ url, altText }) => {
  return <img src={url} alt={altText} />;
};

export default Avatar;
