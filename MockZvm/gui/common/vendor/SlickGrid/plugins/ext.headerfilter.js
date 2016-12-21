var rangeFiltersFromToLogicFunk = function () {
    var fromElement = document.getElementById('filter-from');
    var toElement = document.getElementById('filter-to');
    var okButtonElement = document.getElementById('filter-btn-ok-id');

    var fromVal = (fromElement !== null ? fromElement.value : 0) || 0;
    var toVal = (toElement !== null ? toElement.value : 0) || 0;

    //validate if from bigger that to
    if (parseInt(fromVal) > parseInt(toVal)) {
        toElement.style.borderColor = 'red';
        okButtonElement.disabled = true;
    } else {
        toElement.style.borderColor = '';
        okButtonElement.disabled = false;
    }

    //check if needs to trigger event
    if (parseInt(toElement.min) !== parseInt(fromVal)) {
        toElement.min = fromVal;
        //triggered event manual for workingFilters get input values
        $(toElement).keyup();
    }
};

(function ($) {
    $.extend(true, window, {
        "Ext": {
            "Plugins": {
                "HeaderFilter": HeaderFilter
            }
        }
    });

    /*
     Based on SlickGrid Header Menu Plugin (https://github.com/mleibman/SlickGrid/blob/master/plugins/slick.headermenu.js)
     (Can't be used at the same time as the header menu plugin as it implements the dropdown in the same way)
     */

    function HeaderFilter(options) {
        var grid;
        var self = this;
        var handler = new Slick.EventHandler();
        var defaults = {
            buttonImage: false,
            filterImage: false,
            sortAscImage: "assets/sort-asc.png",
            sortDescImage: "assets/sort-desc.png"
        };
        var $menu;
        var menuNodes = [];
        var filterType = {
            "WILDCARD": 0,
            "RANGE": 1,
            "MULTI_SELECT": 2,
            "PERCENTAGE": 3,
            "DATE": 4,
            "MB_OR_GB_RANGE": 5
        };

        var _lastUseFilterId = '';

        function setLastFilterId(id) {
            _lastUseFilterId = id;
        }

        function getLastFilterId() {
            return _lastUseFilterId;
        }

        function init(g) {
            options = $.extend(true, {}, defaults, options);
            grid = g;
            handler.subscribe(grid.onHeaderCellRendered, handleHeaderCellRendered)
                .subscribe(grid.onBeforeHeaderCellDestroy, handleBeforeHeaderCellDestroy)
                .subscribe(grid.onClick, handleBodyMouseDown)
                .subscribe(grid.onColumnsResized, columnsResized);

            grid.setColumns(grid.getColumns());
            $(document.body).bind("mousedown", handleBodyMouseDown);
        }

        function destroy() {
            _.forEach(menuNodes, function (item) {
                item.remove();
            });
            handler.unsubscribeAll();
            $(document.body).unbind("mousedown", handleBodyMouseDown);
        }

        function handleBodyMouseDown(e, returnValue) {
            if (!_.contains(e.target.className, 'slick-header-menubutton')) {
                if ($menu && $menu[0] != e.target && !$.contains($menu[0], e.target)) {
                    hideMenu();
                }
                //according to bug 25397 one click open second close when on same filter key
            } else if (returnValue) {
                if ($menu && $menu[0] != e.target && !$.contains($menu[0], e.target)) {
                    hideMenu();
                    return false;
                }

                return true;
            }
        }

        function hideMenu() {
            if ($menu) {
                $menu.remove();
                $menu = null;
            }
        }

        function handleHeaderCellRendered(e, args) {
            var column = args.column;
            if (column.filter === undefined) return;

            var $el = $("<div></div>")
                .addClass("slick-header-menubutton")
                .data("column", column);

            if (options.buttonImage) {
                $el.css("background-image", "url(" + options.buttonImage + ")");
            }

            $el.bind("click", showFilter).appendTo(args.node);

            menuNodes.push($el);
            setButtonImage($el, column.isFilterActive);
            setCssStyle($el, column.isFilterActive);
        }

        function updateMenuNodes(columns) {
            var column, found;
            for (var i = 0, l = menuNodes.length; i < l; i++) {
                column = menuNodes[i].data('column');
                if (!column) continue;
                found = _.find(columns, {field: column.field});
                setButtonImage(menuNodes[i], found.isFilterActive);
                setCssStyle(menuNodes[i], found.isFilterActive);


            }
        }

        function handleBeforeHeaderCellDestroy(e, args) {
            $(args.node)
                .find(".slick-header-menubutton")
                .remove();
        }

        function addMenuItem(menu, columnDef, title, command, image) {
            var $item = $("<div class='slick-header-menuitem'>")
                .data("command", command)
                .data("column", columnDef)
                .bind("click", handleMenuItemClick)
                .appendTo(menu);

            var $icon = $("<div class='slick-header-menuicon'>")
                .appendTo($item);

            if (image) {
                $icon.css("background-image", "url(" + image + ")");
            }

            $("<span class='slick-header-menucontent'>")
                .text(title)
                .appendTo($item);
        }

        function showFilter(e) {
            e.preventDefault();
            e.stopPropagation();
            var $menuButton = $(this);
            $menuButton.addClass('slick-header-menubutton-active');
            var columnDef = $menuButton.data("column");

            //according to bug 25397 one click open second close when on same filter key
            if (!handleBodyMouseDown(e, true) && getLastFilterId() === columnDef.id) {
                return;
            }

            setLastFilterId(columnDef.id);

            // WorkingFilters is a copy of the filters to enable apply/cancel behaviour
            var workingFilters;
            var workingMultiplier;
            var filterClass = 'slick-header-menu ';

            switch (columnDef.filter) {
                case filterType.WILDCARD:
                    columnDef.wildcardValues = columnDef.wildcardValues || [];
                    workingFilters = columnDef.wildcardValues.slice(0);
                    filterClass += 'slick-header-menu-wildcard';
                    break;
                case filterType.RANGE:
                    columnDef.rangeValues = columnDef.rangeValues || [];
                    workingFilters = columnDef.rangeValues.slice(0);
                    filterClass += 'slick-header-menu-range';
                    break;
                case filterType.MB_OR_GB_RANGE:
                    columnDef.rangeValues = columnDef.rangeValues || [];
                    columnDef.rangeTypeMultiplier = columnDef.rangeTypeMultiplier || 1;
                    workingFilters = columnDef.rangeValues.slice(0);
                    workingMultiplier = columnDef.rangeTypeMultiplier;
                    filterClass += 'slick-header-menu-range';
                    break;
                case filterType.MULTI_SELECT:
                    columnDef.filterValues = columnDef.filterValues || [];
                    workingFilters = columnDef.filterValues.slice(0);
                    filterClass += 'slick-header-menu-multiselect';
                    break;
                case filterType.PERCENTAGE:
                    columnDef.percentageValues = columnDef.percentageValues || [];
                    workingFilters = columnDef.percentageValues.slice(0);
                    filterClass += 'slick-header-menu-percentage';
                    break;
                case filterType.DATE:
                    columnDef.dateValues = columnDef.dateValues || [];
                    workingFilters = columnDef.dateValues.slice(0);
                    filterClass += 'slick-header-menu-date';
                    break;
            }

            var filterItems;
            var filteredObj;
            var rows;

            if (workingFilters.length === 0) {
                // Filter based all available values
                filteredObj = getFilterValues(grid.getData(), columnDef);
            }
            else {
                // Filter based on current dataView subset
                filteredObj = getAllFilterValues(grid.getData().getItems(), columnDef);
            }

            filterItems = filteredObj.filtered;
            rows = filteredObj.rows;

            var _getWidth = function () {
                var defaultPadding = 14;
                var columnWidth = columnDef.width - defaultPadding;
                var minWidth = 106;

                return columnWidth > (minWidth + defaultPadding) ? columnWidth : minWidth;
            };


            if (!$menu) {
                $menu = $("<div class='" + filterClass + "'>").appendTo(document.body);
                $menu.width(_getWidth());
            }

            $menu.empty();

            if (options.showSortInMenu) {
                addMenuItem($menu, columnDef, 'Sort Ascending', 'sort-asc', options.sortAscImage);
                addMenuItem($menu, columnDef, 'Sort Descending', 'sort-desc', options.sortDescImage);
            }

            var filterOptions;
            switch (columnDef.filter) {
                case filterType.WILDCARD:
                    var inputVal = columnDef.wildcardValues.length > 0 ? columnDef.wildcardValues[0] : '';
                    filterOptions = "<input type='text' value='" + inputVal + "' />";
                    break;
                case filterType.RANGE:
                    var rangeFromVal = columnDef.rangeValues.length > 0 ? columnDef.rangeValues[0] : '';
                    var rangeToVal = columnDef.rangeValues.length > 1 ? columnDef.rangeValues[1] : '';
                    filterOptions = '<div class="filter-row">' +
                        '<label class="filter-label" for="filter-from">from</label>' +
                        '<div class="filter-input">' +
                        '<input type="number" onkeypress="return _.htmlInputNumber(event.charCode)" onkeyup="rangeFiltersFromToLogicFunk()" onclick="rangeFiltersFromToLogicFunk()" min="0" id="filter-from" value="' + rangeFromVal + '"  />' +
                        '</div>' +
                        '</div>' +
                        '<div class="filter-row">' +
                        '<label class="filter-label" for="filter-to">to</label>' +
                        '<div class="filter-input">' +
                        '<input type="number" onkeypress="return _.htmlInputNumber(event.charCode)" onkeyup="rangeFiltersFromToLogicFunk()" onclick="rangeFiltersFromToLogicFunk()" min="0" id="filter-to" value="' + rangeToVal + '"  />' +
                        '</div>' +
                        '</div>';

                    break;
                case filterType.MB_OR_GB_RANGE:
                    var rangeFromVal = columnDef.rangeValues.length > 0 ? columnDef.rangeValues[0] : '';
                    var rangeToVal = columnDef.rangeValues.length > 1 ? columnDef.rangeValues[1] : '';
                    var rangeMBValue = columnDef.rangeTypeMultiplier === 1 ? 'checked' : ' ';
                    var rangeGBValue = columnDef.rangeTypeMultiplier === 1024 ? 'checked' : ' ';
                    filterOptions = '<div class="filter-row">' +
                        '<input class="z-radio" id="range-MB" name="type" type="radio" value="MB" ' + rangeMBValue + ' >MB ' +
                        '<input class="z-radio" name="type" type="radio" id="range-GB" value="GB" ' + rangeGBValue + ' >GB' +
                        '</div>' +
                        '<div class="filter-row">' +
                        '<label class="filter-label" for="filter-from">from</label>' +
                        '<div class="filter-input">' +
                        '<input type="number" class="range-filter-from-mb-gb-class" onkeypress="return _.htmlInputNumber(event.charCode)" onkeyup="rangeFiltersFromToLogicFunk()" onclick="rangeFiltersFromToLogicFunk()" min="0" id="filter-from" value="' + rangeFromVal + '"  />' +
                        '</div>' +
                        '</div>' +
                        '<div class="filter-row">' +
                        '<label class="filter-label" for="filter-to">to</label>' +
                        '<div class="filter-input">' +
                        '<input type="number" class="range-filter-to-mb-gb-class" onkeypress="return _.htmlInputNumber(event.charCode)" onkeyup="rangeFiltersFromToLogicFunk()" onclick="rangeFiltersFromToLogicFunk()" min="0" id="filter-to" value="' + rangeToVal + '"  />' +
                        '</div>' +
                        '</div>';
                    break;
                case filterType.MULTI_SELECT:
                    var filterOptionsTemplate = _.template('<label class="<%=containerClass%>"><input type="<%=type%>" value="<%=value%>" <%=checked%>/><span class="<%=checkboxContainerClass%>"></span><%=filteredItem%></label>');
                    var inlineStyle = _.template('style="width:<%=columnWidth%>px"');
                    var filterFormatterTemplate = _.template('<span class="<%=firstClass%> <%=secondClass%>" title="<%=title%>" <%=style%> > <%=filterItem%> </span>');

                    filterOptions = filterOptionsTemplate({
                        containerClass: 'z-checkbox select-all-span',
                        type: 'checkbox',
                        value: -1,
                        checked: '',
                        checkboxContainerClass: 'z-checkbox-container',
                        optionsClass: 'slick-grid-header-formatter',
                        filteredItem: '(Select All)'
                    });

                    for (var i = 0; i < filterItems.length; i++) {
                        var filtered = _.findIndex(workingFilters, function (wf) {
                            return _.isEqual(wf, filterItems[i]);
                        });

                        var filterFormatter = filterFormatterTemplate({
                            firstClass: 'slick-grid-multi-select-options-ellipsis',
                            secondClass: '',
                            style: inlineStyle({
                                columnWidth: ''
                            }),
                            title: filterItems[i],
                            filterItem: filterItems[i]
                        });

                        if (columnDef.formatter) {
                            var row = rows[i];
                            var optionValue = columnDef.formatter(row, null, filterItems[i], columnDef, grid.getDataItem(row));

                            filterFormatter = filterFormatterTemplate({
                                firstClass: 'slick-grid-header-formatter',
                                secondClass: 'slick-grid-multi-select-options-ellipsis',
                                style: inlineStyle({
                                    columnWidth: columnDef.width
                                }),
                                title: _.isHtml(optionValue) ? 'Blank' : optionValue,
                                filterItem: _.isEmpty(optionValue) ? 'Blank' : optionValue
                            });
                        }

                        filterOptions += filterOptionsTemplate({
                            containerClass: 'z-checkbox',
                            type: 'checkbox',
                            value: i,
                            checked: filtered === -1 ? '' : ' checked="checked"',
                            checkboxContainerClass: 'z-checkbox-container',
                            optionsClass: 'slick-grid-header-formatter',
                            filteredItem: filterFormatter
                        });
                    }
                    break;
                case filterType.PERCENTAGE:
                    var inputVal = columnDef.percentageValues.length > 0 ? columnDef.percentageValues[0] : '';
                    filterOptions = "<input type='range' id='percentage' min='0' max='100' value='" + inputVal + "' />";
                    break;
                case filterType.DATE:
                    filterOptions = "<div class='pull-left'><input name='daterange' id='daterange' class='pull-right'  /></div>";
                    break;
            }

            var $filter = $("<div class='slick-header-menu-filter'>")
                .append($(filterOptions))
                .appendTo($menu);

            if (columnDef.filter === filterType.DATE) {
                var dateFromVal = columnDef.dateValues.length > 0 ? columnDef.dateValues[0] : moment();
                var dateToVal = columnDef.dateValues.length > 1 ? columnDef.dateValues[1] : moment();
                $('#daterange').daterangepicker({
                    startDate: dateFromVal,
                    format: 'DD/MM/YYYY',
                    endDate: dateToVal,
                    parentEl: '.slick-header-menu-filter',
                    ranges: {
                        'Today': moment(),
                        'Week': [moment().startOf('week'), moment()],
                        'Month': [moment().startOf('month'), moment()],
                        'Quarter': [moment().startOf('quarter'), moment()],
                        'Year': [moment().startOf('year'), moment()]
                    }
                });
                $('#daterange').on('apply.daterangepicker', function (ev, picker) {
                    workingFilters[0] = picker.startDate._d;
                    workingFilters[1] = picker.endDate._d;
                });
                $('#daterange').on('cancel.daterangepicker', function (ev, picker) {
                    $('#daterange').val('');
                });
                if (columnDef.dateValues.length > 0 && columnDef.dateValues.length > 1) {
                    $('#daterange').val([moment(dateFromVal).format('DD/MM/YYYY'), moment(dateToVal).format('DD/MM/YYYY')].join(' - '));
                }
            }

            var $buttons = $('<div/>', {'class': 'slick-header-menu-buttons btn-group'}).appendTo($menu);

            $('<button/>', {text: 'OK', 'id': 'filter-btn-ok-id', 'class': 'btn btn-default  btn-slick-ok'})
                .appendTo($buttons)
                .bind('click', function (ev) {
                    var flag;
                    switch (columnDef.filter) {
                        case filterType.WILDCARD:
                            columnDef.wildcardValues = workingFilters.splice(0);
                            flag = columnDef.wildcardValues.length > 0 && columnDef.wildcardValues[0].length > 0;
                            setButtonImage($menuButton, flag);
                            setCssStyle($menuButton, flag);
                            break;
                        case filterType.RANGE:
                            columnDef.rangeValues = workingFilters.splice(0);
                            flag = columnDef.rangeValues.length > 1 && (columnDef.rangeValues[0] && columnDef.rangeValues[0].length > 0) &&
                                (columnDef.rangeValues[1] && columnDef.rangeValues[1].length > 0);
                            setButtonImage($menuButton, flag);
                            setCssStyle($menuButton, flag);
                            break;
                        case filterType.MB_OR_GB_RANGE:
                            columnDef.rangeValues = workingFilters.splice(0);
                            columnDef.rangeTypeMultiplier = workingMultiplier;
                            flag = columnDef.rangeValues.length > 1 && (columnDef.rangeValues[0] && columnDef.rangeValues[0].length > 0) &&
                                (columnDef.rangeValues[1] && columnDef.rangeValues[1].length > 0);
                            setButtonImage($menuButton, flag);
                            setCssStyle($menuButton, flag);
                            break;
                        case filterType.MULTI_SELECT:
                            columnDef.filterValues = workingFilters.splice(0);
                            flag = columnDef.filterValues.length > 0;
                            setButtonImage($menuButton, flag);
                            setCssStyle($menuButton, flag);
                            break;
                        case filterType.PERCENTAGE:
                            columnDef.percentageValues = workingFilters.splice(0);
                            flag = columnDef.percentageValues.length > 0 && columnDef.percentageValues[0].length > 0;
                            setButtonImage($menuButton, flag);
                            setCssStyle($menuButton, flag);
                            break;
                        case filterType.DATE:
                            columnDef.dateValues = workingFilters.splice(0);
                            if (_.isDate(columnDef.dateValues[0]) || moment.isMoment(columnDef.dateValues[0])) {
                                flag = columnDef.dateValues.length > 1;
                            } else {
                                flag = columnDef.dateValues.length > 1 && columnDef.dateValues[0].length > 0;
                            }
                            setButtonImage($menuButton, flag);
                            setCssStyle($menuButton, flag);
                            break;
                    }
                    columnDef.isFilterActive = flag;
                    columnDef.isSelected = flag;
                    $menuButton.removeClass('slick-header-menubutton-active');
                    handleApply(ev, columnDef, false);
                });

            $('<button/>', {text: 'Clear', 'class': 'btn btn-link btn-slick-clear'})
                .appendTo($menu)
                .bind('click', function (ev) {
                    if (columnDef.filterValues) {
                        columnDef.filterValues.length = 0;
                    }
                    if (columnDef.rangeValues) {
                        columnDef.rangeValues.length = 0;
                    }
                    if (columnDef.dateValues) {
                        columnDef.dateValues.length = 0;
                    }
                    if (columnDef.wildcardValues) {
                        columnDef.wildcardValues.length = 0;
                    }
                    columnDef.isFilterActive = false;
                    columnDef.isSelected = false;
                    setButtonImage($menuButton, false);
                    setCssStyle($menuButton, false);
                    handleApply(ev, columnDef, true);
                    $menuButton.removeClass('slick-header-menubutton-active');
                });

            $('<button/>', {text: 'Cancel', 'class': 'btn btn-link  btn-slick-cancel'})
                .appendTo($buttons)
                .bind('click', function () {
                    hideMenu();
                    $menuButton.removeClass('slick-header-menubutton-active');
                });

            $(':checkbox', $filter).bind('click', function () {
                workingFilters = changeWorkingFilter(filterItems, workingFilters, $(this));
            });

            $(':text', $filter).bind('change keyup', function () {
                workingFilters[0] = $(this).val();
            });

            $('#filter-from', $filter).bind('change keyup', function () {
                workingFilters[0] = $(this).val();
            });

            $('#filter-to', $filter).bind('change keyup', function () {
                workingFilters[1] = $(this).val();
            });

            $('#range-MB', $filter).bind('change keyup', function () {
                workingMultiplier = 1;
            });

            $('#range-GB', $filter).bind('change keyup', function () {
                workingMultiplier = 1024;
            });

            $('#percentage', $filter).bind('change keyup', function () {
                workingFilters[0] = $(this).val();
            });


            var offset = $(this).offset();
            var left = offset.left - $menu.width() + $(this).width() - 8;

            $menu.css("top", offset.top + $(this).height())
                .css("left", (left > 0 ? left : 0));
        }

        function columnsResized() {
            hideMenu();
        }

        //function that returned current filter items
        function getFilterItem(filterItems) {
            if (filterItems.hasOwnProperty('filtered')) {
                return filterItems.filtered;//if filter is empty
            } else {
                return filterItems.slice(0);//is filter has options
            }
        }

        function changeWorkingFilter(filterItems, workingFilters, $checkbox) {
            var value = $checkbox.val();
            var $filter = $checkbox.parent().parent();

            if ($checkbox.val() < 0) {
                // Select All
                if ($checkbox.prop('checked')) {
                    $(':checkbox', $filter).prop('checked', true);
                    workingFilters = getFilterItem(filterItems);
                } else {
                    $(':checkbox', $filter).prop('checked', false);
                    workingFilters.length = 0;
                }
            } else {
                var index = _.findIndex(workingFilters, function (wf) {
                    return _.isEqual(wf, filterItems[value]);
                });

                if ($checkbox.prop('checked') && index < 0) {
                    workingFilters.push(filterItems[value]);
                }
                else {
                    if (index > -1) {
                        workingFilters.splice(index, 1);
                    }
                }
            }

            return workingFilters;
        }

        function setButtonImage($el, filtered) {
            if (filtered && options.filterImage) {
                var image = "url(" + options.filterImage + ")";
                $el.css("background-image", image);
            }
            if (!filtered && options.buttonImage) {
                var image = "url(" + options.buttonImage + ")";
                $el.css("background-image", image);
            }
        }

        function setCssStyle($el, filtered) {
            if (filtered) {
                $el.removeClass('slick-header-unfiltered').addClass('slick-header-filtered');
            } else {
                $el.removeClass('slick-header-filtered').addClass('slick-header-unfiltered');
            }

        }

        function handleApply(e, columnDef, clear) {
            hideMenu();

            self.onFilterApplied.notify({"grid": grid, "column": columnDef, clear: clear}, e, self);

            e.preventDefault();
            e.stopPropagation();
        }

        function findEquality(seen, value) {
            var found = false;
            var prop = getFilterObj(value).prop;
            _.forEach(seen, function (item) {
                var testValue = value;
                if (prop) {
                    item = item[prop];
                    testValue = value[prop];
                }
                if (_.isEqual(item, testValue)) {
                    found = true;
                }
            });
            return found;
        }

        function getFilterValues(dataView, column) {
            var seen = [];
            var rows = [];

            //boolean case treated differently
            if (typeof dataView.getItem(0) !== 'undefined' && typeof dataView.getItem(0)[column.field] === 'boolean') {
                seen.push(true);
                rows.push(0);

                seen.push(false);
                rows.push(1);

            } else {
                for (var i = 0; i < dataView.getLength(); i++) {
                    var value = dataView.getItem(i)[column.field];

                    if (value !== undefined && !findEquality(seen, value)) {
                        seen.push(value);
                        rows.push(i);
                    }
                }
            }

            return {
                'filtered': seen,
                'rows': rows
            };
        }

        function getAllFilterValues(data, column) {
            var seen = [];
            var rows = [];

            //boolean case treated differently
            if (typeof data[0] !== 'undefined' && typeof data[0][column.field] === 'boolean') {
                seen.push(true);
                rows.push(0);

                seen.push(false);
                rows.push(1);

            } else {
                for (var i = 0; i < data.length; i++) {
                    var value = data[i][column.field];

                    if (value !== undefined && !findEquality(seen, value)) {
                        seen.push(value);
                        rows.push(i);
                    }
                }
            }

            return {
                'filtered': seen,
                'rows': rows
            };
        }

        function handleMenuItemClick(e) {
            var command = $(this).data("command");
            var columnDef = $(this).data("column");

            hideMenu();

            self.onCommand.notify({
                "grid": grid,
                "column": columnDef,
                "command": command
            }, e, self);

            e.preventDefault();
            e.stopPropagation();
        }

        function getFilterObj(value) {
            var prop;
            if (value && value.hasOwnProperty('filterValue')) {
                value = value.filterValue;
                prop = 'filterValue';
            } else if (value && value.hasOwnProperty('value')) {
                value = value.value;
                prop = 'value';
            } else if (value && value.hasOwnProperty('display')) {
                value = value.display;
                prop = 'display';
            }
            return {
                'value': (value !== undefined && value !== null) ? value : '',
                'prop': prop
            };
        }

        function filterFunc(item) {
            var columns = grid.getColumns();

            var value = true,
                fieldValue,
                rangeValues;
            for (var i = 0; i < columns.length; i++) {
                var col = columns[i];
                switch (col.filter) {
                    case filterType.WILDCARD:
                        var wildcardValues = col.wildcardValues;
                        var filterObject = getFilterObj(item[col.field]);
                        fieldValue = filterObject.hasOwnProperty('value') ? filterObject.value : filterObject;
                        if (typeof fieldValue === 'string' && wildcardValues && wildcardValues.length > 0) {
                            fieldValue = fieldValue.toLowerCase();
                            _.forEach(wildcardValues, function (wildCard) {
                                value = value & fieldValue.indexOf(wildCard.toLowerCase()) !== -1;
                            });
                        }
                        break;
                    case filterType.RANGE:
                        rangeValues = col.rangeValues;
                        if (rangeValues && rangeValues.length > 1) {
                            if (_.isNullOrUndefined(rangeValues[0]) || _.isEmpty(rangeValues[0])) {
                                rangeValues[0] = 0;
                            }
                            fieldValue = getFilterObj(item[col.field]).value;
                            value = value & fieldValue >= parseFloat(rangeValues[0]) & fieldValue <= parseFloat(rangeValues[1]);
                        }
                        break;
                    case filterType.MB_OR_GB_RANGE:
                        rangeValues = col.rangeValues;
                        if (rangeValues && rangeValues.length > 1) {
                            fieldValue = getFilterObj(item[col.field]).value;
                            value = value & fieldValue >= (_.floor(parseFloat(rangeValues[0]), 2) * col.rangeTypeMultiplier) & fieldValue <= (_.ceil(parseFloat(rangeValues[1]), 2) * col.rangeTypeMultiplier);
                        }
                        break;
                    case filterType.MULTI_SELECT:
                        var filterValues = col.filterValues;
                        if (filterValues && filterValues.length > 0) {
                            var fieldObj = getFilterObj(item[col.field]);
                            fieldValue = fieldObj.value;
                            var prop = fieldObj.prop;
                            if (prop) {
                                filterValues = _.pluck(filterValues, prop);
                            }
                            value = value & _.contains(filterValues, fieldValue);
                        }

                        break;
                    case filterType.PERCENTAGE:
                        var percentageValues = col.percentageValues;
                        if (percentageValues && percentageValues.length > 0) {
                            value = value & item[col.field] <= percentageValues[0];
                        }
                        break;
                    case filterType.DATE:
                        var dateValues = col.dateValues;
                        if (dateValues && dateValues.length > 1) {
                            fieldValue = getFilterObj(item[col.field]).value;
                            value = value & dateValues[0] <= fieldValue & dateValues[1] >= fieldValue;
                        }
                        break;
                }
            }
            return value;
        }

        $.extend(this, {
            "init": init,
            "destroy": destroy,
            "onFilterApplied": new Slick.Event(),
            "onCommand": new Slick.Event(),
            "filterFunc": filterFunc,
            "filterType": filterType,
            "updateMenuNodes": updateMenuNodes
        });
    }
})(jQuery);
