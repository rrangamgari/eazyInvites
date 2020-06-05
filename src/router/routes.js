
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
    name: 'createEvent',
    component: () => import('layouts/createInvitationLayout.vue'),
    children: [
      { path: '', component: () => import('components/header.vue') },
      { path: '', component: () => import('components/footer.vue') },

    ],
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
    path: '/review',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },

    ],
  },
  {
    path: '/events',
    name: 'events',
    component: () => import('layouts/eventsLayout.vue'),
  },
  {
    path: '/events/:eventId',
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
];

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue'),
  });
}

export default routes;
