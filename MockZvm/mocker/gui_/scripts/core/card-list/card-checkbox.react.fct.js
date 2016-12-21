(function (React) {
    'use strict';
angular.module('zvmApp.components')
    .constant('cardCheckboxConstants', {
        DISPLAY_NAME: 'CardCheckBoxComponent',
        ID_PREFIX: 'card-checkbox',
        CHECKBOX_CLASS: 'vpgs-cards-component__card-title-checkbox'
    })
    .factory('CardCheckBoxComponentFactory', function (cardListComponentService,cardCheckboxConstants) {

        return React.createClass({
            displayName: cardCheckboxConstants.DISPLAY_NAME,
            getInitialState: function () {
                return {checked: checkVpgSelected(this.props.item)};
            },
            onChange: function () {
                var state = !this.state.checked;
                this.setState({checked: state});
                this.props.toggleCheckbox(this.props.item, state);
            },
            componentWillReceiveProps: function (nextProps) {
                this.setState({checked: checkVpgSelected(nextProps.item)});
            },
            render: function () {
                return React.createElement('input', {
                    id: cardCheckboxConstants.ID_PREFIX + this.props.item.id,
                    type: 'checkbox',
                    checked: this.state.checked,
                    value: this.props.item.id,
                    onChange: this.onChange.bind(this, this.props.item)
                });
            }
        });

        function checkVpgSelected(item) {
            return cardListComponentService.isItemSelected(item.Identifier.GroupGuid);
        }

    });
})(window.React);
