import { createRouter, createWebHistory } from "vue-router";

import LandingPage from "@/views/landing-page/LandingPage.vue";
import Home from "@/views/landing-page/Home.vue";
import About from "@/views/landing-page/About.vue";
import Contact from "@/views/landing-page/Contact.vue";

import Auth from "@/views/auth/Auth.vue";
import Login from "@/views/auth/Login.vue";
import Register from "@/views/auth/Register.vue";

import Account from "@/views/account/Account.vue";
import Profile from "@/views/account/Profile.vue";
import Settings from "@/views/account/Settings.vue";

import VerifyEmail from "@/views/auth/VerifyEmail.vue";
import ForgotPassword from "@/views/auth/ForgotPassword.vue";

import Application from "@/views/application/Application.vue";
import AppLogin from "@/views/application/AppLogin.vue";
import PasswordForgot from "@/views/application/PasswordForgot.vue";
import ResetPassword from "@/views/application/ResetPassword.vue";
import Dashboard from "@/views/application/Dashboard.vue";

import error404 from "@/views/error404.vue";

const routes = [
  {
    path: "/",
    component: LandingPage,
    children: [
      {
        path: "",
        name: "Home",
        component: Home,
      },
      {
        path: "/about",
        name: "About",
        component: About,
      },
      {
        path: "/contact",
        name: "Contact",
        component: Contact,
      },
    ],
  },
  {
    path: "/auth",
    component: Auth,
    children: [
      {
        path: "register",
        name: "Register",
        component: Register,
      },
      {
        path: "login",
        name: "Login",
        component: Login,
      },
      {
        path: "forgotPassword",
        name: "ForgotPassword",
        component: ForgotPassword,
      },
    ],
  },
  {
    path: "/app",
    component: Application,
    children: [
      {
        path: "login",
        name: "AppLogin",
        component: AppLogin,
      },
      {
        path: "password-forgot",
        name: "PasswordForgot",
        component: PasswordForgot,
      },
      {
        path: "reset-password/:token",
        name: "ResetPassword",
        component: ResetPassword,
      },
      {
        path: "dashboard",
        name: "Dashboard",
        component: Dashboard,
      },
    ],
    meta: {
      requiresAuth: true,
    },
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
      },
      {
        path: "verify/:code",
        name: "VerifyEmail",
        component: VerifyEmail,
      },
    ],
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/:catchAll(.*)",
    name: "error404",
    component: error404,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    next();
  } else {
    next();
  }
});

export default router;
