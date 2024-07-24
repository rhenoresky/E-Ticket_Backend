import Elysia from "elysia";
import PaymentMidtrans from "../../service/payment/midtrans";
import Midtrans from "midtrans-client";
import TicketHandler from "./handler";
import { prisma } from "../../db/prisma";
import { verifyAccount } from "../../auth/verifyAccount";

const midtrans = new Midtrans.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY,
  clientKey: process.env.MIDTRANS_CLIENT_KEY,
});
const payment = new PaymentMidtrans(midtrans);
const ticketHandler = new TicketHandler(prisma);

const param = {
  transaction_details: {
    order_id: "CustOrder-102",
    gross_amount: 13000,
  },
  credit_card: {
    secure: true,
  },
  item_details: [
    {
      id: "a01",
      price: 7000,
      quantity: 1,
      name: "Apple",
    },
    {
      id: "b02",
      price: 3000,
      quantity: 2,
      name: "Orange",
    },
  ],
  customer_details: {
    first_name: "Budi",
    last_name: "Susanto",
    email: "budisusanto@example.com",
    phone: "+628123456789",
    billing_address: {
      first_name: "Budi",
      last_name: "Susanto",
      email: "budisusanto@example.com",
      phone: "08123456789",
      address: "Sudirman No.12",
      city: "Jakarta",
      postal_code: "12190",
      country_code: "IDN",
    },
    shipping_address: {
      first_name: "Budi",
      last_name: "Susanto",
      email: "budisusanto@example.com",
      phone: "0812345678910",
      address: "Sudirman",
      city: "Jakarta",
      postal_code: "12190",
      country_code: "IDN",
    },
  },
};

export const ticketController = new Elysia({ prefix: "/ticket" })
  .post(
    "/transaction",
    async ({ body, request: { account } }) => {
      const paymentLink = await payment.createTransaction(body);
      const accountId = account.id;
      const {
        transaction_details: { order_id: id },
        item_details: { id: eventId },
      } = body;

      await ticketHandler.createTicket({ id, accountId, eventId, paymentLink });
      return paymentLink;
    },
    {
      beforeHandle: verifyAccount,
    }
  )
  .post("/notification", async () => {});
