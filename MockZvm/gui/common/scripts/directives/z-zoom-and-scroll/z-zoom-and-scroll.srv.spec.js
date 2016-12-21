describe('zScrollAndZoomHelperService', function () {
    var service;

    beforeEach(module('zvmTest'));

    beforeEach(inject(function (_zScrollAndZoomHelperService_) {
        service = _zScrollAndZoomHelperService_;

        service.setContainer = function () {
            service.zoomContainer = {
                scrollTop: function (value) {
                    return 0 + value ? value : 0;
                }
            }
        };

        spyOn(service, 'checkScrolls').and.callThrough();
    }));


    it('should zoom in', function () {
        service.zoomIn();
        expect(service.checkScrolls).toHaveBeenCalled();
        expect(service.zoomIndex).toBe(1);
    });


    it('should zoom in', function () {
        service.zoomOut();
        expect(service.checkScrolls).toHaveBeenCalled();
        expect(service.zoomIndex).toBe(-1);
    });

    it('it should reset zoom', function () {
        service.zoomReset();
        expect(service.checkScrolls).toHaveBeenCalled();
        expect(service.zoomIndex).toBe(0);
    });

    it('should return zoom value', function () {
        service.zoomIndex = 4;
        expect(service.getZoomValue()).toBe(0.6)
    });


});
