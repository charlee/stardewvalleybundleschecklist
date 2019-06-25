import React from 'react';
import {
  makeStyles,
  Theme,
  createStyles,
  Typography,
  List,
  ListSubheader,
  ListItem,
  ListItemText,
  ListItemIcon,
  Checkbox,
} from '@material-ui/core';
import checklist from './checklist';

import Icon from './Icon';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 640,
    },

    room: {
      marginTop: 16,
      marginBottom: 8,
    },

    list: {
      background: theme.palette.background.paper,
      boxShadow: theme.shadows[1],
    },

    listTextSecondary: {
      fontSize: 12,
    },

    bundle: {
      display: 'flex',
      flexDirection: 'column',
      lineHeight: 'normal',
      paddingTop: 8,
      paddingBottom: 8,
    },

    bundleName: {
      fontSize: 14,
      fontWeight: 'bold',
    },

    bundleReward: {
      fontSize: 12,
    },
  }),
);

const BundlesChecklist: React.FC = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {checklist.map(room => (
        <React.Fragment key={room.id}>
          <div className={classes.room}>
            <Typography variant="subtitle1">{room.name}</Typography>
            <Typography variant="caption">(Reward: {room.reward})</Typography>
          </div>
          <List className={classes.list}>
            {room.bundles.map(bundle => (
              <React.Fragment key={bundle.id}>
                <ListSubheader className={classes.bundle}>
                  <div className={classes.bundleName}>{bundle.name}</div>
                  <div className={classes.bundleReward}>(Reward: {bundle.reward})</div>
                </ListSubheader>
                {bundle.items.map(item => (
                  <ListItem key={item.id}>
                    <ListItemIcon>
                      <Icon name={item.icon} />
                    </ListItemIcon>
                    <ListItemText
                      classes={{ secondary: classes.listTextSecondary }}
                      primary={item.name + (item.count > 1 ? ` (${item.count})` : '')}
                      secondary={item.description}
                    />
                  </ListItem>
                ))}
              </React.Fragment>
            ))}
          </List>
        </React.Fragment>
      ))}
    </div>
  );
};

export default BundlesChecklist;
