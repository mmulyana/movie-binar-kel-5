import * as yup from 'yup'

const registerSchema = yup.object().shape({
  name: yup.string().required('name is required'),
  email: yup.string().email('Email is required').required('email is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters long'),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
})

const loginSchema = yup.object().shape({
  email: yup.string().email('Email is required').required('email is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters long'),
})

export { loginSchema }
