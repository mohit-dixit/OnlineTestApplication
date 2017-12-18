import VueLocalStorage from 'vue-localstorage'
import * as config from '../../config/constants.js'
import Datepicker from 'vuejs-datepicker';

import Vue from 'vue'
import {
    GetRequest,
    PostRequest,
    NumberKeyValidation
} from '../../utils/globalservice'

export default {
    name: 'select-questions-view',
    components: { Datepicker },
    props: ['createtestParams', 'selectedQuestion'],
    data() {
        this.BaseUrl = config.BASE_URL;
        return {
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
            }, {
                label: 'Date(Created)',
                field: 'createdAt',
                filterable: true,
            }, {
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
            }, {
                label: 'Question',
                field: 'question',
                html: true,
                filterable: true,
            }, {
                label: 'Topic',
                field: 'topicName',
                filterable: true,
            }],
            subjectOptions: [],
            topicOptions: [{ value: null, text: '--Select Topic--' }],
            scaleOptions: [{ value: null, text: '--Select Scale--' }],
            questionTypeOptions: [{ value: null, text: '--Select Question Type--' }, { value: 1, text: 'Single Selection' }, { value: 2, text: 'Multi Selection' }],
            filterOptions: [
                { value: null, text: '--Select Filter--' },
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
            if (this.selectedQuestion.length >= 1) {
                this.selectedNumber.intialNum = this.selectedQuestion.length;
                this.checkedQuestions = this.checkedQuestions.concat(this.selectedQuestion); 
            }
            this.selectedNumber.maxNum = this.createtestParams.numberofquestions || 0;
            //Find Promise.all type request here

            this.getListOfQues();
            this.getListOfScale();
            this.getListOfSubjects();
        },
        getListOfQues() {
            GetRequest(this.BaseUrl + 'api/admin/question/list').then(res => {
                if (res) {
                    res.result.message.forEach(function(element) {
                        let teacherName = element.user.firstname + '' + element.user.lastname;
                        this.rows.push({
                            id: element.id,
                            scaleName: element.scale.scaleName,
                            subjectName: element.subject.subjectName,
                            question: element.question,
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
                                    // assumes unique id
                                }
                            });
                            this.rows = [];
                            this.rows = this.rows.concat(result);
                        });
                    }
                    this.$forceUpdate();
                }
            });
        },
        getListOfScale() {
            GetRequest(this.BaseUrl + 'api/admin/scale/list').then(res => {
                this.scaleOptions = [];
                this.scaleOptions.push({
                    value: null,
                    text: '--Select Scale--'
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
            });
        },
        getListOfSubjects() {
            GetRequest(this.BaseUrl + 'api/admin/subject/list').then(res => {
                this.subjectOptions = [];
                this.subjectOptions.push({
                    value: null,
                    text: '--Select Subject--'
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
            });
        },
        filterChange() {
            debugger;
            switch (this.filterByObj.selected) {
                case "questionType":
                    this.filterByObj.questionType = true;
                    break;
                case "subject":
                    this.filterByObj.subject = true;
                    break;
                case "topic":
                    this.filterByObj.topic = true;
                    break;
                case "scale":
                    this.filterByObj.scale = true;
                    break;
                case "dateRange":
                    this.filterByObj.dateRange = true;
                    break;
            }
        },
        subjectChange() {
            var self = this;
            setTimeout(function() {
                let postData = {};
                postData.subjectId = self.createtest.subjectId;
                PostRequest(self.BaseUrl + 'api/admin/subject/assosicated/topic', postData).then(res => {
                    self.topicOptions = [];
                    self.topicOptions.push({
                        value: null,
                        text: '--Select Topic--'
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
                });
            });
        },
        search() {
            let filterValue = {
                categoryId: this.createtest.categoryId,
                subjectId: this.createtest.subjectId,
                topicId: this.createtest.topicId
            };
            PostRequest(this.BaseUrl + 'api/admin/filterByQuestions', filterValue).then(res => {
                if (res.status == 200) {
                    this.rows = [];
                    res.body.message.forEach(function(element) {
                        let teacherName = element.user.firstname + '' + element.user.lastname;
                        this.rows.push({
                            id: element.id,
                            scaleName: element.scale.scaleName,
                            subjectName: element.subject.subjectName,
                            question: element.question,
                            topicName: element.topic.topicName,
                            createdAt: element.createdAt,
                            teacherName: teacherName,
                            checked: false
                        })
                    }, this);
                    this.$forceUpdate();
                }
            });
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
            this.bindSubjects();
            this.scaleOptions = [{ value: null, text: '--Select Scale--' }],
                this.topicOptions = [{ value: null, text: '--Select Topic--' }];
            this.questionTypeOptions = [{ value: null, text: '--Select Question Type--' }, { value: 1, text: 'Single Selection' }, { value: 2, text: 'Multi Selection' }];
            this.init();
        },
        confirm() {
          debugger;
            this.$router.push({
                //path: '/Dashboard/CreateTest/SelectQuestionsView',
                name: 'SelectQuestionsPanel',
                params: {
                    questionArr: this.createtestParams,
                    selectedQuestion: this.checkedQuestions
                }
            });
            // let array = [];
            // debugger;
            // let list = this.rows.filter(function(data, index) {
            //   if (data.checked) {
            //     array.push(data);
            //     return array;
            //   }
            // });

            // this.checkedQuestions = list;
            // this.closeModal();
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
    },
    created: function() {
        //this.loginRole = Vue.lsobj.get('loginRole');
        this.init();
    }
}
