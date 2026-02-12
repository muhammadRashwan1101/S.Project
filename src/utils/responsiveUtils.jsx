export const getResponsiveValue = (mobile, tablet, desktop) => {
  const width = window.innerWidth;
  if (width <= 480) return mobile;
  if (width <= 768) return tablet || mobile;
  return desktop || tablet || mobile;
};

export const getResponsivePadding = () => {
  const width = window.innerWidth;
  if (width <= 480) return '12px';
  if (width <= 768) return '16px';
  return '20px';
};

export const getResponsiveFontSize = (base) => {
  const width = window.innerWidth;
  if (width <= 480) return base * 0.875;
  if (width <= 768) return base * 0.9375;
  return base;
};
