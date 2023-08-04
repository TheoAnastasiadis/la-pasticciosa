<template>
  <IContainer>
    <IRow center>
      <IColumn md="6" xs="12" around>
        <ICard>
          <h2>Συμπληρώστε τα στοιχεία σας</h2>
          <p class="_color:info!">
            Μόλις η αίτηση σας εγγριθεί από τους διαχειρηστές μας θα μπορείτε να
            υποβάλλετε παραγγελίες και να παρακολουθείτε την εξέλιξη τους.
          </p>
          <IForm class="_padding-top:1 _padding-bottom:1">
            <IFormGroup>
              <IInput
                type="text"
                placeholder="όνομα χρήστη"
                v-model="form.userName"
                name="username"
              >
                <template #prepend
                  ><span class="_background:secondary-10"
                    >Όνομα χρήστη</span
                  ></template
                >
              </IInput>
            </IFormGroup>
            <IFormGroup>
              <IInput
                type="email"
                placeholder="email επικοινωνίας"
                v-model="form.email"
              >
                <template #prepend><span>Email</span></template>
              </IInput>
            </IFormGroup>
            <IFormGroup>
              <IInput
                type="password"
                placeholder="συμπληρώστε έναν κωδικό πρόσβασης"
                v-model="form.password"
                name="password"
              >
                <template #prepend><span>Κωδικός</span></template>
              </IInput>
              <div
                :class="
                  (errors.password.length > 0 ? `_visible` : `_hidden`) +
                  ' _margin-top:1'
                "
              >
                <p
                  v-for="error in errors.password"
                  class="_text:left _color:danger _font-size:sm"
                >
                  {{ error }}
                </p>
              </div>
            </IFormGroup>
            <IFormGroup>
              <IInput
                type="password"
                placeholder="συμπληρώστε ξανά τον κωδικό πρόσβασης"
                name="password-repeat"
                v-model="form.password2"
              >
                <template #prepend><span>Κωδικός (επανάληψη)</span></template>
              </IInput>
              <div
                :class="
                  (errors.password2.length > 0 ? `_visible` : `_hidden`) +
                  ' _margin-top:1'
                "
              >
                <p
                  v-for="error in errors.password2"
                  class="_text:left _color:danger _font-size:sm"
                >
                  {{ error }}
                </p>
              </div>
            </IFormGroup>
            <IFormGroup>
              <IInput
                type="text"
                placeholder="επωνυμία της επιχείρησης προς εγγραφή"
                v-model="form.companyName"
                ><template #prepend><span>Επωνυμία</span></template></IInput
              >
            </IFormGroup>
            <IFormGroup>
              <IInput
                type="number"
                placeholder="συμπληρώστε τον ΑΦΜ της επιχείρησης"
                v-model="form.vat"
                ><template #prepend><span>ΑΦΜ</span></template></IInput
              >
            </IFormGroup>
            <IFormGroup>
              <IInput
                type="text"
                placeholder="συμπληρώστε την διεύθυνση της έδρας της επιχείρησης"
                v-model="form.companyAddress"
                ><template #prepend><span>Έδρα</span></template></IInput
              >
            </IFormGroup>
            <IFormGroup>
              <IButton
                block
                @click="submit"
                :disabled="!formIsValid"
                :loading="formLoading"
                >Εγγραφή
                <template #loading>
                  <ILoader color="dark" class="_margin-right:1/2" />
                  Γίνεται εγγραφή
                </template>
              </IButton>
            </IFormGroup>
          </IForm>
        </ICard>
      </IColumn>
    </IRow>
    <IRow center class="_margin-top:1"
      ><IColumn md="5" xs="12" around>
        <p class="_text:left">
          Έχετε ήδη λογαριασμό; Συνδεθείτε
          <RouterLink to="/login" class="_color:secondary!"
            >με τους κωδικούς σας</RouterLink
          >.
        </p>
      </IColumn>
    </IRow>
  </IContainer>
</template>

<script lang="ts">
import {
  backend,
  type OutputTypes,
  type ClientError,
} from "../services/backend";

export default {
  data() {
    return {
      form: {
        userName: "",
        email: "",
        password: "",
        password2: "",
        companyName: "",
        companyAddress: "",
        vat: 0,
      },
      formLoading: false,
    };
  },
  computed: {
    errors() {
      let errors: Record<
        | "userName"
        | "email"
        | "password"
        | "password2"
        | "companyName"
        | "companyAddress"
        | "vat",
        string[]
      > = {
        userName: [],
        email: [],
        password: [],
        companyName: [],
        companyAddress: [],
        vat: [],
        password2: [],
      };

      // password validators
      if (this.form.password) {
        if (!(this.form.password.length >= 8))
          errors.password.push(
            "Ο κωδικός πρέπει να αποτελείται από τουλάχιστον 8 χαρακτήρες",
          );
        if (!(this.form.password as string).match(/[^A-Za-zΑ-Ωα-ω]/))
          errors.password.push(
            "Ο κωδικός πρέπει να περιέχει τουλάχιστον ένα σύμβολο",
          );
      }

      // password 2 validators
      if (this.form.password2) {
        if (!(this.form.password === this.form.password2))
          errors.password2.push("Οι κωδικοί δεν ταυτίζονται");
      }

      return errors;
    },
    formIsValid() {
      return (
        // values are truthy
        Object.values(this.form)
          .map((v) => !!v)
          .reduce((p, c) => p && c) &&
        // errors are empty
        Object.values(this.errors)
          .map((errs) => (errs as string[]).length == 0)
          .reduce((p, c) => p && c)
      );
    },
  },
  methods: {
    async submit() {
      this.formLoading = true;
      // const toast = createToastService();
      // console.dir(toast);
      let user: OutputTypes["requestUser"];
      try {
        user = await backend.requestUser.mutate(this.form);
      } catch (error) {
        console.error(error);
      }
      this.formLoading = false;
    },
  },
};
</script>
