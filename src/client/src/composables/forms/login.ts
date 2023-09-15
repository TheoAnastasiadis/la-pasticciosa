import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";

export function useLoginForm() {
  const { defineInputBinds } = useForm();
  const schema = toTypedSchema(
    z.object({
      email: z
        .string({
          required_error: "Αυτό το πεδίο είναι υποχρεωτικό",
        })
        .email("Βεβαιωθείτε ότι έχετε συμπληρώσει σωστά το email σας."),
      password: z
        .string({ required_error: "Αυτό το πεδίο είναι υποχρεωτικό" })
        .min(8, "Οι κωδικοί αποτελούνται από 8 χαρακτήρες και πάνω."),
    }),
  );
  const email = defineInputBinds("email");
  const password = defineInputBinds("password");

  return { email, password, schema };
}
