import React, { Component, Fragment } from 'react';

// data generator
const getItems = count => {
  return Array.from({ length: count }, (v, i) => (i + 1) * 10).map(k => {
    let decimal = k / 100;
    return {
      integer: `${k}`,
      deci: `${decimal}`,
      vol: `vol${k}`,
      level: `Volume Level ${k}/100`,
      checked: null
    };
  }); // END MAP
}; // END ARROW

class VolumeBars extends Component {
  state = {
    volumeBarList: getItems(10)
  };

  componentDidUpdate(prevProps, prevState) {
    console.log('YOOOOO4444');
  }

  //We are going to add "checked" to our array of objects - on click
  handleOnClick = index => {
    // make a copy of state
    const volumeBarList = [...this.state.volumeBarList];
    //
    console.log(`INDEX CLICKED IS ==> ${index}`);
    //
    //--- Get the index positions from 0 till index (index clicked)
    for (let i = 0; i <= index; i++) {
      console.log(`🍎🍎🍎🍎🍎🍎🍎 ==> ${i}`);
      volumeBarList[i].checked = true;
    }
    // --- Get the index positions that are leftover from aboves range
    for (let i = index + 1; i < 10; i++) {
      console.log(`⭐️⭐️⭐️⭐️⭐️  ${i}`);
      volumeBarList[i].checked = null;
    }

    // Update State
    this.setState({
      volumeBarList
    });
  };

  render() {
    return (
      <Fragment>
        {this.state.volumeBarList.map((item, index) => (
          <Fragment key={item.integer}>
            <input
              onClick={() => {
                this.handleOnClick(index);
              }}
              onChange={this.props.volume}
              type="radio"
              name="volume"
              value={item.deci}
              id={item.vol}
              className="sr-only"
            />
            <label htmlFor={item.vol}>
              <span className="sr-only">{item.level}</span>
            </label>
          </Fragment>
        ))}
      </Fragment>
    );
  }
}

export default VolumeBars;
