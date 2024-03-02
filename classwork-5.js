//use sample_training
db.zips.aggregate({})

//Sort.js
db.zips.aggregate([
  {
    $sort: {
      pop: -1
     }
}
])
//output:{
  _id: ObjectId('56e9b39b732b6122f877fa31'),
  city: 'CHICAGO',
  zip: '60623',
  loc: {
    y: 41.849015,
    x: 87.7157
  },
  pop: 112047,
  state: 'IL'
}
{
  _id: ObjectId('56e9b39b732b6122f877fa31'),
  city: 'BROOKLYN',
  zip: '11226',
  loc: {
    y: 40.646694,
    x: 73.956985
  },
  pop: 111396,
  state: 'NY'
}
{
  _id: ObjectId('56e9b39b732b6122f877fa31'),
  city: 'NEW YORK',
  zip: '10021',
  loc: {
    y: 40.768476,
    x: 73.958805
  },
  pop: 106564,
  state: 'NY'
}
{
  _id: ObjectId('56e9b39b732b6122f877fa31'),
  city: 'NEW YORK',
  zip: '10025',
  loc: {
    y: 40.797466,
    x: 73.968312
  },
  pop: 100027,
  state: 'NY'
}
{
  _id: ObjectId('56e9b39b732b6122f877fa31'),
  city: 'BELL GARDENS',
  zip: '90201',
  loc: {
    y: 33.969177,
    x: 118.17205
  },
  pop: 99568,
  state: 'CA'
}
{
  _id: ObjectId('56e9b39b732b6122f877fa31'),
  city: 'CHICAGO',
  zip: '60617',
  loc: {
    y: 41.725743,
    x: 87.556012
  },
  pop: 98612,
  state: 'IL'
}


//outinprojection
db.zips.aggregate([
    {
      $group: {
        _id: "$state",
        total_pop: { $sum: "$pop" }
      }
    },
    {
      $match: {
        total_pop: { $lt: 1000000 }
      }
    }
])
  [
    { _id: 'WY', total_pop: 453588},
    { _id: 'DC', total_pop: 606900},
    { _id: 'DE', total_pop: 666168},
    { _id: 'VT', total_pop: 562758},
    { _id: 'SD', total_pop: 696004},
    { _id: 'MT', total_pop: 799065},
    { _id: 'AK', total_pop: 550043},
    { _id: 'ND', total_pop: 638800}
  ]
//output :
show collections
companies
grades
inspections
posts
routes
trips
zips
//group.js
db.zips.aggregate([
  {
		$group:{
					_id: "$state",
					total_pop: { $sum:"$pop"}
        }
  },
  {
		$match: {
				totla_pop:{$lt:1000000}
			}
		},
  {
			$out: "small_states"
}
]
)
//output:
show collections
companies
grades
inspections
posts
routes
small_states
trips
zips

//project.js
db.zips.aggregate([
{
	$project: {
	state:1,
	zip:1,
	population:"$pop",
	_id:0
  }
}
])

//set.js
db.zips.aggregate([
{
	$project: {
	state:1,
	zip:1,
	population:"$pop",
	pop_2022: { $round: { $multiply: [1.0031, "$pop"]}},
	_id:0
}
}
])
/*output:
{
  zip: '35031',
  state: 'AL',
  population: 9058,
  pop_2022: 9086
}
{
  zip: '35042',
  state: 'AL',
  population: 4902,
  pop_2022: 4917
}
{
  zip: '35007',
  state: 'AL',
  population: 14218,
  pop_2022: 14262
}
{
  zip: '35072',
  state: 'AL',
  population: 3813,
  pop_2022: 3825
}
{
  zip: '35116',
  state: 'AL',
  population: 3622,
  pop_2022: 3633
}
{
  zip: '35117',
  state: 'AL',
  population: 3841,
  pop_2022: 3853
}
{
  zip: '35080',
  state: 'AL',
  population: 9938,
  pop_2022: 9969
}
{
  zip: '35085',
  state: 'AL',
  population: 7202,
  pop_2022: 7224
}
{
  zip: '35206',
  state: 'AL',
  population: 22050,
  pop_2022: 22118
}
{
  zip: '35242',
  state: 'AL',
  population: 16228,
  pop_2022: 16278
}
{
  zip: '35444',
  state: 'AL',
  population: 2319,
  pop_2022: 2326
}
{
  zip: '35470',
  state: 'AL',
  population: 6055,
  pop_2022: 6074
}
{
  zip: '35474',
  state: 'AL',
  population: 2659,
  pop_2022: 2667
}
{
  zip: '35594',
  state: 'AL',
  population: 6750,
  pop_2022: 6771
}
{
  zip: '35616',
  state: 'AL',
  population: 4811,
  pop_2022: 4826
}
{
  zip: '35611',
  state: 'AL',
  population: 35441,
  pop_2022: 35551
}
{
  zip: '35622',
  state: 'AL',
  population: 5392,
  pop_2022: 5409
}
{
  zip: '35633',
  state: 'AL',
  population: 16478,
  pop_2022: 16529
}
{
  zip: '35646',
  state: 'AL',
  population: 3046,
  pop_2022: 3055
}
{
  zip: '35647',
  state: 'AL',
  population: 3108,
  pop_2022: 3118
}


//count.js

db.zips.aggregate([
{ $count: "total_zips"}

])

output:
{
  total_zips: 29470
} 
