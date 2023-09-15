import { Ref, ref } from "vue";
import { useToast, TYPE } from "vue-toastification";
import { useRouter } from "vue-router";
import auth from "../../services/auth";

export function useLogin(email: Ref, password: Ref) {
  const toast = useToast();
  const router = useRouter();
  const loading = ref(false);
  const login = async () => {
    loading.value = true;

    await auth
      .login(email.value.value, password.value.value)
      .then(() => {
        router.push("/dashboard");
      })
      .catch((error) => {
        if (error.message === "Failed to fetch") {
          toast(
            "Πρόβλημα στην σύνδεση με τον διακομιστή. Παρακαλώ προσπαθήστε ξανά.",
            {
              type: TYPE.ERROR,
            },
          );
        } else {
          toast(
            "Τα στοιχεία σύνδεσης δεν είναι σωστά. Παρακαλώ βεβαιωθείτε ότι το email και ο κωδικός πρόσβασης ταιριάζουν.",
            { type: TYPE.ERROR },
          );
        }
      })
      .finally(() => {
        loading.value = false;
      });
  };

  return { loading, login };
}
