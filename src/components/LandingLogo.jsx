const LandingLogo = ({ width = 120, height = 120, style = {} }) => {
  return (
    <img
      className="logo" 
      src="/assets/logo1.png" 
      alt="Sanad Logo" 
      style={{ 
        width, 
        height, 
        objectFit: 'contain',
        borderRadius: 60,
        boxShadow: "0 0 5px 1px #86868685",
        ...style 
      }} 
    />
  );
};

export default LandingLogo;
