//TextIndex
db.air.createIndex(
  { fieldName: "text" },
  { name: "text_index" }
);

//MultikeyIndex
db.products.createIndex(
  { fieldName: 1 },
  { name: "multikey_index" }
);

//HashIndex
db.trips.createIndex(
  { fieldName: "hashed" },
  { name: "hash_index" }
);

//WildcardIndex
db.geo.createIndex(
  { "fieldName.$**": 1 },
  { name: "wildcard_index" }
);
