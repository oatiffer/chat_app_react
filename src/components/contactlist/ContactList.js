import {
  Circle,
  Stack,
  HStack,
  Heading,
  VStack,
  IconButton,
} from '@chakra-ui/react';
import { FiMoreHorizontal } from 'react-icons/fi';

import Contact from './Contact.js';
import { GroupIco } from '../icons/CustomIcons.js';

const ContactList = ({ loggedUser, contacts, handleRender }) => {
  return (
    <Stack
      h="full"
      width={538}
      spacing={0}
      direction="column"
      alignItems="center"
    >
      <HStack
        width={464}
        marginBlockStart={5}
        marginBlockEnd={2}
        justifyContent="space-between"
      >
        <HStack spacing={4}>
          <Circle boxSize={8} bg="purple.500">
            <GroupIco />
          </Circle>
          <Heading
            as="h2"
            size="xs"
            letterSpacing={0.5}
            fontWeight={400}
            color="blackAlpha.600"
          >
            Contact List
          </Heading>
        </HStack>
        <IconButton bg="none">
          <FiMoreHorizontal size={22} color="gray" />
        </IconButton>
      </HStack>
      <VStack h={720} spacing={0} alignItems="center" overflow="auto">
        {contacts.map(contact => {
          return (
            <Contact
              key={contact.id}
              id={contact.id}
              loggedIn={contact.loggedIn}
              name={contact.name}
              token={contact.tokens[contact.tokens.length - 1]}
              loggedUser={loggedUser}
              handleRender={handleRender}
            />
          );
        })}
      </VStack>
    </Stack>
  );
};

export default ContactList;
