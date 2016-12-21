'use strict';

angular.module('zvmApp.filters')
    .filter('zInlineDropdownEditor', function ($rootScope, $compile, $timeout) {
        /**
         * configuration example

         * placeholder: you can use placeholder if pre selected is empty
         * className: your class name for custom scc styling,

         * optionsCollection: can be array of options or function that will generate that array or promise? =>
         * the array options must be build by schema and must use or display or value property =>
         * prop cat transfer HTML elements => NOTE ITS YOUR RESPONSIBILITY TO ESCAPE USER CONTENT //todo ESCAPE

         * propName: current property that you use in model for specific cell

         * innerItemAsItem : must be a string, you can use inner object to run on it => ( repeat="item.Datastore as item in data.potentialResrouce.Datastores")

         * disabled: must be bool for disabled ui option => needs to be part of object that you work whit ( item.Datastore[disabled] )

         * searchEnabled : bool for enable or disable search input in dropdown list of options
         */

        return function (configuration) {
            return function (args) {

                //==========================================================================================================
                //TEMPLATES
                //==========================================================================================================

                var initTemplates = function initTemplates() {
                    if (angular.isUndefined(configuration.iconClass)) {
                        var uiSelectMatchConstructor = _.template('<ui-select-match class="ui-select-match z-inline-dropdown__container z-inline-dropdown__ellipsis" ' +
                            'placeholder="<%=placeholder%>" title="{{$select.selected.<%=selected%>}}">{{$select.selected.<%=selected%>}}</ui-select-match>');

                        var uiSelectInnerChoicesConstructor = _.template('<span class="z-inline-dropdown__ellipsis" title="{{item.<%=display%>}}" ng-bind-html="item.<%=display%> | highlight: $select.search"></span>');

                        matchTemplate = uiSelectMatchConstructor({
                            selected: angular.isDefined(configuration.innerItemAsItem) ? (configuration.innerItemAsItem + '.' + itemPropertyName) : itemPropertyName,
                            placeholder: configuration.placeholder
                        });

                        innerChoicesTemplate = uiSelectInnerChoicesConstructor({
                            display: angular.isDefined(configuration.innerItemAsItem) ? (configuration.innerItemAsItem + '.' + itemPropertyName) : itemPropertyName
                        });

                    } else {
                        var uiSelectIconMatchConstructor = _.template('<ui-select-match class="ui-select-match z-inline-dropdown__container" placeholder="<%=placeholder%>">' +
                            '<div title="{{$select.selected.<%=selected%>}}" class="select2-text-icon-container z-inline-dropdown__ellipsis"><div class="<%=iconClass%>{{$select.selected.<%=classProp%>}} <%=matchClass%>"></div>' +
                            '{{$select.selected.<%=selected%>}}</div></ui-select-match>');


                        var uiSelectInnerChoicesIconConstructor = _.template('<div class="select2-text-icon-container">' +
                            '<div class="<%=iconClass%>{{item.<%=classProp%>}}"></div>' +
                            '<span class="z-inline-dropdown__ellipsis" title="{{item.<%=display%>}}" ng-bind-html="item.<%=display%> | highlight: $select.search"></span>' +
                            '</div>');

                        innerChoicesTemplate = uiSelectInnerChoicesIconConstructor({
                            display: angular.isDefined(configuration.innerItemAsItem) ? (configuration.innerItemAsItem + '.' + itemPropertyName) : itemPropertyName,
                            iconClass: configuration.iconClass,
                            classProp: configuration.iconClassProp
                        });

                        matchTemplate = uiSelectIconMatchConstructor({
                            iconClass: configuration.iconClass,
                            classProp: configuration.iconClassProp,
                            matchClass: configuration.matchClass,
                            selected: itemPropertyName,
                            placeholder: configuration.placeholder
                        });
                    }

                    var uiSelectChoicesConstructor = _.template('<ui-select-choices class="ui-select-choices" ui-disable-choice="<%=disabled%>" repeat="<%=innerItemAsItem%>item in <%=optionsCollection%> | filter: $select.search">' +
                        '<%=innerTemplate%>' +
                        '</ui-select-choices>');

                    var uiSelectConstructor = _.template('<ui-select theme="select2" class="<%=className%> z-inline-dropdown" ' +
                        'search-enabled="<%=searchEnabled%>" ng-model="$parent.<%=model%>"' +
                        ' ng-change="<%=change%>()"><%=matchTemplate%><%=choicesTemplate%></ui-select>');//append-to-body

                    var choicesTemplate = uiSelectChoicesConstructor({
                        innerItemAsItem: angular.isDefined(configuration.innerItemAsItem) ? ('item.' + configuration.innerItemAsItem + ' as ') : '',
                        optionsCollection: 'optionsCollection',
                        disabled: getDisabledProperty(),
                        innerTemplate: innerChoicesTemplate
                    });

                    var uiSelectTemplate = uiSelectConstructor({
                        className: configuration.className,
                        model: 'uiSelectModel',
                        change: 'uiChange',
                        searchEnabled: configuration.searchEnabled,
                        matchTemplate: matchTemplate,
                        choicesTemplate: choicesTemplate
                    });

                    //==========================================================================================================
                    //COMPILE
                    //==========================================================================================================

                    removeLoading();
                    angularElementUiSelect = angular.element(uiSelectTemplate);


                    //This is for small grids  where inline editing can't be drawn in
                    //the grid view port #bug24470
                    if (configuration.appendToBody) {
                        var rect = args.container.getBoundingClientRect();
                        angularElementUiSelect.css({
                            position: 'fixed', zIndex: 9999, width: rect.width,
                            top: rect.top, left: rect.left
                        });
                        angularElementUiSelect.appendTo(document.body);
                    } else {
                        angularElementUiSelect.appendTo(args.container);
                    }


                    $compile(angularElementUiSelect)(scope);

                    //needs for theme there $digest cycle not running in first ui opening
                    if (!scope.$$phase) {
                        scope.$digest();
                    }
                };

                var loadingIndicatorTemplate = '<div class="z-inline-dropdown__loading-indicator"></div>';

                var addLoading = function () {
                    var angularElementUiSelectLoading = angular.element(loadingIndicatorTemplate);
                    angularElementUiSelectLoading.appendTo(args.container);
                };

                var removeLoading = function () {
                    $(args.container).empty();
                };

                //==========================================================================================================
                //VARIABLES
                //==========================================================================================================

                var matchTemplate, defaultValue, itemPropertyName, angularElementUiSelect, innerChoicesTemplate, openUiSelect;
                var that = this;
                var scope = $rootScope.$new();

                var getItemDisplayPropertyName = function getItemDisplayPropertyName(someElement) {
                    if (angular.isDefined(configuration.getItemDisplayProperty) && angular.isFunction(configuration.getItemDisplayProperty)) {
                        return configuration.getItemDisplayProperty();
                    } else {
                        var item = angular.isUndefined(configuration.innerItemAsItem) ? someElement : someElement[configuration.innerItemAsItem];
                        if (item.hasOwnProperty('value')) {
                            return 'value';
                        } else if (item.hasOwnProperty('DisplayName')) {
                            return 'DisplayName';
                        } else {
                            return 'display';
                        }
                    }
                };

                //  gets the item, wraps in object if its a string
                var getIsolatedModel = function getIsolatedModel() {
                    var item = angular.isDefined(configuration.uiSelectModel) && angular.isFunction(configuration.uiSelectModel) ?
                        configuration.uiSelectModel(args.item, configuration.propName) :
                        _.get(args.item[args.column.field], configuration.propName);

                    if (angular.isString(item)) {
                        var uiSelectModel = {};
                        uiSelectModel[itemPropertyName] = item;
                        return uiSelectModel;
                    } else {
                        return item;
                    }
                };

                var getDisabledProperty = function getDisabledProperty() {
                    return angular.isDefined(configuration.innerItemAsItem) && angular.isDefined(configuration.disabled) ?
                        ('item.' + configuration.innerItemAsItem + '.' + configuration.disabled) :
                        angular.isDefined(configuration.disabled) ? ('item.' + configuration.disabled) : '';
                };

                var init = function init(options) {
                    if (!_.isNullOrUndefined(options)) {
                        // get item property using some item (the first item)
                        itemPropertyName = getItemDisplayPropertyName(options[0]);
                        // load the template scope with the options
                        scope.optionsCollection = options;
                        // set the preselected item
                        scope.uiSelectModel = getIsolatedModel();
                        initTemplates();
                        // confirm to ui select to be opened in first click on cells
                        openUiSelect = $timeout(function () {
                            angular.element('.z-inline-dropdown__container .select2-arrow').click();
                        }, 1);
                    }
                };

                // initiates options for the ui select depending on their type
                if (angular.isFunction(configuration.optionsCollection)) {
                    addLoading();
                    var result = configuration.optionsCollection(args.item);

                    if (angular.isFunction(result.then)) {
                        result.then(init);
                    } else {
                        init(result);
                    }
                } else {
                    init(configuration.optionsCollection);
                }

                //==========================================================================================================
                //FUNCTIONS $ EVENTS
                //==========================================================================================================

                //collection of classes that click of them is not outside click
                var classCollection = [
                    args.container.className,
                    'select2-chosen',
                    'select2-text-icon-container z-inline-dropdown__ellipsis ng-binding ng-scope',
                    'ng-binding ng-scope',
                    configuration.iconClass + configuration.propName,
                    'busy-overlay ng-scope',
                    'select2-arrow ui-select-toggle'
                ];

                var handleClickOutside = function (e) {
                    if (!_.contains(classCollection, e.target.className)) {
                        that.save();
                    }
                };


                var handleGridScroll = function () {
                    that.save();
                };

                //closes the inline editing when scrolling grid
                args.grid.onScroll.subscribe(handleGridScroll);

                $('body').on('click', handleClickOutside);
                //$().on('click', handleClickOutside);
                //---------------------------------------------------------------

                this.cancel = function () {
                    args.cancelChanges();
                };

                this.save = function () {
                    args.commitChanges();
                };

                this.destroy = function () {
                    if (angular.isDefined(angularElementUiSelect)) {
                        angularElementUiSelect.remove();
                    }
                    if (angular.isDefined(openUiSelect)) {
                        $timeout.cancel(openUiSelect);
                    }

                    $('body').off('click', handleClickOutside);
                    args.grid.onScroll.unsubscribe(handleGridScroll);
                };

                this.loadValue = function (item) {
                    defaultValue = angular.isDefined(configuration.loadValue) && angular.isFunction(configuration.loadValue) ?
                        configuration.loadValue(item, configuration.propName) :
                        _.get(item[args.column.field], configuration.propName);
                };

                this.serializeValue = function () {
                    return angular.isDefined(configuration.serializeValue) && angular.isFunction(configuration.serializeValue) ?
                        configuration.serializeValue(scope.uiSelectModel) :
                        angular.isDefined(scope.uiSelectModel) ? scope.uiSelectModel : defaultValue;
                };

                this.applyValue = function (item, value) {
                    if (angular.isDefined(configuration.applyValue) && angular.isFunction(configuration.applyValue)) {
                        configuration.applyValue(item, value, configuration.propName);
                    } else {
                        _.set(item[args.column.field], configuration.propName, value[itemPropertyName]);
                    }
                };

                this.isValueChanged = function () {
                    return !angular.equals(scope.uiSelectModel, defaultValue);
                };

                this.validate = function () {
                    return {
                        valid: true,
                        msg: null
                    };
                };

                scope.uiChange = function () {
                    that.save();
                };
            };
        };
    });
