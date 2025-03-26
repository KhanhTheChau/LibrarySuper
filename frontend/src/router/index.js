import { createRouter, createWebHistory } from 'vue-router'
// import Cookies from 'vue-cookies'
// import { useUserStore } from '@/stores/user.store'
// import { useAdminStore } from '@/stores/admin.store'

const routes = [
  {
    path: '/auth',
    name: 'auth',
    component: () => import('../views/AuthView.vue'),
    children: [
      {
        path: '/login',
        alias: '/auth',
        name: 'login',
        component: () => import('../components/auth/LogIn.vue')
      },
      {
        path: '/auth/signup',
        name: 'signup',
        component: () => import('../components/auth/SignUp.vue')
      }
    ]
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('../views/DashboardView.vue'),
    meta: { requiresAuth: true, requiresAdmin: true },
    redirect: '/dashboard/borrow',
    children: [
      {
        path: '/dashboard/users',
        name: 'user-table',
        meta: { requiresAuth: true, requiresAdmin: true, requiresDev: true },
        component: () => import('../views/management/UsersView.vue')
      },
      {
        path: '/dashboard/books',
        name: 'book-table',
        meta: { requiresAuth: true, requiresAdmin: true, requiresDev: true },
        component: () => import('../views/management/BooksView.vue')
      },
      {
        path: '/dashboard/authors',
        name: 'author-table',
        meta: { requiresAuth: true, requiresAdmin: true, requiresDev: true },
        component: () => import('../views/management/AuthorView.vue')
      },
      {
        path: '/dashboard/publishers',
        name: 'publisher-table',
        meta: { requiresAuth: true, requiresAdmin: true, requiresDev: true },
        component: () => import('../views/management/PublisherView.vue')
      },
      {
        path: '/dashboard/borrow',
        name: 'borrow-book',
        meta: { requiresAuth: true, requiresAdmin: true },
        component: () => import('../views/management/TrackbookView.vue')
      }
    ]
  },
  {
    path: '/library',
    alias: '/',
    redirect: '/library/home',
    name: 'library',
    component: () => import('../views/LibraryView.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: '/library/home',
        name: 'home',
        alias: '/library',
        meta: { requiresAuth: true },
        component: () => import('../views/library/HomeView.vue')
      },
      {
        path: '/library/about-us',
        name: 'about-us',
        meta: { requiresAuth: true },
        component: () => import('../views/library/AboutView.vue')
      },
      {
        path: '/library/books',
        name: 'books',
        meta: { requiresAuth: true },
        component: () => import('../views/library/ListBooksView.vue')
      },
      {
        path: '/library/books/:id',
        name: 'bookDetail',
        meta: { requiresAuth: true },
        component: () => import('../views/library/BookDetailView.vue')
      },
      {
        path: '/library/my-book',
        name: 'my-book',
        meta: { requiresAuth: true },
        component: () => import('../views/library/MyBooksView.vue')
      },
      {
        path: '/library/profile',
        name: 'profile',
        meta: { requiresAuth: true },
        component: () => import('../views/library/ProfileView.vue'),
        children: [
          {
            path: '/library/profile/user',
            name: 'profile-user',
            meta: { requiresAuth: true },
            alias: '/library/profile',
            component: () => import('../components/profile/ProfileUser.vue')
          },
          {
            path: '/library/profile/history',
            name: 'profile-history',
            meta: { requiresAuth: true },
            component: () => import('../components/profile/HistoryBorrow.vue')
          },
          {
            path: '/library/profile/review',
            name: 'profile-review',
            component: () => import('../components/profile/ReviewProfile.vue')
          },
          {
            path: '/library/profile/change-password',
            name: 'change-password',
            meta: { requiresAuth: true },
            component: () => import('../components/profile/ChangePassword.vue')
          }
        ]
      }
    ]
  },

  {
    path: '/:pathMatch(.*)*',
    name: 'notfound',
    component: () => import('../views/NotFoundView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
})

// router.beforeEach(async (to, from, next) => {
//   const userStore = useUserStore()
//   const requireLogin = to.matched.some((record) => record.meta.requiresAuth)
//   const requireAdmin = to.matched.some((record) => record.meta.requiresAdmin)
//   const requireDev = to.matched.some((record) => record.meta.requiresDev)

//   // Nếu không yêu cầu đăng nhập, cho phép truy cập
//   if (!requireLogin) {
//     return next()
//   }

//   // Kiểm tra accessToken
//   const accessToken = Cookies.get('accessToken')
//   if (!accessToken) {
//     return next({ name: 'login' })
//   }

//   // Kiểm tra quyền Admin
//   if (!requireAdmin) {
//     return next()
//   }

//   const isAdmin = await userStore.isAdmin()
//   // If user is admin, allow access
//   if (!isAdmin) {
//     return next({ name: 'notfound' })
//   }

//   // Kiểm tra yêu cầu quyền Dev
//   if (!requireDev) {
//     return next()
//   }

//   const adminStore = useAdminStore()
//   const isDev = await adminStore.isDev()
//   if (!isDev) {
//     next({ name: 'notfound' })
//   }

//   return next()
// })

export default router
