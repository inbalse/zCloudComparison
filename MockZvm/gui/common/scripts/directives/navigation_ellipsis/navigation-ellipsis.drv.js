'use strict';

angular.module('zvmApp.directives')
    .directive('navigationEllipsis', function ($timeout, $window, navigationTabsFactory, checkActiveState) {
        return {
            restrict: 'A',
            link: function (scope, element) {
                //===================================================================================
                // Properties
                //===================================================================================
                scope.ellipsisCollection = [];
                var dynamicTabsTemp = [];
                var NAVIGATION_TABS_SPACES = angular.isDefined(scope.navigationTabsSpaces) ? scope.navigationTabsSpaces : 200;
                var TAB_PADDING = 47;
                var DYNAMIC_TAB_DEFAULT_ELLIPSIS_WIDTH = 135;
                var ONE_STR_TO_ONE_PX = 7;
                var staticTabsWidth = 0;

                //===================================================================================
                // WACtHERS
                //===================================================================================
                var onResizeFunction = function () {
                    scope.getTabsWidth(element);
                    checkActiveTab();
                };

                //event if size of window is change
                scope.$on('zResize::resize', onResizeFunction);

                //when dynamic tabs collection is add tab
                navigationTabsFactory.dynamicTabsAdded = function () {
                    onResizeFunction();
                };

                //event fire when try open tab in ellipsis drop down
                navigationTabsFactory.openTabExistingInEllipsis = function () {
                    onResizeFunction();
                };

                //event when one of the tab is clicked
                scope.tabClicked = function (event, tab) {
                    setTabsActivityFunk(tab);
                    scope.getTabsWidth(element);
                };

                scope.onTabClosed = function (id, name){
                    setTabsActivityFunk({name:name, id:id});
                    scope.getTabsWidth(element);
                };
                //event when one of the tab is clicked from ellipsis list
                scope.tabClickedEllipsisList = function (event, tab) {
                    setTabsActivityFunk(tab);
                    scope.getTabsWidth(element, true);
                };


                //watch if dynamic tabs been changed
                scope.$watch('dynamicTabs', function (newTabs) {
                    if (angular.isArray(newTabs) && newTabs.length) {
                        if (newTabs.length !== dynamicTabsTemp.length) {
                            var newTab = newTabs[0];

                            //check if dynamic temp collection not empty
                            if (dynamicTabsTemp.length) {
                                //try to find new tab by id (compare existing tabs with new tabs)
                                newTab = _.find(newTabs, function (tab) {
                                    return !_.contains(_.pluck(dynamicTabsTemp, 'id'), tab.id);
                                });
                            }

                            //set temp tabs collection to new tabs data
                            dynamicTabsTemp = angular.copy(newTabs);

                            //check if has new tab
                            if (newTab) {
                                //get all dynamic tabs from html DOM
                                var dynamicTabs = element.find('li.dynamic-tab');

                                //set timeout to let compile finish the job to get current tab width --- without timeout is => ( tab.outerText.trim() = {{tabDynamic.title}} )
                                $timeout(function () {
                                    dynamicTabs.each(function (index, tab) {
                                        //compare between html tab and new tab check if not has width and is in active
                                        if (newTab.title === tab.outerText.trim() && !angular.isDefined(newTab.width) && newTab.active) {
                                            //set width prop to current width
                                            newTab.width = $(tab).width();
                                        }
                                    });
                                }, 1);
                            }
                        }
                    }
                });

                //===================================================================================
                // HELPER FUNCTIONS
                //===================================================================================

                var checkActiveTab = function () {
                    //check if dynamic tabs in active and if tab in drop down list mark the ellipsis tab himself as active
                    checkActiveState.byPartialName(scope.ellipsisCollection);
                    var isDynamicActive = _.find(scope.ellipsisCollection, function (tab) {
                        return tab.active;
                    });

                    //set ellipsis tab active
                    scope.dropdownTabActive = angular.isDefined(isDynamicActive);

                    if (!scope.$$phase) {
                        scope.$apply();
                    }
                };

                var checkTabNameAndIdEquality = function (dyTab, tab) {
                    return dyTab.id === tab.id && dyTab.name === tab.name;
                };

                var checkTabIdEquality = function (dyTab, tab) {
                    return dyTab.id === tab.id;
                };

                var setActivity = function (collection, tab) {
                    if (tab.name) { //if vra tab id is not unique
                        _.each(collection, function (dyTab) {
                            dyTab.active = checkTabNameAndIdEquality(dyTab, tab);
                        });
                    } else {
                        _.each(collection, function (dyTab) {
                            dyTab.active = checkTabIdEquality(dyTab, tab);
                        });
                    }
                };

                //set activity if click on dynamic tab or static tab
                var setTabsActivityFunk = function (tab) {
                    if (tab) {
                        setActivity(scope.dynamicTabs, tab);
                        setActivity(scope.ellipsisCollection, tab);
                    }
                };

                //calculate all static tabs width
                var getStaticTabWidth = function (element) {
                    //check if empty space been already calculate
                    if (staticTabsWidth === 0) {
                        var result = 0;
                        element.find('li').each(function () {
                            if (this.getAttribute('name') === 'static') {
                                result += $(this).width();
                            }
                        });
                        staticTabsWidth = result;
                        return result;
                    }

                    return staticTabsWidth;
                };

                //function uses for first time tab added to get preliminary width
                //calculate strings to px (width)
                var calcStrToPx = function (strLength) {
                    return strLength * ONE_STR_TO_ONE_PX + TAB_PADDING;
                };

                //===================================================================================
                // GENERAL FUNCTIONS
                //===================================================================================

                //function that managed dynamic and ellipsis tabs
                scope.getTabsWidth = function (element, isFromEllipsis) {

                    //collect all tabs together
                    var allTabs = navigationTabsFactory.dynamicTabs.concat(scope.ellipsisCollection);
                    //get empty space
                     var emptySpace = $window.innerWidth - getStaticTabWidth(element) - NAVIGATION_TABS_SPACES;

                    //check if someone tab is active or function call from tab click
                    if (_.contains(_.pluck(allTabs, 'active'), true) && isFromEllipsis) {
                        //sort tabs and replace active tab in first location
                        allTabs = _.sortBy(allTabs, function (tab) {
                            return [tab.active, tab.active];
                        }).reverse();
                    }

                    //clear both collection
                    scope.dynamicTabs = [];
                    scope.ellipsisCollection = [];


                    _.each(allTabs, function (tab) {
                        //delete angular key property needs for repeater (exception duplicate key)
                        if (tab.hasOwnProperty('$$hashKey')) {
                            delete tab.$$hashKey;
                        }

                        //get current width by tab status
                        var tabWidth = angular.isDefined(tab.width) && tab.active ? tab.width : (tab.active ? calcStrToPx(tab.title.length) : DYNAMIC_TAB_DEFAULT_ELLIPSIS_WIDTH);

                        //check if have enough space for tabs
                        if (tabWidth > emptySpace) {
                            //if not push to ellipsis drop down
                            scope.ellipsisCollection.push(tab);
                        } else {
                            //if enough push to dynamic tabs
                            scope.dynamicTabs.push(tab);
                        }

                        //calculate empty space after order tab push
                        emptySpace = emptySpace - tabWidth;
                    });

                    //update navigation factory to save tabs state
                    navigationTabsFactory.dynamicTabs = scope.dynamicTabs;
                    navigationTabsFactory.ellipsisCollection = scope.ellipsisCollection;

                    if (!scope.$$phase) {
                        scope.$apply();
                    }

                };
            }
        };
    });
