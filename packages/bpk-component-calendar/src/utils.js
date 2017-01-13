import startOfMonth from 'date-fns/start_of_month';
import endOfMonth from 'date-fns/end_of_month';
import startOfWeek from 'date-fns/start_of_week';
import lastDayOfWeek from 'date-fns/last_day_of_week';
import startOfToday from 'date-fns/start_of_today';
import eachDay from 'date-fns/each_day';
import getDay from 'date-fns/get_day';

import isWithinRange from 'date-fns/is_within_range';
import isToday from 'date-fns/is_today';
import isSaturday from 'date-fns/is_saturday';
import isSunday from 'date-fns/is_sunday';
import isSameDay from 'date-fns/is_same_day';
import isSameMonth from 'date-fns/is_same_month';

import addDays from 'date-fns/add_days';
import addWeeks from 'date-fns/add_weeks';
import addMonths from 'date-fns/add_months';
import addYears from 'date-fns/add_years';

import parse from 'date-fns/parse';
import format from 'date-fns/format';

function getCalendarMonthWeeks(month, weekStartsOn) {
  const baseDate = new Date(month);
  const firstOfMonth = startOfMonth(baseDate);

  let currentDay = startOfWeek(firstOfMonth, { weekStartsOn });
  const weeksInMonth = [];

  for (let i = 0; i < 6; i += 1) {
    const currentWeek = eachDay(currentDay, lastDayOfWeek(currentDay, { weekStartsOn }));
    weeksInMonth.push(currentWeek);
    currentDay = addWeeks(currentDay, 1);
  }

  return weeksInMonth;
}

/* Takes arbitrary dates and returns the beginning of the first and enf of the last month containing these dates  */
function getMonthRange(from, to) {
  return {
    min: startOfMonth(from),
    max: endOfMonth(to),
  };
}

function getMonthsInRange(from, to) {
  const { min, max } = getMonthRange(from, to);
  let currentMonth = startOfMonth(from);
  const monthsInRange = [];

  while (isWithinRange(currentMonth, min, max)) {
    monthsInRange.push(currentMonth);
    currentMonth = addMonths(currentMonth, 1);
  }

  return monthsInRange;
}

const isDisabled = day => !isWithinRange(day, startOfToday(), addYears(startOfToday(), 1));
const parseIsoDate = parse;
const formatIso = date => format(date);
const formatIsoDate = date => format(date, 'YYYY-MM-DD');
const formatIsoMonth = date => format(date, 'YYYY-MM');
const formatHumanDate = date => format(date, 'dddd, Do MMMM YYYY');

export {
  getCalendarMonthWeeks,
  getMonthsInRange,
  getMonthRange,
  getDay,
  isWithinRange,
  isSaturday,
  isSunday,
  isToday,
  isSameDay,
  isSameMonth,
  isDisabled,
  addMonths,
  addDays,
  startOfMonth,
  startOfToday,
  formatIso,
  formatIsoDate,
  formatIsoMonth,
  formatHumanDate,
  parseIsoDate,
};