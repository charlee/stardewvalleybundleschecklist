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
    root: {},
  }),
);

const BundlesChecklist: React.FC = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {checklist.map(room => (
        <React.Fragment key={room.id}>
          <Typography variant="caption">{room.name}</Typography>
          <List>
            {room.bundles.map(bundle => (
              <React.Fragment key={bundle.id}>
                <ListSubheader>{bundle.name}</ListSubheader>
                {bundle.items.map(item => (
                  <ListItem key={item.id}>
                    <ListItemIcon>
                      <Checkbox />
                    </ListItemIcon>
                    <ListItemIcon>
                      <Icon name={item.icon} />
                    </ListItemIcon>
                    <ListItemText primary={item.name} />
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
