'use strict';

angular.module('zvmApp.directives')
    .factory('editorsTemplateFactory', function ($translate) {
        var editorsTemplateFactory = {};

        editorsTemplateFactory.templates = {
            blank:'<div class="z-inline-editor z-inline-editor-blank"></div>',
            text:'<div class="z-inline-editor z-inline-editor-text"><input type="text" class="editor-text" /></div>',
            yesNo: '<div class="z-inline-editor z-inline-editor-yesno"><select tabIndex="0" class="editor-yesno"><option value="true">' + $translate.instant('YES') + '</option><option value="false">' + $translate.instant('NO') + '</option></select></div>',
            checkbox: '<div class="z-inline-editor z-inline-editor-checkbox"><label class="z-checkbox"><input type="checkbox" checked hideFocus><span class="z-checkbox-container"></span><span class="icon"></span><span class="z-checkbox-transclude"></span></label></div>',
            dropdown: '<div class="z-inline-editor z-inline-editor-dropdown"><select tabIndex="0" class="editor-select"></select></div>',
            form: '<form class="z-inline-editor z-inline-editor-blank" name="forms.inlineForm"></form>'
        };
        editorsTemplateFactory.getTemplate = function (templateName) {
            return  editorsTemplateFactory.templates[templateName];
        };
        return editorsTemplateFactory;
    });
