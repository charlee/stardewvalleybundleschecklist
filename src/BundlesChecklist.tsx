import React from 'react';
import classNames from 'classnames';
import {
  withStyles,
  WithStyles,
  Theme,
  createStyles,
  Typography,
  List,
  ListSubheader,
} from '@material-ui/core';
import checklist from './checklist';

import CheckItem from './CheckItem';

const styles = (theme: Theme) =>
  createStyles({
    root: {
    },

    room: {
      marginTop: 16,
      marginBottom: 8,
    },

    list: {
      background: theme.palette.background.paper,
      boxShadow: theme.shadows[1],
    },

    bundle: {
      display: 'flex',
      flexDirection: 'row',
      lineHeight: 'normal',
      paddingTop: 8,
      paddingBottom: 8,
    },

    completedBundle: {
      background: theme.palette.grey[300],
      color: theme.palette.grey[500],
    },

    bundleLeft: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
    },

    bundleRight: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: 16,
      fontWeight: 'bold',
    },

    bundleName: {
      fontSize: 14,
      fontWeight: 'bold',
    },

    bundleReward: {
      fontSize: 12,
    },
  });

export type CheckedState = { [key: number]: boolean };
type ChangeHandler = (checked: boolean) => void;

export interface IProps extends WithStyles<typeof styles> {
  checkedState: CheckedState;
  onCheckedStateChange: (newState: CheckedState) => void;
}

class BundlesChecklist extends React.Component<IProps> {
  changeHandlers: { [id: number]: ChangeHandler } = {};

  handleChecked = (id: number) => {
    if (!this.changeHandlers[id]) {
      this.changeHandlers[id] = (checked: boolean) => {
        this.props.onCheckedStateChange({ ...this.props.checkedState, [id]: checked });
      };
    }

    return this.changeHandlers[id];
  };

  render() {
    const { classes, checkedState } = this.props;

    return (
      <div className={classes.root}>
        {checklist.map(room => (
          <React.Fragment key={room.id}>
            <div className={classes.room}>
              <Typography variant="subtitle1">{room.name}</Typography>
              <Typography variant="caption">(Reward: {room.reward})</Typography>
            </div>
            <List className={classes.list} dense>
              {room.bundles.map(bundle => (
                <React.Fragment key={bundle.id}>
                  <ListSubheader
                    className={classNames({
                      [classes.bundle]: true,
                      [classes.completedBundle]:
                        bundle.items.filter(item => checkedState[item.id]).length >=
                        bundle.items_required,
                    })}
                  >
                    <div className={classes.bundleLeft}>
                      <div className={classes.bundleName}>{bundle.name}</div>
                      <div className={classes.bundleReward}>
                        (Reward: {bundle.reward})
                      </div>
                    </div>
                    <div className={classes.bundleRight}>
                      {bundle.items.filter(item => checkedState[item.id]).length}/
                      {bundle.items_required}
                    </div>
                  </ListSubheader>
                  {bundle.items.map(item => (
                    <CheckItem
                      key={item.id}
                      item={item}
                      checked={checkedState[item.id]}
                      onChange={this.handleChecked(item.id)}
                    />
                  ))}
                </React.Fragment>
              ))}
            </List>
          </React.Fragment>
        ))}
      </div>
    );
  }
}

export default withStyles(styles)(BundlesChecklist);
