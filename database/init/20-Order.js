db.createCollection("Order")

const date1 = new Date(2020, 05, 23, 17, 01);
db.Order.insert({ "UserID": "5ef4e40c47c32c01026d051b", "Date": date1, "Status": "PENDING", "Message": "message", "Basket": [
  {
    "Measure": "Pint",
    "Name": "Beer 1",
    "Price": 4.25,
    "ProductID": "122Pint",
    "Quantity": 2
  }
]})

const date2 = new Date(2020, 05, 23, 18, 53);
db.Order.insert({ "UserID": "5ef4e40c47c32c01026d051b", "Date": date2, "Status": "PREPARING", "Message": "message", "Basket": [
  {
    "Measure": "Pint",
    "Name": "Beer 1",
    "Price": 4.25,
    "ProductID": "122Pint",
    "Quantity": 2
  },
  {
    "Measure": "Pint",
    "Name": "Beer 2",
    "Price": 4.25,
    "ProductID": "123Pint",
    "Quantity": 2
  }
]})

const date3 = new Date(2020, 05, 23, 16, 46);
db.Order.insert({ "UserID": "5ef4e40c47c32c01026d051b", "Date": date3, "Status": "READY", "Message": "message", "Basket": [
  {
    "Measure": "Pint",
    "Name": "Beer 1",
    "Price": 4.25,
    "ProductID": "122Pint",
    "Quantity": 3
  }
]})

const date4 = new Date(2020, 05, 23, 16, 52);
db.Order.insert({ "UserID": "5ef4e40c47c32c01026d051b", "Date": date4, "Status": "COLLECTED", "Message": "message", "Basket": [
  {
    "Measure": "Pint",
    "Name": "Beer 1",
    "Price": 4.25,
    "ProductID": "122Pint",
    "Quantity": 2
  }
]})

const date5 = new Date(2020, 05, 23, 16, 58);
db.Order.insert({ "UserID": "5ef4e40c47c32c01026d051b", "Date": date5, "Status": "CANCELLED", "Message": "message", "Basket": [
  {
    "Measure": "Pint",
    "Name": "Beer 1",
    "Price": 4.25,
    "ProductID": "122Pint",
    "Quantity": 1
  }
]})
