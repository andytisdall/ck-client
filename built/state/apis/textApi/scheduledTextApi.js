"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useGetTextRecordsQuery = exports.useDeleteScheduledTextMutation = exports.useGetScheduledTextsQuery = exports.scheduledTextApi = void 0;
var date_fns_tz_1 = require("date-fns-tz");
var api_1 = require("../../api");
exports.scheduledTextApi = api_1.api.injectEndpoints({
    endpoints: function (builder) { return ({
        getScheduledTexts: builder.query({
            query: function () { return ({
                url: '/text/scheduled',
            }); },
            providesTags: ['ScheduledText'],
            transformResponse: function (res) {
                var state = {};
                res.forEach(function (message) {
                    var formattedTime = (0, date_fns_tz_1.format)((0, date_fns_tz_1.utcToZonedTime)(message.dateCreated, 'America/Los_Angeles'), 'M/d/yy hh:mm');
                    var messageKey = formattedTime + message.body;
                    if (state[messageKey]) {
                        state[messageKey].push(message);
                    }
                    else {
                        state[messageKey] = [message];
                    }
                });
                return state;
            },
        }),
        deleteScheduledText: builder.mutation({
            query: function (body) { return ({
                url: '/text/scheduled/delete',
                body: { ids: body },
                method: 'POST',
            }); },
            invalidatesTags: ['ScheduledText'],
        }),
        getTextRecords: builder.query({
            query: function (_a) {
                var startDate = _a.startDate;
                return ({
                    url: '/text/text-records/list/' + startDate,
                });
            },
        }),
    }); },
});
exports.useGetScheduledTextsQuery = exports.scheduledTextApi.useGetScheduledTextsQuery, exports.useDeleteScheduledTextMutation = exports.scheduledTextApi.useDeleteScheduledTextMutation, exports.useGetTextRecordsQuery = exports.scheduledTextApi.useGetTextRecordsQuery;
