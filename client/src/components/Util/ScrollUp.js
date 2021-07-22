import { useWindowScroll } from 'react-use';
import { useState, useEffect } from 'react';

const ScrollUp = () => {
  const { y: pageYOffset } = useWindowScroll();

  const [visible, setVisibility] = useState(false);

  useEffect(() => {
    pageYOffset > 400 ? setVisibility(true) : setVisibility(false);
  }, [pageYOffset]);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  

  if (!visible) {
    return false;
  }

  return (
    <div className="audit-scrollToTop  audit-scroll" onClick={scrollToTop}>
      <i className="audit-icon-up fa fa-chevron-up"></i>
    </div>
  );
};

export default ScrollUp;
