(function() {
  'use strict';

  var frontendApp = angular.module('frontendApp', ['ui.router', 'ngAnimate', 'offClick', 'authModule', 'panelModule']);
  frontendApp
    .config(['$urlRouterProvider',
      '$locationProvider',
      function($urlRouterProvider) {
        $urlRouterProvider.otherwise('/auth/login');
      }
    ])
    .run(['$state',
      '$rootScope',
      function($state, $rootScope) {
        // todo
        // here's a place to check whether a user is logged in
        // if so, redirect him to his projects,
        // else, redirect to login
        // if (true) {
        $state.go('accountState.login');
        // } else {
        // $state.go('homeState');
        // }
        $rootScope.$on('$stateChangeSuccess', function(event, data) {
          $rootScope.pageName = data.pageName;
          $rootScope.module = data.module;
          $rootScope.trails = data.trails;
          $rootScope.isAuth = (data.module === 'auth');
        });
        $rootScope.communicator = {};
      }
    ]);

}());

(function() {
  'use strict';
  var authModule = angular.module('authModule', []);

  authModule
    .config(['$stateProvider', function($stateProvider) {
      $stateProvider
        .state('accountState', {
          url: '/auth',
          templateUrl: 'partials/templates/auth/account.html',
          controller: 'AuthCtrl',
          controllerAs: 'AC',
          pageName: 'Account',
          module: 'auth'
        })
        .state('accountState.login', {
          url: '/login',
          templateUrl: 'partials/templates/auth/login.html',
          controller: 'LoginCtrl',
          controllerAs: 'LC',
          pageName: 'Login',
          module: 'auth'
        })
        .state('accountState.register', {
          url: '/register',
          templateUrl: 'partials/templates/auth/registration.html',
          controller: 'RegistrationCtrl',
          controllerAs: 'RC',
          pageName: 'Register',
          module: 'auth'
        })
        .state('accountState.remindState', {
          url: '/remind',
          templateUrl: 'partials/templates/auth/remind.html',
          controller: 'RemindCtrl',
          controllerAs: 'RmC',
          pageName: 'Remind Password',
          module: 'auth',
          showit: true
        });
    }]);
}());

(function() {
  'use strict';
  var panelModule = angular.module('panelModule', []);

  panelModule
    .config(['$stateProvider', function($stateProvider) {
      $stateProvider
        .state('myProjectsState', {
          url: '/my-projects',
          templateUrl: 'partials/templates/panel/myProjects.html',
          controller: 'MyProjectsCtrl',
          controllerAs: 'MPC',
          pageName: 'My Projects',
          module: 'panel'
        })
        .state('allProjectsState', {
          url: '/all-projects',
          templateUrl: 'partials/templates/panel/allProjects.html',
          controller: 'AllProjectsCtrl',
          controllerAs: 'APC',
          pageName: 'All Projects',
          module: 'panel',
          trails: [{
            name: 'My Projects',
            link: '#/my-projects'
          }]
        })
        .state('projectState', {
          url: '/project/:projectId',
          templateUrl: 'partials/templates/panel/project.html',
          controller: 'ProjectCtrl',
          controllerAs: 'PC',
          pageName: 'Project',
          module: 'panel'
        });
    }]);

}());

(function() {
  'use strict';
  var AuthCtrl = function($scope, $state) {
    // fixme
    // we need to consider cases with and without '/'
    if ($state.current.url === '/account' || $state.current.url === '/auth') {
      $state.go('accountState.login');
    }
    $scope.test = 1;
  };

  AuthCtrl.$inject = ['$scope', '$state'];
  angular.module('frontendApp').controller('AuthCtrl', AuthCtrl);

}());

(function() {
  'use strict';
  var LoginCtrl = function($scope, $state) {

    $scope.submitForm = function () {
      $state.go('myProjectsState');
    };
  };

  LoginCtrl.$inject = ['$scope', '$state'];
  angular.module('frontendApp').controller('LoginCtrl', LoginCtrl);

}());

(function() {
  'use strict';
  var RegistrationCtrl = function ($scope) {};

  RegistrationCtrl.$inject = ['$scope'];
  angular.module('frontendApp').controller('RegistrationCtrl', RegistrationCtrl);

}());

(function() {
  'use strict';
  var RemindCtrl = function($scope) {};

  RemindCtrl.$inject = ['$scope'];
  angular.module('frontendApp').controller('RemindCtrl', RemindCtrl);

}());

(function() {
  'use strict';
  var AllProjectsCtrl = function($scope, projectsFactory) {
    $scope.allProjects = null;

    function init() {
      projectsFactory.getProjects()
      .success(function (resp) {
        $scope.allProjects = resp;
        console.log(resp);
      })
      .error(function (resp) {
        console.log(resp);
      });
    }

    init();
  };

  AllProjectsCtrl.$inject = ['$scope', 'projectsFactory'];
  angular.module('frontendApp').controller('AllProjectsCtrl', AllProjectsCtrl);

}());

(function() {
  'use strict';
  var MyProjectsCtrl = function($scope, projectsFactory) {
    $scope.myProjects = null;
    function init() {
      projectsFactory.getProjects()
      .success(function (resp) {
        $scope.myProjects = resp;
        console.log(resp);
      })
      .error(function (resp) {
        console.log(resp);
      });
    }
    init();
  };

  MyProjectsCtrl.$inject = ['$scope', 'projectsFactory'];
  angular.module('frontendApp').controller('MyProjectsCtrl', MyProjectsCtrl);

}());

(function() {
  'use strict';
  var ProjectCtrl = function($scope, $stateParams, projectsFactory, statusService) {
    $scope.project = null;
    $scope.getStatus = function (code) {
      return statusService.getStatus(code);
    };

    projectsFactory.getProject($stateParams.projectId)
    .success(function (resp) {
      $scope.project = resp;
    })
    .error(function () {
      // console.log('nope');
    });
  };

  ProjectCtrl.$inject = ['$scope', '$stateParams', 'projectsFactory', 'statusService'];
  angular.module('frontendApp').controller('ProjectCtrl', ProjectCtrl);

}());

(function () {
  'use strict';

// this is factory of ALL projects or just for MY projects?
  var projectsFactory = function ($http, appSettings) {
    return {
      getProjects: function () {
        return $http.get(appSettings.apiRoot + 'projects/');
      },
      getProject: function (customerId) {
        return $http.get(appSettings.apiRoot + 'projects/' + customerId);
      }
    };
  };

  projectsFactory.$inject = ['$http', 'appSettings'];
  angular.module('frontendApp').factory('projectsFactory', projectsFactory);
}());

(function () {
  'use strict';

  var statusService = function () {
    this.getStatus = function (statusCode) {
      var projectStatus = {
        code: statusCode,
        className: '',
        labelContent: ''
      };
      switch (statusCode) {
        case 0:
          projectStatus.className = 'finished';
          projectStatus.labelContent = 'Complete';
          break;
        case 1:
          projectStatus.className = 'in-progress';
          projectStatus.labelContent = 'In Progress';
          break;
        case 2:
          projectStatus.className = 'qa';
          projectStatus.labelContent = 'Q&A';
          break;
        case 3:
          projectStatus.className = 'rejected';
          projectStatus.labelContent = 'Rejected';
          break;
        case 4:
          projectStatus.className = 'new';
          projectStatus.labelContent = 'New';
          break;
      }
      return projectStatus;
    };
  };
  angular.module('frontendApp').service('statusService', statusService);
}());

(function () {
  'use strict';
  angular.module('frontendApp').value('appSettings', {
      title: 'Customers Application',
      verion: '0.0.1',
      apiRoot: 'http://localhost:8080/'
  });
}());

(function() {
  'use strict';

  var authHeaders = function () {
    return {
      restrict: 'E',
      templateUrl: 'app/auth/directives/authHeaders/authHeaders.html'
    };
  };

  authHeaders.$inject = [];
  angular.module('authModule').directive('authHeaders', authHeaders);

}());

(function() {
  'use strict';
  var headerSection = function() {
    return {
      restrict: 'E',
      templateUrl: 'app/common/directives/header/headerSection.html',
      link: function(scope) {
        scope.menuVisible = false;
        scope.toggleMenu = function() {
          scope.menuVisible = !scope.menuVisible;
        };
        scope.hideMenu = function() {
          scope.menuVisible = false;
        };
      }
    };
  };

  headerSection.$inject = [];
  angular.module('frontendApp').directive('headerSection', headerSection);

}());

(function() {
  'use strict';
  var windowScroll = function($window) {
    return {
      link: function(scope, element, attrs) {
        var distance;

        angular.element($window).bind('scroll', function() {
          distance = this.pageYOffset;

          if (distance >= 25) {
            scope.scrollClass = 'small';
          } else {
            scope.scrollClass = '';
          }
          if (distance > 50) {
            scope.scrollClass += ' hidden';
          } else {
            scope.scrollClass = '';
          }

          scope.$apply();
        });
      }
    };
  };

  windowScroll.$inject = ['$window'];

  angular.module('frontendApp').directive('windowScroll', windowScroll);
}());

(function() {
  'use strict';
  var templatePreview = function(statusService) {
    return {
      restrict: 'E',
      templateUrl: 'app/panel/directives/templatePreview/templatePreview.html',
      link: function (scope) {
        scope.projectStatus = statusService.getStatus(scope.template.statusCode);
      }
    };
  };

  templatePreview.$inject = ['statusService'];
  angular.module('frontendApp').directive('templatePreview', templatePreview);

}());

