import {
  createRouter,
  createWebHistory,
  NavigationGuardNext,
  RouteLocationNormalized,
  RouteLocationNormalizedLoaded,
  Router,
  RouteRecordRaw,
  useRoute,
  useRouter,
} from "vue-router";
import Home from "../views/Home.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: () =>
      import(/* webpackChunkName: "About" */ "../views/About.vue"),
  },
  {
    path: "/table",
    name: "Table",
    component: () =>
      import(/* webpackChunkName: "Table" */ "../components/Table.vue"),
  },
  {
    path: "/signIn",
    name: "SignIn",
    component: () =>
      import(/* webpackChunkName: "SignIn" */ "../views/SignIn.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(
  (
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
  ) => {
    if (to.name == "Table" && !localStorage?.getItem("token")) {
      alert("尚未登入!!");
      next({ path: "signIn", query: { redirect: to.fullPath } });
    } else {
      next();
    }
  }
);

export default router;
