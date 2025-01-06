// Client Script for "Property Quotation"
frappe.ui.form.on('Property Quotation', {
    order_type: function (frm) {
        // Reset: Hide all sections by default
        frm.set_df_property("sell_property", "hidden", 1); // Property field for sell order
        frm.set_df_property("payment_details", "hidden", 1); // Payment Details child table
        frm.set_df_property("property_sell_order", "hidden", 1); // Property Sell Order section
        frm.set_df_property("rent_property", "hidden", 1); // Rent Property Name field
        frm.set_df_property("rent_schedule", "hidden", 1); // Rent Schedule child table
        frm.set_df_property("property_rent_order", "hidden", 1); // Property Rent Order section

        // Handle Property Sell Order
        if (frm.doc.order_type === "Property Sell Order") {
            frm.set_df_property("sell_property", "hidden", 0); // Show Property field
            frm.set_df_property("payment_details", "hidden", 0); // Show Payment Details child table
            frm.set_df_property("property_sell_order", "hidden", 0); // Show Property Sell Order section
        }

        // Handle Rent Order
        if (frm.doc.order_type === "Rent Order") {
            frm.set_df_property("rent_property", "hidden", 0); // Show Rent Property Name field
            frm.set_df_property("rent_schedule", "hidden", 0); // Show Rent Schedule child table
            frm.set_df_property("property_rent_order", "hidden", 0); // Show Property Rent Order section
        }
    }
});
