import toast, { Toaster, ToastBar } from "react-hot-toast";
import { Outlet } from "react-router-dom";

import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";

import styles from "./MainLayout.module.scss";
import { NavBar } from "../NavBar";

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
