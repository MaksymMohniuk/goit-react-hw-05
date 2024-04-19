import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";

const searchFormSchema = Yup.object().shape({
  searchFilms: Yup.string().required("Search term is required!"),
});

const FORM_INITIAL_VALUES = {
  searchFilms: "",
};

const SearchForm = ({ onSetSearchQuery }) => {
  const handleSubmit = (values) => {
    if (!values.searchFilms.trim()) {
      toast.error("Необхідно ввести текст для пошуку фільмів");
      return;
    }
    onSetSearchQuery(values.searchFilms);
  };

  return (
    <div>
      <Formik
        initialValues={FORM_INITIAL_VALUES}
        validationSchema={searchFormSchema}
        onSubmit={handleSubmit}
      >
        <header>
          <Form>
            <div>
              <label>
                <Field
                  type="text"
                  name="searchFilms"
                  autoComplete="off"
                  autoFocus
                  placeholder="Search films"
                />
                <ErrorMessage component="p" name="searchFilms" />
              </label>
            </div>
            <button type="submit">Search</button>
          </Form>
        </header>
      </Formik>
    </div>
  );
};

export default SearchForm;
