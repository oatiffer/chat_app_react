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
  Text,
} from '@chakra-ui/react';

const LoginForm = ({ onLogin }) => {
  const schema = yup.object({
    email: yup.string().email('Invalid email address').required('Required'),
    password: yup
      .string()
      .min(8, 'Password must be 8 characters or more')
      .required('Required'),
  });

  const handleSubmit = (values, formikProps) => {
    onLogin(values, formikProps);
  };

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      <Form>
        <VStack spacing={4}>
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
          <Text fontSize="14px" alignSelf="flex-end">
            Don't have an account? <Link to="/register">Register</Link>
          </Text>
          <Button type="submit" letterSpacing={0.5} colorScheme="blue">
            Login
          </Button>
        </VStack>
      </Form>
    </Formik>
  );
};

export default LoginForm;
