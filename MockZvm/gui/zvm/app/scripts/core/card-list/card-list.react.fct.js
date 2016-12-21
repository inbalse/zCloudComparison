(function (React) {
    'use strict';
    angular.module('zvmApp.components')
        .factory('CardListComponentFactory', function ($injector, dataSortService, cardListComponentService, CardRowComponentFactory, GroupHeaderComponentFactory,
                                                       cardListConstants, zNotificationConstant, zNotificationService) {
            return React.createClass({
                displayName: cardListConstants.DISPLAY_NAME,
                propTypes: {
                    items: React.PropTypes.array.isRequired,
                    cardType: React.PropTypes.string.isRequired,
                    onActionClick: React.PropTypes.func.isRequired,
                    onSelectedItemsChange: React.PropTypes.func.isRequired,
                    selectedItems: React.PropTypes.array.isRequired,
                    groupBy: React.PropTypes.object.isRequired,
                    search: React.PropTypes.object.isRequired,
                    filters: React.PropTypes.array.isRequired,
                    sort: React.PropTypes.object.isRequired
                },
                onActionClick: function (item, action) {
                    this.props.onActionClick(item, action);
                },
                toggleCollapseGroup: function (header) {
                    var collapsedGroups = this.state.collapsedGroups,
                        headerObj = _.find(collapsedGroups, function (i) {
                            return _.isEqual(i.index, header.index);
                        });

                    if (_.isNullOrUndefined(headerObj)) {
                        collapsedGroups.push(header);
                    } else {
                        _.remove(collapsedGroups, function (i) {
                            return _.isEqual(i.index, headerObj.index);
                        });

                    }

                    this.setState({
                        collapsedGroups: collapsedGroups
                    });


                    this.forceRefresh();
                },
                getInitialState: function () {
                    var $container = angular.element(cardListConstants.CONTAINER_SELECTOR),
                        width = $container.width(),
                        cardsPerRow = cardListComponentService.getCardsPerRow($(document).width());

                    return {
                        card: $injector.get(this.props.cardType),
                        columnWidth: width,
                        scrollToIndex: undefined,
                        height: $container.height() - ($(cardListConstants.CARDS_CONTROL_SELECTOR).height() + 24),
                        width: width,
                        cardsPerRow: cardsPerRow,
                        overscanRowsCount: cardListConstants.OVERSCAN_ROW_COUNT,
                        rowHeight: cardListConstants.ROW_HEIGHT,
                        scrollToRow: 0,
                        collapsedGroups: [],
                        view: []
                    };
                },
                componentWillReceiveProps: function (nextProps) {
                    this.handleResize(null, nextProps);
                },
                getDefaultProps: function () {
                    return {
                        items: [],
                        selectedItems: [],
                        search: {
                            term: ''
                        },
                        sort: {
                            sortField: 'Name',
                            sortAsc: true
                        }
                    };
                },
                toggleCheckbox: function (item, isSelected) {
                    if (isSelected) {
                        this.props.selectedItems.push(item);
                        this.props.onSelectedItemsChange();
                        cardListComponentService.addSelectedItem(item.id);
                        return;
                    }

                    _.remove(this.props.selectedItems, function (i) {
                        return _.isEqual(i.id, item.id);
                    });
                    cardListComponentService.removeSelectedItem(item.id);
                    this.props.onSelectedItemsChange();
                },
                render: function () {
                    return React.createElement('div', {
                            className: cardListConstants.SCROLL_CONTAINER_CLASS,
                            ref: cardListConstants.SCROLL_CONTAINER_REF
                        },
                        React.createElement(window.ReactVirtualized.Grid, {
                            ref: cardListConstants.GRID_SCROLL_REF,
                            overscanRowsCount: this.state.overscanRowsCount,
                            cellRenderer: this.rowRenderer,
                            scrollToIndex: this.state.scrollToIndex,
                            columnWidth: this.state.width,
                            columnCount: 1,
                            height: this.state.height,
                            rowHeight: this.getRowHeight,
                            estimatedRowSize: this.state.rowHeight,
                            rowCount: this.state.view.length,
                            width: this.state.width
                        })
                    );
                },
                getRowHeight: function (data) {
                    return cardListComponentService.getRowHeight(this.state.view, data.index, this.state.collapsedGroups, this.state.cardsPerRow);
                },
                toggleScrollPadding: function ($container, containerHeight, rowCount) {
                    if (this.state.rowHeight * rowCount > containerHeight) {
                        $container.addClass(cardListConstants.SCROLL_CLASS);
                    } else {
                        $container.removeClass(cardListConstants.SCROLL_CLASS);
                    }
                },
                handleResize: function (event, nextProps) {
                    //noinspection JSUnresolvedVariable
                    var $container = angular.element(this.refs.Container),
                        width = $container.width(),
                        containerHeight = $(cardListConstants.CONTAINER_SELECTOR).height() - ($(cardListConstants.CARDS_CONTROL_SELECTOR).height() + 24),
                        props = nextProps || this.props,
                        cardsPerRow = cardListComponentService.getCardsPerRow($(document).width()),
                        view = cardListComponentService.getChunks(props.items, cardsPerRow, props.groupBy);

                    this.toggleScrollPadding($container, containerHeight, view.length);

                    if (this.isMounted()) {
                        this.setState({
                            width: width,
                            cardsPerRow: cardsPerRow,
                            view: view,
                            rowCount: view.length,
                            height: containerHeight
                        });


                        this.forceRefresh();
                    }
                },
                componentDidMount: function () {
                    this.resizeDebounce = _.debounce(this.handleResize, 250);
                    this.subscriber = zNotificationService.getSubscriber(zNotificationConstant.CARD_SELECTED_FILTER_CHANGE);
                    this.subscriber.promise.then(null, null, this.resizeDebounce);
                    $(cardListConstants.FILTER_BTN_SELECTOR).on('click', this.resizeDebounce);
                    window.addEventListener('resize', this.resizeDebounce);

                },
                componentWillUnmount: function () {
                    window.removeEventListener('resize', this.resizeDebounce);
                    cardListComponentService.reset();
                    $(cardListConstants.FILTER_BTN_SELECTOR).off('click', this.resizeDebounce);
                    zNotificationService.unSubscribe(this.subscriber, zNotificationConstant.CARD_SELECTED_FILTER_CHANGE);
                    this.subscriber = null;
                },
                rowRenderer: function (data) {
                    var cardsPerRow = this.state.cardsPerRow,
                        rowData = this.state.view[data.rowIndex];

                    if (!_.isArray(rowData)) {
                        return React.createElement(GroupHeaderComponentFactory, {
                            data: rowData,
                            cardsPerRow: cardsPerRow,
                            toggleCheckbox: this.toggleCheckbox,
                            toggleCollapseGroup: this.toggleCollapseGroup,
                            collapsed: _.find(this.state.collapsedGroups, {index: rowData.index})
                        });
                    }

                    var isHidden = _.find(this.state.collapsedGroups, function (group) {
                        return group.collapseRange.from < data.rowIndex && data.rowIndex < group.collapseRange.to;
                    });

                    if (!_.isNullOrUndefined(isHidden)) {
                        return null;
                    }
                    return React.createElement(CardRowComponentFactory, {
                        cardType: this.state.card,
                        items: rowData,
                        cardsPerRow: cardsPerRow,
                        onActionClick: this.onActionClick,
                        toggleCheckbox: this.toggleCheckbox,
                        classNames: cardListConstants.ROW_CLASS
                    });

                },
                forceRefresh: function () {
                    //noinspection JSUnresolvedVariable
                    if (!this.refs.GridScroll) {
                        return;
                    }
                    //noinspection JSUnresolvedVariable,JSUnresolvedFunction
                    this.refs.GridScroll.recomputeGridSize();
                    //noinspection JSUnresolvedVariable
                    this.refs.GridScroll.forceUpdate();
                    this.forceUpdate();
                }
            });
        });
})(window.React);
