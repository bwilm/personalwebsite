// Create 3 different factories called User, Category, and Post.
// Each of those factories should return a $resource for interacting with the entities they are named after.
// Only Post needs to support updating.

angular.module('blog.factories', [])
    .factory('Post', ['$resource', function ($resource) {
        return $resource('api/posts/:id', {
            id: '@id'
        }, {
            update: {
                method: 'PUT'
            }
        })

    }])
    .factory('User', ['$resource', function ($resource) {
        return $resource('api/users/:id');


    }])

    .factory('Category', ['$resource', function ($resource) {
        return $resource('api/categories/:id');



    }])

    .factory('blog', ['$resource', function ($resource) {
        return $resource('/api/compose/update');
        //query: { method: 'GET', isArray:true}

    angular.module('Auth.factories', []).factory('User', ['$resource', function ($resource) {
            return $resource('/api/users/:id', {
                id: '@id'
            }, {
                update: {
                    method: 'PUT'
                }
            });
        }]);

    }]);

  

// //return $resource('https://pfc.azure-mobile.net/tables/articles', {}, {
//     query: {method:'GET',isArray:true}
// });
