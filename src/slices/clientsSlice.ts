import { createSlice, bindActionCreators } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

export interface ClientI {
  avatar?: string;
  discount?: {label?: string, value?: number};
  id: string;
  name: string;
  notes?: null | string;
  phone_number: string;
  surname?: string;
  type?: string;
  full_name?: string;
}

export interface ClientFromContactBookI {
  birthday?: {
    day?: number; month?: number; year?: number;
  };
  company?: string;
  emailAddresses?: [{email?: string; label?: string}];
  familyName?: string;
  givenName?: string;
  hasThumbnail?: boolean;
  imAddresses?: [];
  jobTitle?: string;
  middleName?: string;
  phoneNumbers?: [{label?: string; number?: string;}];
  postalAddresses?: [{
  city?: string; 
    country?: string; 
    label?: string; 
    postCode?: string; 
    region?: string; 
    state?: string;
    street?: string;
  }];
  recordID?: string;
  thumbnailPath?: string;
  urlAddresses?: [{label?: string; url?: string;}]
}

interface ClientServices {
  date: string;
  duration: {label: string; value: number};
  end: string;
  id: number;
  price: {label: string; value: number};
  start: string;
  title: string;
}

export interface ProfileI {
  order_number?: string;
  services: Array<ClientServices>;
   specialist: {
     activity_kind: [Object];
    avatar: string;
    id: number;
    name: string;
    phone: string;
    surname: string;
    tiktok_account: null;
    vk_account: null;
    youtube_account: null;
    title?: string;
    about?: string;
    address?: string;
    placement?: string;
    floor?: string;
    background_image?: {
      colors?: {
        description: string;
        icons: string;
        name: string; 
        title: string;
      }, 
      url?: string;
      value?: string;
    };
  }, 
  status: string;
}

export interface MyProfileI {
  id?: number;
  name?: string;
  phone?: string;
  surname?: string;
  avatar?: {
    id: number | null;
    url: string;
  };
  tiktok_account?: null;
  vk_account?: null;
  youtube_account?: null;
  activity_kind?: {
    id?: number;
    label?: string;
  }
  title?: string;
  about?: string;
  address?: string;
  placement?: string;
  floor?: string;
  background_image?: {
    colors?: {
      description: string;
      icons: string;
      name: string; 
      title: string;
    }, 
    url?: string;
    value?: string;
  };
}

interface ClientImageI {
  id?: number;
  url?: string;
}

interface SliceState {
  order: [];
  orderNumber: {};
  clientImage?: ClientImageI;
  clients?: {data?: Array<ClientI>, status?: boolean};
  selectedClient: ClientI;
  blackList: [];
  clientHistory: Array<ProfileI>;
  myProfile?: MyProfileI;
}

const initialState: SliceState = {
  order: [],
  orderNumber: {},
  clientImage: {},
  clients: {},
  selectedClient: {
    avatar: '',
    discount: {},
    full_name: '',
    name: '',
    phone_number: '',
    surname: '',
    type: '',
    id: '',
  },
  blackList: [],
  clientHistory: [],
  myProfile: {}
};

export const clientsSlice = createSlice({
  name: 'calendarSlice',
  initialState,
  reducers: {
    setOrder(state, action) {
      state.order = action.payload;
    },
    setOrderNumber(state, action) {
      state.orderNumber = action.payload;
    },
    setClientImage(state, action) {
      state.clientImage = action.payload;
    },
    setClients(state, action) {
      state.clients = action.payload;
    },
    setSelectedClient(state, action) {
      state.selectedClient = action.payload;
    },
    setBlackList(state, action) {
      state.blackList = action.payload.data;
    },
    setClientHistory(state, action) {
      state.clientHistory = action.payload.data;
    },
    setMyProfile(state, action) {
      state.myProfile = action.payload.data
    },
    setBackgroundColorCard(state, action) {
      state.myProfile!.background_image = action.payload
    },
  },
});

export const clientActionCreators = () => {
  const dispatch = useDispatch();
  return bindActionCreators(
    {
      ...clientsSlice.actions,
    },
    dispatch,
  );
};