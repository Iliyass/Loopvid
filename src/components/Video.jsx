import React, { PureComponent, Component } from 'react';
import { Player, ControlBar, PlayToggle, BigPlayButton, 
         ProgressControl, VolumeMenuButton, FullscreenToggle,
         CurrentTimeDisplay, DurationDisplay } from 'video-react';
import screenfull from 'screenfull'
import Hammer from 'hammerjs'
import AspectRatio from 'material-ui-icons/AspectRatio';
import IconButton from 'material-ui/IconButton';


const PlayButton = ({ onClick }) => (
  <div onClick={onClick} className="video-react-bezel" role="status" aria-label="play">
    <div className="video-react-bezel-icon video-react-bezel-icon-play">
    </div>
  </div>
)
export default class Video extends PureComponent {
  constructor(props){
    super(props)
    this.state = {
      player: {},
      zoomed: false
    }
    this.handlePortraitFullscreen = this.handlePortraitFullscreen.bind(this)
    this._previousDelta = 0
  }
  componentWillReceiveProps(props){
    if(props.isVisible){
      return this.refs.player.play()
    }
    if(! props.isVisible){
      return this.refs.player.pause()      
    }
  }
  componentDidMount() {
    // subscribe state change
    this.refs.player.subscribeToStateChange(this.handleStateChange.bind(this));
  }
  handleStateChange(state, prevState) {
    // copy player state to this component's state
    this.setState({
      player: state
    });
  }
  handlePortraitFullscreen(){
    const zoomWidth = this.state.zoomed ? "100%" : "auto"
    this.refs.player.video.video.style.width = zoomWidth
    this.setState({ zoomed: !this.state.zoomed })
  }
  render(){
    return (
      <Player
        preload={"metadata"}
        ref="player"
        poster={this.props.poster}
        muted
        playsInline
        src={this.props.videoSrc}
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
          { true && 
                  <button onClick={this.handlePortraitFullscreen}>
                    <AspectRatio />
                  </button>
          }
        </ControlBar>
      </Player>
    )
  }
}