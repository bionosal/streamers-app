import { Route, Routes } from "react-router-dom";

import { MainLayout, NoMatch } from "../components";
import { StreamerDetails, StreamerList } from "../pages";

/**
 * Component for defining the routes of the application.
 *
 * This component uses the `Routes` and `Route` components from the `react-router-dom` library
 * to define the different routes of the application.
 * It renders the `MainLayout` component as the parent layout for all routes.
 * The routes include:
 * - "/streamers" - Renders the `StreamerList` component
 * - "/streamers/:id" - Renders the `StreamerDetails` component
 * - "*" - Renders the `NoMatch` component for any other route not specified above
 *
 * @returns {JSX.Element} The rendered AppRoutes component
 */
export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="streamers" element={<StreamerList />} />
        <Route path="Streamers/:id" element={<StreamerDetails />} />
        <Route path="*" element={<NoMatch />} />
      </Route>
    </Routes>
  );
}
