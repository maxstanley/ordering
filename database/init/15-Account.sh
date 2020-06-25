#!/bin/bash
set -e

SALT=$(openssl rand -base64 12)
TOHASH="${ADMIN_PASS}${SALT}"
HASH=$(echo -n $TOHASH | sha512sum | cut -d " " -f 1 )

mongo --eval "db.auth('$MONGO_INITDB_ROOT_USERNAME', '$MONGO_INITDB_ROOT_PASSWORD');\
              db = db.getSiblingDB('$MONGO_INITDB_DATABASE');\
              db.createCollection('Account');\
              db.Account.insert({\
                _id: '5ef4e40c47c32c01026d051b',\
                IsAdmin: true,\
                EmailIsValidated: true,\
                DisplayName: 'Max S',\
                Salt: '$SALT',\
                Email: '$ADMIN_EMAIL',\
                Password: '$HASH'\
              });\
"