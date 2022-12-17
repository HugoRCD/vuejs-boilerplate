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

import store from "@/store";
import VerifyUser from "@/views/Auth/VerifyUser.vue";

import refreshToken from "@/graphql/mutations/refreshToken.gql";

import {apolloRefreshProvider} from "@/plugins/apollo";

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

function isTokenExpired(token) {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );
  const {exp} = JSON.parse(jsonPayload);
  return Date.now() >= exp * 1000;
}

async function refreshTokenIfExpired(token, next) {
  const response = await apolloRefreshProvider.defaultClient.mutate({
    mutation: refreshToken,
    variables: {
      id: store.state.user.id,
      refreshToken: token
    }
  });
  if (response.data.refreshToken) {
    store.dispatch("login", response.data.refreshToken).then(() => console.log("token refreshed"));
    next();
  } else {
    store.dispatch("logout");
    next({
      path: "auth/login",
    });
  }
}

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      if (isTokenExpired(store.state.accessToken)) {
        refreshTokenIfExpired(store.state.refreshToken, next);
      }
      if (isTokenExpired(store.state.refreshToken)) {
        store.dispatch("logout").then(() => console.log("logged out"));
        next({
          path: "auth/login",
        });
      } else {
        store.getters.user.isVerified ? next() : next({
          path: "auth/verifyUser",
        });
      }
    } else {
      next({
        path: "auth/login",
        query: {redirect: to.fullPath},
      });
    }
  } else {
    next();
  }
});

export default router;
