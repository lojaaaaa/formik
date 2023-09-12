import { ErrorMessage, Field, Form, Formik } from "formik";


function App() {

  const validateEmail = (value) =>{
    if (!value) {
      return'*Обязательное поле';
    } 
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
      return 'Email не валидный';
    }
    return null;
  }

  const validateName = (value) => !value ? '*Обязательное поле': null

  const validatePassword = (value) =>{

    if (!value) {
      return "*Обязательное поле";
    } 
    else if (value.length < 2) {
      return "Пароль должен содержать как минимум 2 символов";
    }
    else if (value === value.toLowerCase()){
      return "Пароль должен содержать заглавные буквы";
    }
    return null;
  }

  const validateConfirmPassword = (value, password) => {
    if (!value) {
      return "*Обязательное поле";
    } else if (value !== password) {
      return "Пароли не совпадают";
    }
    return null;
  };


  return (
    <div className="wrapper">
      <h1>My Form</h1>
      <Formik

        initialValues={{ 
          name:'',
          email: '', 
          password: '' ,
          confirmPassword: '',
        }}

        validate={values => {
          const errors = {}

          errors.name = validateName(values.name)
          errors.email = validateEmail(values.email)
          errors.password = validatePassword(values.password)
          errors.confirmPassword = validateConfirmPassword(values.confirmPassword, values.password)

          return errors;
        }}

        onSubmit={(values) => console.log("Form is validated! Submitting the form...", values)}

      >

        {() => (
          <Form className="form">
            <Field className='input' type="text" name="name" placeholder="Enter your name"/>
            <ErrorMessage name="name" component="div" />

            <Field className='input' type="email" name="email" placeholder="Email"/>
            <ErrorMessage name="email" component="div" />

            <Field className='input' type="password" name="password" placeholder="Password"/>
            <ErrorMessage name="password" component="div" />

            <Field className='input' type="password" name="confirmPassword" placeholder="Confirm your password"/>
            <ErrorMessage name="confirmPassword" component="div" />

            <button className='button' type="submit">
              Submit
            </button>
          </Form>
        )}

      </Formik>
    </div>
  )
}

export default App
