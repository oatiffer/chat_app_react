# Chat App front-end built with React 18.

Needs [`chat_api`](https://github.com/oatiffer/chat_api) to work. Built using [`Pusher`](https://pusher.com/) and [`Laravel Echo`](https://github.com/laravel/echo).

## Libraries used

+ [ky](https://github.com/sindresorhus/ky) as an alternative to plain `fetch`.
+ [date-fns](https://date-fns.org/) for date and time formatting.
+ [Formik](https://formik.org/) and [Yup](https://github.com/jquense/yup) for form handling and validation.
+ [React Router](https://reactrouter.com/) for simple route management.
+ [Chakra](https://chakra-ui.com/) for styled components.
+ [React Icons](https://react-icons.github.io/react-icons/) as an 'icon gallery'.

+ [Pusher](https://pusher.com/) for WebSockets and event broadcasting (this is the core that makes real-time messaging possible).
+ [Laravel Echo](https://github.com/laravel/echo) as a front-end event listener for Pusher broadcasted events.

