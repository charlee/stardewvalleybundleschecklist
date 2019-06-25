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
import Github from './Github';

const COOKIE_NAME: string = 'svbc_state';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      background: theme.palette.background.default,
    },

    body: {
      padding: 16,
    },

    content: {
      marginLeft: 'auto',
      marginRight: 'auto',
      maxWidth: 640,
    },

    title: {
      flex: 1,
    },

    footer: {
      textAlign: 'center',
      fontSize: 12,
      marginTop: 40,
      borderTop: `1px solid ${theme.palette.divider}`,
      paddingTop: 24,
      marginBottom: 48,
      color: theme.palette.grey[500],
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
      <div className={classes.footer}>
        <p>
          Stardew Valley Bundles Checklist developed by{' '}
          <a href="https://github.com/charlee" target="_blank">
            Charlee Li
          </a>
          . The source code is licensed under MIT.
        </p>
        <p>
          Bundle and Item information is from the{' '}
          <a href="https://stardewvalleywiki.com/Bundles" target="_blank">
            Stardew Valley Wiki
          </a>{' '}
          and is used under the{' '}
          <a href="http://creativecommons.org/licenses/by-nc-sa/3.0/" target="_blank">
            CC BY-NC-SA 3.0
          </a>{' '}
          License.
        </p>
        <p>
          Stardew Valley &copy;{' '}
          <a href="https://chucklefish.org/" target="_blank">
            Chucklefish LTD.
          </a>{' '}
          Developed by{' '}
          <a href="https://twitter.com/ConcernedApe" target="_blank">
            ConcernedApe
          </a>
          .
        </p>
        <p><Github link="https://github.com/charlee/stardewvalleybundleschecklist"/></p>
      </div>
    </div>
  );
};

export default App;
