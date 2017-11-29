import React, { Component } from 'react';
import { Player, ControlBar, PlayToggle, BigPlayButton } from 'video-react';
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
      player: {}
    }
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

    const hammeredVideo = new Hammer(this.refs.player.video.video);
    hammeredVideo.add(new Hammer.Tap({ event: 'doubletap', taps: 2 }));
    hammeredVideo.on('doubletap', (ev) => {
      this.refs.player.toggleFullscreen()
    })

    if(!prevState.isFullscreen && state.isFullscreen){
      console.log("aspect", state.videoWidth / state.videoHeight)    
      
      if(state.videoWidth / state.videoHeight < 1) return;   

      
      // var doubleTap = new Hammer.Tap({event: 'swipe'  });
      // hammeredVideo.add(doubleTap);
      // hammeredVideo.on('panleft panright', (ev) => {
      //   console.log(ev)
      //   // this.refs.player.replay(ev.deltaX * 0.1)
      // })
      // hammeredVideo.on('panright', (ev) => {
      //   this.refs.player.forward(ev.deltaX * 0.1)
      // })
      // console.log("hammeredVideo", hammeredVideo)
      return setTimeout( () => {
        this.refs.player.video.video.style.width = `${document.documentElement.scrollHeight}px`
      })
    }
    if(prevState.isFullscreen && !state.isFullscreen){
      this.refs.player.video.video.style.width = this._width   
    }

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

      </Player>
    )
  }
}