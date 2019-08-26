import React from 'react';
import MenuContainer from './menu/MenuContainer';

type MenuModes = 'side' | 'bottom';
interface MenuProps {
  menuMode: MenuModes;
}

const Menu: React.FC<MenuProps> = ({ menuMode }) => (
  <MenuContainer
    header={<div>some title stuff</div>}
    body={<div>some body stuff</div>}
    mode={menuMode}
  />
);

export default Menu;
