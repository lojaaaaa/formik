import { useFormik } from "formik";
import { useState } from "react";

// https://esia.gosuslugi.ru/login/password-hidden.d22dbe0d7b7cfe85.svg

//https://esia.gosuslugi.ru/login/password-shown.1aa8293f46527c6c.svg

const validate = (values) =>{
  const errors = {}

  // Валидация имени
  if (!values.name) {
    errors.name = '*Обязательное поле';
  } 
  else if (values.name.length > 15) {
    errors.name = 'Должно быть менее 15 символов';
  }

  // Валидация email
  if (!values.email) {
    errors.email = '*Обязательное поле';
  } 
  else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = 'Email не валидный';
  }

  // Валидация пароля
  if (!values.password) {
    errors.password = '*Обязательное поле';
  } 
  else if (values.password.length < 6) {
    errors.password = "Пароль должен содержать как минимум 6 символов";
  }
  else if (values.password === values.password.toLowerCase()){
    errors.password = "Пароль должен содержать заглавные буквы";
  }

  // Валидация подтверждения пароля
  if (!values.confirmPassword) {
    errors.confirmPassword = '*Обязательное поле';
  } 
  else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = "Пароли не совпадают";
  }


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


  const changeTypePassword = () =>{
    setIsShow(prev => !prev)
    setPasswordType(prev => !prev)
  }

  const [isShow, setIsShow] = useState(false);
  const [passwordType, setPasswordType] = useState(false)

  return (
    <div className="wrapper">
      <h1>My Form</h1>
      <form className="form" onSubmit={formik.handleSubmit}>
        <div className="item">
          <input 
            className='input'
            type="text"
            name="name"
            onBlur={formik.handleBlur}
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
            type={passwordType ? 'text' : 'password'}
            name="password"
            placeholder="Password"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          {formik.errors.password && formik.touched.password && <p>{formik.errors.password}</p>}
          <div onClick={changeTypePassword} className={`img ${isShow ? 'show' : ''}`}></div>
        </div>

        <div className="item">
          <input 
            className='input'
            type={passwordType ? 'text' : 'password'}
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
