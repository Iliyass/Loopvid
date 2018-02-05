import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Player, ControlBar, PlayToggle, 
         ProgressControl, FullscreenToggle,
         CurrentTimeDisplay, DurationDisplay } from 'video-react';
import AspectRatio from 'material-ui-icons/AspectRatio';
import IconButton from 'material-ui/IconButton';
import _ from 'lodash';

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
  onVisible = _.debounce((isVisible, player) => {
    try{
      if(! player){ return; }

      if(isVisible){
        return player.play()
      }
      if(! isVisible){
        return player.pause()      
      }
    }catch(e){
      return this.onVisible.cancel()
    }
  }, 900)
  componentWillReceiveProps(props){
    this.onVisible(props.isVisible, this.refs.player)
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
        // onMouseDown={() => { 
        //   TODO: Overide onMouseDown behavior
        // }}
        preload={"metadata"}
        ref="player"
        poster={this.props.poster}
        muted
        // playsInline
        src={this.props.videoSrc}
        aspectRatio="16:9"
      >
      {/* {! this.state.player.hasStarted && 
        <PlayButton onClick={() => this.refs.player.play()} />
      } */}
        <ControlBar disableDefaultControls={true} autoHide={false} >
          <PlayToggle />
          <CurrentTimeDisplay />
          <ProgressControl />
          <DurationDisplay />
          <FullscreenToggle />
          {/* { true && 
                  <button onClick={this.handlePortraitFullscreen}>
                    <AspectRatio />
                  </button>
          } */}
        </ControlBar>
      </Player>
    )
  }
}

Video.propTypes = {
  isVisible: PropTypes.bool,
  videoSrc: PropTypes.string.isRequired,
  poster: PropTypes.string.isRequired
}