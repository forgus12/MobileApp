import React from 'react';
import { RootState, useSelector } from '../../../store';
import { Field } from '../blocks';

const SlidingSchedule = () => {
  const { myWorkShedule } = useSelector((s: RootState) => s?.workShedule);

  return (
    <>
      <Field
        label="Кол-во рабочих дней:"
        value={myWorkShedule?.slidingSchedule?.workdaysCount}
      />
      <Field
        label="Кол-во выходных после:"
        value={myWorkShedule?.slidingSchedule?.weekdaysCount}
      />
      <Field
        label="Отсчёт графика с:"
        value={myWorkShedule?.slidingSchedule?.startFrom?.label}
      />
      {myWorkShedule?.slidingSchedule?.data?.map((item, index) => {
        return myWorkShedule?.slidingSchedule?.breakType?.value === 'individual'
          ? item.workTime.start && (
              <Field
                label={`Рабочий день ${item.day}`}
                value={`${item.workTime.start} - ${item.workTime.end}`}
                key={index}
                extraLabel={item.breaks.length > 0 && 'Перерыв:'}
                extraValue={
                  item.breaks &&
                  item.breaks.map(time => `${time.start} - ${time.end}  `)
                }
              />
            )
          : item.workTime.start && (
              <Field
                label={`Рабочий день ${item.day}`}
                value={`${item.workTime.start} - ${item.workTime.end}`}
                key={index}
              />
            );
      })}

      <Field label="Тип перерыва:" value={myWorkShedule?.break_type?.label} />
      {myWorkShedule?.break_type?.value === 'united' && (
        <Field
          label="Перерыв:"
          value={myWorkShedule?.slidingSchedule?.breaks?.map((item, index) =>
            myWorkShedule?.slidingSchedule?.breaks?.length! - 1 !== index
              ? `${item.start} - ${item.end}, `
              : `${item.start} - ${item.end}`,
          )}
        />
      )}
    </>
  );
};

export default SlidingSchedule;
