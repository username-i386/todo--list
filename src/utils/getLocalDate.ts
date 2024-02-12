

export function getLocalDate(dayOfTheWeek?: number, monthIndex?: number) {
   const date = new Date();
   const monthes = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
   const days = ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'];
   const shortDays = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'];
   return {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
      dayName: days[date.getDay()],
      dayNumberInWeek: date.getDay(),
      dayShortName: function() {
         if (dayOfTheWeek) {
            return shortDays[dayOfTheWeek];
         } else {
            return shortDays[date.getDay()];
         }
      },
      monthName: function () {
         if (monthIndex !== undefined) {
            return monthes[monthIndex];
         } else {
            return monthes[date.getMonth()];
         }
      },
      daysUntilMonday: function() {
         switch (+this.dayNumberInWeek) {
            case 0: return 1;
            case 1: return 7;
            case 2: return 6;
            case 3: return 5;
            case 4: return 4;
            case 5: return 3;
            case 6: return 2;
            default: return 0;
         }
      }
   }
}