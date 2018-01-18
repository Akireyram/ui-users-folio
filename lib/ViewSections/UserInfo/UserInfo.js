import { get } from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';
import Headline from '@folio/stripes-components/lib/Headline';
import KeyValue from '@folio/stripes-components/lib/KeyValue';
import MetaSection from '@folio/stripes-components/lib/MetaSection';

import { formatDate } from '../../../util';

const UserInfo = ({ user, patronGroup, settings }) => {
  const userStatus = (get(user, ['active'], '') ? 'active' : 'inactive');
  const hasProfilePicture = (settings.length && settings[0].value === 'true');

  return (
    <div>
      <Headline tag="h3" margin="medium" faded>
        User information
      </Headline>
      <Row>
        <Col xs={12}>
          <MetaSection
            id="userInfoRecordMeta"
            contentId="userInfoRecordMetaContent"
            lastUpdatedDate={user.updatedDate}
            createdDate={user.createdDate}
            lastUpdatedBy={user.lastUpdatedBy}
            createdBy={user.createdBy}
          />
        </Col>
      </Row>
      <Row>
        <Col xs={hasProfilePicture ? 9 : 12}>
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
              <KeyValue label="Expiration date" value={formatDate(get(user, ['expirationDate'], ''))} />
            </Col>
            <Col xs={3}>
              <KeyValue label="Username" value={get(user, ['username'], '')} />
            </Col>
          </Row>
        </Col>

        {hasProfilePicture === true &&
          <Col xs={3}>
            <Row>
              <Col xs={12}>
                <img className="floatEnd" src="http://placehold.it/100x100" role="presentation" />
              </Col>
            </Row>
          </Col>
        }
      </Row>
    </div>
  );
};

UserInfo.propTypes = {
  user: PropTypes.object.isRequired,
  patronGroup: PropTypes.object.isRequired,
  settings: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default UserInfo;
