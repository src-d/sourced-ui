import React from 'react';
import PropTypes from 'prop-types';
import UASTViewer from 'uast-viewer';
import 'uast-viewer/dist/default-theme.css';
import '../stylesheets/UASTViewerPane.less';

function UASTViewerPane({
  loading,
  uastViewerProps,
  showLocations,
  handleShowLocationsChange,
}) {
  let content = null;

  const uast = uastViewerProps.uast || uastViewerProps.initialUast;
  if (loading) {
    content = <div>loading...</div>;
  } else if (uast) {
    content = (
      <UASTViewer
        {...uastViewerProps}
        showLocations={showLocations}
      />
    );
  }

  return (
    <div className="uast-viewer-pane">
      <div className="show-locations-wrapper">
        <label htmlFor="showLocations">
          <input
            id="showLocations"
            type="checkbox"
            checked={showLocations}
            onChange={handleShowLocationsChange}
          />
          <span>Show locations</span>
        </label>
      </div>
      {content}
    </div>
  );
}

UASTViewerPane.propTypes = {
  loading: PropTypes.bool,
  uastViewerProps: PropTypes.object,
  showLocations: PropTypes.bool,
  handleShowLocationsChange: PropTypes.func.isRequired,
};

export default UASTViewerPane;
