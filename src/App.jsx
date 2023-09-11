import { ErrorMessage, Field, Form, Formik } from "formik";


function App() {

  const validateEmail = (value) =>{
    const errors = {};
    if (!value) {
      errors.email = 'Requiredfgfgfgg';
    } 
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
      errors.email = 'Invalid email address';
    }
    return errors;
  }

  return (
    <div className="wrapper">
      <h1>My Form</h1>
      <Formik
        initialValues={{ 
          name:'',
          email: '', 
          password: '' ,
          confirmPassword: ''
        }}

        validate={values => {
          const errors = {}

          if (!values.name) {
            errors.name = 'Required';
          } 
          if (!values.email) {
            errors.email = 'Required';
          } 
          if (!values.password) {
            errors.password = 'Required';
          } 
          else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
            errors.email = 'Invalid email address';
          }
          return errors;
        }}

        onSubmit={(values) => console.log(values)}
      >

        {({ isSubmitting }) => (
          <Form className="form">
            <Field className='input' type="text" name="name" placeholder="Enter your name"/>
            <ErrorMessage name="name" component="div" />

            <Field className='input' type="email" name="email" placeholder="Email"/>
            <ErrorMessage name="email" component="div" />

            <Field className='input' type="password" name="password" placeholder="Password"/>
            <ErrorMessage name="password" component="div" />

            <Field className='input' type="password" name="confirmPassword" placeholder="Confirm your password"/>
            <ErrorMessage name="confirmPassword" component="div" />

            <button className='button' type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}

      </Formik>
    </div>
  )
}

export default App
