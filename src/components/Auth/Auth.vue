<template>
    <v-container>
        <v-layout align-center justify-center fill-height>
            <v-flex xs12 sm6 md6 lg4>
                <v-card>
                    <v-layout
                        text-xs-center
                        wrap
                        justify-center
                    >
                        <v-flex>
                            <v-card
                                :style="$store.state.UI.dark ? 'background: #212121' : 'background: linear-gradient(to bottom right, #d4edf4, #5CF2E8, #CDFFFF);'"
                            >
                                <v-container fill-height>
                                    <v-layout align-center>
                                        <v-flex text-xs-center>
                                            <h3 class="display-3">會員{{mode !== 'Login' ? '註冊':'登入'}}</h3>
                                        </v-flex>
                                    </v-layout>
                                </v-container>
                            </v-card>
                        </v-flex>
                    </v-layout>
                    <v-layout
                        wrap
                        justify-center
                        py-4
                    >
                    <v-flex xs10 offset-1>
                        <v-alert
                            v-if="error"
                            :value="error"
                            type="error"
                        >
                            {{ error }}
                        </v-alert>
                    </v-flex>
                        <v-flex xs10>
                            <v-btn block @click="switchMode" :color="$store.state.UI.dark ? '': 'info'">移至{{mode !== 'Login' ? '登入': '註冊'}}頁面</v-btn>
                        </v-flex>
                    </v-layout>
                    <v-layout
                        text-xs-center
                        wrap
                        justify-center
                    >
                        <v-flex xs10>
                            <v-form ref="form" v-model="valid" lazy-validation>
                                <v-text-field
                                    v-model="studentId"
                                    :rules="[v => !!v || 'Student ID is required']"
                                    label="Student ID"
                                    autofocus
                                    required
                                ></v-text-field>
                                <v-text-field
                                    v-if="mode !== 'Login'"
                                    v-model="username"
                                    :rules="[v => !!v || 'Username is required']"
                                    label="Username"
                                    required
                                ></v-text-field>
                                <v-text-field
                                    v-model="password"
                                    :rules="[v => !!v || 'Password is required', v => v.length >= 6 || '密碼需要至少六個字元！']"
                                    label="Password"
                                    type="password"
                                    required
                                ></v-text-field>
                                <v-text-field
                                    v-if="mode !== 'Login'"
                                    v-model="confirm"
                                    :rules="[v => !!v || 'Password is required', v => v === password || '與密碼不一樣，請重新輸入！']"
                                    label="confirm password"
                                    type="password"
                                    required
                                ></v-text-field>
                                <v-flex pb-4 pt-5>
                                    <v-btn
                                        :color="$store.state.UI.dark ? '': 'primary'"
                                        :disabled="!valid"
                                        @click="submitForm"
                                        :loading="$store.state.UI.loading"
                                    >
                                        submit
                                    </v-btn>
                                </v-flex>
                            </v-form>
                        </v-flex>
                    </v-layout>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
export default {
  data: () => ({
    mode: "Login",
    username: "Kevin",
    studentId: "V0224031",
    password: "abc123",
    confirm: "abc123",
    valid: true,
    error: null
  }),
  created() {},
  methods: {
    submitForm(e) {
      e.preventDefault();

      switch (this.mode) {
        case "Login":
          //   this.$apollo
          //     .mutate({
          //       mutation: LOGIN,
          //       variables: {
          //         studentId: this.studentId,
          //         password: this.password
          //       }
          //     })
          //     .then(({ data }) => {
          //       onLogin(apolloClient, data.login.tokens.last().token)
          //         .then(result => {
          //           console.log(result);
          //           this.$router.push("/");
          //         })
          //         .catch(err => console.log(err));
          //     })
          //     .catch(err => {
          //       console.log(err);
          //     });
          this.$store
            .dispatch("userLogin", {
              studentId: this.studentId,
              password: this.password
            })
            .then(() => {
              this.$store.commit("setLoading", true);
              setTimeout(() => {
                this.$store.commit("setLoading", false);
                this.$router.push("/");
              }, 3000);
            })
            .catch(error => {
              this.error = error.graphQLErrors[0].message;
            });
          break;
        case "Signup":
          this.$store
            .dispatch("userSignup", {
              username: this.username,
              studentId: this.studentId,
              password: this.password
            })
            .then(() => {
              this.$router.push("/");
            })
            .catch(err => {
              console.log(err);
            });
          break;
        default:
          break;
      }
    },
    switchMode() {
      this.mode = this.mode === "Login" ? "Signup" : "Login";
    }
  }
};
</script>
