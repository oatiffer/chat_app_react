import {
  Avatar,
  AvatarBadge,
  Circle,
  Heading,
  Text,
  Stack,
  HStack,
  VStack,
} from '@chakra-ui/react';
import { BiUser } from 'react-icons/bi';
import { useState } from 'react';
import buildRequest from '../../utils/build-request';

const Contact = ({
  id,
  loggedIn,
  name,
  token,
  handleRender,
  loggedUser
}) => {
  const [color, setColor] = useState({
    bg: 'transparent',
    heading: 'black',
    text: 'blackAlpha.500',
    time: 'black',
  });

  const handleMouseDown = () => {
    setColor({
      bg: 'blue.400',
      heading: 'white',
      text: 'whiteAlpha.700',
      time: 'whiteAlpha.700',
    });
  };

  const handleBlur = () => {
    setColor({
      bg: 'transparent',
      heading: 'black',
      text: 'blackAlpha.500',
      time: 'black',
    });
  };

  let room = null;

  const handleClick = async () => {
    const accessToken = localStorage.getItem('access_token');
    const roomName = `room-${[loggedUser.id, id].sort().join('-')}`;

    try {
      room = await buildRequest(
        'post',
        `${process.env.REACT_APP_BASE_URL}/api/rooms`,
        accessToken,
        { name: roomName }
      );

      if (!room.response) {
        room = await buildRequest(
          'get',
          `${process.env.REACT_APP_BASE_URL}/api/rooms`,
          accessToken,
        );

        room = room.filter(r => r.name === roomName)[0];
      }
    } catch (error) {
      console.log(error);
    }
    handleRender(true, room, { id, loggedIn, name, token });
  };

  return (
    <Stack
      as="button"
      onMouseDown={handleMouseDown}
      onBlur={handleBlur}
      onClick={handleClick}
      width={480}
      bg={color.bg}
      rounded={24}
      paddingBlock={2}
      paddingInline={4}
      direction="row"
      alignItems="center"
      justifyContent="space-between"
    >
      <HStack spacing={6}>
        <Avatar
          boxSize={16}
          bg="#C4C4C4"
          icon={<BiUser fontSize="1.5rem" color="gray" />}
        >
          <AvatarBadge
            boxSize={2.5}
            bg={loggedIn ? 'green.300' : 'red.400'}
            border="none"
            position="absolute"
            insetBlockEnd={1}
            insetInlineEnd={2.5}
          />
        </Avatar>
        <VStack alignItems="flex-start">
          <Heading
            as="h2"
            fontSize="14px"
            letterSpacing={0.5}
            color={color.heading}
            marginBlockStart={1}
          >
            {name}
          </Heading>
          <Text fontSize="12px" letterSpacing={0.3} color={color.text}>
            Placeholder
          </Text>
        </VStack>
      </HStack>
      <VStack spacing={3}>
        <Text fontSize="10px" color={color.text}>
          12:50
        </Text>
        <Circle
          color="white"
          fontSize="10px"
          fontWeight={600}
          boxSize={5}
          bg="red.400"
        >
          2
        </Circle>
      </VStack>
    </Stack>
  );
};

export default Contact;
