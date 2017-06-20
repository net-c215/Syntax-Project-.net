import React from 'react'
import axios from 'axios';
import ShowList from '../components/ShowList';
import ShowNotes from '../components/ShowNotes';
import Player from '../components/Player';
import Meta from '../components/meta';


const prod = process.env.NODE_ENV === 'production'
const backend =  prod ? 'https://syntax.fm' : 'http://localhost:3000'

export default class IndexPage extends React.Component {

  constructor(props) {
    super();
    const currentShow = props.url.query.number || props.shows[0].displayNumber;

    this.state = {
      shows: props.shows,
      currentShow,
      currentPlaying: currentShow
    }
  }

  static async getInitialProps({ req }) {
    const { data:shows } = await axios.get(`${backend}/api/shows`);
    return { shows };
  }

  componentWillReceiveProps(nextProps) {
    const { pathname, query } = nextProps.url
    if(query.number) {
      this.setState({ currentShow: query.number });
    }
  }

  setCurrentPlaying = (currentPlaying) => this.setState({ currentPlaying })

  render() {
    const { shows = [], currentShow, currentPlaying } = this.state;
    // Currently Shown shownotes
    const show = shows.find(show => show.displayNumber === currentShow);
    // Currently Playing
    const current = shows.find(show => show.displayNumber === currentPlaying)
    return (
      <div>
        <Meta />
        <h1>Syntax.</h1>
        <ShowList shows={this.state.shows} />
        <ShowNotes show={show} setCurrentPlaying={this.setCurrentPlaying} />
        <Player show={current} />
      </div>
    )
  }
}
