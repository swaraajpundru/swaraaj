group:
  db.zips.aggregate([
{
	$group:
    {
			_id: "$city", // group key
			totalZips: { $count :{ }}
		}
}
])
SORT & LIMIT:
db.zips.aggregate([
{
$sort: {
		pop: -1
	}
}
])

  project:
db.zips.aggregate([
{

$sort: {
		pop: -1
	}
},
  {
	$limit:3
}
])
OUT IN PROJECTION:
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
db.zips.aggregate([
{ $count: "total_zips"}

])
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
Show collections()
