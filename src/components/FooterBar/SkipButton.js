// @ts-check
import React, {
  useCallback,
  useRef,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import { useTranslator } from '@u-wave/react-translate';
import Popover from '@mui/material/Popover';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import CircularProgress from '@mui/material/CircularProgress';
import SkipIcon from '@mui/icons-material/SkipNext';
import SkipReasonsList from './SkipReasonsList';

/** @returns {[boolean, () => void, () => void]} */
const usePopoverState = () => {
  const [popoverIsOpen, setPopoverIsOpen] = useState(false);
  const handleOpenPopover = useCallback(() => {
    setPopoverIsOpen(true);
  }, []);
  const handleClosePopover = useCallback(() => {
    setPopoverIsOpen(false);
  }, []);
  return [popoverIsOpen, handleOpenPopover, handleClosePopover];
};

const popoverPosition = {
  marginThreshold: 0,
  anchorOrigin: { horizontal: 'center', vertical: 'bottom' },
  transformOrigin: { horizontal: 'center', vertical: 'bottom' },
};

// TODO not hardcode these maybe?
const skipOthersOptions = /** @type {const} */ ({
  genre: 'genre',
  history: 'history',
  unavailable: 'unavailable',
  nsfw: 'nsfw',
  duration: 'duration',
  downvotes: 'downvotes',
  other: 'other',
});
const skipSelfOptions = /** @type {const} */ ({
  SkipNow: 'SkipNow',
  LeaveAfterThisSong: 'LeaveAfterThisSong',
});

/**
 * @typedef {typeof skipOthersOptions} SkipOthersOptions
 * @typedef {SkipOthersOptions[keyof SkipOthersOptions]} SkipOthersOptionsValue
 *
 * @typedef {typeof skipSelfOptions} SkipSelfOptions
 * @typedef {SkipSelfOptions[keyof SkipSelfOptions]} SkipSelfOptionsValue
 *
 * @typedef {SkipOthersOptionsValue | SkipSelfOptionsValue} SkipReason
 */

function SkipButton({
  userIsDJ, currentDJ, onSkip, onSkipAfterThisSong,
}) {
  const { t } = useTranslator();
  const [isSkipping, setSkipping] = useState(false);
  const anchor = useRef(null);
  const [
    skipOtherPopoverIsOpen,
    handleOpenOthersPopover,
    handleCloseOthersPopover,
  ] = usePopoverState();
  const [
    skipSelfPopoverIsOpen,
    handleOpenSelfSkipPopover,
    handleCloseSelfSkipPopover,
  ] = usePopoverState();

  const handleSkip = useCallback((/** @type {SkipReason} */ reason) => {
    setSkipping(true);
    if (reason !== skipSelfOptions.LeaveAfterThisSong) {
      Promise.resolve(onSkip(reason)).finally(() => {
        setSkipping(false);
      });
    } else {
      onSkipAfterThisSong();
    }
    handleCloseOthersPopover();
    handleCloseSelfSkipPopover();
  }, [onSkip, handleCloseOthersPopover, onSkipAfterThisSong, handleCloseSelfSkipPopover]);

  if (isSkipping) {
    return (
      <span>
        <div className="SkipButton is-loading">
          <CircularProgress className="SkipButton-loader" />
        </div>
      </span>
    );
  }

  let message = t('booth.skip.self');
  if (!userIsDJ) {
    message = t('booth.skip.other', { user: currentDJ.username });
  }

  return (
    <span>
      <Tooltip title={message}>
        <IconButton
          ref={anchor}
          className="SkipButton"
          onClick={userIsDJ ? handleOpenSelfSkipPopover : handleOpenOthersPopover}
        >
          <SkipIcon />
        </IconButton>
      </Tooltip>
      <Popover
        open={skipOtherPopoverIsOpen}
        anchorEl={anchor.current}
        onClose={handleCloseOthersPopover}
        classes={{ paper: 'SkipButton-list' }}
        {...popoverPosition}
      >
        <SkipReasonsList
          reasons={Object
            .values(skipOthersOptions)
            .map((name) => ({
              name,
              label: t(`booth.skip.reasons.${name}`),
            }))}
          onSelect={handleSkip}
        />
      </Popover>
      <Popover
        open={skipOtherPopoverIsOpen && skipSelfPopoverIsOpen}
        anchorEl={anchor.current}
        onClose={handleCloseSelfSkipPopover}
        classes={{ paper: 'SkipButton-list' }}
        {...popoverPosition}
      >
        <SkipReasonsList
          reasons={[{
            name: skipSelfOptions.SkipNow,
            label: 'Skip now',
          },
          {
            name: skipSelfOptions.LeaveAfterThisSong,
            label: 'Leave after this song',
          }]}
          onSelect={handleSkip}
        />
      </Popover>
    </span>
  );
}

SkipButton.propTypes = {
  userIsDJ: PropTypes.bool.isRequired,
  currentDJ: PropTypes.object.isRequired,
  onSkip: PropTypes.func.isRequired,
  onSkipAfterThisSong: PropTypes.func.isRequired,
};

export default React.memo(SkipButton);
