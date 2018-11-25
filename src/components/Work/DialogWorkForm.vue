<template>
  <v-layout row justify-center>
    <v-dialog v-model="value" persistent max-width="600px">
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-card>
        <v-card-title>
          <span class="headline">New Work</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs10 offset-xs1>
                <v-text-field v-model="title" autofocus label="Title" :rules="[v => !!v || '標題 is required']" required></v-text-field>
              </v-flex>
              <v-flex xs10 offset-xs1>
                <v-textarea
                name="input-7-1"
                box
                label="Description"
                auto-grow
                v-model="description"
                ></v-textarea>
            </v-flex>
              <v-flex xs12 sm6>
                <v-menu
                    ref="menu1"
                    :close-on-content-click="false"
                    v-model="menu1"
                    :nudge-right="40"
                    lazy
                    transition="scale-transition"
                    offset-y
                    full-width
                    max-width="290px"
                    min-width="290px"
                    >
                    <v-text-field
                        slot="activator"
                        v-model="start"
                        label="Date"
                        hint="MM/DD/YYYY format"
                        persistent-hint
                        prepend-icon="event"
                    ></v-text-field>
                    <v-date-picker v-model="start" no-title @input="menu1 = false"></v-date-picker>
                    </v-menu>
                </v-flex>

                <v-flex xs12 sm6>
                    <v-menu
                    :close-on-content-click="false"
                    v-model="menu2"
                    :nudge-right="40"
                    lazy
                    transition="scale-transition"
                    offset-y
                    full-width
                    max-width="290px"
                    min-width="290px"
                    >
                    <v-text-field
                        slot="activator"
                        v-model="end"
                        label="Date (read only text field)"
                        hint="MM/DD/YYYY format"
                        persistent-hint
                        prepend-icon="event"
                        readonly
                    ></v-text-field>
                    <v-date-picker v-model="end" no-title @input="menu2 = false"></v-date-picker>
                </v-menu>
            </v-flex>

            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="closeDialog">Close</v-btn>
          <v-btn color="blue darken-1" flat @click.native="submitForm" :disabled="!valid">Submit</v-btn>
        </v-card-actions>
      </v-card>
      </v-form>
    </v-dialog>
  </v-layout>
</template>
<script>
export default {
  props: ["value"],
  data: vm => ({
    valid: true,
    title: "",
    description: "",
    start: new Date().toISOString().substr(0, 10),
    end: new Date().toISOString().substr(0, 10),
    menu1: false,
    menu2: false
  }),
  methods: {
    closeDialog() {
      this.$emit("input", false);
    },
    openDialog() {
      this.$emit("input", true);
    },
    submitForm() {
      const data = {
        title: this.title,
        description: this.description,
        course: this.$route.params.course,
        start: this.start,
        end: this.end
      };
      this.$emit("onSubmitForm", data);
    }
  }
};
</script>
