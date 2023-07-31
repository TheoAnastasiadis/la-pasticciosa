<template>
  <ILayout>
    <ILayoutHeader>
      <INavbar>
        <INavbarBrand to="/">
          <h1 class="h3">La Pasticciosa</h1>
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
      <IContainer fluid class="_padding-top:2!"><RouterView /></IContainer>
    </ILayoutContent>
  </ILayout>
</template>

<script lang="ts">
export default {
  data: () => ({}),
};
</script>
