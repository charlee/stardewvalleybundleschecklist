import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import {
  makeStyles,
  Theme,
  createStyles,
  AppBar,
  Toolbar,
  Typography,
  Button,
} from '@material-ui/core';
import BundlesChecklist, { CheckedState } from './BundlesChecklist';

const COOKIE_NAME: string = 'svbc_state';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},

    body: {
      padding: 16,
      background: theme.palette.background.default,
    },

    content: {
      marginLeft: 'auto',
      marginRight: 'auto',
      maxWidth: 640,
    },

    title: {
      flex: 1,
    },
  }),
);

const App: React.FC = () => {
  const classes = useStyles();

  const [checkedState, setCheckedState] = useState<CheckedState>({});

  useEffect(() => {
    try {
      setCheckedState(JSON.parse(Cookies.get(COOKIE_NAME) || '{}') as CheckedState);
    } catch {}
  }, []);

  useEffect(() => {
    Cookies.set(COOKIE_NAME, JSON.stringify(checkedState));
  });

  const handleReset = () => setCheckedState({});

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Stardew Valley Bundles Checklist
          </Typography>
          <Button color="inherit" onClick={handleReset}>
            Reset
          </Button>
        </Toolbar>
      </AppBar>
      <div className={classes.body}>
        <div className={classes.content}>
          <BundlesChecklist
            checkedState={checkedState}
            onCheckedStateChange={setCheckedState}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
