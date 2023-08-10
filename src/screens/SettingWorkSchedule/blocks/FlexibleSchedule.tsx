import React from 'react';
import { RootState, useSelector } from '../../../store';
import { Field } from '../blocks'

const FlexibleSchedule = () => {
  const { myWorkShedule } = useSelector((s: RootState) => s?.workShedule);

  return (
    <>
      {myWorkShedule?.flexibleSchedule?.data?.map((item, index) =>
        myWorkShedule?.flexibleSchedule?.breakType?.value === 'individual'
          ? item.workTime.start && (
              <Field
                label={item.day.label}
                value={`${item.workTime.start} - ${item.workTime.end}`}
                extraLabel={item.breaks.length > 0 && 'Перерыв:'}
                extraValue={
                  item.breaks &&
                  item.breaks.map(time => `${time.start} - ${time.end}  `)
                }
                key={index}
              />
            )
          : item.workTime.start && (
              <Field
                label={item.day.label}
                value={`${item.workTime.start} - ${item.workTime.end}`}
                key={index}
              />
            ),
      )}

      {myWorkShedule?.flexibleSchedule?.breakType?.value === 'united' && (
        <Field
          label="Перерыв"
          value={myWorkShedule?.flexibleSchedule?.breaks?.map((item, index) =>
            myWorkShedule?.flexibleSchedule?.breaks?.length! - 1 !== index
              ? `${item.start} - ${item.end}, `
              : `${item.start} - ${item.end}`,
          )}
        />
      )}

      {myWorkShedule?.flexibleSchedule?.data?.find(
        el => el.workTime.start === null,
      ) ? (
        <Field
          label="Выходные:"
          value={myWorkShedule?.flexibleSchedule?.data.map((item, index) =>
            myWorkShedule?.flexibleSchedule?.data?.length! - 1 !== index
              ? item.workTime.start === null && `${item.day.cut}., `
              : item.workTime.start === null && `${item.day.cut}.`,
          )}
        />
      ) : null}
    </>
  );
};

export default FlexibleSchedule;
