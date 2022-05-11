import { useNavigate } from 'react-router-dom';
import { VStack, Heading, Flex } from '@chakra-ui/react';
import LoginForm from '../forms/LoginForm.js';
import buildRequest from '../../utils/build-request.js';
import buildFormikErrors from '../../utils/build-formik-errors.js';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = async (values, formikProps) => {
    try {
      const resp = await buildRequest(
        'post',
        `${process.env.REACT_APP_BASE_URL}/login`,
        null,
        values
      );

      if (resp.errors) {
        const errors = buildFormikErrors(resp.errors);
        formikProps.setErrors(errors);
        return;
      }

      localStorage.setItem('access_token', resp.access_token);

      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Flex
      h="100vh"
      bg="blackAlpha.200"
      paddingBlock={5}
      alignItems="center"
      justifyContent="center"
    >
      <VStack
        h="936px"
        p={0}
        bg="white"
        width={1280}
        rounded={18}
        spacing={4}
        justifyContent="center"
      >
        <Heading fontSize={32} color="blackAlpha.700">
          Chat Login
        </Heading>
        <LoginForm onLogin={handleLogin} />
      </VStack>
    </Flex>
  );
};

export default Login;
