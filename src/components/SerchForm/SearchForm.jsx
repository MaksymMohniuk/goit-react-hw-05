import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import styles from "./SearchForm.module.css";

const searchFormSchema = Yup.object().shape({
  searchFilms: Yup.string().required("Search term is required!"),
});

const FORM_INITIAL_VALUES = {
  searchFilms: "",
};

const SearchForm = ({ onSetSearchQuery }) => {
  const handleSubmit = (values, { resetForm }) => {
    if (!values.searchFilms.trim()) {
      toast.error("Необхідно ввести текст для пошуку фільмів");
      return;
    }
    onSetSearchQuery(values.searchFilms);
    resetForm();
  };

  return (
    <div className={styles["search-form-container"]}>
      <Formik
        initialValues={FORM_INITIAL_VALUES}
        validationSchema={searchFormSchema}
        onSubmit={handleSubmit}
      >
        <Form className={styles["search-form"]}>
          <div className={styles["form-group"]}>
            <label htmlFor="searchFilms" className={styles["form-label"]}>
              Search films
            </label>
            <Field
              type="text"
              id="searchFilms"
              name="searchFilms"
              autoComplete="off"
              autoFocus
              placeholder="Search films"
              className={styles["form-control"]}
            />
            <ErrorMessage
              name="searchFilms"
              component="p"
              className={styles["error-message"]}
            />
          </div>
          <button type="submit" className={styles["submit-button"]}>
            Search
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default SearchForm;
