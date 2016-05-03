export default function config($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/state1");
    $stateProvider
        .state('state1', {
            url: "/state1",
            templateUrl: "../source/src/templ/page1.html"

        })
        .state('state2', {
            url: "/state2/:id",
            templateUrl: "../source/src/templ/page2.html"
        })
    }