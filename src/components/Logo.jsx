const Logo = ({ width = 100, height = 100, style = {} }) => {
  return (
    <img
      className="logo" 
      src="/assets/logo.png" 
      alt="Sanad Logo" 
      style={{ 
        width, 
        height, 
        objectFit: 'contain',
        padding: 5,
        borderRadius: 50,
        boxShadow: "0 0 5px 1px #86868685",
        ...style 
      }} 
    />
  );
};

export default Logo;
