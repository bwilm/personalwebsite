angular.module('blog', ['ngRoute', 'ngResource', 'blog.controllers', 'blog.factories', 'blog.services'])

    .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

        // $locationProvider.html5Mode({
        //     enabled: true,
        //     requireBase: false
        // });
        //$locationProvider.hashPrefix('!');
        $routeProvider
            .when('/', {
                templateUrl: 'views/home.html',
                controller: 'PostListController'

            })
            .when('/login', {
                templateUrl: 'views/login.html',
                controller: 'LoginController'
            })
            .when('/users', {
                templateUrl: 'views/userlist.html',
                controller: 'UserListController',
                requiresLogin: false,
               // requiresAdmin: true
            })
            .when('/compose', {
                templateUrl: 'views/compose.html',
                controller: 'ComposePostController',
                requiresLogin: false,
            })
            .when('/test/:id', {
                templateUrl: 'views/update.html',
                controller: 'UpdatePostController'
            })
            .when('/:id', {
                templateUrl: 'views/single.html',
                controller: 'singlePostController'
            })
            .when('/:id/update', {
                templateUrl: 'views/update.html',
                controller: 'UpdatePostController'

            })
            .when('/logout',{
                templateUrl:'views/login.html',
                controller:'LoginController'
            })
            .when('/main',{
                templateUrl:'views/main.html',

            })
            .when('/about',{
                templateUrl:'views/about.html',

            })
            // .when('/userlist', {
            //     templateUrl: 'views/userlist.html',
            //     controller: 'UserListController'
            // })


            .otherwise({
                redirectTo: '/login'
            });

            $locationProvider.html5Mode(true);

    }])
    // .run(['$rootScope', '$location', 'userService', function ($rootScope, $location, userService) {
    //     $rootScope.$on('$routeChangeStart', function (event, nextRoute, previousRoute) {
    //         if (nextRoute.$$route.requiresLogin && !userService.isLoggedIn()) {
    //             event.preventDefault();
    //             userService.loginRedirect();
    //         } else if (nextRoute.$route.requiresAdmin && !userService.isAdmin()) {
    //             event.preventDefault();
    //             $location.replace().path('/');
    //         }
    //     })
    // }])
