import frappe

def execute():
    custom_fields = {
        "Quotation": [
            {
                "fieldname": "custom_tenant",
                "label": "Tenant",
                "fieldtype": "Link",
                "options": "Tenant",
                "insert_after": "naming_series",
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
    frappe.clear_cache()
