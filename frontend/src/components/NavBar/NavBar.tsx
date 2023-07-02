import { Link } from "react-router-dom";

import { AppBar, Toolbar, Button } from "@mui/material";

import styles from "./NavBar.module.scss";

export function NavBar() {
  return (
    <AppBar position="static" className={styles.nav}>
      <Toolbar className={styles.toolbar}>
        <Button color="inherit" component={Link} to="/streamers">
          Streamers
        </Button>
      </Toolbar>
    </AppBar>
  );
}
