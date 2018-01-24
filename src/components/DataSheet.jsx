import React from 'react';
import {browserHistory} from 'react-router';
import {connect} from 'react-redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import ReactDataSheet from 'react-datasheet';
import 'react-datasheet/lib/react-datasheet.css';

import {showDataSheetWindow, updateDataSheet} from '../actions/datasheetActions';

const customContentStyle = {
  width: '100%',
  maxWidth: 'none'
};

class DataSheet extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        grid: props.grid
    };

    this.handleClose = this.handleClose.bind(this);
    this.redirect = this.redirect.bind(this);
    this.getChangedData = this.getChangedData.bind(this);
  }

  redirect(){
    this.props.showDataSheetWindow(!this.props.isShowDataSheet);
    browserHistory.push('/');
  }

  handleClose() {
    this.props.updateDataSheet(this.getChangedData());
    this.redirect();
  };

  getChangedData(){
    const oldDataSheet = this.props.grid;
    const newDataSheet = this.state.grid;
    let changedData = [oldDataSheet[0]];

    oldDataSheet.map((rows, i) => {
      //пропускаю 0 масив так как он не изменяеться
      if(i === 0) return;
      changedData.push([{
          "readOnly": true,
          "value": i
      }]);

      rows.forEach((row, j) => {
        if(row.readOnly) return;
        // добовляю обьект в масив с новым значением если они отличаються или пустая строка
        const val = (newDataSheet[i][j].value !== row.value) ? newDataSheet[i][j].value : '';
        changedData[i].push({
          "value": val
        });
      });
    });
    return changedData;
  }

  render() {
    const actions = [
      <FlatButton
          label="Save"
          primary={true}
          onClick={this.handleClose}
      />
    ];

    return (
        <Dialog
            actions={actions}
            modal={false}
            open={this.props.isShowDataSheet}
            contentStyle={customContentStyle}
            onRequestClose={this.handleClose}
        >
          <ReactDataSheet
              data={this.state.grid}
              valueRenderer={(cell) => cell.value}
              onChange={(cell, rowI, colJ, value) => {
                this.setState({
                  grid: this.state.grid.map((col) =>
                    col.map((rowCell) =>
                      (rowCell === cell) ? ({value: value}) : rowCell
                    )
                  )
                })
              }}
          />
        </Dialog>
    )
  }
}

function mapStateToProps(state) {
  return {
    isShowDataSheet: state.datasheet.isShowDataSheet,
    grid: state.datasheet.grid
  };
}

const mapDispatchToProps = (dispatch) => ({
  updateDataSheet: (params) => dispatch(updateDataSheet(params)),
  showDataSheetWindow:(params) => dispatch(showDataSheetWindow(params))
});

export default connect(mapStateToProps, mapDispatchToProps)(DataSheet);