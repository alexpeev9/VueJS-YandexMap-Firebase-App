<template>
    <div class="container vue-tempalte d-flex justify-content-center pt-3">
        <form @submit.prevent="userLogin">
            <h3>Sign In</h3>

            <div class="form-group">
                <label>Email address</label>
                <input type="email" class="form-control form-control-lg" v-model="user.email" />
            </div>

            <div class="form-group">
                <label>Password</label>
                <input type="password" class="form-control form-control-lg" v-model="user.password" />
            </div>

            <button type="submit" class="btn btn-primary btn-lg btn-block">Sign In</button>
            <br>
            <p class="d-flex justify-content-center">
                <button @click="googleLogin" class="btn btn-primary btn-lg btn-block w-50"><i class="fa fa-google"></i></button>
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
        email: '',
        password: ''
      }
    };
  },
  methods: {
    userLogin() {
        firebase
        .auth()
        .signInWithEmailAndPassword(this.user.email, this.user.password)
        .then(() => {
            this.$router.push('/')
        })
        .catch((error) => {
          alert(error.message);
        });
    },
    googleLogin() {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then(() => {
          this.$router.replace('/');
        }).catch((err) => {
          alert('Oops. ' + err.message)
        });
      },
    // facebookLogin() {
    //     const provider = new firebase.auth.FacebookAuthProvider();
    //     firebase.auth().signInWithPopup(provider).then((result) => {
    //       this.$router.replace('home');
    //     }).catch((err) => {
    //       alert('Oops. ' + err.message)
    //     });
    //   }
  }
};
</script>