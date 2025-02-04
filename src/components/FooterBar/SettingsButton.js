import React from 'react';
import PropTypes from 'prop-types';
import { useTranslator } from '@u-wave/react-translate';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import SettingsIcon from '@mui/icons-material/SettingsRounded';

function SettingsButton({ onClick }) {
  const { t } = useTranslator();

  return (
    <span>
      <Tooltip title={t('settings.title')}>
        <IconButton className="SettingsButton" onClick={onClick}>
          <SettingsIcon />
        </IconButton>
      </Tooltip>
    </span>
  );
}

SettingsButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default React.memo(SettingsButton);
