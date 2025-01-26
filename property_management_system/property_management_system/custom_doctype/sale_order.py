import frappe
from frappe import _

def validate_schedule_before_submit(doc, method):
    # Check if schedule is already created
    if doc.schedule_created:
        frappe.throw(_("Schedule has already been created for this Sales Order. You cannot create another one."))

    # Additional checks if necessary
    # Example: Ensure all required fields are filled
    if not doc.monthly_date or not doc.quarterly_date:
        frappe.throw(_("Both Monthly and Quarterly dates must be provided before submitting the Sales Order."))
