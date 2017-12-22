import Vue from "vue";
import {
    GetRequest,
    PostRequest
} from '../../utils/globalservice'
import * as config from '../../config/constants.js'
export default {
    name: 'teacher-list',
    components: {},
    props: [],
    data() {
        this.filters={};
        this.BaseUrl = config.BASE_URL;
        //this.teacherList = [];
        this.selectedId = 0;
        return {
            variants: [
                'primary', 'secondary', 'success', 'warning', 'danger', 'info', 'light', 'dark'
            ],
            teacherList: [],
            headerBgVariant: 'dark',
            headerTextVariant: 'light',
            bodyBgVariant: 'light',
            bodyTextVariant: 'dark',
            footerBgVariant: 'warning',
            footerTextVariant: 'dark',
            columnsTeachers: [
                {
                    label: 'Id',
                    field: 'id',
                    hidden : true
                },
                {
                    label: 'First Name',
                    field: 'firstname',
                    filterable: true,
                    thClass:'text-center',
                    tdClass:'text-center'
                }, {
                    label: 'Last Name',
                    field: 'lastname',
                    filterable: true,
                    thClass:'text-center',
                    tdClass:'text-center'
                }, {
                    label: 'Phone',
                    field: 'phone',
                    filterable: true,
                    thClass:'text-center',
                    tdClass:'text-center'
                } ,{
                    label: 'Subject',
                    field: 'subject',
                    filterable: true,
                    thClass:'text-center',
                    tdClass:'text-center'
                },{
                    label: 'Email/Username',
                    field: 'email',
                    filterable: true,
                    thClass:'text-center',
                    tdClass:'text-center'
                }, {
                    label: 'Status',
                    field: 'status',
                    filterable: true,
                    thClass:'text-center',
                    tdClass:'text-center'
                }, {
                    label: 'Action',
                    thClass:'text-center',
                    tdClass:'text-center'
                }
            ]
        }
    },
    computed: {},
    mounted() {

    },
    methods: {
        bindTeachers: function(params) {
          let postData = {};
          postData.status = null;
          PostRequest(this.BaseUrl + 'api/admin/teacher/list', postData).then(res => {
                if (res.status) {
                    let response = res.body.message[0].user_roles;
                    let list = [];
                    res.body.message.forEach(function(element) {
                        list.push({
                            id: element.id,
                            firstname: element.firstname,
                            lastname: element.lastname,
                            phone: element.phone,
                            email: element.username,
                            subject: element.teacher_subjects[0] && element.teacher_subjects[0].subject ? element.teacher_subjects[0].subject.subjectName : '-',
                            status: element.status ? 'Active' : 'Inactive'
                        })
                    }, this);
                    this.teacherList = list;
                    this.$forceUpdate();

                } else {
                    this.teacherList = [];
                }
            });
        },
        redirectToNewTeacher: function() {
            this.$router.push('/Dashboard/CreateTeacher');
        },
        editTeacherClick: function(events, args) {
            this.$router.push({
                name: 'EditTeacher',
                params: {
                    id: events.row.id
                }
            });
        },
        deleteTeacherClick: function(events, args) {
            this.selectedId = events.row.id;
            this.$refs.deleteModal.show();
        },
        closeModal: function(events, args) {
            this.$refs.deleteModal.hide();
        },
        deleteConfirmation: function() {
            if (this.selectedId) {
                let postData = {};
                postData.id = this.selectedId;
                PostRequest(this.BaseUrl + 'api/admin/delete/user', postData).then(res => {
                    if (res) {
                        if (res.status == 200) {
                            this.bindTeachers("delete");
                            this.$refs.deleteModal.hide();
                        }
                    }
                });
            }
        },
        activeInactiveChange: function(sender, rowVals){
          let row = rowVals.formattedRow;
          let postData = {};
          postData.id = row.id;
          postData.status = sender.currentTarget.checked ? 1 : 0;
          postData.type = config.CRUD_CODES.USER;
          PostRequest(this.BaseUrl + 'api/admin/status/update', postData).then(res => {
            if (res) {
              if (res.status == 200) {

              }
            }
          });
        }
    },
    created: function() {
        this.loginRole = Vue.lsobj.get('loginRole');
        this.bindTeachers();
    }
}
