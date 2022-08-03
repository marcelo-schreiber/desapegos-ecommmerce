// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

type Data = {
  session?: Stripe.Checkout.Session;
  message?: string;
};

type LineItem = {
  price: string;
  quantity: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method != 'POST') {
    res.status(405).json({ message: 'Wrong method' });
  }

  try {
    const baseUrl =
      process.env.NODE_ENV === 'production'
        ? 'https://palivendas.cf'
        : 'http://localhost:3000';

    const body: LineItem = JSON.parse(req.body);

    const stripe = new Stripe(process.env.SECRET_KEY ?? '', {
      apiVersion: '2020-08-27',
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card', 'boleto'],
      success_url: `${baseUrl}/sucesso`,
      cancel_url: `${baseUrl}/produtos`,
      line_items: [body],
      mode: 'payment',
      allow_promotion_codes: true,
    });

    res.status(201).json({ session });
  } catch (e) {
    // @ts-ignore
    res.status(500).json({ message: e.message });
  }
}
