import React, { Component } from 'react';
import PropTypes from 'prop-types';
import UASTViewerPane from './UASTViewerPane';

class UASTViewer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      showLocations: false,
    };

    this.handleShowLocationsChange = this.handleShowLocationsChange.bind(this);
  }

  handleShowLocationsChange() {
    this.setState({ showLocations: !this.state.showLocations });
  }

  render() {
    const { showLocations, loading } = this.state;
    const uastViewerProps = { initialUast: this.props.uast };

    return (
      <div className="pg-uast-viewer">
        <UASTViewerPane
          loading={loading}
          uastViewerProps={uastViewerProps}
          showLocations={showLocations}
          handleShowLocationsChange={this.handleShowLocationsChange}
        />
      </div>
    );
  }
}

UASTViewer.propTypes = {
  uast: PropTypes.array,
  protobufs: PropTypes.string,
};

export default UASTViewer;
