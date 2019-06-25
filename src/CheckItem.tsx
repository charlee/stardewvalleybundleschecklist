import React from 'react';
import classNames from 'classnames';
import {
  withStyles,
  WithStyles,
  Theme,
  createStyles,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@material-ui/core';
import Icon from './Icon';
import { Item } from './checklist';

import { CheckCircle } from '@material-ui/icons';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      cursor: 'pointer',
    },

    listTextSecondary: {
      fontSize: 12,
      color: 'inherit',
    },

    completedItem: {
      background: theme.palette.grey[300],
      color: theme.palette.grey[500],
      textDecoration: 'line-through',
    },
  });

export interface IProps extends WithStyles<typeof styles> {
  item: Item;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

class CheckItem extends React.Component<IProps> {
  shouldComponentUpdate(nextProps: IProps) {
    return this.props.checked !== nextProps.checked;
  }

  render() {
    const { classes, item, checked, onChange } = this.props;

    return (
      <ListItem
        className={classNames({ [classes.root]: true, [classes.completedItem]: checked })}
        onClick={() => onChange(!checked)}
      >
        <ListItemIcon>
          {checked ? <CheckCircle /> : <Icon name={item.icon} />}
        </ListItemIcon>
        <ListItemText
          classes={{ secondary: classes.listTextSecondary }}
          primary={item.name + (item.count > 1 ? ` (${item.count})` : '')}
          secondary={item.description}
        />
      </ListItem>
    );
  }
}

export default withStyles(styles)(CheckItem);
