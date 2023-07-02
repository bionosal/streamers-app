import { Link } from "react-router-dom";

import { AppBar, Toolbar, Button } from "@mui/material";

import styles from "./NavBar.module.scss";

/**
 * The NavBar component represents the navigation bar in the application.
 * It includes an AppBar component from the Material-UI library with a toolbar.
 * The navigation bar contains a button that serves as a link to the "/streamers" route.
 *
 * @returns {JSX.Element} The rendered NavBar component
 */
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
