<template lang="pug">
  div
    .header
        h2.heading Booklist
        router-link.add(to="/add") +
    ul.books
        li.book(v-for="book in books" :key="book.id")
          router-link(:to="'/book/'+book.id")
              .book__content
                  span.book__title {{book.title}}
                  span.book__author {{book.author}}
                  p.book__pages Number of pages: #[span {{book.pages}}]
                  p.book__description {{book.description}}
              span.book__price {{book.price}} $
</template>

<script>
export default {
  name: "Books",
  data() {
    return {
      books: []
    };
  },
  methods: {
    fetchBooks() {
      this.api.getData("books").then(
        res => {
          this.books = res.data;
        },
        err => {
          console.log(err);
        }
      );
    }
  },
  created() {
    this.fetchBooks();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.add {
  display: block;
  height: 40px;
  width: 40px;
  background-color: #42b983;
  border-radius: 50%;
  color: #fff;
  font-size: 26px;
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
.books {
  display: flex;
  flex-wrap: wrap;
}

.book {
  width: 25%;
  a {
    box-shadow: 2px 4px 10px #e6e6e6;
    background-color: #ddf7f7;
    border: 1px solid #bacece;
    transition: all 0.2s ease-in-out;
    margin-bottom: 10px;
    height: 240px;
    padding: 10px;
    margin: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    &:hover {
      box-shadow: none;
      background-color: #c8f0f0;
      border: 1px solid #8a9999;
    }
  }
  &__title,
  &__author {
    display: block;
    text-align: center;
  }

  &__author {
    margin-bottom: 20px;
    color: #869494;
  }

  &__pages {
    font-size: 12px;
  }

  &__title {
    font-size: 20px;
    margin-bottom: 10px;
    font-weight: bold;
  }
  &__description {
    color: #869494;
    font-size: 14px;
  }

  &__price {
    align-self: flex-end;
  }
}
</style>
