import { createSlice, bindActionCreators } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import { APIStatus } from '../lib/axiosAPI';

export interface paymentsArrayI {
  id: string;
  term: string;
  name: string;
  price: string;
}

export interface currentOrderArrayI {
  id: string;
  term: string;
  name: string;
  price: string;
}

export interface sharePaymentArrayI {
  id: string;
  link: string;
  qr: string;
}

export interface linkPaymentsArrayI {
  PaymentURL: string;
  TerminalKey: string;
  PaymentId: string;
  OrderId: string;
}

interface paymentsI {
  data?: Array<paymentsArrayI>;
  status?: APIStatus;
}

interface linkPaymentsI {
  data?: Array<paymentsArrayI>;
  status?: APIStatus;
}

interface currentOrderI {
  data?: Array<currentOrderArrayI>;
  status?: APIStatus;
}
interface sharePaymentI {
  data?: Array<sharePaymentArrayI>;
  status?: APIStatus;
}

interface SliceState {
  payments?: paymentsI;
  linkPayment?: linkPaymentsI;
  currentOrder?: currentOrderI;
  sharePayment?: sharePaymentI;
}

const initialState: SliceState = {
  payments: {},
  linkPayment: {},
  currentOrder: {},
  sharePayment: {},
};

export const paymentSlice = createSlice({
  name: 'paymentSlice',
  initialState,
  reducers: {
    resetStore: state => {
      state.payments = {
        id: '',
        term: '',
        name: '',
        price: '',
      };
      state.linkPayment = {
        PaymentURL: '',
        TerminalKey: '',
        PaymentId: '',
        OrderId: '',
      };
      state.currentOrder = {
        PaymentURL: '',
        TerminalKey: '',
        PaymentId: '',
        OrderId: '',
      };
      state.sharePayment = {
        link: '',
        qr: '',
      };
    },
    setPayments(state, action) {
      state.payments = action.payload;
    },
    setLinkPayment(state, action) {
      state.linkPayment = action.payload;
    },
    setCurrentOrder(state, action) {
      state.currentOrder = action.payload;
    },
    setSharePayment(state, action) {
      state.sharePayment = action.payload;
    },
  },
});

export const paymentActionCreators = () => {
  const dispatch = useDispatch();
  return bindActionCreators(
    {
      ...paymentSlice.actions,
    },

    dispatch,
  );
};
