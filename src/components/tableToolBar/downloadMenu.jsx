import { useState } from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Export from '@material-ui/icons/SaveAlt';
import ButtonBase from '@material-ui/core/ButtonBase';

import ClickableIcon from './clickableIcon.jsx';
export default function DownloadMenu() {
  const [downloadAnchorEl, setDownloadAnchorEl] = useState(null);

  const handleClick = (event) => {
    setDownloadAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setDownloadAnchorEl(null);
  };

  const exportServerUrl = 'http://localhost:3000/export';
  return (
    <>
      <ClickableIcon tooltip="Download options" handleOnClick={handleClick}>
        <Export color="primary" />
      </ClickableIcon>
      <Menu
        anchorEl={downloadAnchorEl}
        keepMounted
        open={Boolean(downloadAnchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          Download table template to CSV file
        </MenuItem>
        <MenuItem onClick={handleClose}>Export data to CSV file</MenuItem>
        <MenuItem>
          <form action={exportServerUrl}>
            <input type="hidden" name="model" value="user" />
            <ButtonBase color="default" type="submit" onClick={handleClose}>
              Export data to CSV file 2
            </ButtonBase>
          </form>
        </MenuItem>
      </Menu>
    </>
  );
}
