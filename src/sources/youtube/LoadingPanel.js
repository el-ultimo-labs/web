import * as React from 'react';

import Loader from '../../components/Loader';
import ImportPanelHeader from '../../components/PlaylistManager/Import/ImportPanelHeader';

const LoadingPanel = ({ onClosePanel }) => (
  <div className="PlaylistPanel">
    <ImportPanelHeader onClosePanel={onClosePanel} />
    <div className="PlaylistPanel-loading">
      <Loader size="large" />
    </div>
  </div>
);

LoadingPanel.propTypes = {
  onClosePanel: React.PropTypes.func.isRequired
};

export default LoadingPanel;
