<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="600px">
    <v-form ref="form" v-model="valid" lazy-validation>

      <v-card>
        <v-card-title>
          <span class="headline">User Profile</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 md6>
                <v-text-field label="開課課號" required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md6>
                <v-text-field label="科目代號" required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field label="科目名稱" required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field label="老師姓"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field label="老師名" required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field label="開課班級" required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field label="上課教室" required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field label="上課校區" required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field label="學分" hint="輸入數字！" required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-select
                  :items="['必修', '選修']"
                  label="必/選修"
                  required
                ></v-select>
              </v-flex>
              <v-flex xs7>
                <v-text-field
                    prepend-icon="attach_file"
                    :label="filename.length === 0 ? 'Upload File!': 'Filename'"
                    :rules="[v => !!v || 'Homework ID is required']"
                    required
                    readonly
                    @focus="openFileDialog"
                    :value="filename"
                ></v-text-field>
                </v-flex>
                <v-flex xs5>
                    <v-btn color="blue-grey" class="black--text" @click.native="openFileDialog">
                        Upload
                        <v-icon right dark> cloud_upload</v-icon>
                    </v-btn>
                    <input type="file" id="file-upload" style="display:none" @change="onChangeImage">
                </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="closeDialog">Close</v-btn>
          <v-btn color="blue darken-1" flat @click.native="dialog = false">Save</v-btn>
        </v-card-actions>
      </v-card>
      </v-form>
    </v-dialog>
  </v-layout>
</template>
<script>
export default {
  data: () => ({
    file: null,
    valid: true
  }),
  computed: {
    dialog: {
      get() {
        return this.$store.state.UI.dialog;
      },
      set(value) {
        this.$store.commit("setDialog", value);
      }
    },
    filename() {
      if (!this.file) {
        return "";
      }
      return this.file.name;
    }
  },
  methods: {
    closeDialog() {
      this.$store.commit("setDialog", false);
    },
    openDialog() {
      this.$store.commit("setDialog", true);
    },
    openFileDialog() {
      document.getElementById("file-upload").click();
    },
    onChangeImage({ target }) {
      this.file = target.files[0];
    }
  }
};
</script>
