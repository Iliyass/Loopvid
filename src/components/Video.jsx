import React, { Component } from 'react';
import { Player, ControlBar, PlayToggle, BigPlayButton, 
         ProgressControl, VolumeMenuButton, FullscreenToggle,
         CurrentTimeDisplay, DurationDisplay } from 'video-react';
import screenfull from 'screenfull'
import Hammer from 'hammerjs'

const PlayButton = ({ onClick }) => (
  <div onClick={onClick} className="video-react-bezel" role="status" aria-label="play">
    <div className="video-react-bezel-icon video-react-bezel-icon-play">
    </div>
  </div>
)
export default class Video extends Component {
  constructor(props){
    super(props)
    this.state = {
      player: {},
      zoomed: false
    }
    this.handlePortraitFullscreen = this.handlePortraitFullscreen.bind(this)
  }
  componentDidMount() {
    // subscribe state change
    this.refs.player.subscribeToStateChange(this.handleStateChange.bind(this));
    this._width = this.refs.player.video.video.style.width
  }
  handleStateChange(state, prevState) {
    // copy player state to this component's state
    this.setState({
      player: state
    });
  }
  handlePortraitFullscreen(){
    const zoomWidth = this.state.zoomed ? this._width : `${document.documentElement.scrollHeight}px`
    this.refs.player.video.video.style.width = zoomWidth
    this.setState({ zoomed: !this.state.zoomed })
  }
  render(){
    return (
      <Player
        preload={"metadata"}
        ref="player"
        poster="https://lorempixel.com/400/200/sports/"
        muted
        playsInline
        src="bunny.mp4"
        aspectRatio="16:9"
      >
      {! this.state.player.hasStarted && 
        <PlayButton onClick={() => this.refs.player.play()} />
      }
        <ControlBar disableDefaultControls={true} >
          <PlayToggle />
          <CurrentTimeDisplay />
          <ProgressControl />
          <DurationDisplay />
          <VolumeMenuButton vertical={true} />          
          <FullscreenToggle />
          { this.state.player.isFullscreen && 
            <button order={9} onClick={this.handlePortraitFullscreen}>
              Grand
            </button>
          }
        </ControlBar>
      </Player>
    )
  }
}