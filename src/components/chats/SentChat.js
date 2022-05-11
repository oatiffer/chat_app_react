import {
  Avatar,
  AvatarBadge,
  Flex,
  Heading,
  HStack,
  VStack,
  Stack,
  Text,
} from '@chakra-ui/react';
import { BiUser } from 'react-icons/bi';

const SentChat = ({ online, heading, text, chat }) => {
  return (
    <Stack width={742} paddingInline={8} direction="column" spacing={4}>
      <HStack spacing={6} justifyContent="flex-end">
        <VStack alignItems="flex-end">
          <Heading fontSize="14px" letterSpacing={0.5}>
            {heading}
          </Heading>
          <Text fontSize="9px" letterSpacing={0.5}>
            {text}
          </Text>
        </VStack>
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
      </HStack>
      <VStack alignItems="flex-end">
        <Flex
          h="max-content"
          width={300}
          bg="blue.500"
          alignItems="center"
          paddingBlock={3}
          paddingInline={4}
          rounded={24}
          roundedTopRight={0}
        >
          <Text color="white" fontSize="12px" letterSpacing={0.3}>
            {chat}
          </Text>
        </Flex>
      </VStack>
    </Stack>
  );
};

export default SentChat;
