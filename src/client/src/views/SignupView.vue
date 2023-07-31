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
              <IInput type="text" placeholder="όνομα χρήστη">
                <template #prepend
                  ><span class="_background:secondary-10"
                    >Όνομα χρήστη</span
                  ></template
                >
              </IInput>
            </IFormGroup>
            <IFormGroup>
              <IInput type="email" placeholder="email επικοινωνίας">
                <template #prepend><span>Email</span></template>
              </IInput>
            </IFormGroup>
            <IFormGroup>
              <IInput
                type="password"
                placeholder="συμπληρώστε έναν κωδικό πρόσβασης"
              >
                <template #prepend><span>Κωδικός</span></template></IInput
              >
            </IFormGroup>
            <IFormGroup>
              <IInput
                type="password"
                placeholder="συμπληρώστε ξανά τον κωδικό πρόσβασης"
              >
                <template #prepend><span>Κωδικός (επανάληψη)</span></template>
              </IInput>
            </IFormGroup>
            <IFormGroup>
              <IInput
                type="text"
                placeholder="επωνυμία της επιχείρησης προς εγγραφή"
                ><template #prepend><span>Επωνυμία</span></template></IInput
              >
            </IFormGroup>
            <IFormGroup>
              <IInput
                type="number"
                placeholder="συμπληρώστε τον ΑΦΜ της επιχείρησης"
                ><template #prepend><span>ΑΦΜ</span></template></IInput
              >
            </IFormGroup>
            <IFormGroup>
              <IInput
                type="text"
                placeholder="συμπληρώστε την διεύθυνση της έδρας της επιχείρησης"
                ><template #prepend><span>Έδρα</span></template></IInput
              >
            </IFormGroup>
            <IFormGroup>
              <IButton block>Εγγραφή</IButton>
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
        <p class="_text:left _color:info!">
          <small
            ><a href="#" class="_color:info!">Όροι Χρήσης</a> :
            <a href="#" class="_color:info!">Πολιτική Απορρήτου</a></small
          >
        </p>
      </IColumn>
    </IRow>
  </IContainer>
</template>
