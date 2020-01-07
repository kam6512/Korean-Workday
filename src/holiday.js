'use strict';

const path = require('path');
// const fs = require('fs');
// const fsp = fs.promises;
const _ = require('lodash');
const axios = require('axios');
const moment = require('./moment');
const res = require('./resource');

const filteredEventList = ['식목일', '어버이날', '스승의날', '제헌절', '국군의날', '크리스마스 이브', '섣달 그믐날']
const filteredEventKeyword = '림픽'


// Google 공휴일 캘린더 REST API 정보
const GoogleCalendar = async (year = moment().get('year')) => {
    let link = 'https://clients6.google.com/calendar/v3/calendars/ko.south_korea%23holiday@group.v.calendar.google.com/events?calendarId=ko.south_korea%23holiday%40group.v.calendar.google.com&singleEvents=true&timeZone=Asia%2FSeoul&maxAttendees=1&maxResults=250&sanitizeHtml=true&timeMin=$START$-01-01T00%3A00%3A00%2B09%3A00&timeMax=$END$-01-01T00%3A00%3A00%2B09%3A00&key=$KEY$';
    // let key = 'AIzaSyBNlYH01_9Hc5S1J9vuFmu2nUqBZJNAXxs';
    let key;
    await res.readJsonData('calendarKey.json').then((data) => {
        key = data.key
    });
    return link
        .replace('$START$', year - 2)
        .replace('$END$', year + 3)
        .replace('$KEY$', key)
}

// Google 공휴일 캘린더 조회
const restGoogleEvent = async () => {
    try {
        let result = await axios.get(await GoogleCalendar())
        return result.data.items
    } catch (error) {
        console.error(error)
        return []
    }
}

// Google 공휴일 캘린더 정보 > JSON Data 로 파싱
const getHolidayListFromGoogle = async () => {
    let eventCalendar = await restGoogleEvent();
    let holidayList = eventCalendar.map(function (event) {
        return {
            eventName: event['summary'],
            eventDate: event['start']['date'].replace(/-/gi, '')
        }
    }).filter(({ eventName }) => {
        return !(filteredEventList.includes(eventName) || eventName.includes(filteredEventKeyword))
    });

    const googleCalendar = 'google.json';
    await res.writeJsonData(googleCalendar, holidayList);
    return holidayList;
};

const getHolidayList = async () => {
    let googleHolidayList = await getHolidayListFromGoogle();
    let defaultHolidayList = [];

    const defCalendar = 'default.json';
    defaultHolidayList = await res.readJsonData(defCalendar);
    let holidayList = defaultHolidayList.concat(googleHolidayList);
    return _.uniqBy(holidayList, 'eventDate');
};

const fetchHolidayList = async () => {
    let holidayList
    const holidayFile = 'holiday.json';
    if (await res.isJsonFileExist(holidayFile)) {
        holidayList = await res.readJsonData(holidayFile);
    } else {
        holidayList = await getHolidayList();
        await res.writeJsonData(holidayFile, holidayList);
    }
    return holidayList;
}

module.exports = fetchHolidayList;