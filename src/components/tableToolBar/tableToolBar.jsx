import { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Reload from '@material-ui/icons/Replay';
import Add from '@material-ui/icons/AddBox';
import Import from '@material-ui/icons/UnarchiveOutlined';
import ClickableIcon from './clickableIcon.jsx';
import SearchField from './searchField.jsx';
import DownloadMenu from './downloadMenu.jsx';
import UploadDialog from './uploadDialog.jsx';
export default function TableToolBar(props) {
  const {
    onReloadClick,
    handleAddClicked,
    handleBulkImportClicked,
    handleDownloadsIconClick,
    modelName,
  } = props;

  const [dialogOpen, setDialogOpen] = useState(false);
  const [downloadMenu, setDownloadMenu] = useState(false);

  const handleImportClicked = () => {
    setDialogOpen(true);
  };

  const handleDone = () => {
    setDialogOpen(false);
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <Grid container justify="flex-end" alignItems="center" wrap="wrap">
          <ClickableIcon tooltip="Reload list" handleOnClick={onReloadClick}>
            <Reload color="inherit" fontSize="small" />
          </ClickableIcon>

          <SearchField />

          <ClickableIcon
            tooltip="Add new no_assoc"
            handleOnClick={handleAddClicked}
          >
            <Add color="primary" />
          </ClickableIcon>

          <ClickableIcon
            tooltip="Import from csv"
            handleOnClick={handleImportClicked}
          >
            <Import color="primary" />
          </ClickableIcon>

          {dialogOpen && (
            <UploadDialog modelName={modelName} handleDone={handleDone} />
          )}

          <DownloadMenu modelName="user"></DownloadMenu>
        </Grid>
      </Grid>
    </Grid>
  );
}
