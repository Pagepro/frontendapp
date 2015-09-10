var express = require('express');
var cors = require('cors');


var app = express();
app.use(cors())

app.use(express.static(__dirname + '/'));

// app.get('/projects/:id', function(req, res) {
//     var customerId = parseInt(req.params.id);
//     var data = {};
//     for (var i=0,len=customers.length;i<len;i++) {
//         if (customers[i].id === customerId) {
//            data = customers[i];
//            break;
//         }
//     }
//     res.json(data);
// });

app.get('/projects', function(req, res) {
    res.json(projects);
    //res.json(500, { error: 'An error has occurred!' });
});

// app.get('/orders', function(req, res) {
//     var orders = [];
//     for (var i=0,len=customers.length;i<len;i++) {
//         if (customers[i].orders) {
//             for (var j=0,ordersLen=customers[i].orders.length;j<ordersLen;j++) {
//                 orders.push(customers[i].orders[j]);
//             }
//         }
//     }
//     res.json(orders);
// });

// app.delete('/customers/:id', function(req, res) {
//     var customerId = parseInt(req.params.id);
//     var data = { status: true };
//     for (var i=0,len=customers.length;i<len;i++) {
//         if (customers[i].id === customerId) {
//            customers.splice(i,1);
//            data = { status: true };
//            break;
//         }
//     }
//     res.json(data);
// });

app.listen(8080);

console.log('Express listening on port 8080');
/**
 * Generate the array using
 * http://beta.json-generator.com/NJmKpw9a

 * Update this markup every time!
[
  {
    'repeat:7': {
      _id: '{{objectId()}}',
      id: '{{index()}}',
      status: '{{random("finished", "in_progress", "new", "rejected", "qa")}}',
      about: '{{lorem(1, "paragraphs")}}',
      dateAdded: '{{moment(this.date(new Date(2014, 0, 1), new Date())).format("LLLL")}}',
      dateFinished: '{{moment(this.date(new Date(2014, 0, 1), new Date())).format("LLLL")}}',
      templates: [
        {
          'repeat:4': {
            id: '{{index()}}',
            picture: 'http://placehold.it/500x412',
            name: function () {
              return 'template' + '{{index()}}';
            }
          }
        }
      ],
      fileName: function (tags) {
        var names = ['RZF', 'KRD', 'SOK'];
        return names[tags.integer(0, names.length - 1)] + '_' + '{{index()}}';
      }
    }
  }
]
*/
var projects = [
  {
    "_id": "55f182bcac9e2b5d2c831d28",
    "id": 0,
    "status": "rejected",
    "about": "Aliquip voluptate dolor nulla laborum cupidatat culpa labore veniam nostrud consectetur veniam aliquip do laborum. Eiusmod esse esse dolor elit commodo. Consequat ipsum sunt non exercitation ex ullamco cillum ea quis elit enim cillum quis cillum.",
    "dateAdded": "Tuesday, March 31, 2015 1:13 PM",
    "dateFinished": "Wednesday, May 21, 2014 11:26 AM",
    "templates": [
      {
        "id": 0,
        "picture": "http://placehold.it/500x412",
        "name": "template0"
      },
      {
        "id": 1,
        "picture": "http://placehold.it/500x412",
        "name": "template1"
      },
      {
        "id": 2,
        "picture": "http://placehold.it/500x412",
        "name": "template2"
      },
      {
        "id": 3,
        "picture": "http://placehold.it/500x412",
        "name": "template3"
      }
    ],
    "fileName": "KRD_{{index()}}"
  },
  {
    "_id": "55f182bc39bc5b86c56f0541",
    "id": 1,
    "status": "qa",
    "about": "Ea fugiat veniam laborum laboris quis dolore commodo. Laboris velit mollit labore mollit commodo enim. Cillum commodo officia fugiat proident dolor fugiat ea laboris magna fugiat ex.",
    "dateAdded": "Sunday, March 22, 2015 6:40 PM",
    "dateFinished": "Friday, March 27, 2015 7:22 PM",
    "templates": [
      {
        "id": 0,
        "picture": "http://placehold.it/500x412",
        "name": "template0"
      },
      {
        "id": 1,
        "picture": "http://placehold.it/500x412",
        "name": "template1"
      },
      {
        "id": 2,
        "picture": "http://placehold.it/500x412",
        "name": "template2"
      },
      {
        "id": 3,
        "picture": "http://placehold.it/500x412",
        "name": "template3"
      }
    ],
    "fileName": "RZF_{{index()}}"
  },
  {
    "_id": "55f182bc70152d0da9ec3573",
    "id": 2,
    "status": "finished",
    "about": "Do pariatur minim minim laboris est ullamco Lorem sit officia. Eiusmod ad ut ad consectetur nostrud deserunt ea reprehenderit duis consectetur in. Labore commodo anim et voluptate et eiusmod sit.",
    "dateAdded": "Sunday, July 5, 2015 5:20 AM",
    "dateFinished": "Wednesday, August 26, 2015 4:31 PM",
    "templates": [
      {
        "id": 0,
        "picture": "http://placehold.it/500x412",
        "name": "template0"
      },
      {
        "id": 1,
        "picture": "http://placehold.it/500x412",
        "name": "template1"
      },
      {
        "id": 2,
        "picture": "http://placehold.it/500x412",
        "name": "template2"
      },
      {
        "id": 3,
        "picture": "http://placehold.it/500x412",
        "name": "template3"
      }
    ],
    "fileName": "SOK_2"
  },
  {
    "_id": "55f182bcba0e80609814d1d6",
    "id": 3,
    "status": "rejected",
    "about": "Ex elit qui irure ullamco sit commodo et laboris et nostrud occaecat. Commodo fugiat in nostrud officia. Ea cillum eiusmod cupidatat voluptate est excepteur nostrud esse exercitation amet. Anim Lorem labore esse mollit dolor qui eu eiusmod culpa mollit. Aliquip sunt nulla laborum ipsum.",
    "dateAdded": "Sunday, October 5, 2014 10:03 AM",
    "dateFinished": "Monday, July 20, 2015 10:30 AM",
    "templates": [
      {
        "id": 0,
        "picture": "http://placehold.it/500x412",
        "name": "template0"
      },
      {
        "id": 1,
        "picture": "http://placehold.it/500x412",
        "name": "template1"
      },
      {
        "id": 2,
        "picture": "http://placehold.it/500x412",
        "name": "template2"
      },
      {
        "id": 3,
        "picture": "http://placehold.it/500x412",
        "name": "template3"
      }
    ],
    "fileName": "RZF_3"
  },
  {
    "_id": "55f182bc98c4208c3f9f0d89",
    "id": 4,
    "status": "finished",
    "about": "Enim tempor ad tempor et aliqua voluptate ullamco amet cupidatat eu veniam aliqua. In nulla esse non anim excepteur officia labore exercitation labore excepteur. Aute aliquip consequat ea voluptate. Magna est ex fugiat irure qui cillum pariatur qui veniam consectetur velit reprehenderit aliquip anim. Reprehenderit commodo excepteur sunt eiusmod incididunt labore eiusmod tempor do consectetur duis consectetur laborum. Aliqua dolor quis commodo quis officia velit anim. Adipisicing velit pariatur sunt culpa ea qui incididunt occaecat quis ipsum excepteur cillum irure deserunt.",
    "dateAdded": "Saturday, July 12, 2014 3:52 PM",
    "dateFinished": "Tuesday, April 8, 2014 4:48 AM",
    "templates": [
      {
        "id": 0,
        "picture": "http://placehold.it/500x412",
        "name": "template0"
      },
      {
        "id": 1,
        "picture": "http://placehold.it/500x412",
        "name": "template1"
      },
      {
        "id": 2,
        "picture": "http://placehold.it/500x412",
        "name": "template2"
      },
      {
        "id": 3,
        "picture": "http://placehold.it/500x412",
        "name": "template3"
      }
    ],
    "fileName": "SOK_4"
  },
  {
    "_id": "55f182bcb910d254daca5832",
    "id": 5,
    "status": "qa",
    "about": "Eiusmod tempor quis incididunt consectetur et voluptate exercitation ut et cupidatat adipisicing. Elit consequat commodo ex laboris aute ea esse dolore adipisicing. Eiusmod ea qui pariatur minim sint nulla ea anim anim tempor ut. Ullamco pariatur adipisicing magna exercitation officia.",
    "dateAdded": "Sunday, April 20, 2014 7:56 PM",
    "dateFinished": "Sunday, August 3, 2014 2:47 AM",
    "templates": [
      {
        "id": 0,
        "picture": "http://placehold.it/500x412",
        "name": "template0"
      },
      {
        "id": 1,
        "picture": "http://placehold.it/500x412",
        "name": "template1"
      },
      {
        "id": 2,
        "picture": "http://placehold.it/500x412",
        "name": "template2"
      },
      {
        "id": 3,
        "picture": "http://placehold.it/500x412",
        "name": "template3"
      }
    ],
    "fileName": "RZF_5"
  },
  {
    "_id": "55f182bc3a44bae1bad1b49c",
    "id": 6,
    "status": "qa",
    "about": "Consectetur mollit sint laborum elit aliqua consectetur officia occaecat non fugiat qui ipsum incididunt sit. Laboris reprehenderit fugiat reprehenderit irure. Anim deserunt ullamco laborum consectetur elit laborum exercitation nulla aliqua eu.",
    "dateAdded": "Sunday, July 13, 2014 11:52 AM",
    "dateFinished": "Wednesday, July 23, 2014 12:48 AM",
    "templates": [
      {
        "id": 0,
        "picture": "http://placehold.it/500x412",
        "name": "template0"
      },
      {
        "id": 1,
        "picture": "http://placehold.it/500x412",
        "name": "template1"
      },
      {
        "id": 2,
        "picture": "http://placehold.it/500x412",
        "name": "template2"
      },
      {
        "id": 3,
        "picture": "http://placehold.it/500x412",
        "name": "template3"
      }
    ],
    "fileName": "KRD_6"
  }
];
