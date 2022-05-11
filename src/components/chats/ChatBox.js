import { VStack, Stack } from '@chakra-ui/react';
import SentChat from './SentChat.js';
import ReceivedChat from './ReceivedChat.js';
import ChatForm from '../forms/ChatForm.js';

import { useRef, useState, useEffect, useLayoutEffect } from 'react';
import buildRequest from '../../utils/build-request.js';
import buildFormikErrors from '../../utils/build-formik-errors.js';

import { formatRelative } from 'date-fns';
import Echo from 'laravel-echo';

window.Pusher = require('pusher-js');

window.Echo = new Echo({
  broadcaster: 'pusher',
  key: '1e708302f3b5bdf31bfd',
  cluster: 'mt1',
  forceTLS: true,
});

const ChatBox = ({ room, sender, receiver }) => {
  const [roomChats, setRoomChats] = useState([]);
  const [initialRender, setInitialRender] = useState(true);
  const scrollDownRef = useRef(null);

  useEffect(() => {
    const accessToken = localStorage.getItem('access_token');

    buildRequest(
      'get',
      `${process.env.REACT_APP_BASE_URL}/api/rooms/${room.id}`,
      accessToken
    )
      .then(resp => setRoomChats(resp.messages))
      .catch(error => console.log(error));
  }, [room.id]);

  useEffect(() => {
    window.Echo.channel('react-chat').listen(`.${room.name}`, e => {
      if (sender.id !== e.message.sender_id) {
        setRoomChats([...roomChats, e.message]);
      }
    });

    return () => {
      window.Echo.leave('react-chat');
    };
  }, [room.id, room.name, sender.id, receiver.id, roomChats]);

  useLayoutEffect(() => {
    if (initialRender) {
      scrollDownRef.current.scrollIntoView();
      return;
    }

    scrollDownRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [roomChats, initialRender]);

  const handleChatSent = async (values, formikProps) => {
    const accessToken = localStorage.getItem('access_token');

    try {
      const resp = await buildRequest(
        'post',
        `${process.env.REACT_APP_BASE_URL}/api/messages`,
        accessToken,
        {
          sender_id: sender.id,
          receiver_id: receiver.id,
          room_id: room.id,
          content: values.message,
        }
      );

      if (resp.errors) {
        const errors = buildFormikErrors(resp.errors);
        formikProps.setErrors(errors);
        return;
      }

      setInitialRender(false);
      setRoomChats([...roomChats, resp]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Stack
      h="full"
      width={742}
      bg="blackAlpha.100"
      roundedBottomRight={18}
      paddingBlock={6}
      direction="column"
      alignItems="center"
      justifyContent="space-between"
    >
      <VStack h={670} width={742} overflowX="hidden" overflowY="auto">
        {roomChats.map(chat => {
          if (chat.sender_id === sender.id) {
            return (
              <SentChat
                key={chat.id}
                online={true}
                heading="You"
                text={formatRelative(new Date(chat.updated_at), new Date())}
                chat={chat.content}
              />
            );
          }

          return (
            <ReceivedChat
              key={chat.id}
              online={receiver.loggedIn}
              heading={receiver.name}
              text={formatRelative(new Date(chat.updated_at), new Date())}
              chat={chat.content}
            />
          );
        })}
        <div ref={scrollDownRef} />
      </VStack>
      <ChatForm onChatSent={handleChatSent} />
    </Stack>
  );
};

export default ChatBox;
