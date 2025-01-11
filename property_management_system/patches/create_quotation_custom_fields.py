import frappe

def execute():
   
    if frappe.db.exists('DocType', 'Quotation'):
        doc = frappe.get_doc('DocType', 'Quotation')
        
       
        new_fields = [
            {
                "fieldname": "property",
                "label": "Property",
                "fieldtype": "Link",
                "options": "Property",
                "insert_after": "naming_series",  
            },
            {
                "fieldname": "property_unit",
                "label": "Property Unit",
                "fieldtype": "Link",
                "options": "Home Unit",
                "insert_after": "property",  
            },
        ]
        
       
        for new_field in new_fields:
            if not any(field.fieldname == new_field["fieldname"] for field in doc.fields):
                doc.append("fields", new_field)

     
        doc.save()
        frappe.clear_cache(doctype="Quotation")
