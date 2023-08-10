import React from 'react';
import { RootState, useSelector } from '../../../store';
import { Field } from '../blocks';

const StandartSchedule = () => {
  const { myWorkShedule } = useSelector((s: RootState) => s?.workShedule);

  return (
    <>
      <Field
        label="Рабочее время:"
        value={`${myWorkShedule?.standardSchedule?.workTime?.start} - ${myWorkShedule?.standardSchedule?.workTime?.end}`}
      />
      {myWorkShedule?.standardSchedule?.weekends?.length! > 0 && (
        <Field
          label="Выходные:"
          value={myWorkShedule?.standardSchedule?.weekends?.map((w, index) =>
            myWorkShedule?.standardSchedule?.weekends?.length! - 1 !== index
              ? `${w.cut}., `
              : `${w.cut}.`,
          )}
        />
      )}
      <Field
        label="Перерывы:"
        value={myWorkShedule?.standardSchedule?.breaks?.map((item, index) =>
          myWorkShedule?.standardSchedule?.breaks?.length! - 1 !== index
            ? `${item.start} - ${item.end}, `
            : `${item.start} - ${item.end}`,
        )}
      />
    </>
  );
};

export default StandartSchedule;
