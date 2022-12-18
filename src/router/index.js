import {createRouter, createWebHistory} from "vue-router";
import App from "@/views/App/App.vue";
import Home from "@/views/App/Home.vue";
import About from "@/views/App/About.vue";
import Contact from "@/views/App/Contact.vue";
import error404 from "@/views/error404.vue";
import Dashboard from "@/views/App/Dashboard.vue";

import Auth from "@/views/Auth/Auth.vue";
import Login from "@/views/Auth/Login.vue";
import Signup from "@/views/Auth/Signup.vue";

import Account from "@/views/Account/Account.vue";
import Profile from "@/views/Account/Profile.vue";
import Settings from "@/views/Account/Settings.vue";

import VerifyUser from "@/views/Auth/VerifyUser.vue";
import ForgotPassword from "@/views/Auth/ForgotPassword.vue";
import ResetPassword from "@/views/Auth/ResetPassword.vue";

const routes = [
  {
    path: "/",
    component: App,
    children: [
      {
        path: "",
        name: "Home",
        component: Home
      },
      {
        path: "/about",
        name: "About",
        component: About
      },
      {
        path: "/contact",
        name: "Contact",
        component: Contact
      },
      {
        path: "/login",
        name: "Login",
        component: Login,
      },
      {
        path: "/dashboard",
        name: "Dashboard",
        component: Dashboard,
        meta: {
          requiresAuth: true
        }
      },
    ]
  },
  {
    path: "/auth",
    component: Auth,
    children: [
      {
        path: "signup",
        name: "Signup",
        component: Signup
      },
      {
        path: "login",
        name: "Login",
        component: Login
      },
      {
        path: "verifyUser",
        name: "VerifyUser",
        component: VerifyUser
      },
      {
        path: "forgotPassword",
        name: "ForgotPassword",
        component: ForgotPassword
      },
      {
        path: "/reset-password/:token",
        name: "ResetPassword",
        component: ResetPassword
      }
    ]
  },
  {
    path: "/account",
    component: Account,
    children: [
      {
        path: "profile",
        name: "Profile",
        component: Profile,
      },
      {
        path: "settings",
        name: "Settings",
        component: Settings,
      }
    ],
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/:catchAll(.*)",
    name: "error404",
    component: error404
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    next();
  } else {
    next();
  }
});

export default router;
