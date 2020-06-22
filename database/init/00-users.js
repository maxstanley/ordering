
db.createUser({
  user: "app",
  pwd: "app_secret",
  roles: [
    {
      role: 'readWrite',
      db: "ORDER_MANAGEMENT",
    }
  ]
})
