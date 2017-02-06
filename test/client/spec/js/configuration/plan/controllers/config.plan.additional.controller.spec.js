(function () {
    'use strict';

    describe('PlanAdditionalCtrl', function () {
        var scope,
            ConfigService,
            FileUploader,
            NewsFeed,
            Interest,
            Insight,
            controller,
            cachedConfig = {
                planAdditional: {
                    newsFeed: {
                        display: {
                            label: 'No. of items to display in Feed',
                            limit: 5
                        },
                        list: [
                            {
                                header: {
                                    label: 'Feed Header',
                                    type: 'text',
                                    placeholder: 'Feed Header',
                                    value: 'Feed Header Sample'
                                },
                                link: {
                                    label: 'Feed Link',
                                    type: 'text',
                                    placeholder: 'Feed Link',
                                    value: 'Feed Link Sample'
                                },
                                image: {
                                    label: 'Feed Image',
                                    type: 'image',
                                    placeholder: 'Feed Image',
                                    value: 'Feed Image Sample',
                                    src: ''
                                }
                            }
                        ]
                    },
                    interest: {
                        list: [
                            {
                                header: {
                                    label: 'Header',
                                    type: 'text',
                                    placeholder: 'Interest Header',
                                    value: 'Sample Interest Header'
                                },
                                description: {
                                    label: 'Description',
                                    type: 'text',
                                    placeholder: 'Interest Description',
                                    value: 'Sample Interest Description'
                                },
                                image: {
                                    label: 'Image',
                                    type: 'image',
                                    placeholder: 'Interest Image',
                                    value: 'Sample Interest Image',
                                    src: ''
                                }
                            }
                        ]
                    },
                    insight: {
                        display: {
                            label: 'No. of items to display in Feed',
                            limit: 5
                        },
                        list: [
                            {
                                header: {
                                    label: 'Insight Section Header',
                                    type: 'text',
                                    placeholder: 'Insight Header',
                                    value: 'Sample Insight Header'
                                },
                                url: {
                                    label: 'URL/API',
                                    type: 'text',
                                    placeholder: 'Insight URL/API',
                                    value: 'Sample Insight URL'
                                }
                            }
                        ]
                    }
                }
            };

        beforeEach(angular.mock.module('bcsba-shell.configuration.plan.factories.newsFeedFactory'));
        beforeEach(angular.mock.module('bcsba-shell.configuration.plan.factories.interestFactory'));
        beforeEach(angular.mock.module('bcsba-shell.configuration.plan.factories.insightFactory'));
        beforeEach(angular.mock.module('bcsba-shell.configuration.plan.controllers.planAdditionalController'));

        beforeEach(inject(function ($rootScope, _NewsFeed_, _Interest_, _Insight_, $controller) {
            scope = $rootScope.$new();

            ConfigService = {
                getCachedConfig: jasmine.createSpy().and.returnValue(cachedConfig)
            };

            FileUploader = {
                uploadFile: jasmine.createSpy()
            };

            NewsFeed = _NewsFeed_;
            Interest = _Interest_;
            Insight = _Insight_;
            controller = $controller('PlanAdditionalCtrl', {
                $scope: scope,
                ConfigService: ConfigService,
                FileUploader: FileUploader,
                NewsFeed: NewsFeed,
                Interest: Interest,
                Insight: Insight,
            });
        }));

        it('should initialize the controller accordingly', function () {
            expect(controller.rootConfig).toBeDefined();
            expect(controller.planAdditional).toEqual(cachedConfig.planAdditional);
        });

        it('should initialize the News Feed', function () {
            expect(controller.selectedNewsFeed).toEqual(cachedConfig.planAdditional.newsFeed.list[0]);
        });

        it('should initialize the Interest', function () {
            expect(controller.selectedInterest).toEqual(cachedConfig.planAdditional.interest.list[0]);
        });

        it('should initialize the Insight', function () {
            expect(controller.selectedInsight).toEqual(cachedConfig.planAdditional.insight.list[0]);
        });

        it('addNewsFeed: should add a new News Feed to list and make that selected for edit', function () {
            controller.addNewsFeed();
            expect(controller.planAdditional.newsFeed.list.length).toBe(2);
            expect(controller.selectedNewsFeed).toEqual(new NewsFeed());

            controller.deleteNewsFeed();
        });

        it('deleteNewsFeed: should delete the selected News Feed and reinitialize the selected', function () {
            controller.deleteNewsFeed();

            expect(controller.planAdditional.newsFeed.list.length).toBe(0);
            expect(controller.selectedNewsFeed).toBeUndefined();
        });

        it('addInterest: should add a new Interest to list and make that selected for edit', function () {
            controller.addInterest();

            expect(controller.planAdditional.interest.list.length).toBe(2);
            expect(controller.selectedInterest).toEqual(new Interest());

            controller.deleteInterest();
        });

        it('deleteInterest: should delete the selected Interest and reinitialize the selected', function () {
            controller.deleteInterest();

            expect(controller.planAdditional.interest.list.length).toBe(0);
            expect(controller.selectedInterest).toBeUndefined();
        });

        it('addInsight: should add a new Insight to list and make that selected for edit', function () {
            controller.addInsight();

            expect(controller.planAdditional.insight.list.length).toBe(2);
            expect(controller.selectedInsight).toEqual(new Insight());

            controller.deleteInsight();
        });

        it('deleteInsight: should delete the selected Insight and reinitialize the selected', function () {
            controller.deleteInsight();

            expect(controller.planAdditional.insight.list.length).toBe(0);
            expect(controller.selectedInsight).toBeUndefined();
        });
    });
})();
