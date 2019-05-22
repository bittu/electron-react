import React, { Component } from 'react'
import Animate from 'rc-animate';
import queryString from 'query-string'

import TheoPlayer from 'theoPlayer/THEOplayer.chromeless';
import LoadingIndicatorDots from '../LoadingIndicatorDots'
import poster from '../images/poster.jpg'

// import 'theoPlayer/ui.css';
import './player.css';
import CustomControlBar from './CustomControlBar';

// const imgUrl = "https://imagesng.cdn.vision.bt.com/ImageTransformationService?width=1280&height=720&url=<PACKSHOT_URL>";

export default class PlayerContainer extends Component {

  state = {
    loaded: false
  }

  componentDidMount() {
    const {
      streamURL,
      licenseURL
    } = this.props;

    window.theoPlayer = new TheoPlayer.Player(this._videoContainer, {
      libraryLocation: 'lib/theoPlayer/'
    });
    console.log('player inited')
    window.theoPlayer.preload = 'auto';
    this.mockRequestToPlay()
    .then(res => {
      window.theoPlayer.source = {
        poster: poster,
        sources: [{
          src: streamURL,
          type: 'application/dash+xml',
          contentProtection: {
            widevine: {
              licenseAcquisitionURL: licenseURL
            }
          }
        }]
      };
      console.log('player source set')
    });

    window.theoPlayer.addEventListener('loadedmetadata', () => {
      console.log('loadedmetadata')
      this.setState({
        loaded: true
      })
    })

    window.theoPlayer.addEventListener('loadeddata', () => {
      console.log('loadeddata')
      this.setState({
        loaded: true
      })
    })
  }

  mockRequestToPlay = () => {
    return new Promise(resolve => {
      setTimeout(_ => {
        resolve({
          src: '//cdn.theoplayer.com/video/star_wars_episode_vii-the_force_awakens_official_comic-con_2015_reel_(2015)/index.m3u8'
        })
      }, 1000)
    })
  }

  render() {
    const {
      loaded
    } = this.state;
    const {
      onPlayerClose
    } = this.props;

    return (
      <div style={{width: '100%', height: '100%'}}>
        <div className="theoplayer-container video-js theoplayer-skin" ref={r => this._videoContainer = r}></div>
        {loaded
        &&  <CustomControlBar
          player={window.theoPlayer}
          router={this.props.router}
          onPlayerClose={onPlayerClose}
        ></CustomControlBar>
        }
        <Animate
          transitionAppear={true}
          transitionName="fade"
        >
        </Animate>
      </div>
    )
  }
}