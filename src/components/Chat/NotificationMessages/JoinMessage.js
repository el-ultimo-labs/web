// @ts-check
import React from 'react';
import PropTypes from 'prop-types';
import UserNotificationMessage from './UserNotificationMessage';

const GENDERS = /** @type {const} */ ({
  MALE: 'M',
  FEMALE: 'F',
  OTHER: 'O',
});

/**
 *
 * @param {string} username
 */
const getGenderByUsername = (username) => {
  switch (username) {
    case 'Huaygua':
    case 'joanne':
      return GENDERS.FEMALE;
    case '7170':
    case 'Gon':
    case 'Chuani':
      return GENDERS.MALE;
    default: return GENDERS.OTHER;
  }
};

/**
 * Linting rules which patch up the lack of static typing are disabled.
 * Let Typescript decide whether I am returning a string or not.
 *
 * @param {GENDERS[keyof GENDERS]} gender
 * @returns {string}
 */
// eslint-disable-next-line consistent-return
const getI18nUserJoinKeyByGender = (gender) => {
  // eslint-disable-next-line default-case
  switch (gender) {
    case GENDERS.FEMALE:
      return 'chat.femaleUserJoin';
    case GENDERS.MALE:
      return 'chat.maleUserJoin';
    case GENDERS.OTHER:
      return 'chat.userJoin';
  }
};

const JoinMessage = ({
  user,
  timestamp,
}) => (
  <UserNotificationMessage
    type="userJoin"
    className="ChatMessage--userJoin"
    i18nKey={getI18nUserJoinKeyByGender(getGenderByUsername(user.username))}
    user={user}
    timestamp={timestamp}
  />
);

JoinMessage.propTypes = {
  user: PropTypes.object.isRequired,
  timestamp: PropTypes.number.isRequired,
};

export default JoinMessage;
