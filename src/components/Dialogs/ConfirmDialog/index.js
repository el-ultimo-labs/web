import cx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import CircularProgress from '@mui/material/CircularProgress';
import Form from '../../Form';
import FormGroup from '../../Form/Group';
import Button from '../../Form/Button';

export default class ConfirmDialog extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    confirmLabel: PropTypes.string,
    cancelLabel: PropTypes.string,

    onConfirm: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
  };

  static defaultProps = {
    cancelLabel: 'Cancel',
    confirmLabel: 'OK',
  };

  constructor(props) {
    super(props);

    this.state = {
      busy: false,
    };
  }

  handleConfirm = (event) => {
    const { onConfirm } = this.props;

    event.preventDefault();
    const promise = onConfirm();
    if (promise && promise.finally) {
      this.setState({ busy: true });
      promise.finally(() => {
        this.setState({ busy: false });
      });
    }
  };

  handleClose = (event) => {
    const { onCancel } = this.props;

    if (event && event.preventDefault) {
      event.preventDefault();
    }
    onCancel();
  };

  render() {
    const {
      children,
      cancelLabel,
      confirmLabel,
      className,
    } = this.props;
    const { busy } = this.state;

    const handleSubmit = (event) => {
      event.preventDefault();
    };

    return (
      <Dialog
        className={cx('Dialog', className)}
        onClose={this.handleClose}
        open
      >
        <DialogContent className="Dialog-body">
          <Form onSubmit={handleSubmit}>
            {children}
            <FormGroup className="ConfirmDialog-buttons FormGroup--noSpacing">
              <div className="ConfirmDialog-button">
                <Button disabled={busy} onClick={this.handleClose}>
                  {cancelLabel}
                </Button>
              </div>
              <div className="ConfirmDialog-spacer" />
              <div className="ConfirmDialog-button">
                <Button disabled={busy} onClick={this.handleConfirm}>
                  {busy ? <div className="Button-loading"><CircularProgress size="100%" /></div> : confirmLabel}
                </Button>
              </div>
            </FormGroup>
          </Form>
        </DialogContent>
      </Dialog>
    );
  }
}
