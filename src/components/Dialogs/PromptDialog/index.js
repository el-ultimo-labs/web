import cx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import CircularProgress from '@mui/material/CircularProgress';
import Form from '../../Form';
import FormGroup from '../../Form/Group';
import TextField from '../../Form/TextField';
import Button from '../../Form/Button';

const {
  useCallback,
  useId,
  useState,
} = React;

function PromptDialog({
  children,
  icon,
  inputType = 'text',
  placeholder,
  submitLabel = 'OK',
  title,
  bodyClassName,
  contentClassName,
  titleClassName,
  onSubmit,
  onCancel,
  open = true,
  defaultValue = '',
  ...props
}) {
  const ariaTitle = useId();
  const [busy, setBusy] = useState(false);
  const [value, setValue] = useState(defaultValue);

  const handleSubmit = useCallback((event) => {
    event.preventDefault();
    const promise = onSubmit(value);
    if (promise && promise.finally) {
      setBusy(true);
      promise.finally(() => {
        setBusy(false);
      });
    }
  }, [value, onSubmit]);

  const handleClose = useCallback(() => {
    onCancel();
  }, [onCancel]);

  const handleInputChange = useCallback((event) => {
    setValue(event.target.value);
  }, []);

  return (
    <Dialog
      variant="fullWidth"
      {...props}
      open={open}
      classes={{
        paper: cx('Dialog', contentClassName),
      }}
      onClose={handleClose}
      aria-labelledby={ariaTitle}
    >
      <DialogTitle className={cx('Dialog-title', titleClassName)} id={ariaTitle}>
        {title}
      </DialogTitle>
      <DialogContent className={cx('Dialog-body', bodyClassName)}>
        <Form onSubmit={handleSubmit}>
          {children}
          <FormGroup>
            <TextField
              autoFocus
              type={inputType}
              placeholder={placeholder}
              icon={icon}
              value={value}
              onChange={handleInputChange}
              onKeyDown={(e) => e.stopPropagation()}
            />
          </FormGroup>
          <FormGroup>
            <Button disabled={busy}>
              {busy ? <div className="Button-loading"><CircularProgress size="100%" /></div> : submitLabel}
            </Button>
          </FormGroup>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

PromptDialog.propTypes = {
  children: PropTypes.node,
  placeholder: PropTypes.string,
  submitLabel: PropTypes.string,
  inputType: PropTypes.string,
  icon: PropTypes.node,
  defaultValue: PropTypes.string,
  title: PropTypes.string,
  open: PropTypes.bool,
  bodyClassName: PropTypes.string,
  contentClassName: PropTypes.string,
  titleClassName: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default PromptDialog;
