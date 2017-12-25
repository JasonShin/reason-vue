<template>
  <div id="app">
    <img src="./assets/logo.png">
    <HelloWorld/>
  </div>
</template>

<script lang="re">
  let score: int = 10;
  let ageAndName = (24, "Lil' Reason");
  let my3dCoordinates = (20.0, 30.5, 100.0);
  Js.log(my3dCoordinates);
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
