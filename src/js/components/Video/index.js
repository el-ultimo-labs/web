import React from 'react';
import YouTube from 'react-youtube';
import CurrentMediaStore from '../../stores/CurrentMediaStore';
import styles from './style.css';

function getState() {
  return {
    media: CurrentMediaStore.getMedia()
  };
}

export default class Video extends React.Component {

  constructor() {
    super();
    this._onChange = this._onChange.bind(this);
  }

  state = getState();

  componentDidMount() {
    CurrentMediaStore.on('change', this._onChange);
  }

  componentWillUnmount() {
    CurrentMediaStore.off('change', this._onChange);
  }

  _onChange() {
    this.setState(getState());
  }

  render() {
    const { media } = this.state;
    let video = '';

    switch (media.source) {
    case 'youtube':
      video = (
        <YouTube
          url={'https://youtube.com/watch?v=' + media.id}
          opts={{
            playerVars: {
              autoplay: 1,
              controls: 0,
              rel: 0,
              showinfo: 0,
              start: 0
            }
          }}
        />
      );
      break;
    default:
      // empty
    }

    return (
      <div className={styles.video}>
        {video}
      </div>
    );
  }

}
