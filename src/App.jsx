import { useFormik } from "formik";
import { useState } from "react";
import * as yup from 'yup'


const validationSchema  = yup.object().shape({
  name: yup
    .string()
    .required('*Обязательное поле')
    .max(15, 'Должно быть менее 15 символов'),
  email: yup
    .string()
    .required('*Обязательное поле')
    .email('Email не валидный'),
  password: yup
    .string()
    .required('*Обязательное поле')
    .min(6, 'Пароль должен содержать как минимум 6 символов')
    .test('has-uppercase', 'Пароль должен содержать заглавные буквы', 
      (value) => /[A-Z]/.test(value)),
  confirmPassword: yup
    .string()
    .required('*Обязательное поле')
    .oneOf([yup.ref('password')], 'Пароли не совпадают'),
})

function App() {

  const formik = useFormik({
    initialValues: {
      name:'',
      email: '', 
      password: '' ,
      confirmPassword: '',
    },
    validationSchema,
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
      <section className="content">
        <div className="content__container container">
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
      </section>

    </div>
  )
}

export default App
