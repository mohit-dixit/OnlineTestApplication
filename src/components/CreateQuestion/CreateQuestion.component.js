import Vue from "vue";
import {
    GetRequest,
    PostRequest
} from '../../utils/globalservice'
import * as config from '../../config/constants.js'
export default {
    name: 'create-question',
    components: {},
    props: ['id'],
    data() {
        this.submitButtonText = 'Create';
        this.BaseUrl = config.BASE_URL;
        this.toShowRemoveAnswer = false;
        this.isEdit = false;
        return {
            toShowScale: false,
            toShowSubject: false,
            toShowTopic: false,
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
            teacherOptions: [],
            answers: [{
                answer: '',
                iscorrect: false
            }, ],
            createquestion: {
                points: null,
                scaleId: null,
                subjectId: null,
                categoryId: null,
                topicId: null
            },
            addscale: {},
            addsubject: {},
            addtopic: { subjectId: null },
            pointsOptions: [{
                value: null,
                text: 'Select Points'
            }, {
                value: '1',
                text: '2'
            }, {
                value: '2',
                text: '3'
            }, {
                value: '3',
                text: '4'
            }, {
                value: '4',
                text: '5'
            }],
            scaleOptions: [],
            subjectOptions: [],
            topicOptions: [{ value: null, text: 'Select Topic' }],
            questionTypeOptions: [{ value: null, text: 'Select Question Type' }, { value: 1, text: 'Single Selection' }, { value: 2, text: 'Multi Selection' }]
        }
    },
    computed: {

    },
    mounted() {

    },
    methods: {
        getQuestionData: function() {
            let postData = {};
            postData.id = this.id;
            PostRequest(this.BaseUrl + 'api/admin/edit/question', postData).then(res => {
                if (res) {
                    if (res.status) {
                        let response = res.body.message;
                        if (response) {
                            this.createquestion = response[0];
                            this.subjectChange();
                            let answerOptions = JSON.parse(response[0].options);
                            let answersList = JSON.parse(response[0].answer).map(data => Object.keys(data)[0] * 1);
                            this.answers = [];
                            answerOptions.forEach((element, index) => {
                                this.answers.push({
                                    answer: element[index],
                                    iscorrect: answersList.indexOf(index) > -1
                                });
                                this.toShowRemoveAnswer = true;
                            });
                        }
                    }
                }
            });
        },
        bindTeachers: function() {
            GetRequest(this.BaseUrl + 'api/admin/teacher/list').then(res => {
                this.teacherOptions = [];
                this.teacherOptions.push({
                    value: null,
                    text: 'Select Teacher'
                });
                if (res.status) {
                    let response = res.result.message;
                    if (response) {
                        response.forEach(function(element) {
                            let teacherName = element.firstname + ' ' + element.lastname;
                            this.teacherOptions.push({
                                value: element.id,
                                text: teacherName
                            })
                        }, this);
                    }
                }
            });
        },
        //Controls bindings
        bindSubjects: function() {
            GetRequest(this.BaseUrl + 'api/admin/subject/list').then(res => {
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
            });
        },
        bindScale: function() {
            GetRequest(this.BaseUrl + 'api/admin/scale/list').then(res => {
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
            });
        },

        categoryChange() {
            let controlList = document.getElementsByClassName('answerCheckboxClass');
            for (let i = 0; i < controlList.length; i++) {
                //debugger;
                //Need to Work
            }
        },
        subjectChange() {
            var self = this;
            setTimeout(function() {
                let postData = {};
                postData.subjectId = self.createquestion.subjectId;
                PostRequest(self.BaseUrl + 'api/admin/subject/assosicated/topic', postData).then(res => {
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
                        self.createquestion.topic = null;
                    }
                });
            });
        },
        onSubmit(evt) {
          debugger;
            evt.preventDefault();
            let answers = this.getFinalAnswers();

            if (this.createquestion.categoryId == 1) {
                let isMultipleAnswersSelected = answers.map(data => data.isAnswer).filter(data => data == true).length > 1
                if (isMultipleAnswersSelected) {
                    alert('Multiple answers not allowed if Single selection is selected as Question type')
                    return;
                }
            }

            console.log(JSON.stringify(answers));
            console.log(JSON.stringify(this.createquestion));
            let finalOptionsData = [];
            let finalAnswerData = [];
            let counter = 0;
            answers.forEach(function(element) {
                console.log('In ' + element.answerText);
                let finalOptionsObj = {};
                finalOptionsObj[counter] = element.answerText;
                finalOptionsData.push(finalOptionsObj);
                if (element.isAnswer) {
                    finalAnswerData.push(finalOptionsObj);
                }
                counter++;
            }, this);
            //Making Post Data ==============================================================================
            this.createquestion.instituteId = Vue.lsobj.get('instituteID');
            this.createquestion.options = JSON.stringify(finalOptionsData);
            this.createquestion.answer = JSON.stringify(finalAnswerData);
            //Making Post Data ==============================================================================
            let apiPath = 'api/admin/create/question';
            let isEditMode = this.isEdit;
            if (isEditMode) {
                apiPath = 'api/admin/update/question';
            }
            PostRequest(this.BaseUrl + apiPath, this.createquestion).then(res => {
                if (res) {
                    if (res.status == 200) {
                        this.createquestion = {};
                        if (isEditMode) {
                            alert('Question updated successfully');
                            this.$router.push('/Dashboard/QuestionBank');
                        } else {
                            this.notifySuccess = true;
                            this.notifyError = false;
                            this.responseMessage = 'Question created successfully';
                        }
                    } else {
                        this.errorMessage = res.statustext;
                        this.notifySuccess = false;
                        this.notifyError = true;
                        this.$forceUpdate();
                    }
                }
            });
        },
        addRow: function() {
            // let firstAnswerEditorText;
            // let editorControlList = document.getElementsByClassName('answerEditorClass');
            // for (let i = 0; i < editorControlList.length; i++) {
            //   firstAnswerEditorText = editorControlList[i].textContent.trim();
            //   break;
            // }
            this.answers.push({
                answer: '',
                iscorrect: false
            });
            this.toShowRemoveAnswer = true;
        },

        removeRow: function() {
            this.answers.pop();
            let answersLength = this.answers.length;
            if (answersLength == 1) {
                this.toShowRemoveAnswer = false;
            }
        },
        answerCheckboxClick: function(sender) {
            if (this.createquestion.categoryId == 1) {
                let controlList = document.getElementsByClassName('answerCheckboxClass');
                let checkedCounter = 0;
                for (let i = 0; i < controlList.length; i++) {
                    if (controlList[i].firstElementChild.checked) {
                        checkedCounter++;
                    }
                    if (checkedCounter > 1) {
                        alert('You cannot select multiple answers')
                        event.currentTarget.checked = false;
                        break;
                    }
                }
            }
        },
        getFinalAnswers: function() {
            let finalAnswerObj = [];
            let checkboxControlList = document.getElementsByClassName('answerCheckboxClass');
            let editorControlList = document.getElementsByClassName('answerEditorClass');
            for (let i = 0; i < checkboxControlList.length; i++) {
                let answerObj = {};
                answerObj.answerText = editorControlList[i].outerText;
                answerObj.isAnswer = false;
                if (checkboxControlList[i].firstElementChild.checked) {
                    answerObj.isAnswer = true;
                }
                finalAnswerObj.push(answerObj);
            }
            return finalAnswerObj;
        },
        addScale(evt) {
            // Prevent modal from closing
            evt.preventDefault();
            if (!this.addscale.scalename) {
                alert('Please enter Scale');
            } else {
                this.submitScale()
            }
        },

        submitScale() {
            alert(this.addscale.scalename);
            this.addscale = {};
            this.$refs.modalScale.hide();
        },
        addSubject(evt) {
            // Prevent modal from closing
            evt.preventDefault();
            if (!this.addsubject.subjectname) {
                alert('Please enter Subject');
            } else {
                this.submitSubject()
            }
        },
        submitSubject() {
            alert(this.addsubject.subjectname);
            this.addsubject = {};
            this.$refs.modalSubject.hide();
        },
        resetValues() {
            this.getQuestionData();
        },

        //Modal Functions ------------------------------------------------------------------------------------------------------------
        confirmationScale: function(events, args) {
            let apiPath = 'api/admin/create/scale';
            PostRequest(this.BaseUrl + apiPath, this.addscale).then(res => {
                if (res) {
                    if (res.status == 200) {
                        this.addscale = {};
                        this.bindScale();
                        this.$refs.modalScale.hide();
                    }
                }
            });
        },
        closeModalScale: function(events, args) {
            this.addscale = {};
            this.$refs.modalScale.hide();
        },
        confirmationSubject: function(events, args) {
            let apiPath = 'api/admin/create/subject';
            PostRequest(this.BaseUrl + apiPath, this.addsubject).then(res => {
                if (res) {
                    if (res.status == 200) {
                        this.addsubject = {};
                        this.bindSubjects();
                        this.$refs.modalSubject.hide();
                    }
                }
            });
        },
        closeModalSubject: function(events, args) {
            this.addsubject = {};
            this.$refs.modalSubject.hide();
        },
        confirmationTopic: function(events, args) {
            let apiPath = 'api/admin/create/topic';
            PostRequest(this.BaseUrl + apiPath, this.addtopic).then(res => {
                if (res) {
                    if (res.status == 200) {
                        this.addtopic = {};
                        this.subjectChange();
                        this.$refs.modalTopic.hide();
                    }
                }
            });
        },
        closeModalTopic: function(events, args) {
            this.addtopic = {};
            this.$refs.modalTopic.hide();
        },
        //Modal Functions ------------------------------------------------------------------------------------------------------------
    },
    created: function() {
        this.loginRole = Vue.lsobj.get('loginRole');
        this.bindSubjects();
        this.bindScale();
        this.bindTeachers();


        //Show hide controls on the basis of Configuration (Institute level)
        if (this.loginRole === '2') {
            let instituteLevelConfigScale = Vue.lsobj.get('allow_scale');
            let instituteLevelConfigSubject = Vue.lsobj.get('allow_subject');
            let instituteLevelConfigTopic = Vue.lsobj.get('allow_topic');
            this.toShowScale = (instituteLevelConfigScale == config.Active) ? true : false;
            this.toShowSubject = (instituteLevelConfigSubject == config.Active) ? true : false;
            this.toShowTopic = (instituteLevelConfigTopic == config.Active) ? true : false;
        }
        //Show hide controls on the basis of Configuration (Institute level)

        if (this.id) {
            this.submitButtonText = 'Update';
            this.isEdit = true;
            this.getQuestionData();
        }
    }
}
