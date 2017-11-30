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
    this._previousDelta = 0
  }
  componentDidMount() {
    // subscribe state change
    this.refs.player.subscribeToStateChange(this.handleStateChange.bind(this));
    this._width = this.refs.player.video.video.style.width
    
    return;

    const hammeredVideo = new Hammer(this.refs.player.video.video);
    hammeredVideo.on('panleft', (ev) => {
      console.log("panleft", `${ this._previousDelta || 0 + ev.deltaX}px`, this._previousDelta, ev.deltaX)    
      let valueToLeft = 0;
      if(this._previousDelta && this._previousDelta < ev.deltaX){
        this._previousDelta = (this._previousDelta + Math.abs(ev.deltaX)) * -1
      }
      this._previousDelta = (this._previousDelta + Math.abs(ev.deltaX)) * -1
      
      this.refs.player.video.video.style.left = `${this._previousDelta}px`
    })

    hammeredVideo.on('panright', (ev) => {
      console.log("panright", `${this._previousDelta || 0 - Math.abs(ev.deltaX)}px`)
      this.refs.player.video.video.style.left = `${this._previousDelta || 0 - Math.abs(ev.deltaX)}px`
      
    })
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
    console.log("this.props", this.props)
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
          { this.state.player.isFullscreen && 
            <button order={9} onClick={this.handlePortraitFullscreen}>
              Grand {/*icon => crop_portrait */}
            </button>
          }
        </ControlBar>
      </Player>
    )
  }
}