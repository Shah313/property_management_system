
// payment schedule funtionality for calculating grand total

frappe.ui.form.on('Rent Quotation', {
    // Trigger when the form is refreshed
    refresh: function (frm) {
        // Hide the Grand Total field by default
        if (!frm.doc.__islocal) {
            frm.set_df_property('grand_total', 'hidden', false);
        } else {
            frm.set_df_property('grand_total', 'hidden', true);
        }
    },

    // Trigger after the document is saved
    after_save: function (frm) {
        calculate_grand_total(frm);
        frm.set_df_property('grand_total', 'hidden', false); 
    },

    // Trigger when the child table is rendered or updated
    payment_schedule_on_form_rendered: function (frm) {
        calculate_grand_total(frm);
    }
});

// Trigger when changes are made in the child table
frappe.ui.form.on('Property Payment Schedule', {
    payment_amount: function (frm) {
        calculate_grand_total(frm);
    },
    category: function (frm) {
        calculate_grand_total(frm);
    }
});

// Function to calculate the Grand Total
function calculate_grand_total(frm) {
    let grand_total = 0;

    // Loop through the rows in the child table
    frm.doc.payment_schedule.forEach(row => {
        if (row.payment_amount) {
            grand_total += row.payment_amount;
        }
    });

    // Update the Grand Total field
    frm.set_value('grand_total', grand_total);
}


// payment schedule funtionality for calculating grand total

frappe.ui.form.on('Rent Quotation', {
    refresh: function (frm) {
        // Add the "Get Items From" button
        frm.add_custom_button('Property Sales Order', () => {
            // Redirect to Rent Sales Order
            frappe.set_route('List', 'Property Sales Order');
        }, 'Get Items From');
    }
});


