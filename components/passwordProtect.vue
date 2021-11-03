<template>
  <div class="text-center">
    <v-dialog v-model="dialog" max-width="290">
      <v-card>
        <v-card-title class="text-h5"> Password Protected </v-card-title>

        <v-card-text>
          <v-text-field
            id="password"
            ref="password"
            v-model="password"
            label="Enter your password"
            :type="passwordType"
            autocomplete="current-password"
            required
          >
            <template v-slot:append>
              <v-btn
                icon
                @click="
                  passwordType === 'password'
                    ? (passwordType = 'text')
                    : (passwordType = 'password')
                "
              >
                <v-icon>
                  {{
                    passwordType === 'password'
                      ? 'mdi-eye-outline'
                      : 'mdi-eye-off-outline'
                  }}
                </v-icon>
              </v-btn>
              <template />
            </template>
          </v-text-field>
        </v-card-text>

        <v-card-actions>
          <v-btn color="green darken-1" text @click="check"> Submit </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  name: 'PasswordProtect',
  data: () => ({
    dialog: true,
    passwordType: 'password',
    password: '',
  }),
  mounted() {
    if (this.$store.getters.authenticated) {
      this.dialog = false
    } else {
      this.dialog = true
    }
  },
  methods: {
    async check() {
      try {
        let resp = await this.$axios.post('/api/password', {
          password: this.password,
        })
        if (resp) {
          this.dialog = false
          this.$store.commit('setAuthenticated', true)
        } else {
          this.$store.commit('setAuthenticated', false)
          this.dialog = true
        }
      } catch (err) {}
    },
  },
}
</script>