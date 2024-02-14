

export function getLocalDate(dayOfTheWeek?: number, monthIndex?: number) {
   const monthes = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
   const days = ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'];
   const shortDays = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'];

   const date = new Date();

   const today = {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
      dayName: days[date.getDay()],
      dayNumberInWeek: date.getDay(),
   }

   return {
      today,
      isWorkDayTomorrow: function() {
         switch (this.getFutureDate(1).dayNumberInWeek) {
            case 0: return false;
            case 1: return true;
            case 2: return true;
            case 3: return true;
            case 4: return true;
            case 5: return true;
            case 6: return false;
            default: return false;
         }
      },
      getFutureDate: function(amountFutureDays: number) {
         const today = new Date();
         const tomorrow = new Date(today.getTime() + (amountFutureDays * 24 * 60 * 60 * 1000));
         const tomorrowDate = {
            year: tomorrow.getFullYear(),
            month: tomorrow.getMonth() + 1,
            day: tomorrow.getDate(),
            dayName: days[tomorrow.getDay()],
            dayShortName: shortDays[tomorrow.getDay()],
            dayNumberInWeek: tomorrow.getDay(),
         }
         return tomorrowDate;
      },
      dayShortName: function() {
         if (dayOfTheWeek) {
            return shortDays[dayOfTheWeek];
         } else {
            return shortDays[date.getDay()];
         }
      },
      monthName: function() {
         if (monthIndex !== undefined) {
            return monthes[monthIndex];
         } else {
            return monthes[date.getMonth()];
         }
      },
      daysUntilMonday: function() {
         switch (+this.today.dayNumberInWeek) {
            case 0: return 1;
            case 1: return 7;
            case 2: return 6;
            case 3: return 5;
            case 4: return 4;
            case 5: return 3;
            case 6: return 2;
            default: return 0;
         }
      },
   }
}