import frappe

def execute():
    custom_fields = [
        {
            "dt": "Sales Order",  
            "fieldname": "property_name",
            "label": "Property Name",
            "fieldtype": "Link",
            "options": "Property",
            "insert_after": "naming_series",  
        },
        {
            "dt": "Sales Order",  
            "fieldname": "property_units",
            "label": "Property Unit",
            "fieldtype": "Link",
            "options": "Home Unit",
            "insert_after": "property_name",  
        },
        {
            "dt": "Sales Order",  
            "fieldname": "monthly_date",
            "label": "Monthly Payment Date start",
            "fieldtype": "Date",
            "insert_after": "order_type",
        
        },
        {
            "dt": "Sales Order",  
            "fieldname": "quarterly_date",
            "label": "Quarterly Payment Date start",
            "fieldtype": "Date",
            "insert_after": "monthly_date",

        },
    ]

    for field in custom_fields:
        create_sales_order_custom_fields(field)

    frappe.clear_cache(doctype="Sales Order")

def create_sales_order_custom_fields(field):
    """Helper function to create a custom field if it doesn't exist."""
    if not frappe.db.exists("Custom Field", {"dt": field["dt"], "fieldname": field["fieldname"]}):
        custom_field = frappe.new_doc("Custom Field")
        custom_field.update(field)
        custom_field.insert()
        frappe.db.commit()
