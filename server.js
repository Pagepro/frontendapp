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
      projectProgress: '{{integer(0, 100)}}',
      dateUpdated: '{{moment(this.date(new Date(2015, 2, 1), new Date())).valueOf()}}',
      dateAdded: '{{moment(this.date(new Date(2014, 0, 1), new Date())).valueOf()}}',
      dateFinished: '{{moment(this.date(new Date(2014, 0, 1), new Date())).valueOf()}}',
      templates: [
        {
          'repeat:5': {
            id: '{{index()}}',
            image: 'https://placeimg.com/640/480/any',
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
    "_id": "55f187d258de6a4b6f0083c5",
    "id": 0,
    "status": "in_progress",
    "about": "Sunt pariatur eu ad veniam in eiusmod. Cupidatat aute sunt ipsum do ex duis cupidatat esse ex. Labore qui est cillum occaecat aliqua amet exercitation sit. Incididunt magna nostrud eu fugiat mollit Lorem aliquip irure et proident. Anim laboris amet sit anim adipisicing deserunt magna enim. Adipisicing pariatur consequat ex ipsum officia ex qui duis adipisicing.",
    "projectProgress": 74,
    "dateUpdated": 1433033487219,
    "dateAdded": 1401215560047,
    "dateFinished": 1405861460776,
    "templates": [
      {
        "id": 0,
        "image": "https://placeimg.com/640/480/any",
        "name": "template0"
      },
      {
        "id": 1,
        "image": "https://placeimg.com/640/480/any",
        "name": "template1"
      },
      {
        "id": 2,
        "image": "https://placeimg.com/640/480/any",
        "name": "template2"
      },
      {
        "id": 3,
        "image": "https://placeimg.com/640/480/any",
        "name": "template3"
      },
      {
        "id": 4,
        "image": "https://placeimg.com/640/480/any",
        "name": "template4"
      }
    ],
    "fileName": "SOK_{{index()}}"
  },
  {
    "_id": "55f187d3341c845420cdcf0f",
    "id": 1,
    "status": "finished",
    "about": "Voluptate reprehenderit culpa aute aliquip irure enim. Elit commodo magna tempor consectetur occaecat laboris eiusmod sit. Irure mollit esse eu ipsum ut in et. Minim elit non incididunt reprehenderit sint esse magna aliqua nostrud Lorem labore quis adipisicing nisi. Aute dolore ullamco nulla tempor sint id.",
    "projectProgress": 69,
    "dateUpdated": 1426102718781,
    "dateAdded": 1440147186863,
    "dateFinished": 1391152108329,
    "templates": [
      {
        "id": 0,
        "image": "https://placeimg.com/640/480/any",
        "name": "template0"
      },
      {
        "id": 1,
        "image": "https://placeimg.com/640/480/any",
        "name": "template1"
      },
      {
        "id": 2,
        "image": "https://placeimg.com/640/480/any",
        "name": "template2"
      },
      {
        "id": 3,
        "image": "https://placeimg.com/640/480/any",
        "name": "template3"
      },
      {
        "id": 4,
        "image": "https://placeimg.com/640/480/any",
        "name": "template4"
      }
    ],
    "fileName": "KRD_{{index()}}"
  },
  {
    "_id": "55f187d345b92f403ba1a88e",
    "id": 2,
    "status": "finished",
    "about": "Nostrud anim irure sunt laborum et amet. Incididunt nostrud amet dolore eiusmod id laborum ex labore ea quis reprehenderit sunt ipsum. Velit deserunt duis aute veniam nulla enim magna deserunt eu veniam. Ad veniam adipisicing esse sunt qui elit id. Consequat eu ex amet do. Dolor labore sint quis fugiat sint cillum minim magna sint sunt do ea consectetur nostrud. Dolore est non magna voluptate est exercitation magna sit non.",
    "projectProgress": 91,
    "dateUpdated": 1432774531277,
    "dateAdded": 1418275147503,
    "dateFinished": 1416741818098,
    "templates": [
      {
        "id": 0,
        "image": "https://placeimg.com/640/480/any",
        "name": "template0"
      },
      {
        "id": 1,
        "image": "https://placeimg.com/640/480/any",
        "name": "template1"
      },
      {
        "id": 2,
        "image": "https://placeimg.com/640/480/any",
        "name": "template2"
      },
      {
        "id": 3,
        "image": "https://placeimg.com/640/480/any",
        "name": "template3"
      },
      {
        "id": 4,
        "image": "https://placeimg.com/640/480/any",
        "name": "template4"
      }
    ],
    "fileName": "SOK_2"
  },
  {
    "_id": "55f187d30c120529540f6ee9",
    "id": 3,
    "status": "qa",
    "about": "Enim laboris duis ullamco laborum aute quis aute elit laborum. Excepteur labore irure deserunt reprehenderit incididunt Lorem amet labore. Excepteur nostrud nulla quis enim esse sint eu mollit esse cillum elit voluptate anim. Non commodo irure minim fugiat id. Esse labore enim eiusmod quis Lorem elit consectetur excepteur commodo culpa.",
    "projectProgress": 59,
    "dateUpdated": 1435357112043,
    "dateAdded": 1437400682031,
    "dateFinished": 1394035094027,
    "templates": [
      {
        "id": 0,
        "image": "https://placeimg.com/640/480/any",
        "name": "template0"
      },
      {
        "id": 1,
        "image": "https://placeimg.com/640/480/any",
        "name": "template1"
      },
      {
        "id": 2,
        "image": "https://placeimg.com/640/480/any",
        "name": "template2"
      },
      {
        "id": 3,
        "image": "https://placeimg.com/640/480/any",
        "name": "template3"
      },
      {
        "id": 4,
        "image": "https://placeimg.com/640/480/any",
        "name": "template4"
      }
    ],
    "fileName": "KRD_3"
  },
  {
    "_id": "55f187d306670ce1a265828e",
    "id": 4,
    "status": "qa",
    "about": "Ad id do excepteur proident proident consectetur sint exercitation sint ullamco in. Pariatur voluptate cupidatat quis fugiat incididunt. Sint ut minim occaecat fugiat velit quis deserunt proident mollit occaecat.",
    "projectProgress": 73,
    "dateUpdated": 1438448695967,
    "dateAdded": 1432292437398,
    "dateFinished": 1431956426109,
    "templates": [
      {
        "id": 0,
        "image": "https://placeimg.com/640/480/any",
        "name": "template0"
      },
      {
        "id": 1,
        "image": "https://placeimg.com/640/480/any",
        "name": "template1"
      },
      {
        "id": 2,
        "image": "https://placeimg.com/640/480/any",
        "name": "template2"
      },
      {
        "id": 3,
        "image": "https://placeimg.com/640/480/any",
        "name": "template3"
      },
      {
        "id": 4,
        "image": "https://placeimg.com/640/480/any",
        "name": "template4"
      }
    ],
    "fileName": "RZF_4"
  },
  {
    "_id": "55f187d3d033c468606131c3",
    "id": 5,
    "status": "finished",
    "about": "Officia voluptate eu deserunt eiusmod incididunt reprehenderit laboris officia incididunt ad dolore irure anim ut. Cupidatat nulla do quis nostrud cillum ipsum elit. Dolor adipisicing dolor mollit pariatur anim elit qui eu. Aute laborum minim cupidatat culpa nisi consectetur. Minim eiusmod cupidatat exercitation quis anim voluptate fugiat commodo pariatur elit. Pariatur voluptate do culpa ex sit nisi minim in incididunt magna enim eu.",
    "projectProgress": 23,
    "dateUpdated": 1433976054243,
    "dateAdded": 1432398750777,
    "dateFinished": 1395245449924,
    "templates": [
      {
        "id": 0,
        "image": "https://placeimg.com/640/480/any",
        "name": "template0"
      },
      {
        "id": 1,
        "image": "https://placeimg.com/640/480/any",
        "name": "template1"
      },
      {
        "id": 2,
        "image": "https://placeimg.com/640/480/any",
        "name": "template2"
      },
      {
        "id": 3,
        "image": "https://placeimg.com/640/480/any",
        "name": "template3"
      },
      {
        "id": 4,
        "image": "https://placeimg.com/640/480/any",
        "name": "template4"
      }
    ],
    "fileName": "RZF_5"
  },
  {
    "_id": "55f187d3af4a8c0b583242da",
    "id": 6,
    "status": "new",
    "about": "Officia aliqua minim esse mollit ex laborum ad sit Lorem esse tempor ut. Ipsum occaecat ullamco officia aute labore magna qui cillum non occaecat. Sunt est ullamco minim amet laboris esse fugiat eu ipsum aliquip dolore. Non exercitation ut ex minim fugiat.",
    "projectProgress": 35,
    "dateUpdated": 1440706671371,
    "dateAdded": 1408474572026,
    "dateFinished": 1398999896966,
    "templates": [
      {
        "id": 0,
        "image": "https://placeimg.com/640/480/any",
        "name": "template0"
      },
      {
        "id": 1,
        "image": "https://placeimg.com/640/480/any",
        "name": "template1"
      },
      {
        "id": 2,
        "image": "https://placeimg.com/640/480/any",
        "name": "template2"
      },
      {
        "id": 3,
        "image": "https://placeimg.com/640/480/any",
        "name": "template3"
      },
      {
        "id": 4,
        "image": "https://placeimg.com/640/480/any",
        "name": "template4"
      }
    ],
    "fileName": "SOK_6"
  }
];
