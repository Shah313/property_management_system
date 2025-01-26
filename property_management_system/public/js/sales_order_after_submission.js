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
    // Fetch data to populate the dialog
    const items = frm.doc.items.map(row => ({
        item_code: row.item_code,
        qty: row.qty - row.delivered_qty, 
        delivery_date: row.delivery_date, 
        amount: row.amount 
    }));

    // Create a custom dialog
    const dialog = new frappe.ui.Dialog({
        title: __('Select Items for Payment'),
        fields: [
            {
                fieldname: 'item_table',
                fieldtype: 'Table',
                label: 'Select Items',
                cannot_add_rows: true,
                in_place_edit: true,
                reqd: 1,
                data: items,
                fields: [
                    {
                        fieldname: 'selected',
                        label: '',
                        fieldtype: 'Check',
                        default: 1 
                    },
                    {
                        fieldname: 'item_code',
                        label: 'Item Code',
                        fieldtype: 'Data',
                        read_only: 1,
                        in_list_view: 1
                    },
                   
                    {
                        fieldname: 'qty',
                        label: 'Qty',
                        fieldtype: 'Float',
                        read_only: 1,
                        in_list_view: 1
                    },
                    {
                        fieldname: 'delivery_date',
                        label: 'Delivery Date',
                        fieldtype: 'Date',
                        read_only: 1,
                        in_list_view: 1
                    },
                    {
                        fieldname: 'amount',
                        label: 'Amount',
                        fieldtype: 'Currency',
                        read_only: 1,
                        in_list_view: 1
                    }
                ]
            },
           
        ],
        primary_action_label: __('Payment'),
        primary_action: function () {
            // Get selected items
            const selectedItems = dialog.get_value('item_table').filter(row => row.selected);

            if (!selectedItems.length) {
                frappe.msgprint(__('Please select at least one item for payment.'));
                return;
            }

            frappe.call({
                method: 'frappe.client.insert',
                args: {
                    doc: {
                        doctype: 'Payment',
                        sales_order: frm.doc.name, 
                        items: selectedItems.map(item => ({
                            item_code: item.item_code,
                            qty: item.qty,
                            amount: item.amount,
                            delivery_date: item.delivery_date
                        }))
                    }
                },
                callback: function (r) {
                    if (r.message) {
                        frappe.msgprint(__('Payment record created successfully.'));
                        dialog.hide();
                        frappe.set_route('Form', 'Payment', r.message.name); 
                    }
                }
            });
        }
    });

    
    dialog.show();
}
