import { t } from "elysia";

export const ticketDto = {
  postTransaction: t.Object({
    transaction_details: t.Object({
      order_id: t.String(),
      gross_amount: t.Number(),
    }),
    item_details: t.Array(
      t.Object({
        id: t.String(),
        price: t.Number(),
        quantity: t.Number(),
        name: t.String(),
      })
    ),
    customer_details: t.Object({
      first_name: t.String(),
      last_name: t.String(),
      email: t.String({ format: "email" }),
      phone: t.String(),
      billing_address: t.Optional(
        t.Object({
          first_name: t.String(),
          last_name: t.String(),
          email: t.String({ format: "email" }),
          phone: t.String(),
          address: t.String(),
          city: t.String(),
          postal_code: t.String(),
          country_code: t.String(),
        })
      ),
    }),
  }),
};
