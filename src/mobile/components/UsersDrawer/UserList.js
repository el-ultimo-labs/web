import React from 'react';
import PropTypes from 'prop-types';
import { useTranslator } from '@u-wave/react-translate';
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import CurrentDJIcon from '@mui/icons-material/PlayArrow';
import UserRow from './UserRow';
import WaitlistPosition from './WaitlistPosition';

function JoinWaitlistButton(props) {
  return (
    <Button
      variant="contained"
      style={{ marginLeft: 16, marginBottom: 8 }}
      {...props}
    />
  );
}

function UserList({
  currentDJ,
  users,
  waitlist,
  isLockedWaitlist,
  userIsLoggedIn,
  userInWaitlist,
  onJoinWaitlist,
}) {
  const { t } = useTranslator();

  return (
    <div>
      {currentDJ && <Divider />}

      <List
        subheader={<ListSubheader>{t('waitlist.title')}</ListSubheader>}
      >
        {currentDJ && (
          <UserRow
            user={currentDJ}
            icon={<CurrentDJIcon style={{ margin: 5 }} />}
          />
        )}
        {waitlist.map((user, position) => (
          <UserRow
            key={user._id}
            user={user}
            icon={<WaitlistPosition position={position + 1} />}
          />
        ))}
      </List>
      {userIsLoggedIn && !userInWaitlist && (
        <JoinWaitlistButton
          onClick={() => onJoinWaitlist()}
          disabled={isLockedWaitlist}
        >
          {t('waitlist.join')}
        </JoinWaitlistButton>
      )}

      <Divider />

      <List
        subheader={<ListSubheader>{t('users.listeners')}</ListSubheader>}
      >
        {users.map((user) => (
          <UserRow key={user._id} user={user} />
        ))}
      </List>
    </div>
  );
}

UserList.propTypes = {
  currentDJ: PropTypes.object,
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
  waitlist: PropTypes.arrayOf(PropTypes.object).isRequired,
  userIsLoggedIn: PropTypes.bool.isRequired,
  userInWaitlist: PropTypes.bool,
  isLockedWaitlist: PropTypes.bool,
  onJoinWaitlist: PropTypes.func.isRequired,
};

export default UserList;
