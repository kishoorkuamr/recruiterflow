import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export const ButtonAppBar = () => {
  return (
    <>
      <AppBar
        position="sticky"
        sx={{ top: 0, zIndex: 1100 }}
      >
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Recruiterflow Task
          </Typography>
        </Toolbar>
      </AppBar>
    </>
  );
};
