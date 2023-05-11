#!/bin/bash
echo "Starting replica set initialize"
until mongosh --host mongo-router1 --eval "print(\"waited for connection\")"
do
    sleep 20
done
echo "Connection finished"
echo "Creating replica set"
mongosh --host mongo-router1 <<EOF
sh.addShard('shard1/shard01-a:27017')
sh.addShard('shard2/shard02-a:27017')


sh.enableSharding("online-judge")
sh.shardCollection("online-judge.cities", { "country": "hashed" })
EOF

