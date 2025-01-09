import frappe

def setup_custom_fields():
    custom_fields = {
        "Quotation": [
            {
                "fieldname": "custom_property_name",
                "label": "Property Name",
                "fieldtype": "Link",
                "options": "Property",
                "insert_after": "naming_series",
                "reqd": 1,
            },
            {
                "fieldname": "custom_property_unit",
                "label": "Property Unit",
                "fieldtype": "Link",
                "options": "Home Unit",
                "insert_after": "custom_property_name",
                "reqd": 1,
            },
            {
                "fieldname": "custom_property_owner",
                "label": "Property Owner",
                "fieldtype": "Link",
                "options": "Owner",
                "insert_after": "custom_property_unit",
                "reqd": 1,
            },
        ],
        "Sales Order": [
            {
                "fieldname": "custom_property_name",
                "label": "Property Name",
                "fieldtype": "Link",
                "options": "Property",
                "insert_after": "naming_series",
                "reqd": 1,
            },
            {
                "fieldname": "custom_property_unit",
                "label": "Property Unit",
                "fieldtype": "Link",
                "options": "Home Unit",
                "insert_after": "custom_property_name",
                "reqd": 1,
            },
        ]
    }

    for doctype, fields in custom_fields.items():
        for field in fields:
            create_custom_field(doctype, field)
    
    # Clear cache to ensure fields are loaded in the UI
    frappe.clear_cache()

def create_custom_field(doctype, field):
    if not frappe.db.exists("Custom Field", {"dt": doctype, "fieldname": field["fieldname"]}):
        custom_field = frappe.new_doc("Custom Field")
        custom_field.dt = doctype
        custom_field.__dict__.update(field)
        custom_field.insert()
        frappe.db.commit()
