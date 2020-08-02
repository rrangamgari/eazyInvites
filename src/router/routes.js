
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('layouts/loginLayout.vue'),
    children: [
      { path: '', component: () => import('components/header.vue') },
      { path: '', component: () => import('components/footer.vue') },
      { path: '', component: () => import('components/login.vue') },
    ],
  },
  {
    path: '/createInvitation',
    name: 'createEvent', // Dependency Exists in quickInvitaitonComponent.vue
    component: () => import('layouts/createInvitationLayout.vue'),
  },
  {
    path: '/addContacts',
    name: 'addContacts',
    component: () => import('layouts/addContactsLayout.vue'),
    children: [
      { path: '', component: () => import('components/header.vue') },
      { path: '', component: () => import('components/footer.vue') },

    ],
  },
  {
    path: '/newUser',
    name: 'newUser',
    component: () => import('layouts/newUserLayout.vue'),
    children: [
      { path: '', component: () => import('components/header.vue') },
      { path: '', component: () => import('components/footer.vue') },

    ],
  },
  {
    path: '/browsecards',
    name: 'browsecards',
    component: () => import('layouts/browseCardsLayout.vue'),
  },
  {
    path: '/editcard',
    name: 'editcard',
    component: () => import('layouts/editCardLayout.vue'),
    children: [
      { path: '', redirect: '/browseCards' },
      { path: ':cardId' },

    ],
  },
  {
    path: '/events',
    name: 'events',
    component: () => import('layouts/eventsLayout.vue'),
  },
  {
    path: '/events/:eventId/:eventAlpha',
    name: 'eventStatus',
    component: () => import('layouts/eventStatusLayout.vue'),
  },
  {
    path: '/invites',
    name: 'invites',
    component: () => import('layouts/invitesLayout.vue'),
  },
  {
    path: '/invites/:inviteId',
    name: 'invitesRsvp',
    component: () => import('layouts/invitesRsvpLayout.vue'),
  },
  {
    path: '/view/:viewInviteId/:viewInviteAlpha',
    name: 'guestInvitesRsvp',
    component: () => import('layouts/guestInvitesRsvpLayout.vue'),
    props: true,
  },
  {
    path: '/termsconditions',
    name: 'termsAndConditions',
    component: () => import('layouts/terrmsAndConditions.vue'),
    props: true,
  },
];

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue'),
  });
}

export default routes;
