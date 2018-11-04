const shopifyOrders = require("./shopify-orders-response.js");
let json = shopifyOrders.response



const formatJson = (json) => {

    let outputRows = []

    json.orders.forEach(element => {

        element.line_items.forEach(lineItem => {
            
            let currRow = {
                "id": element.id,
                "email": element.email,
                "closed_at": element.closed_at,
                "created_at": element.created_at,
                "updated_at": element.updated_at,
                "number": element.number,
                "gateway": element.gateway,
                "test": element.test,
                "total_price": element.total_price,
                "subtotal_price": element.subtotal_price,
                "total_weight": element.total_weight,
                "total_tax": element.total_tax,
                "taxes_included": element.taxes_included,
                "currency": element.currency,
                "financial_status": element.financial_status,
                "confirmed": element.confirmed,
                "total_discounts": element.total_discounts,
                "total_line_items_price": element.total_line_items_price,
                "buyer_accepts_marketing": element.buyer_accepts_marketing,
                "name": element.name,
                "referring_site": element.referring_site,
                "landing_site": element.landing_site,
                "cancelled_at": element.cancelled_at,
                "cancel_reason": element.cancel_reason,
                "total_price_usd": element.total_price_usd,
                "user_id": element.user_id,
                "location_id": element.location_id,
                "source_identifier": element.source_identifier,
                "source_url": element.source_url,
                "processed_at": element.processed_at,
                "device_id": element.device_id,
                "customer_locale": element.customer_locale,
                "app_id": element.app_id,
                "browser_ip": element.browser_ip,
                "landing_site_ref": element.landing_site_ref,
                "order_number": element.order_number,
                "processing_method": element.processing_method,
                "checkout_id": element.checkout_id,
                "source_name": element.source_name,
                "fulfillment_status": element.fulfillment_status,
                "tags": element.tags,
                "contact_email": element.contact_email,

                // Below we will flatten out all the sub objects within each Order object.

                // Billing Address Array
                "billing_address_city": element.billing_address.city,
                "billing_address_zip": element.billing_address.zip,
                "billing_address_province": element.billing_address.province,
                "billing_address_country": element.billing_address.country,
                "billing_address_country_code": element.billing_address.country_code,
                "billing_address_province_code": element.billing_address.province_code,

                // Shipping Address Array
                "shipping_address_city": element.shipping_address.city,
                "shipping_address_zip": element.shipping_address.zip,
                "shipping_address_province": element.shipping_address.province,
                "shipping_address_country": element.shipping_address.country,
                "shipping_address_country_code": element.shipping_address.country_code,
                "shipping_address_province_code": element.shipping_address.province_code,

                // Customer Array
                "customer_id": element.customer.id,
                "customer_accepts_marketing": element.customer.accepts_marketing,
                "customer_created_at": element.customer.created_at,
                "customer_updated_at": element.customer.updated_at,
                "customer_orders_count": element.customer.orders_count,
                "customer_state": element.customer.state,
                "customer_total_spent": element.customer.total_spent,
                "customer_verified_email": element.customer.verified_email,
                "customer_multipass_identifier": element.customer.multipass_identifier,
                "customer_tax_exempt": element.customer.tax_exempt,
                "customer_tags": element.customer.tags,
                "customer_last_order_name": element.customer.last_order_name,


                // Line Item Details
                "line_item_id": lineItem.id,
                "line_item_variant_id": lineItem.variant_id,
                "line_item_title": lineItem.title,
                "line_item_quantity": lineItem.quantity,
                "line_item_price": lineItem.price,
                "line_item_sku": lineItem.sku,
                "line_item_variant_title": lineItem.variant_title,
                "line_item_vendor": lineItem.vendor,
                "line_item_fulfillment_service": lineItem.fulfillment_service,
                "line_item_product_id": lineItem.product_id,
                "line_item_requires_shipping": lineItem.requires_shipping,
                "line_item_taxable": lineItem.taxable,
                "line_item_gift_card": lineItem.gift_card,
                "line_item_name": lineItem.name,
                "line_item_variant_inventory_management": lineItem.variant_inventory_management,
                "line_item_product_exists": lineItem.product_exists,
                "line_item_fulfillable_quantity": lineItem.fulfillable_quantity,
                "line_item_grams": lineItem.grams,
                "line_item_total_discount": lineItem.total_discount,
                "line_item_fulfillment_status": lineItem.fulfillment_status
            }


                // Discount Array
                if (element.discount_codes[0]) {
                    currRow.discount_code = element.discount_codes[0].code
                    currRow.discount_amount = element.discount_codes[0].amount
                    currRow.discount_type = element.discount_codes[0].type
                } else {
                    currRow.discount_code = null
                    currRow.discount_amount = null
                    currRow.discount_type = null
                }

                currRow.refunded = "N"
                currRow.refund_subtotal = null
                currRow.refund_tax = null
                currRow.refund_date = null
                currRow.refund_id = null

                if (element.refunds !== undefined && element.refunds.length !== 0) {

                    element.refunds.forEach(element => {

                        element.refund_line_items.forEach(el => {
                            // Contains objects that 

                            if (el.line_item_id === lineItem.id) {
                                currRow.refunded = "Y"
                                currRow.refund_subtotal = el.subtotal
                                currRow.refund_tax = el.total_tax
                                currRow.refund_date = element.created_at
                                currRow.refund_id = element.id
                                

                            }
                            
                        })

                    })

                }
    
                // We are ommitting the Property field.
               // "refunds": , // ARRAY - We will add refund columns to LINE ITEMS, showing Refund status and refund ammount,
                  // For V1.0 lets pull: --- We can get to this data by comparing if LINE ITEM ID exists in REFUND ARRAY
                  // -- Refunded (Y/N)
                  // -- Refund amount () or NULL
                  // -- Refund date () or NULL


                  outputRows.push(currRow);
                })
                
            }); 

    return outputRows;
};


module.exports = {
    test: function () {

        result = formatJson(json)
        console.log(result, `Total Rows: ${result.length}`);
    }
}