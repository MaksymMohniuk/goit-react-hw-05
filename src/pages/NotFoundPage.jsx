import { Link } from "react-router-dom";
import styles from "./NotFoundPage.module.css";

const NotFoundPage = () => {
  return (
    <div className={styles["page-container"]}>
      <h1 className={styles["error-message"]}>
        The page you visited does not exist
      </h1>
      <Link to="/" className={styles["go-home-link"]}>
        Go home
      </Link>
    </div>
  );
};

export default NotFoundPage;
