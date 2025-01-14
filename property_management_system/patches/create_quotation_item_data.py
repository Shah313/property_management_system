import frappe

def execute():
    # Data for items under Property Sell
    property_sell_items = [
        {"item_code": "Down Payment", "item_name": "Down Payment", "item_group": "Property Sell"},
        {"item_code": "Monthly Payment", "item_name": "Monthly Payment", "item_group": "Property Sell"},
        {"item_code": "Quarterly Payment", "item_name": "Quarterly Payment", "item_group": "Property Sell"},
        {"item_code": "Other Charges", "item_name": "Other Charges", "item_group": "Property Sell"},
    ]

    # Data for items under Rent
    rent_items = [
        {"item_code": "Advance Rent", "item_name": "Advance Rent", "item_group": "Rent"},
        {"item_code": "Monthly Rent", "item_name": "Monthly Rent", "item_group": "Rent"},
        {"item_code": "Quarterly Rent", "item_name": "Quarterly Rent", "item_group": "Rent"},
        {"item_code": "Security Deposit", "item_name": "Security Deposit", "item_group": "Rent"},
        {"item_code": "Rent Other Charges", "item_name": "Rent Other Charges", "item_group": "Rent"},
    ]

    # Ensure the item groups exist
    ensure_item_group_exists("Property Sell")
    ensure_item_group_exists("Rent")

    # Create items
    create_items(property_sell_items)
    create_items(rent_items)

    frappe.db.commit()

def ensure_item_group_exists(item_group_name):
    """Ensure the item group exists, create it if it doesn't."""
    if not frappe.db.exists("Item Group", item_group_name):
        item_group = frappe.new_doc("Item Group")
        item_group.item_group_name = item_group_name
        item_group.parent_item_group = "All Item Groups"  
        item_group.is_group = 0
        item_group.insert()

def create_items(items):
    """Create items if they do not exist."""
    for item in items:
        if not frappe.db.exists("Item", {"item_code": item["item_code"]}):
            new_item = frappe.new_doc("Item")
            new_item.item_code = item["item_code"]
            new_item.item_name = item["item_name"]
            new_item.item_group = item["item_group"]
            new_item.is_stock_item = 0  
            new_item.default_unit_of_measure = "Nos"  
            new_item.insert()
