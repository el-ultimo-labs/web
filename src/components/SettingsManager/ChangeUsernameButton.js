import React from 'react';
import PropTypes from 'prop-types';
import { translate } from '@u-wave/react-translate';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import PromptDialog from '../Dialogs/PromptDialog';
import DialogCloseAnimation from '../DialogCloseAnimation';

const enhance = translate();

class ChangeUsernameButton extends React.Component {
  static propTypes = {
    t: PropTypes.func.isRequired,
    onChangeUsername: PropTypes.func.isRequired,
    initialUsername: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      changingUsername: false,
    };
  }

  handleOpen = () => {
    this.setState({ changingUsername: true });
  };

  handleClose = () => {
    this.closeDialog();
  };

  handleSubmit = (name) => {
    const { initialUsername, onChangeUsername } = this.props;

    if (name === initialUsername) {
      this.closeDialog();
      return null;
    }
    return onChangeUsername(name)
      .then(this.closeDialog.bind(this));
  };

  closeDialog() {
    this.setState({ changingUsername: false });
  }

  render() {
    const { t, initialUsername } = this.props;
    const { changingUsername } = this.state;

    return (
      <>
        <IconButton className="ChangeUsernameButton" onClick={this.handleOpen}>
          <EditIcon className="ChangeUsernameButton-icon" />
        </IconButton>
        <DialogCloseAnimation delay={450}>
          {changingUsername ? (
            <PromptDialog
              title={t('settings.profile.username.change')}
              submitLabel={t('settings.profile.username.save')}
              icon={<EditIcon htmlColor="#777" />}
              defaultValue={initialUsername}
              onSubmit={this.handleSubmit}
              onCancel={this.handleClose}
            />
          ) : null}
        </DialogCloseAnimation>
      </>
    );
  }
}

export default enhance(ChangeUsernameButton);
