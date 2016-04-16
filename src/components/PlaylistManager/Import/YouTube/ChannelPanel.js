import * as React from 'react';
import List from 'react-list';

import ImportPanelHeader from '../ImportPanelHeader';

import PlaylistRow from './PlaylistRow';

export default class ChannelPanel extends React.Component {
  static propTypes = {
    importingChannelTitle: React.PropTypes.string.isRequired,
    importablePlaylists: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,

    onImportPlaylist: React.PropTypes.func.isRequired,
    onClosePanel: React.PropTypes.func.isRequired
  };

  renderRow = (index, key) => {
    const playlist = this.props.importablePlaylists[index];
    return (
      <PlaylistRow
        key={key}
        className={index % 2 === 0 ? 'MediaListRow--alternate' : ''}
        playlist={playlist}
        onImport={() => this.props.onImportPlaylist(playlist.sourceID, playlist.name)}
      />
    );
  };

  render() {
    const {
      importingChannelTitle,
      importablePlaylists,
      onClosePanel
    } = this.props;

    return (
      <div className="PlaylistPanel SearchResults ChannelPanel">
        <ImportPanelHeader onClosePanel={onClosePanel}>
          {`${importingChannelTitle}'s Playlists`}
        </ImportPanelHeader>
        <div className="MediaList PlaylistPanel-media">
          <List
            type="uniform"
            length={importablePlaylists.length}
            itemRenderer={this.renderRow}
          />
        </div>
      </div>
    );
  }
}
