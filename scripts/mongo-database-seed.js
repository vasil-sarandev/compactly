db = db.getSiblingDB("test");

const seedUsers = () => {
  if (db.users.countDocuments({}) === 0) {
    db.users.insertOne({
      email: "example@example.com",
      name: "Vasil Sarandev",
    });
    print("✅ successfully seeded users collection...");
    return;
  }
  print("skipping users collection seed...");
};

const seedSlugPoolStats = () => {
  const MOCK_POOL_STATS = [
    { type: "DEFAULT", availableCount: 0 },
    { type: "RESERVED", availableCount: 0 },
  ];
  const matches = db.slugpoolstats
    .find({
      type: { $in: MOCK_POOL_STATS.map((s) => s.type) },
    })
    .toArray();

  if (matches.length !== MOCK_POOL_STATS.length) {
    db.slugpoolstats.insertMany(MOCK_POOL_STATS);
    print("✅ successfully seeded slug pool stats collection...");
    return;
  }

  print("skipping slug pool stats collection seed...");
};

const seedDatabase = () => {
  seedUsers();
  seedSlugPoolStats();
};

seedDatabase();
