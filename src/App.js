import React, { Component } from 'react';
import StreamInfo from './StreamInfo';
import PlayerContainer from './player/PlayerContainer';

import './App.css';

class App extends Component {
  state = {
    streamURL: 'https://bitmovin-a.akamaihd.net/content/art-of-motion_drm/mpds/11331.mpd',
    licenseURL: 'https://widevine-proxy.appspot.com/proxy',
    launchPlayer: false
  }

  handleChange = input => event => {
    this.setState({
      [input]: event.target.value
    })
  }

  handleSubmit = () => {
    this.setState({
      launchPlayer: true
    })
  }

  onPlayerClose = () => {
    this.setState({
      launchPlayer: false
    })
  }

  render() {
    const {
      streamURL,
      licenseURL,
      launchPlayer
    } = this.state;

    return (
      <div className="app">
        {launchPlayer
        ? <PlayerContainer
            streamURL={streamURL}
            licenseURL={licenseURL}
            onPlayerClose={this.onPlayerClose}
          />
        : <StreamInfo
            streamURL={streamURL}
            licenseURL={licenseURL}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
          />
        }
      </div>
    );
  }
}

export default App;
