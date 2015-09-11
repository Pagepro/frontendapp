var express = require('express');
var cors = require('cors');


var app = express();
app.use(cors())

app.use(express.static(__dirname + '/'));

app.get('/projects/:id', function(req, res) {
  var customerId = parseInt(req.params.id);
  var data = {};
  for (var i = 0, len = projects.length; i < len; i++) {
    if (projects[i].id === customerId) {
      console.log('xd');
      data = projects[i];
      break;
    }
  }
  res.json(data);
});

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
 * http://beta.json-generator.com/

 * Update this markup every time!
[
  {
    'repeat:7': {
      _id: '{{objectId()}}',
      id: '{{index()}}',
      status: '{{random("complete", "inprogress", "new", "rejected", "qa")}}',
      about: '{{lorem(1, "paragraphs")}}',
      projectProgress: '{{integer(0, 100)}}',
      dateUpdated: '{{moment(this.date(new Date(2015, 2, 1), new Date())).valueOf()}}',
      dateAdded: '{{moment(this.date(new Date(2014, 0, 1), new Date())).valueOf()}}',
      dateFinished: '{{moment(this.date(new Date(2014, 0, 1), new Date())).valueOf()}}',
      templates: [
        {
          'repeat:5': {
            id: '{{index()}}',
            image: 'https://placeimg.com/640/480/any?v={{integer(4, 100)}}',
            name: function () {
              return 'templateName' + '{{index()}}';
            }
          }
        }
      ],
      files: [
        {
          'repeat:3': {
            id: '{{index()}}',
            extension: '{{random("zip", "psd", "7z")}}',
            size: '{{integer(0, 100)}}',
            dateUpdated: '{{moment(this.date(new Date(2015, 2, 1), new Date())).valueOf()}}',
            name: function () {
              return 'templateName' + '{{index()}}';
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
    "_id": "55f2b3bd128396a3fa6e47e4",
    "id": 0,
    "status": "inprogress",
    "about": "Irure fugiat enim magna aliquip velit ex officia ex. Ea fugiat tempor qui cillum consequat commodo voluptate nisi. Pariatur duis reprehenderit mollit sunt commodo do.",
    "projectProgress": 14,
    "dateUpdated": 1440382991926,
    "dateAdded": 1397138548600,
    "dateFinished": 1422469010342,
    "templates": [
      {
        "id": 0,
        "image": "https://placeimg.com/640/480/any?v=11",
        "name": "templateName0"
      },
      {
        "id": 1,
        "image": "https://placeimg.com/640/480/any?v=40",
        "name": "templateName1"
      },
      {
        "id": 2,
        "image": "https://placeimg.com/640/480/any?v=53",
        "name": "templateName2"
      },
      {
        "id": 3,
        "image": "https://placeimg.com/640/480/any?v=66",
        "name": "templateName3"
      },
      {
        "id": 4,
        "image": "https://placeimg.com/640/480/any?v=6",
        "name": "templateName4"
      }
    ],
    "files": [
      {
        "id": 0,
        "extension": "psd",
        "size": 76,
        "dateUpdated": 1433365655076,
        "name": "templateName0"
      },
      {
        "id": 1,
        "extension": "zip",
        "size": 61,
        "dateUpdated": 1427968367700,
        "name": "templateName1"
      },
      {
        "id": 2,
        "extension": "7z",
        "size": 70,
        "dateUpdated": 1441853500079,
        "name": "templateName2"
      }
    ],
    "fileName": "KRD_{{index()}}"
  },
  {
    "_id": "55f2b3bd4e785797d4865dd6",
    "id": 1,
    "status": "rejected",
    "about": "Elit labore esse do duis in ad. Id aliqua reprehenderit dolor laborum laborum irure adipisicing duis aute esse ad ex Lorem. Id quis ullamco in ad aute. Sunt aliqua eu ipsum magna et ex sit. Enim irure nulla ad id. Consectetur amet cupidatat commodo sunt ipsum reprehenderit laboris id minim esse qui ipsum.",
    "projectProgress": 89,
    "dateUpdated": 1440605515544,
    "dateAdded": 1431642857538,
    "dateFinished": 1439158406282,
    "templates": [
      {
        "id": 0,
        "image": "https://placeimg.com/640/480/any?v=11",
        "name": "templateName0"
      },
      {
        "id": 1,
        "image": "https://placeimg.com/640/480/any?v=40",
        "name": "templateName1"
      },
      {
        "id": 2,
        "image": "https://placeimg.com/640/480/any?v=53",
        "name": "templateName2"
      },
      {
        "id": 3,
        "image": "https://placeimg.com/640/480/any?v=66",
        "name": "templateName3"
      },
      {
        "id": 4,
        "image": "https://placeimg.com/640/480/any?v=6",
        "name": "templateName4"
      }
    ],
    "files": [
      {
        "id": 0,
        "extension": "psd",
        "size": 76,
        "dateUpdated": 1433365655076,
        "name": "templateName0"
      },
      {
        "id": 1,
        "extension": "zip",
        "size": 61,
        "dateUpdated": 1427968367700,
        "name": "templateName1"
      },
      {
        "id": 2,
        "extension": "7z",
        "size": 70,
        "dateUpdated": 1441853500079,
        "name": "templateName2"
      }
    ],
    "fileName": "SOK_{{index()}}"
  },
  {
    "_id": "55f2b3bdc60e06072d7ceea0",
    "id": 2,
    "status": "complete",
    "about": "Et cupidatat eu nisi adipisicing consectetur. Duis cupidatat ut aute amet esse fugiat cillum et ullamco. Aute id excepteur excepteur elit. Labore sunt aliqua laborum occaecat enim aliqua dolor officia minim cupidatat id commodo nisi. Elit non exercitation aliqua occaecat commodo adipisicing sit labore cupidatat aliquip amet sunt qui. Qui ipsum officia aute qui labore.",
    "projectProgress": 99,
    "dateUpdated": 1435100649830,
    "dateAdded": 1425370491510,
    "dateFinished": 1389622473517,
    "templates": [
      {
        "id": 0,
        "image": "https://placeimg.com/640/480/any?v=11",
        "name": "templateName0"
      },
      {
        "id": 1,
        "image": "https://placeimg.com/640/480/any?v=40",
        "name": "templateName1"
      },
      {
        "id": 2,
        "image": "https://placeimg.com/640/480/any?v=53",
        "name": "templateName2"
      },
      {
        "id": 3,
        "image": "https://placeimg.com/640/480/any?v=66",
        "name": "templateName3"
      },
      {
        "id": 4,
        "image": "https://placeimg.com/640/480/any?v=6",
        "name": "templateName4"
      }
    ],
    "files": [
      {
        "id": 0,
        "extension": "psd",
        "size": 76,
        "dateUpdated": 1433365655076,
        "name": "templateName0"
      },
      {
        "id": 1,
        "extension": "zip",
        "size": 61,
        "dateUpdated": 1427968367700,
        "name": "templateName1"
      },
      {
        "id": 2,
        "extension": "7z",
        "size": 70,
        "dateUpdated": 1441853500079,
        "name": "templateName2"
      }
    ],
    "fileName": "RZF_2"
  },
  {
    "_id": "55f2b3bd2a1df28735b1699f",
    "id": 3,
    "status": "inprogress",
    "about": "Nostrud officia aliquip occaecat esse incididunt nulla aute sit. Incididunt deserunt adipisicing laborum exercitation ex anim velit exercitation culpa fugiat anim pariatur adipisicing id. Dolore velit fugiat cupidatat ipsum ullamco eiusmod incididunt. Esse esse voluptate commodo amet non consectetur et pariatur cupidatat.",
    "projectProgress": 88,
    "dateUpdated": 1431028352852,
    "dateAdded": 1388608695356,
    "dateFinished": 1429850359639,
    "templates": [
      {
        "id": 0,
        "image": "https://placeimg.com/640/480/any?v=11",
        "name": "templateName0"
      },
      {
        "id": 1,
        "image": "https://placeimg.com/640/480/any?v=40",
        "name": "templateName1"
      },
      {
        "id": 2,
        "image": "https://placeimg.com/640/480/any?v=53",
        "name": "templateName2"
      },
      {
        "id": 3,
        "image": "https://placeimg.com/640/480/any?v=66",
        "name": "templateName3"
      },
      {
        "id": 4,
        "image": "https://placeimg.com/640/480/any?v=6",
        "name": "templateName4"
      }
    ],
    "files": [
      {
        "id": 0,
        "extension": "psd",
        "size": 76,
        "dateUpdated": 1433365655076,
        "name": "templateName0"
      },
      {
        "id": 1,
        "extension": "zip",
        "size": 61,
        "dateUpdated": 1427968367700,
        "name": "templateName1"
      },
      {
        "id": 2,
        "extension": "7z",
        "size": 70,
        "dateUpdated": 1441853500079,
        "name": "templateName2"
      }
    ],
    "fileName": "RZF_3"
  },
  {
    "_id": "55f2b3bdabdcbad326240586",
    "id": 4,
    "status": "complete",
    "about": "Aliquip tempor cupidatat do veniam et exercitation cillum elit proident. Quis elit non tempor fugiat nisi incididunt amet. Elit laboris enim dolor magna occaecat laboris ipsum. Aliqua ex est laborum mollit amet do elit. Enim ex occaecat et nisi laboris eu irure sit tempor est elit veniam. Cillum proident dolor laborum nostrud est est ea qui laborum eiusmod officia. Proident reprehenderit deserunt ad ipsum aliquip exercitation laborum proident officia proident enim nisi ex excepteur.",
    "projectProgress": 86,
    "dateUpdated": 1429161846083,
    "dateAdded": 1391670568029,
    "dateFinished": 1399953662621,
    "templates": [
      {
        "id": 0,
        "image": "https://placeimg.com/640/480/any?v=11",
        "name": "templateName0"
      },
      {
        "id": 1,
        "image": "https://placeimg.com/640/480/any?v=40",
        "name": "templateName1"
      },
      {
        "id": 2,
        "image": "https://placeimg.com/640/480/any?v=53",
        "name": "templateName2"
      },
      {
        "id": 3,
        "image": "https://placeimg.com/640/480/any?v=66",
        "name": "templateName3"
      },
      {
        "id": 4,
        "image": "https://placeimg.com/640/480/any?v=6",
        "name": "templateName4"
      }
    ],
    "files": [
      {
        "id": 0,
        "extension": "psd",
        "size": 76,
        "dateUpdated": 1433365655076,
        "name": "templateName0"
      },
      {
        "id": 1,
        "extension": "zip",
        "size": 61,
        "dateUpdated": 1427968367700,
        "name": "templateName1"
      },
      {
        "id": 2,
        "extension": "7z",
        "size": 70,
        "dateUpdated": 1441853500079,
        "name": "templateName2"
      }
    ],
    "fileName": "SOK_4"
  },
  {
    "_id": "55f2b3bd916f9185e7a700e5",
    "id": 5,
    "status": "qa",
    "about": "Dolor aliqua aliquip ullamco eu eu consequat. In officia minim nisi duis qui esse aliqua et amet consequat nisi sit. Anim nulla ea duis occaecat eiusmod pariatur ea. Sint commodo Lorem pariatur minim exercitation. Nostrud consectetur tempor nostrud anim quis sit culpa sunt sit tempor esse minim aute et. Aliqua proident ea nisi excepteur officia eu consectetur ipsum.",
    "projectProgress": 22,
    "dateUpdated": 1426930247874,
    "dateAdded": 1418335358836,
    "dateFinished": 1409997731741,
    "templates": [
      {
        "id": 0,
        "image": "https://placeimg.com/640/480/any?v=11",
        "name": "templateName0"
      },
      {
        "id": 1,
        "image": "https://placeimg.com/640/480/any?v=40",
        "name": "templateName1"
      },
      {
        "id": 2,
        "image": "https://placeimg.com/640/480/any?v=53",
        "name": "templateName2"
      },
      {
        "id": 3,
        "image": "https://placeimg.com/640/480/any?v=66",
        "name": "templateName3"
      },
      {
        "id": 4,
        "image": "https://placeimg.com/640/480/any?v=6",
        "name": "templateName4"
      }
    ],
    "files": [
      {
        "id": 0,
        "extension": "psd",
        "size": 76,
        "dateUpdated": 1433365655076,
        "name": "templateName0"
      },
      {
        "id": 1,
        "extension": "zip",
        "size": 61,
        "dateUpdated": 1427968367700,
        "name": "templateName1"
      },
      {
        "id": 2,
        "extension": "7z",
        "size": 70,
        "dateUpdated": 1441853500079,
        "name": "templateName2"
      }
    ],
    "fileName": "SOK_5"
  },
  {
    "_id": "55f2b3bd0bad98a92f29a35e",
    "id": 6,
    "status": "rejected",
    "about": "Cupidatat pariatur et enim incididunt voluptate nulla do deserunt voluptate. Non occaecat do consequat dolor ut non labore aute laboris aliquip id. Id dolore dolore duis labore fugiat ullamco eu excepteur cillum esse.",
    "projectProgress": 85,
    "dateUpdated": 1427586788002,
    "dateAdded": 1412650323718,
    "dateFinished": 1388833477966,
    "templates": [
      {
        "id": 0,
        "image": "https://placeimg.com/640/480/any?v=11",
        "name": "templateName0"
      },
      {
        "id": 1,
        "image": "https://placeimg.com/640/480/any?v=40",
        "name": "templateName1"
      },
      {
        "id": 2,
        "image": "https://placeimg.com/640/480/any?v=53",
        "name": "templateName2"
      },
      {
        "id": 3,
        "image": "https://placeimg.com/640/480/any?v=66",
        "name": "templateName3"
      },
      {
        "id": 4,
        "image": "https://placeimg.com/640/480/any?v=6",
        "name": "templateName4"
      }
    ],
    "files": [
      {
        "id": 0,
        "extension": "psd",
        "size": 76,
        "dateUpdated": 1433365655076,
        "name": "templateName0"
      },
      {
        "id": 1,
        "extension": "zip",
        "size": 61,
        "dateUpdated": 1427968367700,
        "name": "templateName1"
      },
      {
        "id": 2,
        "extension": "7z",
        "size": 70,
        "dateUpdated": 1441853500079,
        "name": "templateName2"
      }
    ],
    "fileName": "SOK_6"
  }
]
