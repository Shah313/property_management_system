import frappe

def execute():
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
            if not frappe.db.exists("Custom Field", {"dt": doctype, "fieldname": field["fieldname"]}):
                custom_field = frappe.new_doc("Custom Field")
                custom_field.dt = doctype
                custom_field.update(field)
                custom_field.insert()

    # Clear cache to ensure fields are loaded in the UI
    frappe.clear_cache()
