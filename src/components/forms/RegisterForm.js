import * as yup from 'yup';
import { Link } from 'react-router-dom';
import { Form, Formik, FastField } from 'formik';
import {
  Button,
  VStack,
  FormControl,
  Input,
  FormLabel,
  FormErrorMessage,
  Text
} from '@chakra-ui/react';

const RegisterForm = ({ onRegister }) => {
  const schema = yup.object({
    name: yup.string().required('Required'),
    email: yup.string().email('Invalid email address').required('Required'),
    password: yup
      .string()
      .min(8, 'Password must be 8 characters or more')
      .required('Required'),
    password_confirmation: yup
      .string()
      .min(8, 'Password must be 8 characters or more')
      .required('Required')
      .oneOf([yup.ref('password'), null], 'Passwords must match'),
  });

  const handleSubmit = (values, formikProps) => {
    onRegister(values, formikProps);
  };

  return (
    <Formik
      initialValues={{
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
      }}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      <Form>
        <VStack spacing={4}>
          <FastField name="name">
            {({ field, meta }) => {
              return (
                <FormControl isInvalid={meta.error && meta.touched}>
                  <FormLabel htmlFor="name" color="blackAlpha.700">
                    Name:
                  </FormLabel>
                  <Input
                    id="name"
                    width={460}
                    fontSize="14px"
                    rounded={48}
                    placeholder="Please enter your name"
                    {...field}
                  />
                  <FormErrorMessage paddingInlineStart={4}>
                    {meta.error}
                  </FormErrorMessage>
                </FormControl>
              );
            }}
          </FastField>
          <FastField name="email">
            {({ field, meta }) => {
              return (
                <FormControl isInvalid={meta.error && meta.touched}>
                  <FormLabel htmlFor="email" color="blackAlpha.700">
                    Email:
                  </FormLabel>
                  <Input
                    id="email"
                    type="email"
                    width={460}
                    fontSize="14px"
                    rounded={48}
                    placeholder="Please enter your email"
                    {...field}
                  />
                  <FormErrorMessage paddingInlineStart={4}>
                    {meta.error}
                  </FormErrorMessage>
                </FormControl>
              );
            }}
          </FastField>
          <FastField name="password">
            {({ field, meta }) => {
              return (
                <FormControl isInvalid={meta.error && meta.touched}>
                  <FormLabel htmlFor="password" color="blackAlpha.700">
                    Password:
                  </FormLabel>
                  <Input
                    id="password"
                    type="password"
                    width={460}
                    fontSize="14px"
                    rounded={48}
                    placeholder="Please enter your password"
                    {...field}
                  />
                  <FormErrorMessage paddingInlineStart={4}>
                    {meta.error}
                  </FormErrorMessage>
                </FormControl>
              );
            }}
          </FastField>
          <FastField name="password_confirmation">
            {({ field, meta }) => {
              return (
                <FormControl isInvalid={meta.error && meta.touched}>
                  <FormLabel
                    htmlFor="password_confirmation"
                    color="blackAlpha.700"
                  >
                    Confirm password:
                  </FormLabel>
                  <Input
                    type="password"
                    width={460}
                    fontSize="14px"
                    rounded={48}
                    placeholder="Please confirm your password"
                    {...field}
                  />
                  <FormErrorMessage paddingInlineStart={4}>
                    {meta.error}
                  </FormErrorMessage>
                </FormControl>
              );
            }}
          </FastField>
          <Text fontSize="14px" alignSelf="flex-end">
            Already have an account? <Link to="/login">Login</Link>
          </Text>
          <Button type="submit" letterSpacing={0.5} colorScheme="blue">
            Register
          </Button>
        </VStack>
      </Form>
    </Formik>
  );
};

export default RegisterForm;
