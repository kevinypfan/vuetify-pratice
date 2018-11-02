<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="600px">
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-card>
        <v-card-title>
          <span class="headline">New Course</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 md6>
                <v-text-field v-model="courseCode" autofocus label="開課課號" :rules="[v => !!v || '開課課號 is required']" required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md6>
                <v-text-field v-model="subjectCode" label="科目代號" :rules="[v => !!v || '科目代號 is required']" required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="name" label="科目名稱" :rules="[v => !!v || '科目名稱 is required']" required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="firstname" label="老師姓" :rules="[v => !!v || '老師姓 is required']"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="lastname" label="老師名" :rules="[v => !!v || '老師名 is required']" required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="classType" label="開課班級" :rules="[v => !!v || '開課班級 is required']" required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="room" label="上課教室" :rules="[v => !!v || '上課教室 is required']" required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="campus" label="上課校區" :rules="[v => !!v || '上課校區 is required']" required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field v-model="credit" label="學分" hint="輸入數字！" :rules="[v => !!v || '學分 is required', v => typeof(v) === 'number' || '學分必須是數字']" required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-select
                  v-model="subject"
                  :items="['必修', '選修']"
                  label="必/選修"
                  :rules="[v => !!v || 'subject is required']"
                  required
                ></v-select>
              </v-flex>
              <v-flex xs7>
                <v-text-field
                    prepend-icon="attach_file"
                    :label="filename.length === 0 ? 'Upload File!': 'Filename'"
                    :rules="[v => !!v || 'File is required']"
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
          <v-btn color="blue darken-1" flat @click.native="submitForm" :disabled="!valid">Submit</v-btn>
        </v-card-actions>
      </v-card>
      </v-form>
    </v-dialog>
  </v-layout>
</template>
<script>
export default {
  props: ["data"],
  data: () => ({
    file: null,
    valid: true,
    name: "",
    firstname: "",
    lastname: "",
    classType: "",
    campus: "",
    subject: "",
    room: "",
    subjectCode: "",
    courseCode: "",
    credit: null,
    autofocus: false
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
    },
    submitForm() {
      const data = {
        name: this.name,
        teacher: {
          firstname: this.firstname,
          class: this.classType
        },
        campus: this.campus,
        subject: this.subject,
        room: this.room,
        subjectCode: this.subjectCode,
        courseCode: this.courseCode,
        credit: this.credit,
        studentsExcel: this.file
      };
      this.$emit("onSubmitForm", data);
    },
    created() {
      if (data) {
        this.name = data.name;
        this.firstname = data.teacher.firstname;
        this.lastname = data.teacher.lastname;
        this.campus = data.campus;
        this.subject = data.subject;
        this.room = data.room;
        this.subjectCode = data.subjectCode;
        this.courseCode = data.courseCode;
        this.credit = data.credit;
        this.studentsExcel = data.studentsExcel;
      }
    }
  }
};
</script>
