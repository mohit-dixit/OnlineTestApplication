import SuccessNotification from '../SuccessNotification'
import * as config from '../../config/constants.js'
import Vue from 'vue'
import {
    GetRequest,
    PostRequest,
    NumberKeyValidation
} from '../../utils/globalservice'
import Multiselect from 'vue-multiselect'

export default {
    name: 'admin-configuration',
    components: {
        'success-notification': SuccessNotification,
        Multiselect
    },
    props: [],
    data() {
        this.BaseUrl = config.BASE_URL;
        return {
            adminconfigurationform: {
                allow_scale: true
            },
            value: [{
                text: 'Easy',
                value: 1
            }, {
                text: 'Medium',
                value: 2
            }, {
                text: 'Difficult',
                value: 3
            }],
            scaleOptions: [{
                text: 'Easy',
                value: 1
            }, {
                text: 'Medium',
                value: 2
            }, {
                text: 'Difficult',
                value: 3
            }]
        }
    },
    computed: {

    },
    mounted() {

    },
    methods: {
        onSubmit() {
            alert(JSON.stringify(this.adminconfigurationform));
            let apiPath = 'api/admin/update/config';
            // let isEditMode = this.isEdit;
            // if (isEditMode) {
            //     apiPath = 'api/admin/update/teacher';
            // }
            
            this.adminconfigurationform.allow_scale = this.adminconfigurationform.allow_scale  ? 1 : 2;
            this.adminconfigurationform.allow_subject = this.adminconfigurationform.allow_subject ? 1 : 2;
            this.adminconfigurationform.allow_student = this.adminconfigurationform.allow_student ? 1 : 2;
            
            PostRequest(this.BaseUrl + apiPath, this.adminconfigurationform).then(res => {
                if (res) {
                    if (res.status == 200) {
                        // this.createteacherform = {};
                        // if (isEditMode) {
                        //     alert('Configuration Changed Successfully')
                        //     this.$router.push('/Dashboard/TeacherList');
                        // } else {
                        //     this.notifySuccess = true;
                        //     this.notifyError = false;
                        //     this.responseMessage = 'Teacher created successfully';
                        //     this.$forceUpdate();
                        // }
                    } 
                    // else {
                    //     this.errorMessage = res.statustext;
                    //     this.notifySuccess = false;
                    //     this.notifyError = true;
                    //     this.$forceUpdate();
                    // }
                }
            });
        }

    },
    created: function() {
        this.loginRole = Vue.lsobj.get('loginRole');
        this.instituteID = Vue.lsobj.get('instituteID');
        this.allow_scale = Vue.lsobj.get('allow_scale');
        this.allow_student = Vue.lsobj.get('allow_student');
        this.allow_subject = Vue.lsobj.get('allow_subject');
        
        this.adminconfigurationform.allow_scale = this.allow_scale == 1 ? true : false;
        this.adminconfigurationform.allow_subject = this.allow_subject == 1 ? true : false;
        //this.adminconfigurationform.allow_batch = true;
        this.adminconfigurationform.allow_student = this.allow_student == 1 ? true : false;
    }
}
