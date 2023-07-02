import styles from "./NoMatch.module.scss";

/**
 * The NoMatch component represents a page for handling 404 errors or when a route is not found.
 * It renders a simple message indicating that the page was not found.
 *
 * @returns {JSX.Element} The rendered NoMatch component
 */
export function NoMatch() {
  return <div className={styles.container}>Page not found</div>;
}
