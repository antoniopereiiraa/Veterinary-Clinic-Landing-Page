export const BUSINESS_HOURS = {
  weekday: {
    start: '08:00',
    end: '19:00'
  },
  saturday: {
    start: '08:00',
    end: '14:00'
  }
};

export function isWithinBusinessHours(date: string, time: string): { isValid: boolean; message?: string } {
  const selectedDate = new Date(date);
  const dayOfWeek = selectedDate.getDay();
  const [hours, minutes] = time.split(':').map(Number);
  const selectedTime = hours * 60 + minutes;

  // Sunday (0)
  if (dayOfWeek === 0) {
    return {
      isValid: false,
      message: 'A clínica está fechada aos domingos.'
    };
  }

  // Saturday (6)
  if (dayOfWeek === 6) {
    const [startHours, startMinutes] = BUSINESS_HOURS.saturday.start.split(':').map(Number);
    const [endHours, endMinutes] = BUSINESS_HOURS.saturday.end.split(':').map(Number);
    const startTime = startHours * 60 + startMinutes;
    const endTime = endHours * 60 + endMinutes;

    if (selectedTime < startTime || selectedTime > endTime) {
      return {
        isValid: false,
        message: `Aos sábados, a clínica funciona das ${BUSINESS_HOURS.saturday.start} às ${BUSINESS_HOURS.saturday.end}.`
      };
    }
  }

  // Weekdays (1-5)
  if (dayOfWeek >= 1 && dayOfWeek <= 5) {
    const [startHours, startMinutes] = BUSINESS_HOURS.weekday.start.split(':').map(Number);
    const [endHours, endMinutes] = BUSINESS_HOURS.weekday.end.split(':').map(Number);
    const startTime = startHours * 60 + startMinutes;
    const endTime = endHours * 60 + endMinutes;

    if (selectedTime < startTime || selectedTime > endTime) {
      return {
        isValid: false,
        message: `De segunda a sexta, a clínica funciona das ${BUSINESS_HOURS.weekday.start} às ${BUSINESS_HOURS.weekday.end}.`
      };
    }
  }

  return { isValid: true };
}