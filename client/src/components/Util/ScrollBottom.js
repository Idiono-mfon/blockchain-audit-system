const ScrollBottom = () => {
  const scrollToBtm = () =>
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
  return (
    <div className="audit-scrollToBottom audit-scroll" onClick={scrollToBtm}>
      <i className="audit-icon-down fa fa-chevron-down"></i>
    </div>
  );
};

export default ScrollBottom;
