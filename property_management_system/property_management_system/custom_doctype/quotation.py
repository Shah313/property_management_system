import frappe
from erpnext.selling.doctype.quotation.quotation import Quotation

class CustomQuotation(Quotation):
    def validate(self):
        # Call the original validate method
        super().validate()

        # Add custom options to allowed order types
        allowed_order_types = [
            "Sales",
            "Maintenance",
            "Shopping Cart",
            "Property Sell",
            "Property Rent",
            "Rent Maintenance",
        ]
        if self.order_type not in allowed_order_types:
            frappe.throw(
                _("Order Type cannot be '{0}'. It should be one of {1}").format(
                    self.order_type, ", ".join(allowed_order_types)
                )
            )
