import type { Request, Response } from "express";
import parseOrder from "../../services/nlp";
import sms from "../../services/sms";
import { z } from "zod";

const bodySchema = z.object({
  from: z.string().length(10),
  message: z.string().nonempty(),
});

export default async function handleSMS(
  req: Request,
  res: Response,
): Promise<void> {
  const data = bodySchema.parse(req.body);
  const orderId = await parseOrder(data.from, data.message);

  if (orderId !== false)
    await sms.send(
      `Ευχαριστούμε! Η παραγγελία 🛒 σας καταχωρήθηκε με αριθμό #${orderId}. Μπορείτε να ελέγξετε την εξέλιξή της στον σύνδεσμο www.lapasticciosa.gr/orders/ . Θα ενημερωθείτε εκ νέου μόλις γίνει αποδεκτή από τον διαχειριστή.`,
      data.from,
    );

  res.status(200).send();
}
