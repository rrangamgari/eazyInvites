
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },

    ],
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
];

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue'),
  });
}

export default routes;
