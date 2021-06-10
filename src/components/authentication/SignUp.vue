<template>
    <div class="container vue-tempalte d-flex justify-content-center pt-3">
        <form @submit.prevent="userRegistration">
            <h3>Register</h3>
            <div class="form-group">
                <label>Name</label>
                <input type="text" class="form-control form-control-lg" v-model="user.name" />
            </div>

            <div class="form-group">
                <label>Email</label>
                <input type="email" class="form-control form-control-lg" v-model="user.email" />
            </div>

            <div class="form-group">
                <label>Password</label>
                <input type="password" class="form-control form-control-lg" v-model="user.password" />
            </div>

            <button type="submit" class="btn btn-primary btn-lg btn-block">
               Register
            </button>

            <p class="forgot-password text-right">
                Already registered 
                <router-link :to="{name: 'Login'}">sign in?</router-link>
            </p>
        </form>
    </div>
</template>


<script>
import firebase from 'firebase/app';
import 'firebase/auth';

export default {
  data() {
    return {
      user: {
        name: '',
        email: '',
        password: '',
      }
    };
  },
  methods: {
    userRegistration() {
      firebase
      .auth()
      .createUserWithEmailAndPassword(this.user.email, this.user.password)
      .then((res) => {
        res.user
          .updateProfile({
            displayName: this.user.name,
          })
          .then(() => {
            this.$router.push('/')
          });
      })
      .catch((error) => {
         alert(error.message);
      });
    }
  },
};
</script>