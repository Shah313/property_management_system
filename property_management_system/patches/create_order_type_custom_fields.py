import frappe

def execute():
    if frappe.db.exists('DocType', 'Quotation'):
        doc = frappe.get_doc('DocType', 'Quotation')
        for field in doc.fields:
            if field.fieldname == 'order_type':
                current_options = field.options.split('\n')
                
                new_options = ['Rent', 'Property Sell', 'Property Maintenance']
                
                updated_options = list(set(current_options + new_options))
                
                field.options = '\n'.join(updated_options)

                doc.save()
                frappe.clear_cache(doctype='Quotation')