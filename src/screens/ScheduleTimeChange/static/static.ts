const workTime = {
  start: '10:00',
  end: '19:00',
};

const breaks = [
  {
    start: '13:00',
    end: '14:00',
  },
];

const breakTypeState = {
  label: 'Единый',
  value: 'united',
};

// Стандартный график
export const standardSchedule = {
  weekends: [],
  workTime: workTime,
  breaks: [],
};

// Габкий график
export const flexibleSchedule = {
  data: [
    {
      day: {
        label: 'Понедельник:',
        value: 'mon',
      },
      workTime: workTime,
      breaks: breaks,
    },
    {
      day: {
        label: 'Вторник:',
        value: 'tue',
      },
      workTime: workTime,
      breaks: breaks,
    },
    {
      day: {
        label: 'Среда:',
        value: 'wed',
      },
      workTime: workTime,
      breaks: breaks,
    },
    {
      day: {
        label: 'Четверг:',
        value: 'thu',
      },
      workTime: workTime,
      breaks: breaks,
    },
    {
      day: {
        label: 'Пятница:',
        value: 'fri',
      },
      workTime: workTime,
      breaks: breaks,
    },
    {
      day: {
        label: 'Суббота:',
        value: 'sat',
      },
      workTime: {
        start: null,
        end: null,
      },
      breaks: breaks,
    },
    {
      day: {
        label: 'Воскресенье:',
        value: 'sun',
      },
      workTime: {
        start: null,
        end: null,
      },
      breaks: breaks,
    },
  ],
  breakType: breakTypeState,
  breaks: breaks,
};

// Скользящий график
export const slidingSchedule = {
  startFrom: {
    label: '01.06.2021',
    value: '2022-06-01',
  },
  workdaysCount: 3,
  weekdaysCount: 2,
  data: [
    {
      day: 1,
      workTime: workTime,
      breaks: breaks,
    },
    {
      day: 2,
      workTime: workTime,
      breaks: breaks,
    },
    {
      day: 3,
      workTime: workTime,
      breaks: breaks,
    },
    {
      day: 4,
      workTime: workTime,
      breaks: breaks,
    },
    {
      day: 5,
      workTime: workTime,
      breaks: breaks,
    },
    {
      day: 6,
      workTime: workTime,
      breaks: breaks,
    },
    {
      day: 7,
      workTime: workTime,
      breaks: breaks,
    },
  ],
  breakType: breakTypeState,
  breaks: breaks,
};

export const weekendsList = [
  {
    label: 'Понедельник',
    cut: 'Пн',
    value: 'mon',
  },
  {
    label: 'Вторник',
    cut: 'Вт',
    value: 'tue',
  },
  {
    label: 'Среда',
    cut: 'Ср',
    value: 'wed',
  },
  {
    label: 'Четверг',
    cut: 'Чт',
    value: 'thu',
  },
  {
    label: 'Пятница',
    cut: 'Пт',
    value: 'fri',
  },
  {
    label: 'Суббота',
    cut: 'Сб',
    value: 'sat',
  },
  {
    label: 'Воскресенье',
    cut: 'Вс',
    value: 'sun',
  },
];

export const workScheduleType = [
  {
    label: 'Стандартный',
    value: 'standard',
    description: 'Единое расписание на все дни недели',
  },
  {
    label: 'Гибкий',
    value: 'flexible',
    description: 'Индивидуальное расписание на каждый день недели ',
  },
  {
    label: 'Скользящий',
    value: 'sliding',
    description:
      'Фиксированные интервалы рабочих/нерабочих дней, например, два через два',
  },
];

export const breakType = [
  {
    label: 'Единый',
    value: 'united',
    description: 'Одинаковый перерыв для каждого рабочего дня',
  },
  {
    label: 'Индивидуальный',
    value: 'individual',
    description: 'Индивидуальный перерыв для каждого рабочего дня',
  },
];

export const workdaysCount = ['1', '2', '3', '4', '5', '6', '7'];

export const weekdaysCount = ['1', '2', '3', '4', '5', '6', '7'];

export const TimePickerServices = [
  {
    label: '15 мин',
    value: 15,
  },
  {
    label: '30 мин',
    value: 30,
  },
  {
    label: '45 мин',
    value: 45,
  },
  {
    label: '1 ч.',
    value: 60,
  },
  {
    label: '1 ч. 15 мин',
    value: 75,
  },
  {
    label: '1 ч. 30мин',
    value: 90,
  },
  {
    label: '1 ч. 45 мин',
    value: 105,
  },
  {
    label: '2 ч.',
    value: 120,
  },
  {
    label: '2 ч. 15 мин',
    value: 135,
  },
  {
    label: '2 ч. 30 мин',
    value: 150,
  },
  {
    label: '2 ч. 45 мин',
    value: 165,
  },
  {
    label: '3 ч.',
    value: 180,
  },
];

export const TimePickerCancelAppointment = [
  {
    label: '0 ч.',
    value: 0,
  },
  {
    label: '1 ч.',
    value: 60,
  },
  {
    label: '2 ч.',
    value: 120,
  },
  {
    label: '4 ч.',
    value: 240,
  },
  {
    label: '8 ч.',
    value: 480,
  },
  {
    label: '1 день',
    value: 1440,
  },
  {
    label: '2 дня',
    value: 2880,
  },
  {
    label: '3 дня',
    value: 4320,
  },
  {
    label: '1 нед.',
    value: 10080,
  },
];

export const TimePickerLimitBefore = [
  {
    label: '1 день',
    value: 1440,
  },
  {
    label: '2 дня',
    value: 2880,
  },
  {
    label: '3 дня',
    value: 4320,
  },
  {
    label: '1 нед.',
    value: 10080,
  },
  {
    label: '2 нед.',
    value: 20160,
  },
  {
    label: '1 мес.',
    value: 43800,
  },
  {
    label: '2 мес.',
    value: 87600,
  },
  {
    label: '3 мес.',
    value: 131400,
  },
  {
    label: '6 мес.',
    value: 262800,
  },
  {
    label: '1 год.',
    value: 3153596,
  },
];

export const TimePickerLimitAfter = [
  {
    label: '0 ч.',
    value: 0,
  },
  {
    label: '1 ч.',
    value: 60,
  },
  {
    label: '2 ч.',
    value: 120,
  },
  {
    label: '3 ч.',
    value: 180,
  },
  {
    label: '4 ч.',
    value: 240,
  },
  {
    label: '1 день',
    value: 1440,
  },
  {
    label: '2 дня',
    value: 2880,
  },
  {
    label: '3 дня',
    value: 4320,
  },
  {
    label: '1 нед.',
    value: 10080,
  },
];

export const TimePickerAllTime = [
  '00:00',
  '00:15',
  '00:30',
  '00:45',
  '01:00',
  '01:15',
  '01:30',
  '01:45',
  '02:00',
  '02:15',
  '02:30',
  '02:45',
  '03:00',
  '03:15',
  '03:30',
  '03:45',
  '04:00',
  '04:15',
  '04:30',
  '04:45',
  '05:00',
  '05:15',
  '05:30',
  '05:45',
  '06:00',
  '06:15',
  '06:30',
  '06:45',
  '07:00',
  '07:15',
  '07:30',
  '07:45',
  '08:00',
  '08:15',
  '08:30',
  '08:45',
  '09:00',
  '09:15',
  '09:30',
  '09:45',
  '10:00',
  '10:15',
  '10:30',
  '10:45',
  '11:00',
  '11:15',
  '11:30',
  '11:45',
  '12:00',
  '12:15',
  '12:30',
  '12:45',
  '13:00',
  '13:15',
  '13:30',
  '13:45',
  '14:00',
  '14:15',
  '14:30',
  '14:45',
  '15:00',
  '15:15',
  '15:30',
  '15:45',
  '16:00',
  '16:15',
  '16:30',
  '16:45',
  '17:00',
  '17:15',
  '17:30',
  '17:45',
  '18:00',
  '18:15',
  '18:30',
  '18:45',
  '19:00',
  '19:15',
  '19:30',
  '19:45',
  '20:00',
  '20:15',
  '20:30',
  '20:45',
  '21:00',
  '21:15',
  '21:30',
  '21:45',
  '22:00',
  '22:15',
  '22:30',
  '22:45',
  '23:00',
  '23:15',
  '23:30',
  '23:45',
];
