import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Profile from '../views/Profile.vue'
import Admin from '../views/Admin.vue'
import RemoveAdmin from '../views/RemoveAdmin.vue'
import ForgotPassword from '../views/ForgotPassword.vue'
import CreatePost from '../views/CreatePost.vue'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/firebase/init'
import NotFound from '../views/NotFound.vue'
import Dashboard from '../views/Dashboard.vue'
import blogs from '../views/Blogs.vue'
import WriteLog from '../views/WriteLog.vue'
import PostList from '../views/PostList.vue'
import PostDetail from '../views/PostDetail.vue'
import InvoiceForm from '../views/InvoiceForm.vue'
// import ExampleNow from '../views/ExampleNow.vue'
import LogBook from '../views/LogBook.vue'
import SubscriptionButton from '../views/SubscriptionButton.vue'

// router.beforeEach((to, from, next) => {
//   onAuthStateChanged(auth, (user) => {
//     if (user) {
//       // Redirect to home page after sign-in
//       next('/home');
//     } else {
//       // Redirect to login page after sign-out
//       next('/login');
//     }
//   });
// });
// Vue Router에 내장된 기능으로, Vue Router와 높은 호환성을 가지고 있어 
// Vue Router와 함께 사용하기 편리합니다.


onAuthStateChanged(auth, (user) => {
  if (user) {
    // Redirect signed-in user to home
      router.push('/');
  } else {
    // Redirect signed-out user to login
      router.push('/login');
  }
});


const requireAuth = (to, from, next) => {
  const user = auth.currentUser;
  if (user) {
    next();
  } else {
    next('/login');
  }
};

const requireAdmin = async (to, from, next) => {
  const user = auth.currentUser;
  if (user) {
    const tokenResult = await user.getIdTokenResult();
    if (tokenResult.claims.admin) {
      next();
    } else {
      next('/notfound');
    }
  } else {
    next('/notfound');
  }
};

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: "Home"
    }
  },
  {
    path: '/logbook',
    name: 'LogBook',
    component: LogBook,
    meta: {
      title: "Log Book"
    }
  },
  // {
  //   path: '/example-now',
  //   name: 'ExampleNow',
  //   component: ExampleNow,
  //   meta: {
  //     title: "Example Now"
  //   }
  // },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      title: "Login"
    },
  }, 
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: {
      title: 'Register'
    }
  },
  {
    path: '/create-post',
    name: 'CreatePost',
    component: CreatePost,
    meta: {
      title: 'Create Post',
      requiresAuth: true,
    },
    beforeEnter: requireAuth,
  },
  {
    path: '/blogs',
    name: 'blogs',
    component: blogs,
    meta: {
      title: 'Blogs',
    },
  },
  {
    path: '/subscriptionButton',
    name: 'SubscriptionButton',
    component: SubscriptionButton,
    meta: {
      title: 'SubscriptionButton',
    },
  },
  {
    path: '/writelog',
    name: 'WriteLog',
    component: WriteLog,
    meta: {
      title: 'WriteLog',
    },
  },
  {
    path: '/SubscriptionButton',
    name: 'SubscriptionButton',
    component: SubscriptionButton,
    meta: {
      title: 'SubscriptionButton',
    },
  },
  { 
    path: '/postlist', 
    name: 'TradingLog', 
    component: PostList
  },
  { path: '/posts/:id', 
    name: 'PostDetail', 
    component: PostDetail, 
    props: true 
  },
  {
    path: '/invoiceform',
    name: 'InvoiceForm',
    component: InvoiceForm,
    meta: {
      title: "InvoiceForm"
    }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: {
      title: 'Profile',
      requiresAuth: true,
    },
    beforeEnter: requireAuth,
  },
  {
    path: '/Dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: {
      title: 'Dashboard',
      requiresAuth: true,
      requiresAdmin: true,
    },
    beforeEnter: requireAuth,
    beforeEnter: requireAdmin,
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    meta: {
      title: 'Admin',
      requiresAdmin: true,
      requiresAuth: true,
    },
    beforeEnter: requireAuth,
    beforeEnter: requireAdmin,
  },
  {
    path: '/RemoveAdmin',
    name: 'RemoveAdmin',
    component: RemoveAdmin,
    meta: {
      title: 'Remove Admin',
      requiresAdmin: true,
      requiresAuth: true,
    },
    beforeEnter: requireAuth,
    beforeEnter: requireAdmin,
  },
  {
    path: '/notfound',
    name: 'NotFound',
    component: NotFound,
    meta: {
      title: 'Page Not Found',
    },
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/notfound',
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: ForgotPassword,
    meta: {
      title: 'Forgot Password'
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
});
// Navigation guard to prevent access to /login and /register pages for logged-in users
router.beforeEach((to, from, next) => {
  if (to.path === '/login' || to.path === '/register') {
    if (auth.currentUser) {
      // Redirect logged-in users to a different page, e.g., the home page
      next({ path: '/' });
    } else {
      // Allow access for not logged-in users
      next();
    }
  } else {
    // Allow access to other pages
    next();
  }
});

export default router;