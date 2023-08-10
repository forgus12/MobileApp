import { createSlice, bindActionCreators } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import { APIStatus } from '../lib/axiosAPI';

export interface IWorkSheduleObject {
    id?: number;
    type?: {
        label?: string;
        value?: string;
    },
    smart_schedule?: boolean;
    confirmation?: boolean;
    cancel_appointment?: {
        label?: string;
        value?: number;
    },
    limit_before?: {
        label?: string;
        value?: number;
    },
    limit_after?: {
        label?: string;
        value?: number;
    },
    break_type?: {
        label?: string;
        value?: string;
    },
    standardSchedule?: {
        weekends?: [
            {
                label: string;
                cut: string;
                value: string;
            }
        ],
        workTime?: {
            start?: string;
            end?: string;
        },
        breaks?: [
            {
                start: string;
                end: string;
            }
        ]
    },
    flexibleSchedule?: {
        breakType?: {
            label: string;
            value: string;
        },
        breaks?: [
            {
                start: string;
                end: string;
            }
        ]
        data?: [
            {
                day: {
                    label: string;
                    cut: string;
                    value: string;
                },
                workTime: {
                    start: string;
                    end: string;
                },
                breaks: [
                    {
                        start: string;
                        end: string;
                    }
                ]
            }
        ]
    },
    slidingSchedule?: {
        breaks?: [
            {
                start: string;
                end: string
            }
        ],
        startFrom?: {
            label: string;
            value: string;
        },
        breakType: {
            label: string;
            value: string;
        },
        workdaysCount?: number;
        weekdaysCount?: number;
        data?: [
            {
                day: string;
                workTime: {
                    start: string;
                    end: string;
                },
                breaks: [
                    {
                        start: string;
                        end: string;
                    }
                ]
            }
        ]
    },
    specialist?: {
        id?: number;
        name?: string;
        surname?: string | null;
        phone?: string;
        avatar?: string | null;
    activity_kind?: {
            id?: number;
            label?: string;
        },
        youtube_account?: null;
        vk_account?: null;
        tiktok_account?: null;
    }
}

export interface IWorkShedule {
    data?: Array<IWorkSheduleObject>;
    status?: APIStatus;
}

interface SliceState {
    myWorkShedule?: IWorkSheduleObject
}
  
  const initialState: SliceState = {
    myWorkShedule: {}
};

  export const workSheduleSlice = createSlice({
    name: 'workSheduleSlice',
    initialState,
    reducers: {
        setWorkShedule(state, action) {
            state.myWorkShedule = action.payload.data;
          },
    },
  })

  export const workSheduleActionCreators = () => {
    const dispatch = useDispatch();
    return bindActionCreators(
      {
        ...workSheduleSlice.actions,
      },
      dispatch,
    );
  };