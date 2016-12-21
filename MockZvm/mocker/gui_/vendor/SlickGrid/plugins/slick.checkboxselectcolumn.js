(function ($) {
    // register namespace
    $.extend(true, window, {
        "Slick": {
            "CheckboxSelectColumn": CheckboxSelectColumn
        }
    });


    function CheckboxSelectColumn(options) {
        var _grid;
        var _self = this;
        var _handler = new Slick.EventHandler();
        var _selectedRowsLookup = {};
        var _defaults = {
            columnId: "_checkbox_selector",
            cssClass: null,
            headerCssClass:null,
            toolTip: "Select/Deselect All",
            width: 30
        };

        var _options = $.extend(true, {}, _defaults, options);

        function init(grid) {
            _grid = grid;
            _handler
                .subscribe(_grid.onSelectedRowsChanged, handleSelectedRowsChanged)
                .subscribe(_grid.onClick, handleClick)
                .subscribe(_grid.onHeaderClick, handleHeaderClick)
                .subscribe(_grid.onKeyDown, handleKeyDown);
        }

        function destroy() {
            _handler.unsubscribeAll();
        }

        function updateColumnHeader(checked) {
            _grid.updateColumnHeader(_options.columnId, '<label><input type="checkbox" ' + checked + ' hideFocus><span class="pseudo-checkbox"></span></label>', _options.toolTip);
        }

        function handleSelectedRowsChanged(e, args) {
            var selectedRows = _grid.getSelectedRows();
            var lookup = {}, row, i;
            for (i = 0; i < selectedRows.length; i++) {
                row = selectedRows[i];
                lookup[row] = true;
                if (lookup[row] !== _selectedRowsLookup[row]) {
                    _grid.invalidateRow(row);
                    delete _selectedRowsLookup[row];
                }
            }
            for (i in _selectedRowsLookup) {
                _grid.invalidateRow(i);
            }
            _selectedRowsLookup = lookup;
            _grid.render();

            if (selectedRows.length && selectedRows.length === (_grid.getDataLength()-_grid.getData().getGroups().length)) {
                updateColumnHeader('checked');
            } else {
                updateColumnHeader('');
            }
        }

        function handleKeyDown(e, args) {
            if (e.which == 32) {
                if (_grid.getColumns()[args.cell].id === _options.columnId) {
                    // if editing, try to commit
                    if (!_grid.getEditorLock().isActive() || _grid.getEditorLock().commitCurrentEdit()) {
                        if (!_grid.getOptions().multiSelect) {                            toggleSingleRowSelection(args.row);
                        } else {
                            toggleRowSelection(args.row);
                        }
                    }
                    e.preventDefault();
                    e.stopImmediatePropagation();
                }
            }
        }

        function handleClick(e, args) {
            // clicking on a row select checkbox
            //if (!_grid.getOptions().multiSelect) return;
            if (_grid.getColumns()[args.cell].id === _options.columnId) {// && $(e.target).is(":checkbox")) { // removed for whole cell selection
                // if editing, try to commit
                if (_grid.getEditorLock().isActive() && !_grid.getEditorLock().commitCurrentEdit()) {
                    e.preventDefault();
                    e.stopImmediatePropagation();
                    return;
                }

                if (!_grid.getOptions().multiSelect) {
                    toggleSingleRowSelection(args.row);
                } else {
                    toggleRowSelection(args.row);
                }
                e.stopPropagation();
                e.stopImmediatePropagation();
            }
        }

        function toggleRowSelection(row) {
            if (_selectedRowsLookup[row]) {
                _grid.setSelectedRows($.grep(_grid.getSelectedRows(), function (n) {
                    return n != row
                }));
            } else {
                _grid.setSelectedRows(_grid.getSelectedRows().concat(row));
            }
        }

        function toggleSingleRowSelection(row) {
            if (_selectedRowsLookup[row]) {
                _grid.setSelectedRows([]);
            } else {
                _grid.setSelectedRows([row]);
            }
        }

        function handleHeaderClick(e, args) {
            if (!_grid.getOptions().multiSelect) return;
            if (args.column.id == _options.columnId && $(e.target).is(":checkbox")) {
                // if editing, try to commit
                if (_grid.getEditorLock().isActive() && !_grid.getEditorLock().commitCurrentEdit()) {
                    e.preventDefault();
                    e.stopImmediatePropagation();
                    return;
                }

                if ($(e.target).is(":checked")) {
                    var rows = [];
                    for (var i = 0; i < _grid.getDataLength(); i++) {
                        // push only real items, not the group header
                        if (!args.grid.getDataItem(i).__group)
                        {
                            rows.push(i);
                        }
                    }
                    _grid.setSelectedRows(rows);
                    updateColumnHeader('checked');
                } else {
                    _grid.setSelectedRows([]);
                    updateColumnHeader('');
                }
                e.stopPropagation();
                e.stopImmediatePropagation();
            }
        }

        function getColumnDefinition() {
            return {
                id: _options.columnId,
                name: '<label><input type="checkbox" hideFocus><span class="pseudo-checkbox"></span></label>',
                toolTip: _options.toolTip,
                field: "sel",
                width: _options.width,
                resizable: false,
                sortable: false,
                cssClass: _options.cssClass,
                headerCssClass: _options.headerCssClass,
                formatter: checkboxSelectionFormatter,
                hideFromEditColumns: true,
                alwaysShow: true
            };
        }

        function checkboxSelectionFormatter(row, cell, value, columnDef, dataContext) {
            if (dataContext) {

                if(_.isNullOrUndefined(_options.multiSelect) || _options.multiSelect !== false){
                    return _selectedRowsLookup[row]
                        ? '<label><input type="checkbox" checked hideFocus><span class="pseudo-checkbox"></span></label>'
                        : '<label><input type="checkbox" hideFocus><span class="pseudo-checkbox"></span></label>';
                }else{
                    return _selectedRowsLookup[row]
                        ? '<label><input type="checkbox" checked hideFocus><span class="pseudo-checkbox pseudo-radio"></span></label>'
                        : '<label><input type="checkbox" hideFocus><span class="pseudo-checkbox pseudo-radio"></span></label>';
                }
            }
            return null;
        }

        $.extend(this, {
            "init": init,
            "destroy": destroy,

            "getColumnDefinition": getColumnDefinition
        });
    }
})(jQuery);
