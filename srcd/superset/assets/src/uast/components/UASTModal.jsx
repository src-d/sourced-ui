import PropTypes from 'prop-types';
import React from 'react';
import { Modal } from 'react-bootstrap';

import UASTViewer from './UASTViewer';
import '../stylesheets/UASTModal.less';

class UastModal extends React.PureComponent {
  render() {
    let modalContent = <div />;
    let showModal = false;

    if (this.props.uast) {
      showModal = true;
      modalContent = <UASTViewer uast={this.props.uast} />;
    }

    return (
      <Modal
        show={showModal}
        onHide={this.props.onHide}
        bsSize="large"
      >
        <Modal.Header closeButton>
          <Modal.Title>UAST</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalContent}</Modal.Body>
      </Modal>);
  }
}

UastModal.propTypes = {
  show: PropTypes.bool.isRequired,
  uast: PropTypes.arrayOf(PropTypes.object).isRequired,
  onHide: PropTypes.func.isRequired,
};

export default UastModal;
