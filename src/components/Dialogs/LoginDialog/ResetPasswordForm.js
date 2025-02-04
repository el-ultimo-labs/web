import React from 'react';
import PropTypes from 'prop-types';
import { translate } from '@u-wave/react-translate';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import EmailIcon from '@mui/icons-material/Email';
import Form from '../../Form';
import FormGroup from '../../Form/Group';
import TextField from '../../Form/TextField';
import Button from '../../Form/Button';

const enhance = translate();

class ResetPasswordForm extends React.Component {
  static propTypes = {
    t: PropTypes.func.isRequired,
    error: PropTypes.object,
    onResetPassword: PropTypes.func.isRequired,
    onCloseDialog: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      busy: false,
      done: false,
    };
  }

  handleSubmit = (event) => {
    const { onResetPassword } = this.props;

    event.preventDefault();
    this.setState({ busy: true });
    Promise.resolve(onResetPassword({
      email: this.email.value,
    })).then(() => {
      this.setState({
        busy: false,
        done: true,
      });
    }, () => {
      this.setState({ busy: false });
    });
  };

  refEmail = (email) => {
    this.email = email;
  };

  render() {
    const { t, error, onCloseDialog } = this.props;
    const { busy, done } = this.state;

    if (done) {
      return (
        <div>
          <p>{t('login.passwordResetSent')}</p>
          <p>
            <Button className="ResetPasswordForm-submit" onClick={onCloseDialog}>
              {t('close')}
            </Button>
          </p>
        </div>
      );
    }

    return (
      <Form className="ResetPasswordForm" onSubmit={this.handleSubmit}>
        {error && (
          <FormGroup>
            <Alert severity="error">{error.message}</Alert>
          </FormGroup>
        )}
        <FormGroup>
          <label className="FormGroup-label" htmlFor="reset-email">
            {t('login.email')}
          </label>
          <TextField
            ref={this.refEmail}
            id="reset-email"
            className="ResetPasswordForm-field"
            type="email"
            autoComplete="email"
            icon={<EmailIcon htmlColor="#9f9d9e" />}
          />
        </FormGroup>

        <FormGroup>
          <Button
            className="ResetPasswordForm-submit"
            disabled={busy}
          >
            {busy ? (
              <div className="Button-loading"><CircularProgress size="100%" /></div>
            ) : t('login.requestPasswordReset')}
          </Button>
        </FormGroup>
      </Form>
    );
  }
}

export default enhance(ResetPasswordForm);
