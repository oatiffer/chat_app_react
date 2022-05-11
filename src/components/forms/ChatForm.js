import * as yup from 'yup';
import { GrEmoji } from 'react-icons/gr';
import { Formik, Form, FastField } from 'formik';
import {
  Divider,
  Stack,
  FormControl,
  FormErrorMessage,
  IconButton,
  Input,
} from '@chakra-ui/react';

import { SendIco } from '../icons/CustomIcons.js';

const ChatForm = ({ onChatSent }) => {
  const schema = yup.object({
    message: yup
      .string()
      .max(200, 'Message must be 200 characters or less')
      .required(),
  });

  const handleSubmit = (values, formikProps) => {
    onChatSent(values, formikProps);
    formikProps.resetForm();
  };

  return (
    <Stack
      h="72px"
      width={680}
      bg="white"
      rounded={48}
      spacing={7}
      direction="row"
      alignItems="center"
      paddingInlineStart={8}
      paddingInlineEnd={3}
      position="relative"
    >
      <GrEmoji color="gray" size={28} />
      <Divider h="32px" color="black" orientation="vertical" />
      <Formik
        initialValues={{
          message: '',
        }}
        validationSchema={schema}
        onSubmit={handleSubmit}
      >
        <Form>
          <FastField name="message" autoComplete="false">
            {({ field, meta }) => {
              return (
                <FormControl>
                  <Input
                    width={460}
                    border="none"
                    fontSize="14px"
                    color={!meta.error ? 'gray' : 'red.300'}
                    rounded={48}
                    focusBorderColor="none"
                    autoComplete="false"
                    placeholder="Type Your Message Here..."
                    {...field}
                  />
                  <FormErrorMessage>{meta.error}</FormErrorMessage>
                </FormControl>
              );
            }}
          </FastField>
          <IconButton
            type="submit"
            boxSize={16}
            marginInline={2}
            rounded="full"
            colorScheme="blue"
            position="absolute"
            insetBlockStart={1}
            insetInlineEnd={0}
          >
            <SendIco />
          </IconButton>
        </Form>
      </Formik>
    </Stack>
  );
};

export default ChatForm;
