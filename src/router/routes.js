
const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('layouts/MainLayout.vue'),
  },
  {
    path: '',
    name: 'routes',
    component: () => import('layouts/newMainLayout.vue'),
    children: [
      { path: 'login', name: 'login', component: () => import('components/login.vue') }, // To be removed
      { path: 'newUser', name: 'newUser', component: () => import('components/newUserComponent.vue') }, // To be removed
      { path: 'events', name: 'events', component: () => import('components/events.vue') },
      {
        path: 'events/:eventId/:eventAlpha',
        name: 'eventStatus',
        component: () => import('components/status.vue'),
      },
      { path: 'currentOrders', name: 'currentOrders', component: () => import('components/currentOrders.vue') },
      {
        path: 'invites/:inviteId/:inviteAplhaId',
        name: 'invitesRsvp',
        component: () => import('components/rsvp.vue'),
      },
      {
        path: 'view/:viewInviteId/:viewInviteAlpha',
        name: 'guestInvitesRsvp',
        component: () => import('components/rsvpGuest.vue'),
        props: true,
      },
      { path: 'browsecards', name: 'browsecards', component: () => import('components/browseCards.vue') },
      { path: 'editcard', redirect: '/browseCards' },
      {
        path: 'editcard/:cardId',
        name: 'editcard',
        component: () => import('components/editCard.vue'),
      },
      {
        path: 'createPromotion',
        name: 'createPromotion', // Dependency Exists in editCard.vue
        component: () => import('components/quickPromotionComponent.vue'),
      },
      {
        path: 'editInvitation/:eventId/:eventAlphaId',
        name: 'editEvent',
        component: () => import('components/quickInvitationComponent.vue'),
        props: true,
      },
      { path: 'addContacts', name: 'contacts', component: () => import('components/addContactsComponent.vue') },
      { path: 'myProfile', name: 'myProfile', component: () => import('components/myProfileComponent.vue') },
    ],
  },
  {
    path: '/oauth2',
    name: 'oauth2',
    component: () => import('components/oauth2.vue'),
    children: [
      { path: ':client' },
      { path: ':client/handler' },
      { path: 'contacts/:client/handler' },
    ],
  },
  {
    path: '/termsconditions',
    name: 'termsAndConditions',
    component: () => import('layouts/terrmsAndConditions.vue'),
  },
];

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue'),
    children: [
      { path: '', component: () => import('components/header.vue') },
      { path: '', component: () => import('components/footer.vue') },

    ],
  });
}

export default routes;
