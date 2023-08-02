<template>
  <ILayout>
    <ILayoutHeader
      class="_position:fixed-top"
      style="
        z-index: 999;
        top: var(--margin-top);
        left: var(--margin-left);
        right: var(--margin-right);
      "
    >
      <INavbar>
        <INavbarBrand to="/">
          <h1 class="h3">LP</h1>
          &nbsp;
          <IBadge color="secondary" size="md">B2B</IBadge>
        </INavbarBrand>
        <INavbarCollapsible class="_justify-content:flex-end">
          <INav>
            <INavItem to="/login"> Σύνδεση / Εγγραφή </INavItem>
          </INav>
        </INavbarCollapsible>
      </INavbar>
    </ILayoutHeader>
    <ILayoutContent>
      <IContainer fluid class="_margin-top:7!"><RouterView /></IContainer>
    </ILayoutContent>
    <ILayoutFooter class="_text:center"
      ><p class="_color:info!">
        <small
          ><a href="#" class="_color:info!">Όροι Χρήσης</a> :
          <a href="#" class="_color:info!">Πολιτική Απορρήτου</a></small
        >
      </p></ILayoutFooter
    >
  </ILayout>
</template>

<script lang="ts">
export default {
  data: () => ({}),
};
</script>
