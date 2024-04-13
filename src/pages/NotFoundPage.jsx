import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div>
      <h1>The page, that you visisted does not exist</h1>
      <Link to="/">Go home</Link>
    </div>
  );
};

export default NotFoundPage;
