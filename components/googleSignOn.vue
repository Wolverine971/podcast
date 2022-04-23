
<template>
  <div id="google-signin-button" />
</template>

<script>
/* eslint-disable camelcase */
/* eslint-disable no-undef */

export default {
  mounted () {
    setTimeout(() => {
      gapi.signin2.render('google-signin-button', {
        onsuccess: this.onSignIn
      })
    })
  },
  methods: {
    onSignIn (user) {
      console.log('invoking onSignin...')
      const profile = user.getBasicProfile()
      console.log('ID: ' + profile.getId()) // Don't send this directly to your server!
      console.log('Full Name: ' + profile.getName())
      console.log('Given Name: ' + profile.getGivenName())
      console.log('Family Name: ' + profile.getFamilyName())
      console.log('Image URL: ' + profile.getImageUrl())
      console.log('Email: ' + profile.getEmail())

      // The ID token you need to pass to your backend:
      const id_token = user.getAuthResponse().id_token
      console.log('ID Token: ' + id_token)
    }
  }

}
</script>

<style>
</style>
