import React from 'react';
import PropTypes from 'prop-types';
import RenderPermissions from './lib/RenderPermissions';

const propTypes = {
  resources: PropTypes.shape({
    userPermissions: PropTypes.shape({
      records: PropTypes.arrayOf(PropTypes.object),
    }),
    availablePermissions: PropTypes.shape({
      records: PropTypes.arrayOf(PropTypes.object),
    }),
  }).isRequired,
  mutator: PropTypes.shape({
    userPermissions: PropTypes.shape({
      POST: PropTypes.func.isRequired,
      DELETE: PropTypes.func.isRequired,
    }),
  }),
};

class UserPermissions extends React.Component {
  static manifest = Object.freeze({
    availablePermissions: {
      type: 'okapi',
      records: 'permissions',
      path: 'perms/permissions?length=1000',
    },
    userPermissions: {
      type: 'okapi',
      records: 'permissionNames',
      DELETE: {
        pk: 'permissionName',
        path: 'perms/users/:{username}/permissions',
      },
      GET: {
        path: 'perms/users/:{username}/permissions?full=true',
      },
      path: 'perms/users/:{username}/permissions',
    },
  });

  constructor(props) {
    super(props);

    this.addPermission = this.addPermission.bind(this);
    this.removePermission = this.removePermission.bind(this);
  }

  addPermission(perm) {
    this.props.mutator.userPermissions.POST(perm);
  }

  removePermission(perm) {
    this.props.mutator.userPermissions.DELETE(perm);
  }

  render() {
    const resources = this.props.resources;
    const availablePermissions = (resources.availablePermissions || {}).records || [];
    const userPermissions = (resources.userPermissions || {}).records || [];

    return (<RenderPermissions
      {...this.props}
      heading="User Permissions"
      permToRead="perms.users.get"
      permToDelete="perms.users.item.delete"
      permToModify="perms.users.item.post"
      addPermission={this.addPermission}
      removePermission={this.removePermission}
      availablePermissions={availablePermissions}
      listedPermissions={userPermissions}
    />);
  }
}

UserPermissions.propTypes = propTypes;

export default UserPermissions;
