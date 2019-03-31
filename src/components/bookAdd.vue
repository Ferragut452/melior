<template lang="pug">
  div
    .header
      h2 Add book
    form.add-form(v-on:submit.prevent='addBook')
      .form-left
        .form-group
          label(for='add-author') Author
          input#add-author(name="author" type="text" v-model='book.author' v-validate="'required'")
          span.error {{ errors.first('author') }}
        .form-group
          label(for='add-title') Title
          input#add-title(name="title" type="text" v-model='book.title' v-validate="'required'")
          span.error {{ errors.first('title') }}
        .form-group
          label(for='add-isbn') ISBN
          input#add-isbn(name="isbn" type="text" v-model='book.isbn' v-validate="'required|digits:10'")
          span.error {{ errors.first('isbn') }}
        .form-group
          label(for='add-pages') Number of Pages
          select#add-pages(name= "pages" v-validate="'required'" v-model="book.pages")
            option(v-for="(page, index) in pages" :key="index") {{page}}
          span.error {{ errors.first('pages') }}
        .form-group
          label(for='add-format') Format
          select#add-format(name="format" v-validate="'required'" v-model="book.formatId")
            option(v-for="(format, index) in formats" :value="format.id" :key="index") {{format.name}}
          span.error {{ errors.first('format') }}
        .form-group
          textarea(v-validate="'required|max:90'" rows="4" cols="45" name="text" v-model="book.description")
          span.error {{ errors.first('text') }}
      .form-right
        .form-wrap
          .form-group
            label(for='add-price') Price
            input#add-price(v-model='book.price' v-validate="'required|decimal:2'" name="price")
            span.error {{ errors.first('price') }}
          .form-group
            label(for='add-country') Country
            select#add-country(v-validate="'required'" name="country" @change="sityShow" v-model="book.countryId")
              option(v-for="(country, index) in countries" :value="country.id" :key="country.id") {{country.name}}
            span.error {{ errors.first('country') }}
          .form-group(v-if="showSity")
            label(for='add-city') City
            select#add-city(v-validate="'required'" name="city" @change="companyShow" v-model="book.cityId")
              option(v-for="(city, index) in filterCity" :value="city.id" :key="city.id") {{city.name}}
            span.error {{ errors.first('city') }}
          .form-group(v-if="showCompany")
            label(for='add-company') Company
            select#add-company(v-validate="'required'" name="company" v-model="book.companyId")
              option(v-for="(company, index) in filterCompany" :value="company.id" :key="company.id") {{company.name}}
            span.error {{ errors.first('company') }}
        .add-buttons
          button.btn(type='submit') Add
          router-link.btn(to="/") Cancel
</template>

<script>
export default {
  name: "BookAdd",
  props: ["formats", "countries", "cities", "companies"],
  data() {
    return {
      book: {},
      showSity: false,
      showCompany: false
    };
  },
  computed: {
    pages() {
      let pages = [...Array(1001).keys()];
      return pages.splice(1);
    },
    filterCity() {
      return this.cities.filter(item => {
        return item.countryId == this.book.countryId;
      });
    },
    filterCompany() {
      return this.companies.filter(item => {
        return item.cityId == this.book.cityId;
      });
    }
  },
  methods: {
    sityShow() {
      this.showSity = true;
      this.showCompany = false;
    },
    companyShow() {
      this.showCompany = true;
    },
    addBook() {
      let newBook = {
        author: this.book.author,
        title: this.book.title,
        isbn: this.book.isbn,
        pages: Number(this.book.pages),
        countryId: this.book.countryId,
        cityId: this.book.cityId,
        companyId: this.book.companyId,
        formatId: this.book.formatId,
        description: this.book.description,
        price: Number(this.book.price)
      };

      this.$validator.validate().then(valid => {
        if (valid) {
          this.api.postData("books", newBook).then(
            res => {
              this.$router.push({ name: "Books" });
            },
            err => {
              console.log(err);
            }
          );
        }
      });
    }
  },
  created() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.add-form {
  display: flex;
  margin-top: 30px;
  box-shadow: 2px 4px 10px #e6e6e6;
  background-color: #ddf7f7;
  border: 1px solid #bacece;
  margin-bottom: 40px;
}

.form-right {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.form-left,
.form-right {
  width: 50%;
  padding: 20px;
}

.form-group {
  position: relative;
  margin-bottom: 30px;
  label {
    display: block;
  }
  input {
    border-radius: 5px;
    border: 1px solid #000;
    padding: 5px 10px;
    width: 100%;
  }

  select {
    width: 100%;
  }

  textarea {
    width: 100%;
  }
}
</style>
