import frappe

def execute():
    custom_fields = [
        {
            "dt": "Quotation",  
            "fieldname": "property_name",
            "label": "Property Name",
            "fieldtype": "Link",
            "options": "Property",
            "insert_after": "naming_series",  
        },
        {
            "dt": "Quotation",  
            "fieldname": "property_units",
            "label": "Property Unit",
            "fieldtype": "Link",
            "options": "Home Unit",
            "insert_after": "property_name",  
        },
    ]

    for field in custom_fields:
       quotation_custom_fields(field)

    frappe.clear_cache(doctype="Quotation")

def quotation_custom_fields(field):
    """Helper function to create a custom field if it doesn't exist."""
    if not frappe.db.exists("Custom Field", {"dt": field["dt"], "fieldname": field["fieldname"]}):
        custom_field = frappe.new_doc("Custom Field")
        custom_field.update(field)
        custom_field.insert()
        frappe.db.commit()
