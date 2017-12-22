import SuccessNotification from '../SuccessNotification'
import Multiselect from 'vue-multiselect'
import VueLocalStorage from 'vue-localstorage'
import * as config from '../../config/constants.js'
import Vue from 'vue'
import {
    GetRequest,
    PostRequest,
    NumberKeyValidation
} from '../../utils/globalservice'

export default {
    name: 'create-teacher',
    components: {
        'success-notification': SuccessNotification,
        Multiselect
    },
    props: ['id'],
    data() {
        this.responseMessage = null;
        this.errorMessage = null;
        this.BaseUrl = config.BASE_URL;
        this.notifySuccess = false;
        this.notifyError = false;
        this.isEdit = false;
        this.submitButtonText = 'Create';
        return {
            createteacherform: {},
            subjectoptions: [],
            subjectsVal: {}
        }
    },
    computed: {

    },
    mounted() {

    },
    methods: {
        customLabel(option) {
            return `${option.subject}`
        },
        bindSubjects: function() {
            GetRequest(this.BaseUrl + 'api/admin/subject/list').then(res => {
                if (res) {
                    res.result.message.forEach(function(element) {
                        this.subjectoptions.push({
                            id: element.id,
                            subject: element.subjectName
                        })
                    }, this);
                }
            });
        },
        getTeacherData: function() {
            let postData = {};
            postData.id = this.id;
            PostRequest(this.BaseUrl + 'api/admin/edit/teacher', postData).then(res => {
                if (res) {
                    if (res.status) {
                        //let response = res.body.message;
                        this.createteacherform = res.body.message;
                        this.createteacherform.teacher_allow_scale = res.body.message.allow_scale == 1 ? true : false;
                        this.createteacherform.teacher_allow_subject = res.body.message.allow_subject == 1 ? true : false;
                        this.createteacherform.teacher_allow_student = res.body.message.allow_student == 1 ? true : false;
                        this.createteacherform.isAdmin = res.body.message.user_roles.length > 1 ? true : false;
                        let list = [];
                        res.body.message.teacher_subjects.forEach(function(element) {
                            list.push({
                                id: element.subject.id,
                                subject: element.subject.subjectName
                            })
                        }, this);
                        this.subjectsVal.subjects = list;
                    }
                }
            });
        },
        onSubmit(evt) {
            evt.preventDefault();
            this.$validator.validateAll().then((result) => {
              if (result) {
                //Making Post Data ==============================================================================
                //this.createteacherform.password = config.DEFAULT_PASSWORD;
                //Making Post Data ==============================================================================
                let subjectId = [];
                this.createteacherform.subjects = this.subjectsVal.subjects.map(function(key, value) {
                    return key.id;
                });
                this.createteacherform.teacher_allow_scale = this.createteacherform.teacher_allow_scale ? 1 : 2;
                this.createteacherform.teacher_allow_subject = this.createteacherform.teacher_allow_subject ? 1 : 2;
                this.createteacherform.teacher_allow_student = this.createteacherform.teacher_allow_student ? 1 : 2;
                this.createteacherform.isAdmin = this.createteacherform.isAdmin ? 1 : 2;

                let apiPath = 'api/admin/create/teacher';
                let isEditMode = this.isEdit;
                if (isEditMode) {
                    apiPath = 'api/admin/update/teacher';
                }
                PostRequest(this.BaseUrl + apiPath, this.createteacherform).then(res => {
                    if (res && res.status == 200) {
                        let msg = isEditMode ? 'Teacher updated successfully' : 'Teacher created successfully';
                        this.$swal({
                            type: 'success',
                            title: 'Done !',
                            text: msg,
                            allowOutsideClick: false,
                            showConfirmButton: true
                        }).then((result) => {
                            if (result) {
                            this.$router.push('/Dashboard/TeacherList');
                            }
                        });
                    }
                    else {
                        this.$swal({
                            type: 'error',
                            title: 'Sorry !',
                            text: res.statustext || 'Please try again after some time !',
                        });
                        this.$forceUpdate();
                    }
                });
              }
            });
        },
        onlyNumberKey: function(event) {
            return NumberKeyValidation(event);
        }
    },
    created: function() {
        this.loginRole = Vue.lsobj.get('loginRole');
        this.instituteID = Vue.lsobj.get('instituteID');

        this.createteacherform.teacher_allow_scale = Vue.lsobj.get('allow_scale') == 1 ? true : false;
        this.createteacherform.teacher_allow_subject = Vue.lsobj.get('allow_subject') == 1 ? true : false;
        this.createteacherform.teacher_allow_student = Vue.lsobj.get('allow_student') == 1 ? true : false;
        this.createteacherform.isAdmin = Vue.lsobj.get('isAdmin') == 1 ? true : false;

        this.bindSubjects();
        if (this.id) {
            this.submitButtonText = 'Update';
            this.isEdit = true;
            this.getTeacherData();
        }
    }
}
