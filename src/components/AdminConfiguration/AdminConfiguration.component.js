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
          variants: [
            'primary', 'secondary', 'success', 'warning', 'danger', 'info', 'light', 'dark'
          ],
          headerBgVariant: 'dark',
          headerTextVariant: 'light',
          bodyBgVariant: 'light',
          bodyTextVariant: 'dark',
          footerBgVariant: 'warning',
          footerTextVariant: 'dark',
            adminconfigurationform: {
                allow_scale: true
            },
        }
    },
    computed: {

    },
    mounted() {

    },
    methods: {
        /* Reset call yet pending */
        /* resetAll() {
            this.allow_scale = 0;
            this.allow_subject = 0;
            this.allow_batch = 0;
            this.allow_topic = 0;
            this.allow_student = 0;
            this.adminconfigurationform.institute_allow_scale = false;
            this.adminconfigurationform.institute_allow_subject = false;
            this.adminconfigurationform.institute_allow_batch = false;
            this.adminconfigurationform.institute_allow_topic = false;
            this.adminconfigurationform.institute_allow_student = false;
        }, */
         resetAll() {
            this.adminconfigurationform.allow_scale = 0;
            this.adminconfigurationform.allow_subject = 0;
            this.adminconfigurationform.allow_batch = 0;
            this.adminconfigurationform.allow_topic = 0;
            this.adminconfigurationform.allow_student = 0;
            this.onSubmit();
        },
        onSubmit(evt) {
            evt && evt.preventDefault();
            let apiPath = 'api/admin/update/config';
            this.adminconfigurationform.institute_allow_scale = this.adminconfigurationform.allow_scale  ? config.Active : config.Inactive;
            this.adminconfigurationform.institute_allow_subject = this.adminconfigurationform.allow_subject ? config.Active : config.Inactive;
            this.adminconfigurationform.institute_allow_batch = this.adminconfigurationform.allow_batch ? config.Active : config.Inactive;
            this.adminconfigurationform.institute_allow_topic = this.adminconfigurationform.allow_topic ? config.Active : config.Inactive;
            this.adminconfigurationform.institute_allow_student = this.adminconfigurationform.allow_student ? config.Active : config.Inactive;

            PostRequest(this.BaseUrl + apiPath, this.adminconfigurationform).then(res => {
                if (res && res.status == 200) {
                    Vue.lsobj.set('allow_scale', this.adminconfigurationform.institute_allow_scale);
                    Vue.lsobj.set('allow_student', this.adminconfigurationform.institute_allow_student);
                    Vue.lsobj.set('allow_subject', this.adminconfigurationform.institute_allow_subject);
                    Vue.lsobj.set('allow_batch', this.adminconfigurationform.institute_allow_batch);
                    Vue.lsobj.set('allow_topic', this.adminconfigurationform.institute_allow_topic);
                }
                this.$swal({
                  type: 'success',
                  title: 'Done !',
                  text: 'Configuration updated successfully',
                  showConfirmButton: true
                }).then((result) => {
                  if (result) {
                    this.$router.push('/Dashboard');
                  }
                });
            });
        },
        closeModal: function (events, args) {
          this.$refs.notificationModal.hide();
        }
    },
    created: function() {
        this.loginRole = Vue.lsobj.get('loginRole');
        this.instituteID = Vue.lsobj.get('instituteID');
        this.allow_scale = Vue.lsobj.get('allow_scale');
        this.allow_student = Vue.lsobj.get('allow_student');
        this.allow_subject = Vue.lsobj.get('allow_subject');
        this.allow_batch = Vue.lsobj.get('allow_batch');
        this.allow_topic = Vue.lsobj.get('allow_topic');
        this.adminconfigurationform.allow_scale = this.allow_scale == 1 ? true : false;
        this.adminconfigurationform.allow_subject = this.allow_subject == 1 ? true : false;
        this.adminconfigurationform.allow_batch = this.allow_batch == 1 ? true : false;
        this.adminconfigurationform.allow_topic = this.allow_topic == 1 ? true : false;
        this.adminconfigurationform.allow_student = this.allow_student == 1 ? true : false;
    }
}
