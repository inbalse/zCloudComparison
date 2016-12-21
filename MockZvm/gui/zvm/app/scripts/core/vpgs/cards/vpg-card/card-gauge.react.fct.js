(function (React) {
    'use strict';
    angular.module('zvmApp.components')
        .factory('VPGCardGaugeComponentFactory', function (vpgCardGaugeConstants, vpgCardDisplayRpoConstants) {
            var canvas = document.createElement('canvas');
            canvas.width = 120;
            canvas.height = 93;
            var ctx = canvas.getContext('2d');
            drawBackground(ctx, 60);

            function drawBackground(ctx, diameterCenter) {

                ctx.beginPath();
                ctx.strokeStyle = vpgCardGaugeConstants.BACKGROUND.COLOR;
                ctx.lineWidth = vpgCardGaugeConstants.CONTAINER.LINE_WIDTH;
                ctx.lineCap = vpgCardGaugeConstants.CONTAINER.LINE_CAP;
                ctx.arc(diameterCenter, diameterCenter,
                    vpgCardGaugeConstants.CONTAINER.RADIUS,
                    _.deg2rad(vpgCardGaugeConstants.BACKGROUND.START_DEGREES), _.deg2rad(vpgCardGaugeConstants.BACKGROUND.END_DEGREES),
                    true);
                ctx.stroke();
            }

            return React.createClass({
                displayName: vpgCardGaugeConstants.DISPLAY_NAME,
                propTypes: {
                    rpo: React.PropTypes.number.isRequired,
                    sla: React.PropTypes.number.isRequired
                },
                componentWillReceiveProps: function (nextProps) {
                    window.cancelAnimationFrame(this.animation);


                    if (nextProps.rpo <= vpgCardDisplayRpoConstants.MIN_RPO || nextProps.rpo >= vpgCardDisplayRpoConstants.MAX_RPO) {
                        this.degrees = vpgCardGaugeConstants.GAUGE.START_DEGREES;
                        this.clearGauge();
                        return;
                    }

                    this.newDegrees = this.calculateDegrees(nextProps.rpo, nextProps.sla);

                    this.animation = window.requestAnimationFrame(this.animate);
                },
                componentDidMount: function () {
                    var ctx = this.refs.bg.getContext('2d');
                    ctx.drawImage(canvas, 0, 0);

                    this.degrees = vpgCardGaugeConstants.GAUGE.START_DEGREES;
                    this.newDegrees = this.calculateDegrees(this.props.rpo, this.props.sla);
                    this.animation = window.requestAnimationFrame(this.animate);
                },
                componentWillUnmount: function () {
                    window.cancelAnimationFrame(this.animation);
                },
                render: function () {
                    return React.createElement('div', {
                            style: {position: 'relative'}
                        },
                        React.createElement('canvas', {
                            style: {position: 'absolute'},
                            ref: vpgCardGaugeConstants.BG_REF,
                            width: vpgCardGaugeConstants.CONTAINER.DIAMETER_WIDTH,
                            height: vpgCardGaugeConstants.CONTAINER.DIAMETER_HEIGHT
                        }),
                        React.createElement('canvas', {
                            style: {position: 'absolute'},
                            ref: vpgCardGaugeConstants.GAUGE_REF,
                            width: vpgCardGaugeConstants.CONTAINER.DIAMETER_WIDTH,
                            height: vpgCardGaugeConstants.CONTAINER.DIAMETER_HEIGHT
                        }),
                        React.createElement('span', {
                            className: vpgCardGaugeConstants.DIVIDER.CLASS
                        })
                    );
                },
                animate: function () {
                    var degrees = this.degrees,
                        newDegrees = this.newDegrees;

                    if (degrees === newDegrees || this.unmount) {
                        return;
                    }
                    this.animation = window.requestAnimationFrame(this.animate);


                    if (degrees < newDegrees) {
                        this.degrees++;
                    }
                    else {
                        this.degrees--;
                    }

                    this.draw();
                },
                draw: function () {
                    if (_.isNullOrUndefined(this.refs.gauge)) {
                        return;
                    }
                    var ctx = this.refs.gauge.getContext('2d'),
                        diameterCenter = vpgCardGaugeConstants.CONTAINER.DIAMETER_WIDTH / 2;

                    //Clear the canvas everytime a chart is drawn
                    ctx.clearRect(0, 0, vpgCardGaugeConstants.CONTAINER.DIAMETER_WIDTH, vpgCardGaugeConstants.CONTAINER.DIAMETER_HEIGHT);

                    // this.drawBackground(ctx, diameterCenter);
                    this.drawGauge(ctx, diameterCenter);
                },
                clearGauge: function () {
                    var ctx = this.refs.gauge.getContext('2d');

                    ctx.clearRect(0, 0, vpgCardGaugeConstants.CONTAINER.DIAMETER_WIDTH, vpgCardGaugeConstants.CONTAINER.DIAMETER_HEIGHT);
                },
                drawGauge: function (ctx, diameterCenter) {
                    ctx.beginPath();
                    ctx.strokeStyle = this.getGaugeColor();
                    ctx.lineWidth = vpgCardGaugeConstants.CONTAINER.LINE_WIDTH;
                    ctx.lineCap = vpgCardGaugeConstants.CONTAINER.LINE_CAP;
                    ctx.arc(diameterCenter, diameterCenter,
                        vpgCardGaugeConstants.CONTAINER.RADIUS,
                        _.deg2rad(vpgCardGaugeConstants.GAUGE.START_DEGREES),
                        _.deg2rad(this.degrees),
                        false);
                    ctx.stroke();
                },
                getGaugeColor: function () {
                    var rpo = this.props.rpo,
                        sla = this.props.sla;

                    if (rpo <= sla) {
                        return vpgCardGaugeConstants.GAUGE.COLOR_MEETING_SLA;
                    } else if (rpo > sla && rpo <= sla * 1.25) {
                        return vpgCardGaugeConstants.GAUGE.COLOR_WARNING;
                    } else {
                        return vpgCardGaugeConstants.GAUGE.COLOR_NOT_MEETING_SLA;
                    }

                },
                calculateDegrees: function (rpo, sla) {
                    if (rpo <= vpgCardDisplayRpoConstants.MIN_RPO || rpo >= vpgCardDisplayRpoConstants.MAX_RPO) {
                        return vpgCardGaugeConstants.GAUGE.START_DEGREES;
                    }

                    var result,
                        maxValue = sla * vpgCardGaugeConstants.GAUGE.SLA_MULTIPLIER,
                        rpoPercentage = rpo / maxValue,
                        quarter = maxValue / vpgCardGaugeConstants.GAUGE.QUARTER;

                    if (rpoPercentage <= vpgCardGaugeConstants.GAUGE.MID_POINTS.Q1) {
                        result = calculateQuarter(0, rpo, quarter, vpgCardGaugeConstants.GAUGE.QUARTER_DEGREES.Q1);
                    } else if (rpoPercentage <= vpgCardGaugeConstants.GAUGE.MID_POINTS.Q2) {
                        result = calculateQuarter(1, rpo, quarter, vpgCardGaugeConstants.GAUGE.QUARTER_DEGREES.Q2);
                    } else if (rpoPercentage <= vpgCardGaugeConstants.GAUGE.MID_POINTS.Q3) {
                        result = calculateQuarter(2, rpo, quarter, vpgCardGaugeConstants.GAUGE.QUARTER_DEGREES.Q3);
                    } else {
                        result = calculateQuarter(3, rpo, quarter, vpgCardGaugeConstants.GAUGE.QUARTER_DEGREES.Q4);
                    }

                    result = vpgCardGaugeConstants.GAUGE.START_DEGREES + result;

                    if (result < vpgCardGaugeConstants.GAUGE.MIN_DEGREES) {
                        result = vpgCardGaugeConstants.GAUGE.MIN_DEGREES;
                    }

                    if (result > vpgCardGaugeConstants.GAUGE.END_DEGREES) {
                        result = vpgCardGaugeConstants.GAUGE.END_DEGREES;
                    }

                    return result;

                    function calculateQuarter(index, rpo, quarter, offset) {
                        var temp, result;

                        switch (index) {
                            case 0:
                                temp = (rpo - quarter * index) / quarter;
                                result = temp * vpgCardGaugeConstants.GAUGE.RANGE.Q1 + offset;
                                break;
                            case 1:
                                temp = (rpo - quarter * index) / quarter;
                                result = temp * vpgCardGaugeConstants.GAUGE.RANGE.Q2 + offset;
                                break;
                            case 2:
                                temp = (rpo - quarter * index) / (quarter / 2);
                                result = temp * vpgCardGaugeConstants.GAUGE.RANGE.Q3 + offset;
                                break;
                            case 3:
                                temp = (rpo - (quarter * index - (quarter / 2))) / (quarter * 1.5);
                                result = temp * vpgCardGaugeConstants.GAUGE.RANGE.Q4 + offset;
                                break;

                        }

                        return Math.round(result);
                    }

                }
            });
        });
})(window.React);
