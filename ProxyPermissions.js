import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';
import MultiColumnList from '@folio/stripes-components/lib/MultiColumnList';
import Pluggable from '@folio/stripes-components/lib/Pluggable';
import { Accordion } from '@folio/stripes-components/lib/Accordion';
import Badge from '@folio/stripes-components/lib/Badge';
import { getFullName, getRowURL, getAnchoredRowFormatter } from './util';

const propTypes = {
  user: PropTypes.object,
  history: PropTypes.object,
  resources: PropTypes.shape({
    sponorQuery: PropTypes.object,
    sponsorUsers: PropTypes.object,
    sponsors: PropTypes.object,
    proxies: PropTypes.object,
  }).isRequired,

  mutator: PropTypes.shape({
    sponorQuery: PropTypes.shape({
      replace: PropTypes.func,
    }),
    curUser: PropTypes.shape({
      replace: PropTypes.func,
    }),
    user: PropTypes.shape({
      PUT: PropTypes.func.isRequired,
    }),
  }).isRequired,
  expanded: PropTypes.bool,
  onToggle: PropTypes.func,
  accordionId: PropTypes.string.isRequired,
  // if `editable` is true, component will be in 'edit' mode. (read-only by default)
  editable: PropTypes.bool,
};

class ProxyPermissions extends React.Component {
  static manifest = Object.freeze({
    sponorQuery: {
      initialValue: {},
    },
    curUser: {},
    sponsors: {
      type: 'okapi',
      records: 'users',
      path: 'users?query=(%{sponorQuery.ids})',
    },
    proxies: {
      type: 'okapi',
      records: 'users',
      path: 'users?query=(proxyFor=!{user.id})',
    },
    user: {
      type: 'okapi',
      path: 'users/%{curUser.id}',
      clear: false,
    },
  });

  constructor(props) {
    super(props);
    this.addSponsor = this.addSponsor.bind(this);
    this.addProxy = this.addProxy.bind(this);
    this.onSelectRow = this.onSelectRow.bind(this);
  }

  // TODO: refactor after join is supported in stripes-connect
  componentWillReceiveProps(nextProps) {
    const { user, resources: { sponorQuery }, mutator } = nextProps;
    const ids = user.proxyFor.map(id => `id=${id}`).join(' or ') || 'id=noid';

    if (sponorQuery.userId !== user.id || sponorQuery.ids !== ids) {
      mutator.sponorQuery.replace({ ids, userId: user.id });
    }
  }

  onSelectRow(event, user) {
    this.props.history.push(getRowURL(user));
  }

  addSponsor(selectedUser) {
    const { user, mutator } = this.props;
    mutator.curUser.replace(user);
    user.proxyFor.push(selectedUser.id);
    mutator.user.PUT(user);
  }

  addProxy(selectedUser) {
    const { user, mutator } = this.props;
    mutator.curUser.replace(selectedUser);
    selectedUser.proxyFor.push(user.id);
    mutator.user.PUT(selectedUser);
  }

  render() {
    const resources = this.props.resources;
    const sponsors = (resources.sponsors || {}).records || [];
    const proxies = (resources.proxies || {}).records || [];
    const disableUserCreation = true;
    const sponsorFormatter = {
      Sponsor: sp => getFullName(sp),
    };
    const proxyFormatter = {
      Proxy: pr => getFullName(pr),
    };

    const { onToggle, accordionId, expanded } = this.props;

    return (
      <Accordion
        open={expanded}
        id={accordionId}
        onToggle={onToggle}
        displayWhenClosed={
          <Badge>{proxies.length + sponsors.length}</Badge>
        }
        label={
          <h2>Proxy</h2>
        }
      >
        <Row>
          <Col xs={12}>
            <MultiColumnList
              id="list-sponsors"
              formatter={sponsorFormatter}
              rowFormatter={getAnchoredRowFormatter}
              visibleColumns={['Sponsor']}
              contentData={sponsors}
              isEmptyMessage="No sponsors found"
              onRowClick={this.onSelectRow}
            />
          </Col>
        </Row>
        { this.props.editable &&
        <Row className="marginTopHalf">
          <Col xs={12}>
            <Pluggable
              aria-haspopup="true"
              type="find-user"
              {...this.props}
              dataKey="sponsors"
              searchLabel="&#43; Add Sponsor"
              searchButtonStyle="primary"
              selectUser={this.addSponsor}
              visibleColumns={['Name', 'Patron Group', 'Username', 'Barcode']}
              disableUserCreation={disableUserCreation}
            />
          </Col>
        </Row>
        }
        <hr />
        <Row>
          <Col xs={12}>
            <MultiColumnList
              id="list-proxies"
              formatter={proxyFormatter}
              rowFormatter={getAnchoredRowFormatter}
              visibleColumns={['Proxy']}
              contentData={proxies}
              isEmptyMessage="No proxies found"
              onRowClick={this.onSelectRow}
            />
          </Col>
        </Row>
        { this.props.editable &&
        <Row className="marginTopHalf">
          <Col xs={12}>
            <Pluggable
              aria-haspopup="true"
              type="find-user"
              {...this.props}
              dataKey="proxies"
              searchLabel="&#43; Add Proxy"
              searchButtonStyle="primary"
              selectUser={this.addProxy}
              visibleColumns={['Name', 'Patron Group', 'Username', 'Barcode']}
              disableUserCreation={disableUserCreation}
            />
          </Col>
        </Row>
        }
      </Accordion>);
  }
}

ProxyPermissions.propTypes = propTypes;

export default ProxyPermissions;
