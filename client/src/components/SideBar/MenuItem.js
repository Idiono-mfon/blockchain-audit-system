import { useHistory } from 'react-router-dom';

const MenuItem = ({ svgIcon, name, path, isActive, triggerMenu }) => {
  const history = useHistory();
  return (
    <div
      className={isActive ? 'menu-items menu-items-active' : 'menu-items'}
      onClick={() => {
        // setIsActive((prev) => !prev);
        triggerMenu();
        history.push(path);
      }}
    >
      <div className="menu-item">
        <img width={20} height={20} src={'/assets/svg/' + svgIcon} alt="" />
        &nbsp; {name}
      </div>
    </div>
  );
};

export default MenuItem;

// function MenuItem({ svgIcon, name, path, isActive = false }) {}
