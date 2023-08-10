// import React from 'react';
// import { useSelector } from 'react-redux';

// import { clientsAPI } from '../../../api/clientsAPI';
// import { clientActionCreators } from '../../../slices/clientsSlice';
// import { APIStatus } from '../../../lib/axiosAPI';

// export const useFetchGetOrderData = () => {
//   const { token } = useSelector((s: RootState) => s?.authentication);
//   const [status, setStatus] = React.useState(APIStatus.Initial);
//   const { getOrder } = clientsAPI();
//   const { setOrder } = clientActionCreators();

//   const fetch = order => {
//     setStatus(APIStatus.Loading);
//     getOrder({
//       onSuccess: response => {
//         setOrder(response);
//         setStatus(APIStatus.Success);
//       },
//       order,
//       token,
//       onError: () => {
//         setStatus(APIStatus.Failure);
//       },
//     });
//   };

//   return { fetch, status };
// };
