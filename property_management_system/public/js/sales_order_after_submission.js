frappe.ui.form.on('Sales Order', {
    refresh: function (frm) {
        if (frm.doc.docstatus === 1) { 
            frm.add_custom_button(__('Get Payment'), function () {
                show_payment_popup(frm);
            }, __('Create'));
        }
    }
});

function show_payment_popup(frm) {
    const items = frm.doc.items.map(row => ({
        selected: 0, // Custom checkbox for selection
        item_code: row.item_code,
        qty: Math.max(0, row.qty - (row.delivered_qty || 0)),
        delivery_date: row.delivery_date,
        amount: row.amount
    }));

    const dialog = new frappe.ui.Dialog({
        title: 'Select Items for Payment',
        size: 'large',
        fields: [
            {
                fieldname: 'item_table',
                fieldtype: 'Table',
                label: 'Select Items',
                cannot_add_rows: true,
                in_place_edit: true,
                data: items,
                get_data: () => items,
                fields: [
                    {
                        fieldtype: 'Check', // Custom checkbox
                        fieldname: 'selected',
                        label: 'Select Items',
                        in_list_view: 1
                    },
                    {
                        fieldtype: 'Data',
                        fieldname: 'item_code',
                        label: 'Item Code',
                        in_list_view: 1
                    },
                    {
                        fieldtype: 'Float',
                        fieldname: 'qty',
                        label: 'Qty',
                        in_list_view: 1
                    },
                    {
                        fieldtype: 'Date',
                        fieldname: 'delivery_date',
                        label: 'Delivery Date',
                        in_list_view: 1
                    },
                    {
                        fieldtype: 'Currency',
                        fieldname: 'amount',
                        label: 'Amount',
                        in_list_view: 1
                    }
                  
                ]
            }
        ],
        primary_action_label: 'Payment',
        primary_action: function () {
            const selectedItems = dialog.get_value('item_table').filter(row => row.selected);
            if (!selectedItems.length) {
                frappe.msgprint(__('Please select at least one item.'));
                return;
            }
        
            
            const totalAllocated = selectedItems.reduce((sum, item) => sum + item.amount, 0);
        
            
            const defaultPaidToAccount = frappe.defaults.get_default("company_default_bank_account");
        
            frappe.model.with_doctype('Payment Entry', () => {
                const paymentEntry = frappe.model.get_new_doc('Payment Entry');
                
        
                paymentEntry.payment_type = 'Receive';
                paymentEntry.party_type = 'Customer';
                paymentEntry.party = frm.doc.customer;
                paymentEntry.paid_amount = totalAllocated; 
                paymentEntry.paid_to = defaultPaidToAccount; 
                
             
                paymentEntry.references = [{
                    reference_doctype: 'Sales Order',
                    reference_name: frm.doc.name,
                    total_amount: frm.doc.grand_total,
                    outstanding_amount: frm.doc.outstanding_amount,
                    allocated_amount: totalAllocated
                }];
        
                frappe.set_route('Form', 'Payment Entry', paymentEntry.name);
                dialog.hide();
            });
        }
    });

    dialog.show();
}