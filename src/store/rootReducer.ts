import { combineReducers } from '@reduxjs/toolkit';

import { authenticationSlice } from '../slices/authenticationSlice';
import { onboardingSlice } from '../slices/onboardingSlice';
import { phoneVerificationSlice } from '../slices/phoneVerificationSlice';
import { personalDataSlice } from '../slices/personalDataSlice';
import { myBusinessCardSlice } from '../slices/myBusinessCardSlice';
import { calendarSlice } from '../slices/calendarSlice';
import { clientsSlice } from '../slices/clientsSlice';
import { newOrderSlice } from '../slices/newOrderSlice';
import { workSheduleSlice } from '../slices/workShedule';
import { myServicesSlice } from '../slices/myServicesSlice';
import { appendBreakSlice } from '../slices/appendBreakSlice';
import { vizitnicaSlice } from '../slices/vizitnicaSlice';
import { recordScreenSlice } from '../slices/recordScreenSlice';
import { specialistSlice } from '../slices/specialistSlice';
import { paymentSlice } from '../slices/paymentSlice';

const rootReducer = combineReducers({
  appendBreak: appendBreakSlice.reducer,
  vizitnica: vizitnicaSlice.reducer,
  recordScreen: recordScreenSlice.reducer,
  specialistData: specialistSlice.reducer,
  authentication: authenticationSlice.reducer,
  onboarding: onboardingSlice.reducer,
  phoneVerification: phoneVerificationSlice.reducer,
  personalData: personalDataSlice.reducer,
  myBusinessCard: myBusinessCardSlice.reducer,
  calendar: calendarSlice.reducer,
  clients: clientsSlice.reducer,
  newOrder: newOrderSlice.reducer,
  workShedule: workSheduleSlice.reducer,
  myServices: myServicesSlice.reducer,
  payment: paymentSlice.reducer,
});

export default rootReducer;
