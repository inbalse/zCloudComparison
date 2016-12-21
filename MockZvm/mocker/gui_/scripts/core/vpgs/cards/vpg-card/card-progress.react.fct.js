(function (React) {

    'use strict';
    angular.module('zvmApp.components')
        .constant('vpgCardProgressConstants', {
            DISPLAY_NAME: 'VPGCardProgressComponent',
            OPERATION_CLASS: 'vpgs-cards-component__card-operation',
            PROGRESS_SPAN_CONTAINER_CLASS: 'vpgs-cards-progress-span-container',
            BUTTONS_CLASS: 'vpgs-cards-component__buttons',
            PROGRESS_CONTAINER_CLASS: 'vpgs-cards-component__progress-container',
            PROGRESS_COUNTER_CLASS: 'vpgs-cards-component__progress-counter',
            PROGRESS_CLASS: 'vpgs-cards-component__progress',
            BUTTON_CLASS: 'vpgs-cards-component__button',
            ROLE: 'progressBar'
        })
        .factory('VPGCardProgressComponentFactory', function (vpgCardProgressConstants) {
                return React.createClass({
                    displayName: vpgCardProgressConstants.DISPLAY_NAME,
                    onClick: function (action) {
                        this.props.onActionClick(action);
                    },
                    render: function () {
                        var progress = this.props.progress;

                        if (_.isNullOrUndefined(progress)) {
                            return null;
                        }

                        var that = this,
                            buttonExist = !_.isEmpty(progress.buttons);
                        return React.createElement('div', {className: vpgCardProgressConstants.OPERATION_CLASS},
                            React.createElement('div', {className: vpgCardProgressConstants.PROGRESS_SPAN_CONTAINER_CLASS},
                                React.createElement('div', {
                                    className: progress.label.css,
                                    title: progress.label.title
                                }, progress.label.display)
                            ),
                            progress.value && React.createElement('div', {className: vpgCardProgressConstants.PROGRESS_CONTAINER_CLASS},
                                React.createElement('span', {className: vpgCardProgressConstants.PROGRESS_COUNTER_CLASS},
                                    progress.value.now + '%'
                                ),
                                React.createElement('div', {className: vpgCardProgressConstants.PROGRESS_CLASS},
                                    React.createElement('div', {
                                        className: progress.value.css,
                                        role: vpgCardProgressConstants.ROLE,
                                        'aria-valuemin': 0,
                                        'aria-valuemax': 100,
                                        'aria-valuenow': progress.value.now,
                                        style: {width: progress.value.width}
                                    })
                                )
                            ),
                            buttonExist && React.createElement('div', {className: vpgCardProgressConstants.BUTTONS_CLASS},
                                progress.buttons.map(function (button, i) {
                                    return React.createElement('div', {
                                        key: i,
                                        title: button.title,
                                        className: vpgCardProgressConstants.BUTTON_CLASS + ' ' + vpgCardProgressConstants.BUTTON_CLASS +
                                        '--' + button.css,
                                        onClick: that.onClick.bind(that, button.action)
                                    }, button.showText && button.title);
                                })
                            )
                        );

                    },
                    onActionClick: function (action) {
                        this.props.onActionClick(action);
                    }
                });
            }
        );
})(window.React);
