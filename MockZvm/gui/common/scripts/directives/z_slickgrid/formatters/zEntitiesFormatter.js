'use strict';

angular.module('zvmApp.filters')
    .constant('entityEvents', {
        editEntity: 'Entity::Edit',
        deleteEntity: 'Entity::Delete'
    })
    .constant('entityCases', {
        caseDelete: 'delete',
        caseEdit: 'edit',
        caseText: 'text',
        caseHref: 'href',
        caseTypeFile: 'file',
        caseTypeFolder: 'folder'
    })
    .service('zEntitiesService', function () {
        var zEntitiesService = this;
        zEntitiesService.createParams = function (customFlag, editParamTitle, editParamDisabled, deleteParamTitle, deleteParamDisabled) {
            return {
                customFlag: customFlag,
                editParam: {title: editParamTitle, disabled: editParamDisabled},
                deleteParam: {title: deleteParamTitle, disabled: deleteParamDisabled}
            };
        };
    })
    .filter('zEntitiesFormatter', function ($translate, entityEvents, entityCases) {
        return function (params) {
            var field;

            var deleteTitle = params.deleteParam.title;
            var editTitle = params.editParam.title;
            var deleteDisable = params.deleteParam.disabled;
            var editDisable = params.editParam.disabled;

            return function (row, cell, value, columnDef, dataContext) {
                var links = '';
                field = columnDef.field;
                var buttonTemplate = _.template('<button class="<%=className%>" title="<%=title%>" <%=disabled%> value="<%=event%>"></button>');
                var textTemplate = _.template('<span title="<%=title%>"><%=title%></span>');
                var linkTemplate = _.template('<a title="<%=title%>" href="#/<%=href%>"><%=title%></a>');
                var labelTemplate = _.template('<label class="<%=className%>" title="<%=title%>"></label>');

                if (angular.isDefined(dataContext) && dataContext.hasOwnProperty(field)) {

                    if (params.customFlag === 'vra' && angular.isUndefined(dataContext.ServerIdentifier)) {
                        return dataContext[field].display;
                    }

                    _.forEach(dataContext[field], function (item) {
                        switch (item.type) {
                            case entityCases.caseDelete:
                            {
                                links += buttonTemplate({
                                    className: 'grid-btn-delete',
                                    title: (item.enabled ? deleteTitle : deleteDisable),
                                    disabled: item.enabled ? '' : 'disabled',
                                    event:item.enabled ? entityEvents.deleteEntity : 'disabled'
                                });
                                break;
                            }
                            case entityCases.caseEdit:
                            {
                                links += buttonTemplate({
                                    className: 'grid-btn-edit',
                                    title: (item.enabled ? editTitle : editDisable),
                                    disabled: item.enabled ? '' : 'disabled',
                                    event: item.enabled ? entityEvents.editEntity : 'disabled'
                                });
                                break;
                            }
                            case entityCases.caseText:
                            {
                                links += textTemplate({title: item.label});
                                break;
                            }
                            case entityCases.caseHref:
                            {
                                links += linkTemplate({title: item.label, href: item.location});
                                break;
                            }
                        }
                    });
                }

                //add file/folder icons to flr-summary-download page.
                if (params.customFlag === 'flr-summary') {
                    var textLink = '';
                    var iconLink = '';

                    _.forEach(dataContext[field], function (item) {
                        switch (item.type) {
                            case entityCases.caseText:
                            {
                                textLink = textTemplate({title: item.label});
                                break;
                            }
                            case entityCases.caseTypeFile:
                            {
                                iconLink = labelTemplate({
                                    className: 'glyphicon glyphicon-file icon-left',
                                    title: item.type
                                });
                                break;
                            }
                            case entityCases.caseTypeFolder:
                            {
                                iconLink = labelTemplate({
                                    className: 'glyphicon glyphicon-folder-close icon-left',
                                    title: item.type
                                });
                                break;
                            }
                        }
                    });
                    links = iconLink + textLink;
                }
                return '<div class="entities-formatter">' + links + '</div>';
            };
        };
    });
