
frappe.ui.form.on('Quotation',{
    order_type: function (frm) {
        
        frm.clear_table("items");

        if (frm.doc.order_type === "Property Sell") {
            // Fetch items for "Property Sell"
            frappe.call({
                method: "frappe.client.get_list",
                args: {
                    doctype: "Item",
                    filters: {
                        item_group: "Property Sell"
                    },
                    fields: ["item_code", "item_name", "stock_uom"] // Fetch UOM
                },
                callback: function (response) {
                    if (response.message) {
                        response.message.forEach(item => {
                            let row = frm.add_child("items");
                            row.item_code = item.item_code;
                            row.item_name = item.item_name;
                            row.qty = 1; // Default quantity
                            row.rate = 0; // Default rate
                            row.uom = item.stock_uom; // Set UOM
                        });
                        frm.refresh_field("items");
                    }
                }
            });
        } else if (frm.doc.order_type === "Rent") {
            // Fetch items for "Property Rent"
            frappe.call({
                method: "frappe.client.get_list",
                args: {
                    doctype: "Item",
                    filters: {
                        item_group: "Rent"
                    },
                    fields: ["item_code", "item_name", "stock_uom"] // Fetch UOM
                },
                callback: function (response) {
                    if (response.message) {
                        response.message.forEach(item => {
                            let row = frm.add_child("items");
                            row.item_code = item.item_code;
                            row.item_name = item.item_name;
                            row.qty = 1; // Default quantity
                            row.rate = 0; // Default rate
                            row.uom = item.stock_uom; // Set UOM
                        });
                        frm.refresh_field("items");
                    }
                }
            });
        } else {

            frm.refresh_field("items");
        }
    }
});
