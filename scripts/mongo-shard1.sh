#!/bin/bash
echo "Starting replica set initialize"
until mongosh --host shard1-1 --eval "print(\"waited for connection\")"
do
    sleep 20
done
echo "Connection finished"
echo "Creating replica set"
mongosh --host shard1-1 <<EOF
rs.initiate({
  _id: 'shard1',
  version: 1,
  members: [
    { _id: 0, host: 'shard01-a:27017' },
  ],
})
EOF
