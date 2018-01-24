import React from 'react';
import { browserHistory } from 'react-router';
import {connect} from 'react-redux';
import {showDataSheetWindow} from '../actions/datasheetActions';
import ReactDataSheet from 'react-datasheet';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.redirect = this.redirect.bind(this);
  }

  redirect(){
    this.props.showDataSheetWindow(!this.props.isShowDataSheet);
    browserHistory.push('/datasheet');
  }

  render() {
    const { newGrid, isShowDataSheet } = this.props;

    return (
      <div>
        <h1>Home page</h1>
        {(newGrid.length > 0 || isShowDataSheet)
          ?  <ReactDataSheet
              data={newGrid}
              valueRenderer={(cell) => cell.value}
            />
          : <button
              onClick={()=>{
                this.redirect();
              }}
            >
              Show datasheet
            </button>
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    newGrid: state.datasheet.newGrid,
    isShowDataSheet: state.datasheet.isShowDataSheet
  };
}

const mapDispatchToProps = (dispatch) => ({
  showDataSheetWindow:(params) => dispatch(showDataSheetWindow(params))
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
