frappe.ui.form.on('Sales Order', {
    refresh: function (frm) {
        frm.add_custom_button(__('Get Schedule'), function () {

            schedulePaymentsWithDeliveryDates(frm);
        });
    }
});

function schedulePaymentsWithDeliveryDates(frm) {

    if (frm.doc.schedule_created) {
        frappe.msgprint(__('You have already created a schedule.'));
        return;
    }

    // Retrieve the starting dates from the fields
    let monthlyStartDate = frm.doc.monthly_date;
    let quarterlyStartDate = frm.doc.quarterly_date;

    // Check if both fields are filled
    if (!monthlyStartDate || !quarterlyStartDate) {
        frappe.msgprint(__('Please provide both Monthly and Quarterly starting dates.'));
        return;
    }

    // Convert the dates to JavaScript Date objects
    let monthlyStart = frappe.datetime.str_to_obj(monthlyStartDate);
    let quarterlyStart = frappe.datetime.str_to_obj(quarterlyStartDate);

    // Define the payment types to process
    let paymentTypes = [
        { type: 'Monthly Payment', startDate: monthlyStart, interval: 1 }, 
        { type: 'Quarterly Payment', startDate: quarterlyStart, interval: 3 } 
    ];

    // Process each payment type
    paymentTypes.forEach(paymentType => {
        
        let paymentRow = frm.doc.items.find(row => row.item_code === paymentType.type);

        if (paymentRow) {
            // Store the original quantity
            let quantity = paymentRow.qty;

           
            if (!quantity || quantity <= 0 || !Number.isInteger(quantity)) {
                frappe.msgprint(__('Invalid quantity for {0}.', [paymentType.type]));
                return;
            }

            frm.doc.items = frm.doc.items.filter(row => row.item_code !== paymentType.type);

            // Add rows dynamically based on the quantity
            for (let i = 0; i < quantity; i++) {
                let newRow = frm.add_child('items');
                newRow.item_code = paymentType.type;
                newRow.qty = 1; 
                newRow.rate = paymentRow.rate; 
                newRow.amount = paymentRow.rate; 
                newRow.uom = 'Nos';
                newRow.item_name = paymentType.type;

                // Calculate the delivery date for this row
                let deliveryDate = frappe.datetime.add_months(paymentType.startDate, i * paymentType.interval);
                newRow.delivery_date = frappe.datetime.obj_to_str(deliveryDate);

                // Generate the description dynamically based on the delivery month
                let monthName = frappe.datetime.obj_to_str(deliveryDate, "MMM"); 
                if (paymentType.type === 'Monthly Payment') {
                    newRow.description = __('Monthly Payment of {0}', [monthName.toLowerCase()]);  
                } else if (paymentType.type === 'Quarterly Payment') {
                    newRow.description = __('Quarterly Payment of {0}', [monthName.toLowerCase()]);  
                }
            }
        }
    });


    frm.refresh_field('items');
    frappe.msgprint(__('Schedule created successfully with delivery dates for Monthly and Quarterly payments.'));

    // Set flag to indicate schedule creation is complete
    frm.doc.schedule_created = true;
    frm.refresh_field('schedule_created'); 
}