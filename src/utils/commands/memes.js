import { register } from '../ChatCommands';
import { log } from '../../actions/ChatActionCreators';
import { letItSnow, stopSnow } from '../christmas';

register('snow', 'Let it snow', {
  action: () => (dispatch) => {
    dispatch(log(':D'));
    letItSnow();
  },
});

register('stopsnow', 'Stop snow', {
  action: () => (dispatch) => {
    dispatch(log(':('));
    stopSnow();
  },
});
