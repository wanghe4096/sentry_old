'use strict';

var React = require('react');
var PureRenderMixin = require('react-addons-pure-render-mixin');

var Modal = require('react-bootstrap').Modal;
//import {ClipboardButton} from 'components/common';

var BootstrapModalWrapper = require('../bootstrap/BootstrapModalWrapper');

var ShowQueryModal = React.createClass({
    mixins: [PureRenderMixin],

    propTypes: {
        builtQuery: React.PropTypes.string,
    },

    open() {
        this.refs.modal.open();
    },

    close() {
        this.refs.modal.close();
    },

    render () {
        var queryText = "";
        return (
          <BootstrapModalWrapper ref="modal">
              <Modal.Header closeButton>
                  <Modal.Title>Elasticsearch Query</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                  <pre>2</pre>
              </Modal.Body>
              <Modal.Footer>

              </Modal.Footer>
          </BootstrapModalWrapper>
        );
    }
});

module.exports = ShowQueryModal;
