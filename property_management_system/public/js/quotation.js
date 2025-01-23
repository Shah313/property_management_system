frappe.ui.form.on('Quotation', {
    on_submit(frm) {
        if (frm.doc.property_name && frm.doc.property_units && frm.doc.order_type) {
            frappe.call({
                method: "frappe.client.insert",
                args: {
                    doc: {
                        doctype: "Sales Order",
                        customer: frm.doc.customer,
                        transaction_date: frm.doc.transaction_date,
                        items: frm.doc.items,
                        property_name: frm.doc.property_name, 
                        property_units: frm.doc.property_units, 
                        order_type: frm.doc.order_type,
                    }
                },
                callback: function(response) {
                    if (!response.exc) {
                        frappe.msgprint("Sales Order created successfully.");
                    }
                }
            });
        } else {
            frappe.msgprint("Please fill all mandatory fields in the Quotation before submission.");
        }
    }
});
