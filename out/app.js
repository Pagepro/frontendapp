(function() {
  'use strict';

  var frontendApp = angular.module('frontendApp', ['ui.router', 'ngAnimate', 'offClick', 'authModule', 'panelModule',
    'dibari.angular-ellipsis', 'ui.sortable', 'angularSpinners'
  ]);
  frontendApp
    .config(['$urlRouterProvider',
      '$httpProvider',
      '$locationProvider',
      function($urlRouterProvider, $httpProvider) {
        $httpProvider.interceptors.push('authInterceptor');
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

          $rootScope.displayTitle = data.displayTitle;
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
          displayTitle: true
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
          pageName: 'Project Details',
          module: 'panel',
          trails: [{
            name: 'My Projects',
            link: '#/my-projects'
          }]
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
  var LoginCtrl = function($scope, $state, $window, authService) {
    $scope.submitForm = function () {
      authService.loginUser('tes', 't').success(function (authToken) {
        $window.localStorage.token = authToken;
        $state.go('myProjectsState');
      });
    };
  };

  LoginCtrl.$inject = ['$scope', '$state', '$window', 'authService'];
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
  var authInterceptor = function($q, $window, $location) {
    return {
      request: function(config) {
        config.headers = config.headers || {};
        if ($window.localStorage.token) {
          config.headers.Authorization = 'Token ' + $window.localStorage.token;
        }
        return config;
      },
      responseError: function(response) {
        if (response.status === 401) {
          $window.localStorage.removeItem('token');
          $window.localStorage.removeItem('username');
          $location.path('/');
          return;
        }
        return $q.reject(response);
      }
    };
  };

  authInterceptor.$inject = ['$q', '$window', '$location'];
  angular.module('frontendApp').factory('authInterceptor', authInterceptor);

}());

(function () {
  'use strict';
  angular.module('frontendApp').value('appSettings', {
      title: 'Fronted App',
      verion: '0.0.2',
      apiRoot: 'http://localhost:8080/'
      // apiRoot: 'http://api.frontendapp.com/'
  });
}());

(function() {
  'use strict';

  var authService = function($http, $window, appSettings) {
    var baseApiUrl = appSettings.apiRoot;

    this.loginUser = function(username, password) {
      return $http.post(baseApiUrl + 'auth/', {
        username: username,
        password: password
      });
    };
    this.logout = function () {
      $window.localStorage.removeItem('token');
    };
  };

  authService.$inject = ['$http', '$window', 'appSettings'];
  angular.module('frontendApp').service('authService', authService);

}());

/*
 * Modified angular-spinners by chevex
 * https://github.com/codetunnel/angular-spinners
 */
(function() {
  'use strict';
  var spinnerService = function() {
    var spinners = {};
    return {
      _register: function(data) {
        if (!data.hasOwnProperty('name')) {
          throw new Error("Spinner must specify a name when registering with the spinner service.");
        }
        if (spinners.hasOwnProperty(data.name)) {
          throw new Error("A spinner with the name '" + data.name + "' has already been registered.");
        }
        spinners[data.name] = data;
      },
      _unregister: function(name) {
        if (spinners.hasOwnProperty(name)) {
          delete spinners[name];
        }
      },
      _unregisterGroup: function(group) {
        for (var name in spinners) {
          if (spinners[name].group === group) {
            delete spinners[name];
          }
        }
      },
      _unregisterAll: function() {
        for (var name in spinners) {
          delete spinners[name];
        }
      },
      show: function(name) {
        var spinner = spinners[name];
        if (!spinner) {
          throw new Error("No spinner named '" + name + "' is registered.");
        }
        spinner.show();
      },
      hide: function(name) {
        var spinner = spinners[name];
        if (!spinner) {
          throw new Error("No spinner named '" + name + "' is registered.");
        }
        spinner.hide();
      },
      showGroup: function(group) {
        var groupExists = false;
        for (var name in spinners) {
          var spinner = spinners[name];
          if (spinner.group === group) {
            spinner.show();
            groupExists = true;
          }
        }
        if (!groupExists) {
          throw new Error("No spinners found with group '" + group + "'.")
        }
      },
      hideGroup: function(group) {
        var groupExists = false;
        for (var name in spinners) {
          var spinner = spinners[name];
          if (spinner.group === group) {
            spinner.hide();
            groupExists = true;
          }
        }
        if (!groupExists) {
          throw new Error("No spinners found with group '" + group + "'.")
        }
      },
      showAll: function() {
        for (var name in spinners) {
          spinners[name].show();
        }
      },
      hideAll: function() {
        for (var name in spinners) {
          spinners[name].hide();
        }
      }
    };
  };
  angular.module('angularSpinners', []).factory('spinnerService', spinnerService);

}());

(function() {
  'use strict';
  var AllProjectsCtrl = function($scope, projectsService, spinnerService) {
    $scope.allProjects = null;
    $scope.pageNo = null;
    $scope.service = projectsService.getProjects;

    $scope.init = function() {
      spinnerService.show('all-projects');
      $scope.service()
        .success(function(projects) {
          $scope.allProjects = projects.results;
          $scope.pagination = {
            count: projects.count,
            next: projects.next,
            previous: projects.previous
          };
        })
        .error(function() {})
        .finally(function() {
          spinnerService.hide('all-projects');
        });
    };

  };

  AllProjectsCtrl.$inject = ['$scope', 'projectsService', 'spinnerService'];
  angular.module('panelModule').controller('AllProjectsCtrl', AllProjectsCtrl);

}());

(function() {
  'use strict';
  var MyProjectsCtrl = function($scope, projectsService, spinnerService) {
    $scope.myProjects = null;
    $scope.init = function() {
      spinnerService.show('my-projects');
      projectsService.getProjects()
        .success(function(resp) {
          $scope.myProjects = resp.results;
        })
        .error(function() {})
        .finally(function() {
          spinnerService.hide('my-projects');
        });
    };
  };

  MyProjectsCtrl.$inject = ['$scope', 'projectsService', 'spinnerService'];
  angular.module('panelModule').controller('MyProjectsCtrl', MyProjectsCtrl);

}());

(function() {
  'use strict';
  var ProjectCtrl = function($scope, $q, $stateParams, projectsService, templatesService, filesService, ticketsService, statusService, spinnerService) {
    var projectPromise;
    var templatesPromise;
    var filesPromise;
    var ticketsPromise;

    $scope.project = null;
    $scope.files = null;
    $scope.templates = null;
    $scope.tickets = null;

    $scope.displayType = 'grid';

    $scope.getStatus = function(code) {
      return statusService.getStatus(code);
    };

    $scope.sortableOptions = {
      update: function() {
        // set new order after update
        for (var index in $scope.tickets) {
          $scope.tickets[index].order = index;
        }
        // push all items to array with newly ordered ids
        ticketsService.updateOrder($scope.tickets.map(function(item) {
          return item.id;
        }));
      },
      placeholder: 'drag-and-drop-placeholder',
      cancel: '.js-no-drop-item',
      handle: '.action-tool--drag-and-drop',
      cursor: 'move',
      opacity: 0.8,
      tolerance: 'pointer'
    };
    $scope.init = function() {
      projectPromise = projectsService.getProject($stateParams.projectId);
      projectPromise.success(function(project) {
        $scope.project = project;
      });

      filesPromise = filesService.getFiles($stateParams.projectId);
      filesPromise.success(function(files) {
        $scope.files = files;
      });

      templatesPromise = templatesService.getTemplates($stateParams.projectId);
      templatesPromise.success(function(templates) {
        $scope.templates = templates;
        $scope.deleteTemplate = templatesService.deleteTemplate;
      });

      ticketsPromise = ticketsService.getTickets($stateParams.projectId);
      ticketsPromise.success(function(tickets) {
        $scope.tickets = tickets.sort(function(item, nextItem) {
          return item.order > nextItem.order;
        });
      });
      $q.all([projectPromise, filesPromise, templatesPromise, ticketsPromise]).then(function(resp) {
        spinnerService.hide('project-details');
      });
    };
  };


  ProjectCtrl.$inject = ['$scope', '$q', '$stateParams', 'projectsService', 'templatesService', 'filesService', 'ticketsService', 'statusService', 'spinnerService'];
  angular.module('panelModule').controller('ProjectCtrl', ProjectCtrl);

}());

(function() {
  'use strict';

  var filesService = function($http, appSettings) {
    this.getFiles = function(projectId) {
      return $http.get(appSettings.apiRoot + 'projects/' + projectId + '/files');
    };
  };

  filesService.$inject = ['$http', 'appSettings'];
  angular.module('panelModule').service('filesService', filesService);

}());

(function () {
  'use strict';

  var projectsService = function ($http, appSettings) {
    var self = this;
    this.getProjects = function (pageNo) {
      var baseUrl = appSettings.apiRoot + 'projects/';
      if (!pageNo) {
        return $http.get(baseUrl);
      }
      return $http.get(baseUrl + '?page=' + pageNo);
    };
    this.getProject = function (projectId) {
      return $http.get(appSettings.apiRoot + 'projects/' + projectId);
    };
  };

  projectsService.$inject = ['$http', 'appSettings'];
  angular.module('panelModule').service('projectsService', projectsService);
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
  angular.module('panelModule').service('statusService', statusService);
}());

(function() {
  'use strict';

  var templatesService = function($http, appSettings) {
    var self = this;
    this.getTemplates = function(projectId) {
      self.route = appSettings.apiRoot + 'projects/' + projectId + '/templates';
      return $http.get(this.route);
    };
    this.deleteTemplate = function (templateId) {
      console.log('dummy-text');
      return $http.delete(self.route + '/' + templateId);
    };
  };

  templatesService.$inject = ['$http', 'appSettings'];
  angular.module('frontendApp').service('templatesService', templatesService);

}());

(function() {
  'use strict';

  var ticketsService = function($http, appSettings) {
    var self = this;
    this.getTickets = function(projectId) {
      self.projectId = projectId;
      return $http.get(appSettings.apiRoot + 'projects/' + self.projectId + '/tickets');
    };
    this.updateOrder = function (sortedArray) {
      return $http.post(appSettings.apiRoot + 'projects/' + self.projectId + '/tickets', sortedArray);
    };
  };

  ticketsService.$inject = ['$http', 'appSettings'];
  angular.module('panelModule').service('ticketsService', ticketsService);

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
  var headerSection = function(authService) {
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
        scope.logout = function() {
          scope.hideMenu();
          authService.logout();
        };
      }
    };
  };

  headerSection.$inject = ['authService'];
  angular.module('frontendApp').directive('headerSection', headerSection);

}());

(function() {
  'use strict';
  var windowScroll = function($window) {
    return {
      link: function(scope, element, attrs) {

        angular.element($window).bind('scroll', function() {
          var distance = this.pageYOffset;

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

/*
 * Modified angular-spinners by chevex
 * https://github.com/codetunnel/angular-spinners
 */
(function() {
  'use strict';
  var spinner = function($timeout) {
    return {
      restrict: 'EA',
      replace: true,
      transclude: true,
      scope: {
        name: '@?',
        group: '@?',
        show: '=?',
        register: '@?',
        onLoaded: '&?',
        onShow: '&?',
        onHide: '&?'
      },
      templateUrl: 'app/common/directives/loader/loader.html',
      controller: function($scope, spinnerService) {

        // register should be true by default if not specified.
        if (!$scope.hasOwnProperty('register')) {
          $scope.register = true;
        } else {
          $scope.register = $scope.register.toLowerCase() === 'false' ? false : true;
        }

        // Declare a mini-API to hand off to our service so the service
        // doesn't have a direct reference to this directive's scope.
        var api = {
          name: $scope.name,
          group: $scope.group,
          show: function() {
            $scope.show = true;
          },
          hide: function() {
            // temp solution to work on loaders
            $timeout(function () {
              $scope.show = false;
            }, 1000);

            // $scope.show = false;
          },
          toggle: function() {
            $scope.show = !$scope.show;
          }
        };

        // Register this spinner with the spinner service.
        if ($scope.register === true) {
          spinnerService._register(api);
        }

        // If an onShow or onHide expression was provided, register a watcher
        // that will fire the relevant expression when show's value changes.
        if ($scope.onShow || $scope.onHide) {
          $scope.$watch('show', function(show) {
            if (show && $scope.onShow) {
              $scope.onShow({
                spinnerService: spinnerService,
                spinnerApi: api
              });
            } else if (!show && $scope.onHide) {
              $scope.onHide({
                spinnerService: spinnerService,
                spinnerApi: api
              });
            }
          });
        }

        // This spinner is good to go. Fire the onLoaded expression.
        if ($scope.onLoaded) {
          $scope.onLoaded({
            spinnerService: spinnerService,
            spinnerApi: api
          });
        }

        // Unregister this spinner if the $destroy event is emitted on scope.
        $scope.$on('$destroy', function() {
          spinnerService._unregister($scope.name);
        });
      }
    };
  };

  spinner.$inject = ['$timeout'];
  angular.module('angularSpinners').directive('spinner', spinner);

}());

(function() {
  'use strict';

  var inlineProject = function(statusService) {
    return {
      restrict: 'EA',
      templateUrl: 'app/panel/directives/inlineProject/inlineProject.html',
      link: function(scope) {
        scope.projectStatus = statusService.getStatus(scope.project.status);
      }
    };
  };

  angular.$inject = ['statusService'];
  angular.module('panelModule').directive('inlineProject', inlineProject);

}());

(function () {
  'use strict';

  var inlineTicket = function (statusService) {
    return {
      restrict: 'AE',
      templateUrl: 'app/panel/directives/inlineTicket/inlineTicket.html',
      link: function (scope) {
        scope.status = statusService.getStatus(scope.ticket.status);
      }
    };
  };
  inlineTicket.$inject = ['statusService'];
  angular.module('panelModule').directive('inlineTicket', inlineTicket);

}());

(function() {
  'use strict';

  var pagination = function() {
    return {
      restrict: 'E',
      templateUrl: 'app/panel/directives/pagination/pagination.html',
      scope: {
        getterService: '=service'
      },
      transclude: true,
      controller: function ($scope) {
        $scope.currentPage = 0;
        $scope.setPage = function (page) {
          if (page >= 0) {
            // @fixme $parent??
            //                     '
            //     |\          .(' *) ' .
            //     | \        ' .*) .'*
            //     |(*\      .*(// .*) .
            //     |___\       // (. '*
            //     ((("'\     // '  * .
            //     ((c'7')   /\)
            //     ((((^))  /  \
            //   .-')))(((-'   /
            //      (((()) __/'
            // jgs   )))( |
            //        (()
            //         ))
            console.log($scope.$parent.pagination);
            $scope.getterService(page).success(function (resp) {
              $scope.$parent.allProjects = resp.results;
            });
            $scope.currentPage = page;
          } else {
            return false;
          }
        };
      }
    };
  };

  angular.module('panelModule').directive('pagination', pagination);

}());

(function() {
  'use strict';

  var projectFile = function () {
    return {
      restrict: 'A',
      templateUrl: 'app/panel/directives/projectFile/projectFile.html'
    };
  };

  angular.module('panelModule').directive('projectFile', projectFile);

}());

(function() {
  'use strict';
  var projectTeaser = function() {
    return {
      restrict: 'E',
      templateUrl: 'app/panel/directives/projectTeaser/projectTeaser.html'
    };
  };

  angular.module('panelModule').directive('projectTeaser', projectTeaser);

}());

(function() {
  'use strict';
  var templatePreview = function(statusService) {
    return {
      restrict: 'E',
      templateUrl: function (el, attr) {
        return 'app/panel/directives/templatePreview/' + attr.type + 'templatePreview.html';
      },
      link: function (scope) {
        scope.projectStatus = statusService.getStatus(scope.template.status);
      }
    };
  };

  templatePreview.$inject = ['statusService'];
  angular.module('frontendApp').directive('templatePreview', templatePreview);

}());


(function () {
  'use strict';
  var templatesListing = function () {
    return {
      restrict: 'EA',
      scope: '=',
      templateUrl: 'app/panel/directives/templatesListing/templatesListing.html',
      link: function (scope) {
        scope.activeInput = false;
        scope.toggleInput = function () {
          scope.activeInput = !scope.activeInput;
        };
      }
    };
  };

  angular.module('panelModule').directive('templatesListing', templatesListing);
}());
