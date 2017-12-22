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
            footerBgVariant: '',
            footerTextVariant: 'dark',
            //Modal Popup Variant
            answers: [{
                answer: '',
                iscorrect: false
            }, ],
            createquestion: {
                points: null,
                scaleId: null,
                subjectId: null,
                categoryId: 1,
                topicId: null,
                teacherId: null
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
            fetchingData: false,
            scaleOptions: [],
            subjectOptions: [],
            topicOptions: [{ value: null, text: 'Select Topic' }],
            teacherOptions: [{ value: null, text: 'Select Teacher' }],
            questionTypeOptions: [{ value: 1, text: 'Single Selection' }, { value: 2, text: 'Multi Selection' }]
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
                            this.subjectChange(this.createquestion);
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
          let postData = {};
          postData.status = config.Active;
          PostRequest(this.BaseUrl + 'api/admin/subject/list', postData).then(res => {
                this.subjectOptions = [];
                this.subjectOptions.push({
                    value: null,
                    text: 'Select Subject'
                })
                if (res.status) {
                    let response = res.body.message;
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
          let postData = {};
          postData.status = config.Active;
          PostRequest(this.BaseUrl + 'api/admin/scale/list', postData).then(res => {
                this.scaleOptions = [];
                this.scaleOptions.push({
                    value: null,
                    text: 'Select Scale'
                })
                if (res.status) {
                    let response = res.body.message;
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
        subjectChange(model) {
          let modelObj = model;
            setTimeout(() => {
                this.getTopicBySubject(this.createquestion.subjectId, modelObj)
                this.getTeacherListBySubject(this.createquestion.subjectId, modelObj);
            });
        },
        getTopicBySubject(sub_id, model){
            this.fetchingData = true;
            let postData = {};
            postData.subjectId = sub_id;
            PostRequest(this.BaseUrl + 'api/admin/subject/assosicated/topic', postData).then(res => {
                this.fetchingData = false;
                this.topicOptions = [];
                this.topicOptions.push({
                    value: null,
                    text: 'Select Topic'
                })
                if (res.status) {
                    let response = res.body.message;
                    if (response) {
                        response.forEach(function(element) {
                            this.topicOptions.push({
                                value: element.id,
                                text: element.topicName
                            })
                        }, this);
                    }
                }
                this.createquestion.topicId =  model ? model.topicId : null;
            })
            .catch(error => {
                this.fetchingData = false;
                console.log(error);
            })
        },
        getTeacherListBySubject(sub_id, model) {
            /* Get Teacher's List accordingly  */
            let teacherPostData = {"subjectId": sub_id}
            this.fetchingData = true;
            PostRequest(this.BaseUrl + 'api/admin/subject/assosicated/teacher', teacherPostData)
                .then(res => {
                    this.fetchingData = false;
                    this.teacherOptions = [];
                    this.teacherOptions.push({
                        value: null,
                        text: 'Select Teacher'
                    });
                    if (res.status) {
                        let resTeacherData = res.body.message;
                        if (resTeacherData) {
                            resTeacherData.forEach(function(element) {
                                let teacherName = element.user.firstname + ' ' + element.user.lastname;
                                this.teacherOptions.push({
                                    value: element.id,
                                    text: teacherName
                                })
                            }, this);
                            console.log(this.teacherOptions,'----------------');
                            this.$forceUpdate();
                        }
                    }
                    this.createquestion.teacherId =  model ? model.createdBy : null;
                })
                .catch(error => {
                    this.fetchingData = false;
                    console.log(error);
                })
        },
        onSubmit(evt) {
            evt.preventDefault();
            this.$validator.validateAll().then((result) => {
              if (result) {
                let answers = this.getFinalAnswers();
                let errorMsgBeforeSubmit;
                if (this.createquestion.categoryId == 1) {
                    let isMultipleAnswersSelected = answers.map(data => data.isAnswer).filter(data => data == true).length > 1
                    if (isMultipleAnswersSelected) {
                        // alert('Multiple answers not allowed if Single selection is selected as Question type')
                        this.$swal({
                            type: 'info',
                            title: 'Wait !',
                            text: 'Multiple answers not allowed if Single selection is selected as Question type',
                        })
                        return;
                    }
                }
                if(!this.createquestion.question.trim()) {
                    errorMsgBeforeSubmit = 'You must have to enter question title !'
                    this.$swal({
                        type: 'info',
                        title: 'Wait !',
                        text: errorMsgBeforeSubmit,
                    })
                    return;
                } else if(!this.createquestion.explanation) {
                    errorMsgBeforeSubmit = 'You must have to enter explanation !'
                    this.$swal({
                        type: 'info',
                        title: 'Wait !',
                        text: errorMsgBeforeSubmit,
                    })
                    return;
                }

                console.log(answers,"answer list here");

                let finalOptionsData = [];
                let finalAnswerData = [];
                let counter = 0;
                /* OLd code using wrong way but WORKING FINE */
                answers.forEach(function(element) {
                    // console.log('Answer text here - ', element.answerText);
                    let finalOptionsObj = {};
                    finalOptionsObj[counter] = element.answerText.trim();
                    if(element.answerText.trim()) {
                        finalOptionsData.push(finalOptionsObj);
                    }
                    if (element.isAnswer) {
                        finalAnswerData.push(finalOptionsObj);
                    }
                    counter++;
                }, this);
                /* -------------------------- */
                /* answers.forEach(function(element) {
                    // console.log('Answer text here - ', element.answerText);
                    let finalOptionsObj = {};
                    // finalOptionsObj[counter] = element.answerText.trim();
                    if(element.answerText.trim()) {
                        finalOptionsData.push(element.answerText.trim());
                    }
                    if (element.isAnswer) {
                        finalAnswerData.push(element.answerText.trim());
                    }
                    // counter++;
                }, this); */

                /* Check for whether question have answer selected/and have options or not */
                if(!finalOptionsData.length) {
                    errorMsgBeforeSubmit = 'You must have to enter at least one option for answer !'
                    this.$swal({
                        type: 'info',
                        title: 'Wait !',
                        text: errorMsgBeforeSubmit,
                    })
                    return;
                } else if(!finalAnswerData.length){
                    errorMsgBeforeSubmit = 'You must have to select at lease one option as answer in order to post new question !'
                    this.$swal({
                        type: 'info',
                        title: 'Wait !',
                        text: errorMsgBeforeSubmit,
                    })
                    return;
                }

                //Making Post Data ==============================================================================
                this.createquestion.instituteId = Vue.lsobj.get('instituteID');
                this.createquestion.options = JSON.stringify(finalOptionsData);
                this.createquestion.answer = JSON.stringify(finalAnswerData);
                console.log('answer array is' , answers, 'createquestion array is ',this.createquestion);

                // Set URL accordingly  ==============================================================================
                let apiPath = 'api/admin/create/question';
                let isEditMode = this.isEdit;
                if (isEditMode) {
                    apiPath = 'api/admin/update/question';
                }

                /* ----Rest CALL for question here---- */
                PostRequest(this.BaseUrl + apiPath, this.createquestion)
                    .then(res => {
                        if (res && res.status == 200) {
                            let msg = isEditMode ? 'Question updated successfully' : 'Question created successfully';
                            this.$swal({
                                type: 'success',
                                title: 'Done !',
                                text: msg,
                                allowOutsideClick: false,
                                showConfirmButton: true
                            }).then((result) => {
                                if (result) {
                                this.$router.push('/Dashboard/QuestionBank');
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
                    })
                    .catch(error => {
                        console.log(error);
                        this.$swal({
                            type: 'error',
                            title: 'Sorry !',
                            text: error.statustext || 'Please try again after some time !',
                        });
                  })
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
                        if(event.target.checked){
                            this.$swal({
                                type: 'info',
                                title: 'Wait !',
                                text: 'You cannot select multiple answers as you have selected question type single selection',
                            })
                        }
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
                answerObj.answerText = editorControlList[i].outerText.trim();
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
        // this.bindTeachers();


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
