<template lang="pug">
  div
    .header
        h2.heading Book
        .manage
            router-link.btn(to="/") Cancel
            router-link.edit(:to="'/edit/'+ book.id") Edit
            a.delete(href="#" v-on:click.prevent="deleteBook(book.id)") Delete
    .book
        .book__content
            p.book__author #[span Author:] {{book.author}}
            p.book__title #[span Title:] {{book.title}}
            p.book__isbn #[span ISBN:] {{book.isbn}}
            p.book__pages #[span Number of Pages:] {{book.pages}}
            p.book__country #[span Country:] {{Country}}
            p.book__city #[span City:] {{City}}
            p.book__company #[span Company:] {{Company}}
            p.book__format #[span Format:] {{Format}}
            p.book__description #[span Description] {{book.description}}
            p.book__price #[span Price:] {{book.price}} $
</template>

<script>
function getName(arr, id) {
  let name = "";
  arr.forEach(el => {
    if (el.id == id) {
      name = el.name;
    }
  });

  return name;
}

export default {
  name: "bookDetails",
  props: ["formats", "countries", "cities", "companies"],
  data() {
    return {
      book: []
    };
  },
  computed: {
    Format() {
      return getName(this.formats, this.book.formatId);
    },
    Country() {
      return getName(this.countries, this.book.countryId);
    },
    City() {
      return getName(this.cities, this.book.cityId);
    },
    Company() {
      return getName(this.companies, this.book.companyId);
    }
  },
  methods: {
    fetchBook(id) {
      this.api.getData("books/" + id).then(
        res => {
          this.book = res.data;
        },
        err => {
          console.log(err);
        }
      );
    },
    deleteBook(id) {
      this.api.deleteData("books/" + id).then(
        res => {
          this.$router.push({ path: "/" });
        },
        err => {
          console.log(err);
        }
      );
    }
  },
  created() {
    this.fetchBook(this.$route.params.id);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.manage a {
  display: inline-block;
  background-color: #42b983;
  color: #fff;
  padding: 5px 10px;
  margin-left: 5px;
  text-align: center;
  box-shadow: 2px 2px 10px #cfcfcf;
  border: 2px solid #4ed397;
  transition: all 0.15s ease-in-out;
  &:hover {
    box-shadow: none;
    background-color: #42b983;
    border: 2px solid #9ae9c4;
    text-shadow: 2px 2px 15px #fff;
  }
}

.book {
  box-shadow: 2px 4px 10px #e6e6e6;
  background-color: #ddf7f7;
  border: 1px solid #bacece;
  margin-top: 16px;
  padding: 20px;
  &__title {
    margin-top: 0;
  }
  &__content {
    span {
      margin-right: 5px;
      font-size: 12px;
      color: #42b983;
    }
  }
}
</style>
