import {
  Box,
  Button,
  Flex,
  Container,
  Stack,
  VStack,
  Spinner,
} from '@chakra-ui/react';
import {
  BiPlus,
  BiBell,
  BiSearch,
  FiMoreVertical,
  IoMdCall,
} from 'react-icons/all';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import buildRequest from '../../utils/build-request.js';

import ChatBox from '../chats/ChatBox.js';
import UserProfile from '../userprofile/UserProfile.js';
import ContactList from '../contactlist/ContactList.js';
import { formatRelative } from 'date-fns';

const profile = {
  width: 538,
  height: 120,
  border: true,
  icon1: <BiPlus color="gray" />,
  icon2: <BiBell color="gray" />,
  icon3: <BiSearch color="gray" />,
};

const chatProfile = {
  width: 742,
  height: 120,
  border: false,
  icon1: <BiSearch color="gray" />,
  icon2: <IoMdCall color="gray" />,
  icon3: <FiMoreVertical color="gray" />,
};

const ChatApp = () => {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [loggedUser, setLoggedUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [room, setRoom] = useState();
  const [render, setRender] = useState(false);
  const [receiver, setReceiver] = useState({});

  useEffect(() => {
    const accessToken = localStorage.getItem('access_token');

    buildRequest(
      'get',
      `${process.env.REACT_APP_BASE_URL}/api/users`,
      accessToken
    )
      .then(resp => {
        setContacts(resp.contacts);
        setLoggedUser(resp.logged_user);
      })
      .catch(err => {
        localStorage.removeItem('access_token');
        navigate('/login');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [navigate]);

  if (loading) {
    return (
      <Flex h="100vh" alignItems="center" justifyContent="center">
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          boxSize="60px"
        />
      </Flex>
    );
  }

  if (!contacts) {
    return null;
  }

  const handleRender = (renderToggle, room, receiver) => {
    setRender(renderToggle);
    setReceiver(receiver);
    setRoom(room);
  };

  const handleLogout = async () => {
    try {
      await buildRequest('post', `${process.env.REACT_APP_BASE_URL}/logout`);

      localStorage.removeItem('access_token');

      navigate('/login');
    } catch (error) {
      console.log('error');
    }
  };

  return (
    <Flex
      h="100vh"
      bg="blackAlpha.200"
      paddingBlock={5}
      justifyContent="center"
      columnGap={8}
    >
      <Container h="936px" maxW={1280} bg="white" rounded={18} p={0} m={0}>
        <Stack h="936px" direction="row" spacing={0} p={0}>
          <VStack
            spacing={0}
            borderRight={2}
            borderRightStyle="solid"
            borderRightColor="blackAlpha.200"
          >
            <UserProfile
              online={true}
              heading="Hello"
              text={loggedUser.name}
              profileProps={profile}
            />
            <ContactList
              loggedUser={loggedUser}
              contacts={contacts}
              handleRender={handleRender}
            />
          </VStack>
          <VStack spacing={0}>
            {render ? (
              <>
                <UserProfile
                  online={receiver.loggedIn}
                  heading={receiver.name}
                  text={
                    receiver.loggedIn
                      ? 'Online'
                      : receiver.token
                      ? `Last seen ${formatRelative(
                          new Date(receiver.token.last_used_at),
                          new Date()
                        )}`
                      : 'Never logged in'
                  }
                  profileProps={chatProfile}
                />
                <ChatBox room={room} sender={loggedUser} receiver={receiver} />
              </>
            ) : (
              <Box h="full" width={742} bg="blackAlpha.100" roundedRight={18} />
            )}
          </VStack>
        </Stack>
      </Container>
      <Button
        letterSpacing={0.5}
        colorScheme="blue"
        alignSelf="flex-start"
        marginBlockStart={2}
        onClick={handleLogout}
      >
        Logout
      </Button>
    </Flex>
  );
};

export default ChatApp;
