var express = require('/usr/local/lib/node_modules/express'),
    app = express();

//Express 4  (to /usr/local/bin/node...
app.use(express.static(__dirname, '/'));

app.get('/customer/:id', function(req, res) {
    var customerId = parseInt(req.params.id);
    var data = {};
    for (var i=0,len=customers.length;i<len;i++) {
        if (customers[i].id === customerId) {
           data = customers[i];
           break;
        }
    }
    res.json(data);
});

app.get('/customers', function(req, res) {
    res.json(customers);
    //res.json(500, { error: 'An error has occurred!' });
});

app.get('/orders', function(req, res) {
    var orders = [];
    for (var i=0,len=customers.length;i<len;i++) {
        if (customers[i].orders) {
            for (var j=0,ordersLen=customers[i].orders.length;j<ordersLen;j++) {
                orders.push(customers[i].orders[j]);
            }
        }
    }
    res.json(orders);
});

app.delete('/customerDelete/:id', function(req, res) {
    var customerId = parseInt(req.params.id);
    var data = { status: true };

    for (var i=0,len=customers.length;i<len;i++) {
        if (customers[i].id === customerId) {
           customers.splice(i,1);
           data = { status: true };
			// console.log('Delete splice completed for id ' + customerId );
           break;
        }
    }
    res.json(data);
});

app.listen(8080);

console.log('Express listening on port 8080');

var customers = [
	{
		id: 1,
		joined: '1965-25-01',
		name: 'Zed',
		city: 'Las Vegas',
		orderTotal: 119.99,
		pic: '',
		orders: [
			{
				id: 1,
				product: 'Winch pawls',
				total: 37.50
			}
		]
	},
	{
		id: 2,
		joined: '2014-01-01',
		name: 'Dave',
		city: 'Camarillo',
		orderTotal: 217.999534,
		pic: '',
		orders: [
			{
				id: 2,
				product: 'Tiller extension',
				total: 117.50
			}
		]
	},
	{
		id: 3,
		joined: '2012-03-31',
		name: 'Alex',
		city: 'Pacific Palisades',
		orderTotal: 129.25,
		pic: '',
		orders: [
			{
				id: 3,
				product: 'Winch spring set',
				total: 7.25
			}
		]
	},
	{
		id: 4,
		joined: '2013-02-02',
		name: 'Drew',
		city: 'LA',
		orderTotal: 9.01,
		pic: '',
		orders: [
			{
				id: 4,
				product: 'Winch lube',
				total: 10.00
			},
			{
				id: 5,
				product: 'Sail repair tape',
				total: 19.99
			}
		]
	},
	{
		id: 5,
		joined: '2014-03-01',
		name: 'Jennifer',
		city: 'Napa',
		orderTotal: 399.01,
		pic: '',
		orders: [
			{
				id: 6,
				product: 'Winch bearings',
				total: 128.49
			}
		]
	}
];
