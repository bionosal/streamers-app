import toast, { Toaster, ToastBar } from "react-hot-toast";
import { Outlet } from "react-router-dom";

import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";

import styles from "./MainLayout.module.scss";
import { NavBar } from "../NavBar";

/**
 * The MainLayout component represents the main layout structure of the application.
 * It includes a navigation bar, a main content area, and a toast notification container.
 * The content rendered by the router is displayed within the main content area.
 * Toast notifications are shown using the react-hot-toast library.
 * The toast notifications include an icon, a message, and a close button to dismiss them.
 */
export function MainLayout() {
  return (
    <div className={styles.layout}>
      <NavBar />
      <main className={styles.main}>
        <Outlet />
      </main>
      <Toaster>
        {(t) => (
          <ToastBar toast={t}>
            {({ icon, message }) => (
              <>
                {icon}
                {message}
                <IconButton onClick={() => toast.dismiss(t.id)} size="small">
                  <CloseIcon fontSize="small" />
                </IconButton>
              </>
            )}
          </ToastBar>
        )}
      </Toaster>
    </div>
  );
}
