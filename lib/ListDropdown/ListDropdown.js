import _ from 'lodash';
// We have to remove node_modules/react to avoid having multiple copies loaded.
// eslint-disable-next-line import/no-unresolved
import React from 'react';
import List from '@folio/stripes-components/lib/List';
import TextField from '@folio/stripes-components/lib/TextField';
import Icon from '@folio/stripes-components/lib/Icon';
import css from './ListDropdown.css';

function ListDropdown(props) {
  const handleItemClick = item => props.onClickItem(item);
  const handleSearchChange = e => props.onChangeSearch(e);

  const permissionDDFormatter = item => (
    <li key={item.permissionName} >
      <button type="button" className={css.itemControl} onClick={() => { handleItemClick(item); }}>
        {(!item.displayName ?
          item.permissionName :
          (!_.get(props, ['stripes', 'config', 'showPerms']) ?
           item.displayName :
           `${item.displayName} (${item.permissionName})`))}
      </button>
    </li>
  );

  return (
    <div>
      <TextField
        noBorder
        placeholder="Search"
        startControl={<Icon icon="search" />}
        onChange={handleSearchChange}
      />
      <List
        itemFormatter={permissionDDFormatter}
        items={props.items.sort((a, b) => a.permissionName < b.permissionName ? -1 : 1)}
        listClass={css.ListDropdown}
      />
    </div>
  );
}

ListDropdown.propTypes = {
  onChangeSearch: React.PropTypes.func.isRequired,
  items: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  stripes: React.PropTypes.shape({
    config: React.PropTypes.shape({
      showPerms: React.PropTypes.bool,
    }),
  }).isRequired,
};

export default ListDropdown;
