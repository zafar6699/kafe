import Vue from "vue";
import Router from "vue-router";
import store from "../store";
import Login from "../pages/auth/login.vue";
Vue.use(Router);

const routes = [{
        path: "/",
        name: "default",
        component: function() {
            return import (
                /* webpackChunkName: "about" */
                "@/pages/default.vue"
            );
        },
        meta: { requiresAuth: true },
        children: [{
                path: "",
                name: "index",
                component: require("@/pages/index.vue").default,
            },

            {
                path: "category",
                name: "category",
                component: function() {
                    return import (
                        /* webpackChunkName: "about" */
                        "@/pages/category"
                    );
                },
            },
            {
                path: "products",
                name: "products",
                component: function() {
                    return import (
                        /* webpackChunkName: "about" */
                        "@/pages/products"
                    );
                },
            },
            {
                path: "rooms",
                name: "rooms",
                component: function() {
                    return import (
                        /* webpackChunkName: "about" */
                        "@/pages/rooms"
                    );
                },
            },
            {
                path: "users",
                name: "users",
                component: function() {
                    return import (
                        /* webpackChunkName: "about" */
                        "@/pages/users"
                    );
                },
            },
        ],
    },

    {
        path: "/login",
        name: "login",
        component: function() {
            return import ( /* webpackChunkName: "about" */ "@/pages/auth/login");
        },
    },

    {
        path: "/empty",
        name: "empty",
        component: function() {
            return import ( /* webpackChunkName: "about" */ "@/pages/empty");
        },
        meta: { requiresAuth: true },
        children: [],
    },
];

const router = new Router({
    routes,
});

router.beforeEach((to, from, next) => {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
        if (store.getters.isAuthenticated) {
            next();
            return;
        }
        next("/login");
    } else {
        next();
    }
});

// router.beforeEach((to, from, next) => {
//     if (to.matched.some((record) => record.meta.guest)) {
//         if (store.getters.isAuthenticated) {
//             next("/");
//             return;
//         }
//         next();
//     } else {
//         next();
//     }
// });

export default router;