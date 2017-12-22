import VueLocalStorage from 'vue-localstorage'
import * as config from '../../config/constants.js'
import Vue from 'vue'
import {
    GetRequest,
    PostRequest,
    NumberKeyValidation
} from '../../utils/globalservice'

import moment from 'moment';

Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(String(value)).format('DD-MM-YYYY')
  }
});

export default {
    name: 'select-questions-view',
    components: {},
    props: ['createtestParams', 'selectedQuestion', 'id'],
    data() {
        this.BaseUrl = config.BASE_URL;
        this.filterItems = [];
        this.showMOdal = false;
        return {
            loader: false,
            date: new Date(),
            config: {
                format: 'DD/MM/YYYY',
                useCurrent: false,
            },
            selectedNumber: {
                intialNum: 0
            },
            filterSelected: null,
            createtest: {
                negativemarking: 0,
                points: null,
                scaleId: null,
                subjectId: null,
                categoryId: null,
                topicId: null
            },
            filterByObj: {
                selected: null,
                questionType: false,
                dateRange: false,
                scale: false,
                subject: false,
                topic: false
            },
            checkedQuestions: [],
            rows: [],
            columns: [{
                label: '',
                field: 'checked',
                filterable: true,
            },
            {
                label: 'Question',
                field: 'question',
                html: true,
                filterable: true,
                tdClass: 'left-align'
            },
            {
                label: 'Topic',
                field: 'topicName',
                filterable: true,
            },
            {
                label: 'Assigned To',
                field: 'teacherName',
                filterable: true,
            }, {
                label: 'Scale',
                field: 'scaleName',
                filterable: true,
            }, {
                label: 'Subject',
                field: 'subjectName',
                filterable: true,
            },
            {
                label: 'Date(Created)',
                field: 'createdAt',
                filterable: true,
            },
            {
                label: 'Action'
            }
            ],
            currentPage: 1,
            //Modal Popup Variant
            variants: [
                'primary', 'secondary', 'success', 'warning', 'danger', 'info', 'light', 'dark'
            ],
            headerBgVariant: 'dark',
            headerTextVariant: 'light',
            bodyBgVariant: 'light',
            bodyTextVariant: 'dark',
            footerBgVariant: 'warning',
            footerTextVariant: 'dark',
            //Modal Popup Variant
            subjectOptions: [],
            topicOptions: [{ value: null, text: 'Select Topic' }],
            scaleOptions: [{ value: null, text: 'Select Scale' }],
            questionTypeOptions: [{ value: null, text: 'Select Question Type' }, { value: 1, text: 'Single Selection' }, { value: 2, text: 'Multi Selection' }],
            filterOptions: [
                { value: null, text: 'Select Filter' },
                { value: "questionType", text: 'Question Type' },
                { value: "subject", text: 'Subject' },
                { value: "topic", text: 'Topic' },
                { value: "scale", text: 'Scale' },
                { value: "dateRange", text: 'Date Range' }
            ]
        }
    },
    computed: {

    },
    mounted() {

    },
    methods: {
        init() {
            if (this.selectedQuestion && this.selectedQuestion.length >= 1) {
                this.selectedNumber.intialNum = this.selectedQuestion.length;
                this.checkedQuestions = this.checkedQuestions.concat(this.selectedQuestion);
            }
            this.selectedNumber.maxNum = this.createtestParams ? this.createtestParams.noOfQuestions : 0;

            //Find Promise.all type request here
            this.getListOfQues();
            this.getListOfScale();
            this.getListOfSubjects();
        },
        openQuesModal() {
            let value = this.checkedQuestions;
            //alert(this.checkedQuestions.length);
            this.$refs.listOfQuesModal.show();
        },
        closeModal: function(events, args) {
            this.$refs.listOfQuesModal.hide();
        },
        getQuestionDetails(event) {
            console.log(event);
            this.$swal({
                title: '<i><b>'+event.row.question+'</b></i>',
                type: 'info',
                html: '<ul>'+ this.getAnswerOptions(JSON.parse(event.row.options), JSON.parse(event.row.answer)) +'</ul>'
            })
        },
        getAnswerOptions(options, answer) {
            let data = [];
            console.log(options, answer, "OPtion and Answer array");
            options.map(data => {
                answer.map(answerKey => {
                if(Object.keys(data)[0]*1 == Object.keys(answerKey)[0]*1){
                    data.active = 'green';
                } else{
                    if(data.active == 'green'){
                    // let it go as it is
                    } else
                    data.active = 'red';
                }
                })
            })

            for(let k = 0; k < options.length; k++) {
                data.push('<li style="color : '+options[k].active+'">'+options[k][k] +'</li>');
            }

            return data;
        },
        getListOfQues() {
            this.loader = true;
            let postData = {};
            postData.status = config.Active;
            PostRequest(this.BaseUrl + 'api/admin/question/list', postData).then(res => {
                    if (res) {
                        this.loader = false;
                        res.body.message.forEach(function(element) {
                            let teacherName = element.user ? element.user.firstname + '' + element.user.lastname : '-';
                            this.rows.push({
                                id: element.id,
                                scaleName: element.scale.scaleName,
                                subjectName: element.subject.subjectName,
                                question: element.question,
                                answer: element.answer,
                                options: element.options,
                                explanation: element.explanation,
                                topicName: element.topic.topicName,
                                createdAt: element.createdAt,
                                teacherName: teacherName,
                                checked: false
                            })
                        }, this);
                        let numberOfQues = this.selectedQuestion;
                        if (numberOfQues.length >= 1) {
                            let result = this.rows.filter(function(o1) {
                                return !numberOfQues.some(function(o2) {
                                    if (o1.id == o2.id) {
                                        o1.checked = true;
                                    }
                                });
                                this.rows = [];
                                this.rows = this.rows.concat(result);
                            });
                        }
                        this.$forceUpdate();
                    }
                })
                .catch(error => {
                    this.loader = false;
                    console.log(error);
                })
        },
        getListOfScale() {
            this.loader = true;
            GetRequest(this.BaseUrl + 'api/admin/scale/list')
                .then(res => {
                    this.loader = false;
                    this.scaleOptions = [];
                    this.scaleOptions.push({
                        value: null,
                        text: 'Select Scale'
                    })
                    if (res.status) {
                        let response = res.result.message;
                        if (response) {
                            response.forEach(function(element) {
                                this.scaleOptions.push({
                                    value: element.id,
                                    text: element.scaleName + ' (' + element.scalePoint + ' Point)'
                                })
                            }, this);
                        }
                    }
                })
                .catch(error => {
                    this.loader = false;
                    console.log(error);
                })
        },
        getListOfSubjects() {
            this.loader = true;
            GetRequest(this.BaseUrl + 'api/admin/subject/list')
                .then(res => {
                    this.loader = false;
                    this.subjectOptions = [];
                    this.subjectOptions.push({
                        value: null,
                        text: 'Select Subject'
                    })
                    if (res.status) {
                        let response = res.result.message;
                        if (response) {
                            response.forEach(function(element) {
                                this.subjectOptions.push({
                                    value: element.id,
                                    text: element.subjectName
                                })
                            }, this);
                        }
                    }
                })
                .catch(error => {
                    this.loader = false;
                    console.log(error);
                })
        },
        filterChange() {
            var self = this;
            setTimeout(function() {
                switch (self.filterByObj.selected) {
                    case "questionType":
                        self.filterByObj.questionType = true;
                        break;
                    case "subject":
                        self.filterByObj.subject = true;
                        break;
                    case "topic":
                        self.filterByObj.topic = true;
                        break;
                    case "scale":
                        self.filterByObj.scale = true;
                        break;
                    case "dateRange":
                        self.filterByObj.dateRange = true;
                        break;
                }
            });
        },
        subjectChange() {
            var self = this;
            setTimeout(function() {
                let postData = {};
                postData.subjectId = self.createtest.subjectId;
                this.loader = true;
                PostRequest(self.BaseUrl + 'api/admin/subject/assosicated/topic', postData)
                .then(res => {
                    this.loader = false;
                    self.topicOptions = [];
                    self.topicOptions.push({
                        value: null,
                        text: 'Select Topic'
                    })
                    if (res.status) {
                        let response = res.body.message;
                        if (response) {
                            response.forEach(function(element) {
                                self.topicOptions.push({
                                    value: element.id,
                                    text: element.topicName
                                })
                            }, self);
                        }
                        self.createtest.topic = null;
                    }
                })
                .catch(error => {
                    this.loader = false;
                    console.log(error);
                })
            });
        },
        search() {
            let filterValue = {
                categoryId: this.createtest.categoryId,
                subjectId: this.createtest.subjectId,
                topicId: this.createtest.topicId
            };
            this.loader = true;
            PostRequest(this.BaseUrl + 'api/admin/filterByQuestions', filterValue)
                .then(res => {
                    this.loader = false;
                    if (res.status == 200) {
                        this.rows = [];
                        res.body.message.forEach(function(element) {
                            let teacherName = element.user.firstname + '' + element.user.lastname;
                            this.rows.push({
                                id: element.id,
                                scaleName: element.scale.scaleName,
                                subjectName: element.subject.subjectName,
                                question: element.question,
                                answer: element.answer,
                                options: element.options,
                                explanation: element.explanation,
                                topicName: element.topic.topicName,
                                createdAt: element.createdAt,
                                teacherName: teacherName,
                                checked: false
                            })
                        }, this);
                        this.$forceUpdate();
                    }
                })
                .catch(error => {
                    this.loader = false;
                    console.log(error);
                })
        },
        reset() {
            this.rows = [];
            this.filterByObj = {
                    selected: null,
                    questionType: false,
                    dateRange: false,
                    scale: false,
                    subject: false,
                    topic: false
                },
                this.subjectOptions = [];
            this.scaleOptions = [{ value: null, text: 'Select Scale' }],
                this.topicOptions = [{ value: null, text: 'Select Topic' }];
            this.questionTypeOptions = [{ value: null, text: 'Select Question Type' }, { value: 1, text: 'Single Selection' }, { value: 2, text: 'Multi Selection' }];
            this.init();
        },
        confirm() {
            // debugger;
            this.$router.push({
                name: 'SelectQuestionsPanel',
                params: {
                    questionArr: this.createtestParams,
                    selectedQuestion: this.checkedQuestions,
                    id: this.id
                }
            });
        },
        viewQues() {
            let value = this.checkedQuestions;
        },
        updateCheck: function(rowValue) {
            if (!rowValue.checked) {
                this.selectedNumber.intialNum = this.selectedNumber.intialNum + 1;
                this.rows.forEach(function(element) {
                    if (element.id == rowValue.id) {
                        element.checked = true;
                        this.checkedQuestions.push(element);
                    }
                }, this);
            } else {
                this.selectedNumber.intialNum = this.selectedNumber.intialNum - 1;
                this.rows.forEach(function(element, index) {
                    if (element.id == rowValue.id) {
                        element.checked = false;
                    }
                }, this);
                this.checkedQuestions.forEach(function(data, index) {
                    if (data.id == rowValue.id) {
                        this.checkedQuestions.splice(index, 1);
                    }
                }, this);
            }

        },
        setStyleFilterDiv: function(checkedToggle) {
            setTimeout(function() {
                let filterDiv = document.getElementById('expand');
                if (checkedToggle) {
                    if (!checkedToggle.checked) {
                        filterDiv.style.overflow = 'hidden';
                    } else {
                        filterDiv.style.overflow = '';
                    }
                } else {
                    filterDiv.style.overflow = 'hidden';
                }
            });
        },
        filterDivClick: function() {
            let checkedToggle = document.getElementById('toggle');
            this.setStyleFilterDiv(checkedToggle);
        }
    },
    created: function() {
        //this.loginRole = Vue.lsobj.get('loginRole');
        this.init();
        this.setStyleFilterDiv();
    }
}
