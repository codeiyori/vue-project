import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Blogs from '../views/Blogs.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import MyAccount from '../views/MyAccount.vue'
import Profile from '../views/Profile.vue'
import Admin from '../views/Admin.vue'
import ForgotPassword from '../views/ForgotPassword.vue'
import CreatePost from '../views/CreatePost.vue'
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const auth = getAuth();

const isAdmin = (user) => user && user.admin;


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
    path: "/blogs",
    name: "Blogs",
    component: Blogs,
    meta: {
      title: 'Blogs'
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      title: "Login"
    }
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
    path: '/my-account',
    name: 'MyAccount',
    component: MyAccount,
    meta: {
      title: 'My Account'
    }
  },
  {
    path: '/create-post',
    name: 'CreatePost',
    component: CreatePost,
    meta: {
      title: 'Create Post',
      requiresAdmin: true,
    },
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: {
      title: 'Profile'
    }
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    meta: {
      title: 'Admin'
    }
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

router.beforeEach(async (to, from, next) => {
  const requiresAdmin = to.meta.requiresAdmin;
  const user = auth.currentUser;

  if (requiresAdmin) {
    if (user) {
      const tokenResult = await user.getIdTokenResult();
      if (isAdmin(tokenResult.claims)) {
        document.title = `${to.meta.title} | CODEMIB`;
        next();
      } else {
        next('/login');
      }
    } else {
      next('/login');
    }
  } else {
    document.title = `${to.meta.title} | CODEMIB`;
    next();
  }
});

export default router;
