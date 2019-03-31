<template lang="pug">
  div#app
    .container
      router-link(to="/")
        h1.title Bookshop
      router-view(
        :formats="formats" 
        :countries="countries" 
        :cities="cities" 
        :companies="companies")
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      formats: [],
      countries: [],
      cities: [],
      companies: [],
      allData: ["formats", "countries", "cities", "companies"]
    };
  },
  methods: {
    fetchAll() {
      this.allData.forEach(item => {
        this.api.getData(item).then(
          res => {
            this[item] = res.data;
          },
          err => {
            console.log(err);
          }
        );
      });
    }
  },
  created() {
    this.fetchAll();
  }
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Quicksand:400,700");

@import "normalize-scss";
@include normalize();

* {
  box-sizing: border-box;
}

ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0;
}
a {
  color: #42b983;
  text-decoration: none;
}

#app {
  font-family: "Quicksand", sans-serif;
  color: #2c3e50;
  margin-top: 60px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding-left: 50px;
  padding-right: 50px;
}

.title {
  text-align: center;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e0e0e0;
}

span.error {
  position: absolute;
  left: 0;
  bottom: -15px;
  font-size: 12px;
  color: #ff0400;
}

.add-buttons {
  align-self: flex-end;
  margin-bottom: 30px;
}

.add-buttons a,
button {
  display: inline-block;
  background-color: #42b983;
  color: #fff;
  padding: 5px 10px;
  margin-left: 5px;
  text-align: center;
  box-shadow: 2px 2px 10px #cfcfcf;
  border: 2px solid #4ed397;
  transition: all 0.15s ease-in-out;
  cursor: pointer;
  &:hover {
    box-shadow: none;
    background-color: #42b983;
    border: 2px solid #9ae9c4;
    text-shadow: 2px 2px 15px #fff;
  }
}
</style>
