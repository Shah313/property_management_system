// frappe.ui.form.on('Quotation', {
//     onload: function (frm) {
//         // Add new options to the 'Order Type' field dynamically
//         frm.set_df_property('order_type', 'options', [
//             'Sales',
//             'Maintenance',
//             'Shopping Cart',
//             'Property Sell',
//             'Property Rent',
//             'Rent Maintenance'
//         ]);
//     }
// });

// frappe.ui.form.on('Quotation', {
//     order_type: function (frm) {
//         // Clear existing rows in the child table
//         frm.clear_table("items");

//         if (frm.doc.order_type === "Property Sell") {
//             // Fetch items for "Property Sell"
//             frappe.call({
//                 method: "frappe.client.get_list",
//                 args: {
//                     doctype: "Item",
//                     filters: {
//                         item_group: "Property Sell"
//                     },
//                     fields: ["item_code", "item_name", "stock_uom"] // Fetch UOM
//                 },
//                 callback: function (response) {
//                     if (response.message) {
//                         response.message.forEach(item => {
//                             let row = frm.add_child("items");
//                             row.item_code = item.item_code;
//                             row.item_name = item.item_name;
//                             row.qty = 1; // Default quantity
//                             row.rate = 0; // Default rate
//                             row.uom = item.stock_uom; // Set UOM
//                         });
//                         frm.refresh_field("items");
//                     }
//                 }
//             });
//         } else if (frm.doc.order_type === "Property Rent") {
//             // Fetch items for "Property Rent"
//             frappe.call({
//                 method: "frappe.client.get_list",
//                 args: {
//                     doctype: "Item",
//                     filters: {
//                         item_group: "Rent"
//                     },
//                     fields: ["item_code", "item_name", "stock_uom"] // Fetch UOM
//                 },
//                 callback: function (response) {
//                     if (response.message) {
//                         response.message.forEach(item => {
//                             let row = frm.add_child("items");
//                             row.item_code = item.item_code;
//                             row.item_name = item.item_name;
//                             row.qty = 1; // Default quantity
//                             row.rate = 0; // Default rate
//                             row.uom = item.stock_uom; // Set UOM
//                         });
//                         frm.refresh_field("items");
//                     }
//                 }
//             });
//         } else {
//             // For other order types, show an empty child table
//             frm.refresh_field("items");
//         }
//     }
// });
