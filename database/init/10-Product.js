db.createCollection("Product")

db.Product.insert({ "ID": "120", "Category": "Red Wine", "name": "Wine 1", "measures": { "125ml": "3.50", "250ml": "5.00" } })
db.Product.insert({ "ID": "121", "Category": "White Wine", "name": "Wine 2", "measures": { "125ml": "3.60", "250ml": "5.10" } })
db.Product.insert({ "ID": "122", "Category": "Cider", "name": "Beer 1", "measures": { "Pint": "4.25", "Half": "2.50" } })
db.Product.insert({ "ID": "123", "Category": "Cider", "name": "Beer 2", "measures": { "Pint": "4.50", "Half": "2.75" } })