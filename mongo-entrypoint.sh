#!/bin/bash
mongod --replSet rs0 --bind_ip_all &

pid=$!

echo "Waiting for MongoDB to start..."
until mongosh --quiet --eval "db.adminCommand({ping:1})" > /dev/null 2>&1; do
  sleep 1
done

echo "Running replica set initiation if needed..."
mongosh --eval "
  try {
    rs.status();
    print('Replica set already initiated.');
  } catch(e) {
    print('Initiating replica set...');
    rs.initiate({
      _id: 'rs0',
      members: [{ _id: 0, host: 'mongo:27017' }]
    });
  }
"

wait $pid
