import React from 'react';
import PropTypes from 'prop-types';
import { useTranslator } from '@u-wave/react-translate';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CreatePlaylistIcon from '@mui/icons-material/Add';
import ActiveIcon from '@mui/icons-material/Check';

const { useCallback } = React;

function PlaylistsMenu({
  playlists,
  position,
  onClose,
  onCreatePlaylist,
  onSelect,
}) {
  const { t } = useTranslator();
  const handleSelect = useCallback((e, playlistID) => {
    onClose();
    onSelect(playlists.find((pl) => pl._id === playlistID));
  }, [onClose, onSelect, playlists]);

  return (
    <Popover
      open
      anchorPosition={{ left: position.x, top: position.y }}
      anchorReference="anchorPosition"
      onClose={onClose}
    >
      <MenuList>
        <MenuItem onClick={onCreatePlaylist}>
          <ListItemText primary={t('playlists.new')} />
          <ListItemIcon><CreatePlaylistIcon /></ListItemIcon>
        </MenuItem>
        {playlists.map((playlist) => (
          <MenuItem
            className="AddToPlaylistMenu-playlist"
            key={playlist._id}
            onClick={(event) => handleSelect(event, playlist._id)}
          >
            {!!playlist.active && (
              <ListItemIcon>
                <ActiveIcon />
              </ListItemIcon>
            )}
            <ListItemText disableTypography className="AddToPlaylistMenu-playlistName">
              <Typography noWrap variant="subtitle1">{playlist.name}</Typography>
            </ListItemText>
            <ListItemText className="AddToPlaylistMenu-smallIcon" primary={String(playlist.size ?? 0)} />
          </MenuItem>
        ))}
      </MenuList>
    </Popover>
  );
}

PlaylistsMenu.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  onCreatePlaylist: PropTypes.func.isRequired,
  playlists: PropTypes.arrayOf(PropTypes.object),
  position: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
  }),
};

export default PlaylistsMenu;
