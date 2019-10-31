define([
    'text!templates/cards.tmpl'
], function (template) {
    return Backbone.View.extend({
        template: _.template(template),
        tagName: "section",
        className: "cards",
        
        events: {
            "click .black": "selectQuestion",
            "click .question": "discardQuestion",
            "click .overview": "selectAnswer",
            "click .button-add-second-card": "addSecondAnswer",
            "click .closed": "openAnswer",
            "click .open": "discardAnswer"
        },

        initialize: function (options) {
            this.questions = options.questions;
            this.answers = options.answers;
            this.hand = this.answers.first(10);
            this.questionsIndex = 0;
            this.answersIndex = 9;
            this.selected = null;
            this.secondSelected = null;
            this.status = null;
            this.render();
        },
        
        render: function () {
            this.$el.html(this.template(this));
            return this;
        },
        
        selectQuestion: function () {
            this.status = "question";
            this.render();
        },
        
        discardQuestion: function () {
            this.status = null;
            ++this.questionsIndex;
            this.render();
        },
        
        selectAnswer: function (e) {
            if (this.selected === null) {
                this.selected = $(e.currentTarget).data("index");
                this.status = "closed";
            } else {
                this.secondSelected = $(e.currentTarget).data("index");
                this.status = "closed_two";
            }
            this.render();
        },
        
        addSecondAnswer: function () {
            this.status = null;
            this.render();
        },
        
        openAnswer: function (e) {
            if ($(e.target).hasClass("button-add-second-card")) {
                return;
            }
            this.status = "open";
            this.render();
        },
        
        discardAnswer: function () {
            this.status = null;
            this.hand[this.selected] = this.answers.at(++this.answersIndex);
            this.selected = null;
            if (this.secondSelected !== null) {
                this.hand[this.secondSelected] = this.answers.at(++this.answersIndex);
                this.secondSelected = null;
            }
            this.render();
        }
    });
});
