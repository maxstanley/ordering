db.createCollection("Order")

const date1 = new Date(2020, 05, 23, 17, 01);
db.Order.insert({ "UserID": "5ef4e40c47c32c01026d051b", "Date": date1, "Basket": [
  {
    "Measure": "Pint",
    "Name": "Beer 1",
    "Price": 4.25,
    "ProductID": "122Pint",
    "Quantity": 2
  }
]})

const date2 = new Date(2020, 05, 23, 18, 53);
db.Order.insert({ "UserID": "5ef4e40c47c32c01026d051b", "Date": date2, "Basket": [
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
db.Order.insert({ "UserID": "5ef4e40c47c32c01026d051b", "Date": date3, "Basket": [
  {
    "Measure": "Pint",
    "Name": "Beer 1",
    "Price": 4.25,
    "ProductID": "122Pint",
    "Quantity": 2
  }
]})
