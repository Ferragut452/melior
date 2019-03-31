import Vue from "vue";
import Router from "vue-router";
import Books from "@/components/Books";
import bookAdd from "@/components/bookAdd";
import bookDetails from "@/components/bookDetails";
import bookEdit from "@/components/bookEdit";

Vue.use(Router);
export default new Router({
  routes: [
    {
      path: "/",
      name: "Books",
      component: Books
    },
    {
      path: "/add",
      name: "bookAdd",
      component: bookAdd
    },
    {
      path: "/book/:id",
      name: "bookDetails",
      component: bookDetails
    },
    {
      path: "/edit/:id",
      name: "bookEdit",
      component: bookEdit
    }
  ]
});
