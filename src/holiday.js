'use strict';

const _ = require('lodash');
const axios = require('axios');
const popupS = require('popups');
const moments = require('./core/moment');
const res = require('./resource/resource');
const key = require('./resource/key');


const filteredEventList = ['식목일', '어버이날', '스승의날', '제헌절', '국군의날', '크리스마스 이브', '섣달 그믐날', '*올림픽']
const filteredEventKeyword = '림픽'



// Google 공휴일 캘린더 REST API 정보
const GoogleCalendar = async (year = moments().get('year')) => {
    let googleKey;
    await key.getGCalendarKey().then((data) => {
        googleKey = data.key
    });
    return `https://clients6.google.com/calendar/v3/calendars/
    ko.south_korea%23holiday@group.v.calendar.google.com/
    events?calendarId=ko.south_korea%23holiday%40group.v.calendar.google.com&FsingleEvents=true&timeZone=Asia%2FSeoul
    &maxAttendees=1&maxResults=250&sanitizeHtml=true&timeMin=${year - 2}-01-01T00%3A00%3A00%2B09%3A00&timeMax=${year + 3}-01-01T00%3A00%3A00%2B09%3A00&key=${googleKey}`;
}

// Google 공휴일 캘린더 조회
const restGoogleEvent = async () => {
    try {
        let result = await axios.get(await GoogleCalendar())
        return result.data.items
    } catch (error) {
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

    await res.writeJsonData('google.json', holidayList);
    return holidayList;
};

const getHolidayList = async () => {
    let googleHolidayList = await getHolidayListFromGoogle();
    let defaultHolidayList = [];
    defaultHolidayList = await res.readJsonData('default.json');
    let holidayList = defaultHolidayList.concat(googleHolidayList);
    return _.uniqBy(holidayList, 'eventDate');
};

const fetchHolidayList = async () => {
    let holidayList
    const holidayFile = 'holiday.json';
    if (await res.isJsonFileExist(holidayFile)) {
        holidayList = await res.readJsonData(holidayFile);
    } else {
        if(key.isKeyFileExist()){
            holidayList = await getHolidayList();
            await res.writeJsonData(holidayFile, holidayList);    
        }else{
        // 파일 없을 시, Google Key 세팅 오류 발생 필요
        popupS.alert({
            content: 'Hello World!'
        });
        }
    }
    return holidayList;
}

module.exports = fetchHolidayList;