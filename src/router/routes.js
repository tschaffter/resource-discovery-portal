
export const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('../views/Home.vue'),
        //used when creating sitemap via webpack
        meta: {
            sitemap: {
                priority:    1,
            }
        }
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('../views/About.vue'),
        meta: {
            sitemap: {
                priority:    0.9,
            }
        }
    },
    {
        path: '/search',
        name: 'Search',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('../views/Search.vue'),
        meta: {
            sitemap: {
                priority:    0.8,
            }
        }
    },
    // {
    //     path: "/:catchAll(.*)",
    //     name: '404',
    //     component: () => import('../views/404.vue'),
    //     meta: { sitemap: { ignoreRoute: true } }
    // }
]