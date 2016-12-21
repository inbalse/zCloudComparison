'use strict';

angular.module('zvmApp.core')
    .factory('vpgSitesSvgFactory', function ($timeout, $translate, enums, vpgSitesModel, zScrollAndZoomHelperService, vpgSitesTooltipFactory) {
        var vpgSitesSvgFactory = {};
        var control = {};
        control.options = {
            minHeight: 130,
            scrollbarWidth: 17,
            initialOffset: 8,
            strokeWidth: 2,
            hostRadius: 26,
            siteRadius: 35,
            maxHostWidth: 130,
            tooltipWidth: 180,
            siteClass: 'vpg-sites-svg__site',
            nodeClass: 'vpg-sites-svg__node',
            linkClass: 'vpg-sites-svg__link',
            rectWidth: 238,
            rectHeight: 27,
            nodeHovered: 'vpg-sites-svg__node vpg-sites-svg__node--hover',
            nodeActive: 'vpg-sites-svg__node vpg-sites-svg__node--active',
            linkHovered: 'vpg-sites-svg__link vpg-sites-svg__link--hover',
            linkActive: 'vpg-sites-svg__link vpg-sites-svg__link--active',
            vmGap: 35,//min vm gap
            hostGap: 80//min host gap
        };

        var options = control.options;
        control.width = options.width;
        control.slot = [];

        vpgSitesSvgFactory.getNodeY = function (control, d) {
            var vmGap = (control.scene / control.totalVms);
            var sourceHostGap = (control.scene / control.totalSources);
            var targetHostGap = (control.scene / control.totalTargets);

            var dY = 0;

            if (d && d.slot === vpgSitesModel.VM) {
                dY = vmGap * d.index - vmGap / 2;
            } else if (d && d.slot === vpgSitesModel.SOURCE) {
                dY = sourceHostGap * d.index - sourceHostGap / 2;
            } else if (d && d.slot === vpgSitesModel.TARGET) {
                dY = targetHostGap * d.index - targetHostGap / 2;
            } else if (angular.isUndefined(d)) {
                return control.options.siteRadius + control.options.strokeWidth + 20;
            }
            return dY + 15;


        };

        vpgSitesSvgFactory.getLinkSourceX = function (d) {
            var initialX1 = control.slot[d.source.type];

            if (initialX1 === control.slot[vpgSitesModel.SOURCE_SITE]) {
                return initialX1 + control.options.siteRadius;
            }
            if (initialX1 === control.slot[vpgSitesModel.SOURCE]) {
                return initialX1 + control.options.hostRadius;
            }
            if (initialX1 === control.slot[vpgSitesModel.VM]) {
                return initialX1 + (control.options.rectWidth / 2);
            }

            return initialX1;
        };

        vpgSitesSvgFactory.getLinkTargetX = function (d) {
            var initialX2 = control.slot[d.target.type];

            if (initialX2 === control.slot[vpgSitesModel.TARGET_SITE]) {
                return initialX2 - control.options.siteRadius;
            }
            if (initialX2 === control.slot[vpgSitesModel.VM]) {
                return initialX2 - (control.options.rectWidth / 2);
            }
            if (initialX2 === control.slot[vpgSitesModel.TARGET]) {
                return initialX2 - control.options.hostRadius;
            }

            return initialX2;
        };

        vpgSitesSvgFactory.getHostStyle = function (d) {
            var _style = _.template('fill:url(#<%=dType%>');
            var dType = 'hostImage';
            switch (d.type) {
                case 'orgvDC':
                    dType = 'orgImage';
                    break;
                case 'host':
                    dType = 'hostImage';
                    break;
                case 'ghost':
                    dType = 'ghostImage';
                    break;
                case 'resourcePool':
                    dType = 'rpImage';
                    break;
                default:
                    dType = 'hostImage';
                    break;
            }

            return _style({dType: dType});
        };

        vpgSitesSvgFactory.buildTopologyGraph = function () {
            var svg = control.svg;
            svg.selectAll('.' + control.options.siteClass).remove();
            svg.selectAll('.' + control.options.linkClass).remove();

            vpgSitesSvgFactory.buildLinks(svg);

            vpgSitesSvgFactory.buildNodes(svg);

            vpgSitesSvgFactory.buildSites(svg);
        };

        vpgSitesSvgFactory.buildLinks = function (svg) {
            control.svgLink = svg.selectAll('.' + control.options.linkClass)
                .data(control.links, function (d) {
                    return d.key;
                });

            control.svgLink.enter()
                .append('svg:line').each(function (d) {
                    var that = d3.select(this);

                    that.attr({
                        'class': control.options.linkClass,
                        'data-type': d.alert,
                        x1: vpgSitesSvgFactory.getLinkSourceX(d),
                        y1: vpgSitesSvgFactory.getNodeY(control, _.find(control.nodes, {'key': d.source.key})),
                        x2: vpgSitesSvgFactory.getLinkTargetX(d),
                        y2: vpgSitesSvgFactory.getNodeY(control, _.find(control.nodes, {'key': d.target.key}))
                    });
                });

            // Exit any old links.
            control.svgLink.exit().remove();
        };

        vpgSitesSvgFactory.buildNodes = function (svg) {
            // Update the nodes
            control.svgNode = svg.selectAll('.' + control.options.nodeClass)
                .data(control.nodes, function (d) {
                    return d.key;
                });

            // Enter any new nodes.
            var nodeEnter = control.svgNode.enter()
                .append('svg:g')
                .on('click', vpgSitesSvgFactory.clickNode);

            nodeEnter
                .each(function (d) {
                    var that = d3.select(this);
                    that.attr({
                        'class': control.options.nodeClass,
                        transform: 'translate(' + control.slot[d.slot] + ',' + vpgSitesSvgFactory.getNodeY(control, d) + ')'
                    });

                    if (d.slot === vpgSitesModel.VM) {
                        that.append('svg:rect').each(function () {
                            var rect = d3.select(this);

                            rect.attr({
                                'class': 'vm-container',
                                width: control.options.rectWidth,
                                height: control.options.rectHeight,
                                x: -(control.options.rectWidth / 2),
                                y: -(control.options.rectHeight / 2),
                                style: 'fill:url(#vmImage)'
                            });
                        });
                    }
                    else {
                        //todo: should be support function for style
                        that.append('svg:circle').each(function (d) {
                            var circle = d3.select(this);

                            circle.attr({
                                'class': 'host-container',
                                r: control.options.hostRadius,
                                style: vpgSitesSvgFactory.getHostStyle(d)
                            });
                        });
                    }
                })
                .on('mouseenter', vpgSitesSvgFactory.hoverNode)
                .on('mouseleave', vpgSitesSvgFactory.resetNode);

            nodeEnter.append('svg:text').each(function (d) {
                var text = d3.select(this);
                text.attr({
                    'alignment-baseline': 'middle',
                    'text-anchor': d.slot !== vpgSitesModel.VM ? 'middle' : 'start',
                    y: d.slot !== vpgSitesModel.VM ? (control.options.hostRadius + 15) : 0,
                    x: d.slot === vpgSitesModel.VM ? (30 - control.options.rectWidth / 2) : 0
                });
            })
                .text(function (d) {
                    return d.shortName ? d.shortName : d.name;
                });

            nodeEnter.each(function (d) {
                var that = d3.select(this);
                if (d.slot !== vpgSitesModel.VM && d.alert !== vpgSitesModel.ALERT_TYPE_NONE) {
                    var rectAlert = that.append('svg:rect');
                    rectAlert.attr({
                        width: 14,
                        height: 14,
                        x: control.options.hostRadius / 2,
                        y: -control.options.hostRadius,
                        'class': 'alert-container'
                    });

                    if (d.alert === vpgSitesModel.ALERT_TYPE_WARNING) {
                        rectAlert.attr('style', 'fill:url(#warningImage)');
                    }
                    if (d.alert === vpgSitesModel.ALERT_TYPE_ERROR) {
                        rectAlert.attr('style', 'fill:url(#errorImage)');
                    }
                }
            });

            // Exit any old nodes.
            control.svgNode.exit().remove();
        };

        vpgSitesSvgFactory.clickNode = function (selectedNode) {
            var isActive = selectedNode.isActive;
            control.svgLink.each(function (d) {
                d.isActive = false;
                d3.select(this).attr('class', control.options.linkClass);
            });
            control.svgNode.each(function (d) {
                d.isActive = false;
                d3.select(this).attr('class', control.options.nodeClass);
            });

            selectedNode.isActive = !isActive;

            var relatedLinks = control.svgLink.filter(function (d) {
                if (selectedNode.slot === vpgSitesModel.VM) {
                    return d.source.key === selectedNode.key || d.target.key === selectedNode.key;
                } else if (selectedNode.slot === vpgSitesModel.SOURCE) {
                    return d.source.key === selectedNode.key;
                } else if (selectedNode.slot === vpgSitesModel.TARGET) {
                    return d.target.key === selectedNode.key;
                }
            });

            relatedLinks.each(function (d) {
                if (d.source.key === selectedNode.key || d.target.key === selectedNode.key) {
                    d.isActive = selectedNode.isActive;
                    d3.select(this).attr('class', selectedNode.isActive ? control.options.linkActive : control.options.linkHovered);

                    control.svgNode.filter(function (n) {
                        var flag = n.key === d.source.key || n.key === d.target.key;
                        if (flag) {
                            n.isActive = selectedNode.isActive;
                        }
                        return flag;
                    }).attr('class', selectedNode.isActive ? control.options.nodeActive : control.options.nodeHovered);
                }
            });


        };

        vpgSitesSvgFactory.hoverNode = function (selectedNode) {
            var position = angular.copy($(this).offset());
            vpgSitesTooltipFactory.adjustPosition(selectedNode.slot, control, position);
            vpgSitesTooltipFactory.show(selectedNode, position);
            control.scope.$apply();

            var relatedLinks = control.svgLink.filter(function (d) {
                return d.source.key === selectedNode.key || d.target.key === selectedNode.key;
            }).attr('class', function (d) {
                return d.isActive ? control.options.linkActive : control.options.linkHovered;
            });

            relatedLinks.each(function (link) {
                control.svgNode.filter(function (d) {
                    return d.key === link.source.key || d.key === link.target.key;
                }).attr('class', function (d) {
                    return d.isActive ? control.options.nodeActive : control.options.nodeHovered;
                });
            });
        };

        vpgSitesSvgFactory.resetNode = function () {
            vpgSitesTooltipFactory.hide(control.scope);

            control.svgNode.attr('class', function (d) {
                return d.isActive ? control.options.nodeActive : control.options.nodeClass;
            });

            control.svgLink.attr('class', function (d) {
                return d.isActive ? control.options.linkActive : control.options.linkClass;
            });
        };

        vpgSitesSvgFactory.createSiteNode = function (svg, site, slot) {
            site.slot = slot;
            var fill = 'fill:url(#';

            switch (site.type) {
                case 0:
                    fill += 'siteVcImage';
                    break;
                case 1:
                    fill += 'siteVcVappImage';
                    break;
                case 2:
                    fill += 'siteVcdImage';
                    break;
                case 3:
                    fill += 'sitePublicCloudImage';
                    break;
                case 4:
                    fill += 'siteHyperVImage';
                    break;
                case 5:
                    fill += 'siteAzureImage';
                    break;
                default:
                    fill += 'siteVcImage';
                    break;
            }
            fill += ')';

            var siteNode = svg.append('svg:g')
                .attr('class', control.options.siteClass)
                .attr('transform', 'translate(' + control.slot[slot] + ', ' + (control.options.siteRadius + control.options.strokeWidth + 20) + ')')
                .on('mouseenter', function () {
                    var position = angular.copy($(this).offset());
                    vpgSitesTooltipFactory.adjustPosition(slot, control, position);
                    vpgSitesTooltipFactory.show(site, position);
                    control.scope.$apply();
                })
                .on('mouseleave', function () {
                    vpgSitesTooltipFactory.hide(control.scope);
                    control.scope.$apply();
                });

            siteNode.append('svg:circle')
                .attr('r', control.options.siteRadius).attr('style', fill);

            siteNode.append('svg:text')
                .attr('alignment-baseline', 'middle')
                .attr('text-anchor', 'middle')
                .attr('y', control.options.siteRadius + 15)
                .text(site.shortName ? site.shortName : site.name);

            if (site.thisSite) {
                siteNode.append('svg:text')
                    .attr('class', 'site-this')
                    .attr('alignment-baseline', 'middle')
                    .attr('text-anchor', 'middle')
                    .attr('y', control.options.siteRadius + 35)
                    .text($translate.instant('VPG_DETAILS.TOPOLOGY.THIS_SITE'));
            }

            if (site.alert !== vpgSitesModel.ALERT_TYPE_NONE) {
                var rectAlert = siteNode.append('svg:rect');
                rectAlert.attr({
                    width: 14,
                    height: 14,
                    x: control.options.siteRadius / 2,
                    y: -control.options.siteRadius
                });
                rectAlert.attr('class', 'alert-container');
                if (site.alert === vpgSitesModel.ALERT_TYPE_WARNING) {
                    rectAlert.attr('style', 'fill:url(#warningImage)');
                }
                if (site.alert === vpgSitesModel.ALERT_TYPE_ERROR) {
                    rectAlert.attr('style', 'fill:url(#errorImage)');
                }
            }


        };

        vpgSitesSvgFactory.buildSites = function (svg) {
            if (control.sites.source) {
                vpgSitesSvgFactory.createSiteNode(svg, control.sites.source, vpgSitesModel.SOURCE_SITE);
            }

            if (control.sites.target) {
                vpgSitesSvgFactory.createSiteNode(svg, control.sites.target, vpgSitesModel.TARGET_SITE);
            }
        };

        vpgSitesSvgFactory.init = function (elem, scope) {
            control.elem = elem;
            control.width = elem.width();
            control.scope = scope;
            vpgSitesModel.get().then(vpgSitesSvgFactory.onInit);
        };

        vpgSitesSvgFactory.onInit = function (data) {
            if (!data) {
                return;
            }
            control.nodes = data.nodes;
            control.links = data.links;
            control.sites = data.sites;

            control.totalVms = data.vmsCount;
            control.totalSources = data.sourcesCount;
            control.totalTargets = data.targetsCount;

            var vmsHeight = control.totalVms * control.options.vmGap;
            var hostsHeight = (control.totalSources > control.totalTargets ? control.totalSources : control.totalTargets) * control.options.hostGap;


            control.scene = hostsHeight > vmsHeight ? hostsHeight + control.options.hostGap : vmsHeight + control.options.vmGap;
            control.height = control.scene + 50;
            control.svg = d3.select('svg', '.vpg-sites-svg').attr('width', control.width).attr('height', control.height);
            control.slot = [
                control.width * 0.07,
                control.width * 0.2,
                control.width * 0.5,
                control.width * 0.8,
                control.width * 0.93
            ];

            vpgSitesSvgFactory.buildTopologyGraph();
        };

        vpgSitesSvgFactory.order = function (key) {
            vpgSitesModel.setGroupBy(key);
            vpgSitesSvgFactory.refresh();
        };

        vpgSitesSvgFactory.filter = function (key) {
            vpgSitesModel.filter(key);
            vpgSitesSvgFactory.refresh();
        };

        vpgSitesSvgFactory.refresh = function () {
            vpgSitesModel.get().then(vpgSitesSvgFactory.onInit);
        };

        vpgSitesSvgFactory.destroy = function () {
            var svg = control.svg;
            svg.selectAll('.' + control.options.siteClass).remove();
            svg.selectAll('.' + control.options.linkClass).remove();
            svg.selectAll('.' + control.options.nodeClass).remove();
        };

        return {
            _self: vpgSitesSvgFactory,
            init: vpgSitesSvgFactory.init,
            refresh: vpgSitesSvgFactory.refresh,
            filter: vpgSitesSvgFactory.filter,
            order: vpgSitesSvgFactory.order,
            destroy: vpgSitesSvgFactory.destroy
        };
    });
