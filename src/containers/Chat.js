import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  inputMessage
} from '../actions/ChatActionCreators';
import {
  motdSelector,
  messagesSelector,
  markupCompilerOptionsSelector
} from '../selectors/chatSelectors';
import {
  currentUserSelector
} from '../selectors/userSelectors';

import Chat from '../components/Chat';
import ChatInput from '../components/Chat/Input';

const mapStateToProps = createStructuredSelector({
  motd: motdSelector,
  messages: messagesSelector,
  compileOptions: markupCompilerOptionsSelector,
  currentUser: currentUserSelector
});

const mapDispatchToProps = dispatch => bindActionCreators({
  onSend: inputMessage
}, dispatch);

const ChatContainer = ({
  currentUser,
  onSend,
  ...props
}) => (
  <div>
    <div className="AppRow AppRow--middle">
      <Chat {...props} />
    </div>
    <div className="AppRow AppRow--bottom ChatInputWrapper">
      {!!currentUser && (
        <ChatInput onSend={onSend} />
      )}
    </div>
  </div>
);

ChatContainer.propTypes = {
  currentUser: React.PropTypes.object.isRequired,
  onSend: React.PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatContainer);
