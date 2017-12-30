angular.module('blog.controllers', [])
    .controller('PostListController', ['SEOservice', '$scope','$location', 'Post', function (SEOservice, $scope,$location, Post) {
        console.log(Post.query());

        $scope.Posts = Post.query();
        SEOservice.setSEO({
            title: 'Everything about Nothing',
            image: 'http://' + $location.host() + '/images/donuts.jpg',
            url: $location.url(),
            description: 'A blog about food and stuff'
        });




    }]).controller('singlePostController', ['SEOservice', '$scope', '$routeParams', '$location', 'Post', function (SEOservice, $scope, $routeParams, $location, Post) {



        $scope.post = Post.get({
            id: $routeParams.id
        });

        console.log(Post.get({
            id: $routeParams.id
        }));


        $scope.delete = function () {
            if (confirm("Are you sure you want to delete?")) {
                $scope.post.$delete(function () {
                    $location.replace().path('/');

                })
            }

        }

        $scope.edit = function (id) {

            console.log($routeParams.id);
            $location.replace().path(`${id}/update`);
            // $location.path('/test');

        }
        SEOservice.setSEO({
            title: 'Everything about Nothing',
            image: 'http://' + $location.host() + '/images/donuts.jpg',
            url: $location.url(),
            description: 'A blog about food and stuff'
        });




    }])
    .controller('UpdatePostController', ['SEOservice', '$scope', 'Post', 'Category', 'User', '$location', '$routeParams', function (SEOservice, $scope, Post, Category, User, $location, $routeParams) {

        $scope.users = User.query();
        $scope.category = Category.query();
        $scope.post = Post.get({
            id: $routeParams.id
        }, function () {
            $scope.post.categoryid = String($scope.post.categoryid);
        })

        $scope.save = function () {
            $scope.post.$update(function () {
                $location.replace().path('/' + $routeParams.id);
            })
        }
        SEOservice.setSEO({
            title: 'Everything about Nothing',
            image: 'http://' + $location.host() + '/images/donuts.jpg',
            url: $location.url(),
            description: 'A blog about food and stuff'
        });

    }])



    .controller('ComposePostController', ['SEOservice', '$scope', 'Post', 'Category', 'User', '$location', function (SEOservice, $scope, Post, Category, User, $location) {

        $scope.users = User.query()
        $scope.category = Category.query()

        $scope.save = function () {
            var p = new Post($scope.post);
            p.$save(function () {
                $location.path('/')

            }, function (err) {
                console.log(err);

            });
            SEOservice.setSEO({
                title: 'Everything about Nothing',
                image: 'http://' + $location.host() + '/images/donuts.jpg',
                url: $location.url(),
                description: 'A blog about food and stuff'
            });
        }



    }])
    .controller('LoginController', ['SEOservice', '$scope', 'userService', '$location', function (SEOservice, $scope, userService, $location) {
        userService.me().then(function () {
            redirect();
        });
        $scope.login = function () {
            userService.login($scope.email, $scope.password)
                .then(function () {
                    redirect();
                }, function (err) {
                    console.log(err);
                });
        }

        function redirect() {
            var dest = $location.search().dest;
            if (!dest) {
                dest = '/';
            }
            $location.replace().path(dest).search('dest', null);
        }
        SEOservice.setSEO({
            title: 'Everything about Nothing',
            image: 'http://' + $location.host() + '/images/donuts.jpg',
            url: $location.url(),
            description: 'A blog about food and stuff'
        });


    }])
 .controller('ContactCtrl', ['SEOservice', '$location', function (SEOservice, $location) {
    SEOservice.setSEO({
        title: 'Everything about Nothing',
        image: 'http://' + $location.host() + '/images/donuts.jpg',
        url: $location.url(),
        description: 'A blog about food and stuff'
    });
}])



.controller('UserListController', ['SEOservice', '$scope','$location', 'User', function (SEOservice,$location, $scope, User) {
    $scope.users = User.query();

    $scope.createUser = function () {
        var u = new User($scope.newUser);
        u.$save(function () {
            $scope.newUser = {};
            console.log($scope.newUser)
        });
    }
    SEOservice.setSEO({
        title: 'Everything about Nothing',
        image: 'http://' + $location.host() + '/images/donuts.jpg',
        url: $location.url(),
        description: 'A blog about food and stuff'
    });

}])
angular.module('Auth.controllers', [])
    .controller('UserListController', 'SEOservice', '$scope','$location', 'User', function (SEOservice, $scope, $location,User) {
        $scope.users = User.query();
    
    SEOservice.setSEO({
        title: 'Everything about Nothing',
        image: 'http://' + $location.host() + '/images/donuts.jpg',
        url: $location.url(),
        description: 'A blog about food and stuff'
    });
});