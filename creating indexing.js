//SingleFieldIndex
db.student.createIndex({"class_id":551},
{
"createdCollectionAutomatically" :
false,
"numIndexesBefore": 1,
"numIndexsAfter": 2,
"ok" : 1
})

< class_id_551
> db.student.getIndexes()


//CompoundIndex
  db.student.createIndex({student_id: 777777, student_id: 223344},
{
			"createdCollectionAutomatically": false,
			"numIdexesBefore":1,
			"numIndexesAfter":2,
			"ok":1
})

< student_id_223344
> db.student.getIndexes()


//MultikeyIndex
db.student.createIndex({student:1},
{
			"createdCollectionAutomatically": false,
			"numIdexesBefore":1,
			"numIndexesAfter":2,
			"ok":1
})

< student_1
> db.student.getIndexes()


//GeoSpatial
db.student.createIndex({"score":"2dsphere"},
{
			"createdCollectionAutomatically": false,
			"numIdexesBefore":1,
			"numIndexesAfter":2,
			"ok":1
})

< score_2dsphere
> db.student.getIndexes()

//Dropindex
db.student.dropIndex({key: {student_id:551}},
{
			"createdCollectionAutomatically": false,
			"numIdexesBefore":1,
			"numIndexesAfter":2,
			"ok":1
})
