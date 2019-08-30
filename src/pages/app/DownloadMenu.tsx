import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

interface File {
    file: {
        id: number,
        name: string,
        link: string,
    }
}

interface DownloadMenuProps {
    links: File []
}

const DownloadMenu: React.FC<DownloadMenuProps> = ({ links }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        variant="outlined"
        size="small"
        onClick={handleClick}
      >
        Downloads
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {links.map((link: File) => (
          <MenuItem
            key={link.file.link}
            onClick={handleClose}
            component="a"
            href={link.file.link}
          >
            {link.file.name}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default DownloadMenu;
