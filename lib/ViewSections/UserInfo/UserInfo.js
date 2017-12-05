import { get } from 'lodash';
import { Accordion } from '@folio/stripes-components/lib/Accordion';
import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';
import KeyValue from '@folio/stripes-components/lib/KeyValue';
import { formatDate } from '../../../util';

const UserInfo = ({ user, patronGroup, stripes, accordionId, onToggle, expanded }) => {
  const userStatus = (get(user, ['active'], '') ? 'active' : 'inactive');
  return (
    <Accordion
      open={expanded}
      id={accordionId}
      onToggle={onToggle}
      label="User Information"
    >
      <Row>
        <Col xs={3}>
          <KeyValue label="Last name" value={get(user, ['personal', 'lastName'], '')} />
        </Col>
        <Col xs={3}>
          <KeyValue label="First name" value={get(user, ['personal', 'firstName'], '')} />
        </Col>
        <Col xs={3}>
          <KeyValue label="Middle name" value={get(user, ['personal', 'middleName'], '')} />
        </Col>
        <Col xs={3}>
          <KeyValue label="Barcode" value={get(user, ['barcode'], '')} />
        </Col>
      </Row>

      <Row>
        <Col xs={3}>
          <KeyValue label="Patron group" value={patronGroup.group} />
        </Col>
        <Col xs={3}>
          <KeyValue label="Status" value={userStatus} />
        </Col>
        <Col xs={3}>
          <KeyValue label="Expiration date" value={formatDate(get(user, ['expirationDate'], ''), stripes.locale)} />
        </Col>
        <Col xs={3}>
          <KeyValue label="Username" value={get(user, ['username'], '')} />
        </Col>
      </Row>
    </Accordion>
  );
};

UserInfo.propTypes = {
  stripes: PropTypes.object,
  user: PropTypes.object,
  patronGroup: PropTypes.object,
  accordionId: PropTypes.string,
  onToggle: PropTypes.func,
  expanded: PropTypes.bool,
};

export default UserInfo;
