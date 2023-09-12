import { useFormik } from "formik";



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


const validate = (values) =>{
  const errors = {}
  errors.name = validateName(values.name)
  errors.email = validateEmail(values.email)
  errors.password = validatePassword(values.password)
  errors.confirmPassword = validateConfirmPassword(values.confirmPassword, values.password)

  return errors;
}

function App() {
  const formik = useFormik({
    initialValues: {
      name:'',
      email: '', 
      password: '' ,
      confirmPassword: '',
    },
    validate,
    onSubmit: values => {
      console.log(values)
    }
    
  })


  return (
    <div className="wrapper">
      <h1>My Form</h1>
      <form className="form" onSubmit={formik.handleSubmit}>
        <div className="item">
          <input 
            className='input'
            type="text"
            name="name"
            placeholder="Enter your name"
            onChange={formik.handleChange}
            value={formik.values.name}
          />
          {formik.errors.name && formik.touched.name && <p>{formik.errors.name}</p>}
        </div>

        <div className="item">
          <input 
            className='input'
            type="email"
            onBlur={formik.handleBlur}
            name="email"
            placeholder="Email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          {formik.errors.email && formik.touched.email && <p>{formik.errors.email}</p>}
        </div>

        <div className="item">
          <input 
            className='input'
            type="password"
            name="password"
            placeholder="Password"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          {formik.errors.password && formik.touched.password && <p>{formik.errors.password}</p>}
        </div>

        <div className="item">
          <input 
            className='input'
            type="password"
            name="confirmPassword"
            placeholder="Confirm your password"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.confirmPassword}
          />
          {formik.errors.confirmPassword && formik.touched.confirmPassword && <p>{formik.errors.confirmPassword}</p>}
        </div>

        <button className="button" type="submit">Submit</button>
      </form>
    </div>
  )
}

export default App
