import PropTypes from 'prop-types';
import React from 'react';
import { Button } from 'react-bootstrap';

import UASTModal from '../../uast/components/UASTModal';

class UastButton extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
    };
  }

  render() {
    // Ideally there would be a UASTModal in a higher html element, and this
    // button onClick would send a redux action to show the modal. To make
    // the code as independent as possible from the rest of Superset the
    // UASTModal is contained in this row cell.
    // To avoid actually having one hidden modal per row cell, it is defined
    // as null unless we are really going to open the modal.

    let modal = null;

    if (this.state.showModal) {
      const uast = JSON.parse(this.props.uast);

      modal = (<UASTModal
        show={this.state.showModal}
        uast={uast}
        onHide={() => this.setState({ showModal: false })}
      />);
    }

    return (
      <div>
        <Button
          bsSize="small"
          onClick={() => this.setState({ showModal: true })}
        >
          <i className="fa fa-align-left text-muted" /> UAST
        </Button>
        {modal}
      </div>);
  }
}

UastButton.propTypes = {
  actions: PropTypes.object,
  uast: PropTypes.string,
};

export default  UastButton;
