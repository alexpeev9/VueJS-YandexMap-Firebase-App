<template>
  <b-navbar
    toggleable="md" type="dark" variant="primary" class="pb-2">
    <b-navbar-brand :to="{ name: 'Home' }">
      <h2 class="pr-5 d-inline-flex pt-2">Simple Map App</h2></b-navbar-brand>
    <b-navbar-nav class="pt-2">
            <b-nav-item class="pr-5" :to="{name:'SurfaceCreate'}" active-class="active" ><h2>Create Location</h2></b-nav-item>
            <b-nav-item :to="{name:'SurfaceList'}" active-class="active" ><h2>Locations List</h2></b-nav-item>
    </b-navbar-nav>
    <b-navbar-nav class="ml-auto">
            <span v-if="!this.user" class="d-flex pt-2">
                  <b-nav-item :to="{name:'SignUp'}" active-class="active"><h2 class="pr-5">Register</h2></b-nav-item>
                  <b-nav-item :to="{name:'Login'}"  active-class="active" ><h2>Login</h2></b-nav-item>
            </span>
            <span v-else class="d-flex">
                  <b-nav-item :to="{name:'Home'}" class="pr-3"><h4>Welcome {{user.displayName}}</h4></b-nav-item>
                  <b-nav-item class="bg-white rounded" type="submit" @click="logOut()"><h4 class="text-primary">Log out</h4></b-nav-item>
            </span>
  </b-navbar-nav>
  </b-navbar>
</template>
<script>
import firebase from 'firebase/app';
import 'firebase/auth';

export default {
  name: 'Navbar',
  data() {
    return {
      user: null
    };
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
      } else {
        this.user = null;
      }
    });
  },
  methods: {
    logOut() {
      firebase.auth().signOut().then(() => {
        firebase.auth().onAuthStateChanged(() => {
          this.$router.push('/')
        })
      })
    },
    makeActive: function(item) {
      this.active = item;
    }
  }
};
</script>
<style scoped>
  .active{
    border-bottom: 5vh;
    border-color: dark;
  }
</style>