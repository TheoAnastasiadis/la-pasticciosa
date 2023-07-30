<template>
  <IContainer>
    <IRow center>
      <IColumn md="5" xs="12" around>
        <ICard>
          <IForm class="_padding-top:1 _padding-bottom:1">
            <h3 class="_text:center">Συμπληρώστε τα στοιχεία σύνδεσης.</h3>
            <IFormGroup>
              <IFormLabel>Όνομα Χρήστη</IFormLabel>
              <IInput
                type="text"
                v-model="username"
                placeholder="όνομα χρήστη"
              />
            </IFormGroup>

            <IFormGroup>
              <IFormLabel>Κωδικός Πρόσβασης</IFormLabel>
              <IInput
                type="password"
                v-model="password"
                placeholder="********"
              />
            </IFormGroup>

            <IFormGroup
              ><IButton color="primary" block>Σύνδεση</IButton></IFormGroup
            >
          </IForm></ICard
        ></IColumn
      ></IRow
    ><IRow center class="_margin-top:1"
      ><IColumn md="5" xs="12" around>
        <p class="_text:left">
          Δεν είστε χρήστης ακόμη; Κάντε
          <RouterLink to="/signup">αίτηση εγγραφής</RouterLink> τώρα!
        </p>
        <p class="_text:left">
          <small
            ><a href="#">Όροι Χρήσης</a> :
            <a href="#">Πολιτική Απορρήτου</a></small
          >
        </p>
      </IColumn>
    </IRow>
  </IContainer>
</template>

<script lang="ts">
export default {
  data: () => ({
    username: "",
    password: "",
  }),
};
</script>
