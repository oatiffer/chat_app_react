import { useNavigate } from 'react-router-dom';
import { VStack, Heading, Flex } from '@chakra-ui/react';
import RegisterForm from '../forms/RegisterForm.js';
import buildRequest from '../../utils/build-request.js';
import buildFormikErrors from '../../utils/build-formik-errors.js';

const Register = () => {
  const navigate = useNavigate();

  const handleRegister = async (values, formikProps) => {
    try {
      const resp = await buildRequest(
        'post',
        `${process.env.REACT_APP_BASE_URL}/register`,
        null,
        values
      );

      if (resp.errors) {
        const errors = buildFormikErrors(resp.errors);
        formikProps.setErrors(errors);
        return;
      }

      navigate('/login');
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
          Register to Chat
        </Heading>
        <RegisterForm onRegister={handleRegister} />
      </VStack>
    </Flex>
  );
};

export default Register;
