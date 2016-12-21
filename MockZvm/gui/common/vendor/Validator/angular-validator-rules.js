(function () {
    angular.module('validator.rules', ['validator']).config([
        '$validatorProvider', function ($validatorProvider) {
            $validatorProvider.register('required', {
                invoke: 'watch',
                validator: /.+/,
                error: 'This field is required.'
            });
            $validatorProvider.register('number', {
                invoke: 'watch',
                validator: /^[-+]?[0-9]*[\.]?[0-9]*$/,
                error: 'This field should be the number.'
            });
            $validatorProvider.register('email', {
                invoke: 'blur',
                validator: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                error: 'This field should be the email.'
            });

            //scope not transferred correctly when used in $modal
            $validatorProvider.register('unique', {
                invoke: 'watch',
                validator: function (value, scope, element, attr) {
                    if(angular.isDefined(value)) {
                        return !_.contains(_.invoke(_.map(scope.collection, attr.propertyName), 'toLowerCase'), value.toLowerCase());
                    }else{
                        return true;
                    }
                },
                error: 'this value already exists'
            });

            return $validatorProvider.register('url', {
                invoke: 'blur',
                validator: /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/,
                error: 'This field should be the url.'
            });
        }
    ]);

}).call(this);