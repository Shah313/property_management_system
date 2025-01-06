frappe.ui.form.on('Quotation', {
    on_submit(frm) {
        // Add logic to ensure the fields are copied to Sales Order
        if (frm.doc.property_name && frm.doc.property_unit) {
            frappe.call({
                method: "frappe.client.insert",
                args: {
                    doc: {
                        doctype: "Sales Order",
                        customer: frm.doc.customer,
                        transaction_date: frm.doc.transaction_date,
                        items: frm.doc.items,
                        property_name: frm.doc.property_name, // Transfer Property Name
                        property_unit: frm.doc.property_unit, // Transfer Property Unit
                    }
                },
                callback: function(response) {
                    if (!response.exc) {
                        frappe.msgprint("Sales Order created successfully.");
                    }
                }
            });
        }
    }
});
