import { AllClientsArrayI, AllServicesArrayI } from '../../../slices/newOrderSlice';

export interface InitialValuesNewOrderI {
  client: AllClientsArrayI;
  services: Array<AllServicesArrayI>;
  date: {
    label: string;
    value: string;
  };
  time: {
    start: string;
    end: string;
  };
}

export const maintenanceNewOrder = {
  duration: {
    label: null,
    value: null,
  },
  id: null,
  price: {
    label: null,
    value: null,
  },
  title: '',
};

export const initialValuesNewOrder = {
  client: {},
  services: [maintenanceNewOrder],
  date: '',
  time: {
    start: '',
    end: '',
  },
};

export const initialValuesNewService = {
  title: '',
  price: { label: '', value: 0 },
  duration: { label: '', value: 15 },
};
