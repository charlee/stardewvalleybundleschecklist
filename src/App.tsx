import React from 'react';
import {
  makeStyles,
  Theme,
  createStyles,
  AppBar,
  Toolbar,
  Typography,
} from '@material-ui/core';
import BundlesChecklist from './BundlesChecklist';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},

    body: {
      padding: 16,
      background: theme.palette.background.default,
    },
  }),
);

const App: React.FC = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Stardew Valley Bundles Checklist</Typography>
        </Toolbar>
      </AppBar>
      <div className={classes.body}>
        <BundlesChecklist />
      </div>
    </div>
  );
};

export default App;
