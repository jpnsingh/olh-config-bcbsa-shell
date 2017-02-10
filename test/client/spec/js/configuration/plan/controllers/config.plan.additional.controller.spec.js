(function () {
    'use strict';

    describe('PlanAdditionalCtrl', function () {
        var scope,
            q,
            defer,
            _timeout,
            ConfigService,
            FileUploader,
            NewsFeed,
            Insight,
            NotificationService,
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
            },
            testFile = {
                header: {
                    'content-type': 'image/png'
                },
                name: 'testFile'
            },
            testModel = {
                src: ''
            },
            fileUploadResponse = {
                file: {
                    headers: {
                        'content-type': 'image/png'
                    },
                    base64String: 'imageBase64String...'
                }
            };

        beforeEach(angular.mock.module('bcsba-shell.configuration.plan.factories.newsFeedFactory'));
        beforeEach(angular.mock.module('bcsba-shell.configuration.plan.factories.insightFactory'));
        beforeEach(angular.mock.module('bcsba-shell.configuration.plan.controllers.planAdditionalController'));

        beforeEach(inject(function ($rootScope, $q, $timeout, _NewsFeed_, _Insight_, $controller) {
            scope = $rootScope.$new();

            q = $q;
            defer = q.defer();
            _timeout = $timeout;

            ConfigService = {
                getCachedConfig: jasmine.createSpy().and.returnValue(cachedConfig)
            };

            FileUploader = {
                uploadFile: jasmine.createSpy('uploadFile').and.returnValue(defer.promise)
            };

            NewsFeed = _NewsFeed_;
            Insight = _Insight_;
            NotificationService = {
                displayError: jasmine.createSpy(),
                displaySuccess: jasmine.createSpy()
            };
            controller = $controller('PlanAdditionalCtrl', {
                $scope: scope,
                ConfigService: ConfigService,
                FileUploader: FileUploader,
                NewsFeed: NewsFeed,
                Insight: Insight,
                NotificationService: NotificationService
            });
        }));

        it('should initialize the controller accordingly', function () {
            expect(controller.planAdditional).toEqual(cachedConfig.planAdditional);
        });

        it('should initialize the News Feed', function () {
            expect(controller.selectedNewsFeed).toEqual(cachedConfig.planAdditional.newsFeed.list[0]);
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

        describe('uploadFeedImage:', function () {
            it('should not return if no file is passed in', function () {
                controller.uploadFeedImage();

                expect(controller.uploadingFeedImage).not.toBeDefined();
            });

            it('should invoke FileUploader if a file and model is passed in', function () {
                controller.uploadFeedImage(testFile, testModel);

                expect(controller.uploadingFeedImage).toBe(true);
                expect(FileUploader.uploadFile).toHaveBeenCalled();

                defer.resolve(fileUploadResponse);
                _timeout.flush();

                expect(controller.uploadingFeedImage).toBe(false);
                expect(controller.base64FeedImage).toBe('data:image/png;base64,imageBase64String...');
                expect(testModel.src).toBe('data:image/png;base64,imageBase64String...');
            });

            it('should handle the error accordingly when FileUploader promise is rejected', function () {
                controller.uploadFeedImage(testFile, testModel);

                expect(controller.uploadingFeedImage).toBe(true);
                expect(FileUploader.uploadFile).toHaveBeenCalled();

                defer.reject({message: 'Error Uploading file.'});
                _timeout.flush();

                expect(controller.uploadingFeedImage).toBe(false);
                expect(NotificationService.displayError).toHaveBeenCalledWith('Error Uploading file.');
            });
        });
    });
})();
