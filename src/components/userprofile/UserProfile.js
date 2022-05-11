import { BiUser } from 'react-icons/bi';

import {
  Avatar,
  AvatarBadge,
  Heading,
  HStack,
  IconButton,
  Text,
  Stack,
  VStack,
} from '@chakra-ui/react';


const UserProfile = ({ online, heading, text, profileProps }) => {
  return (
    <Stack
      w={profileProps.width}
      h={profileProps.height}
      borderBottom={profileProps.border ? 1 : 0}
      borderBottomStyle="solid"
      borderBottomColor="blackAlpha.200"
      paddingBlock={8}
      paddingInline={6}
      justifyContent="space-between"
      direction="row"
    >
      <HStack spacing={4}>
        <Avatar
          boxSize={12}
          bg="blackAlpha.400"
          icon={<BiUser fontSize="1.5rem" color="gray" />}
        >
          <AvatarBadge
            boxSize={2}
            bg={online ? 'green.300' : 'red.400'}
            border="none"
            position="absolute"
            insetBlockEnd={1}
            insetInlineEnd={1.5}
          />
        </Avatar>
        <VStack alignItems="flex-start">
          <Heading as="h2" size="xs" letterSpacing={0.5}>
            {heading}
          </Heading>
          <Text fontSize="xs" letterSpacing={0.3} color="blackAlpha.500">
            {text}
          </Text>
        </VStack>
      </HStack>
      <HStack spacing={4}>
        <IconButton
          bg="blackAlpha.100"
          boxSize={12}
          rounded="full"
          icon={profileProps.icon1}
        ></IconButton>
        <IconButton
          bg="blackAlpha.100"
          boxSize={12}
          rounded="full"
          icon={profileProps.icon2}
        ></IconButton>
        <IconButton
          bg="blackAlpha.100"
          boxSize={12}
          rounded="full"
          icon={profileProps.icon3}
        ></IconButton>
      </HStack>
    </Stack>
  );
};

export default UserProfile;
