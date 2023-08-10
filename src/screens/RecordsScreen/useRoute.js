import { useSelector } from 'react-redux';

export const useRoute = route => {
  let color;
  let color2;
  let textColor;
  let idSpecialist;
  let routes;
  let specialist = [];
  let history = [];
  let idSelected = [];
  if (route?.params?.name === 'BusinessCardPage') {
    routes = route?.params?.infoSpecialist;
    color = routes?.card ? routes?.card?.gradientColor : '#389FC0';
    color2 = routes?.card ? routes?.card?.buttonsColor : '#226E86';
    textColor = routes?.card?.textColor;
    idSpecialist = routes?.id;
  } else if (route?.params?.name === 'HistoryPage') {
    const businessCards = useSelector(state => state.vizitnica.businessCards);
    const cardServices = useSelector(({ recordScreen }) => recordScreen.card);

    businessCards.filter(item => (item.id === route?.params?.specialist?.id ? specialist.push(item) : null));
    cardServices.map(item => {
      route?.params?.services.map(item1 => {
        if (item.id === item1.id) {
          history.push(item);
          idSelected.push(item.id);
        }
      });
    });

    routes = specialist[0];
    color = routes?.card ? routes?.card?.gradientColor : '#389FC0';
    color2 = routes?.card ? routes?.card?.buttonsColor : '#226E86';
    textColor = routes?.card?.textColor;
    idSpecialist = routes?.id;
  } else {
    routes = route?.params;
    color = routes?.card ? routes?.card?.gradientColor : '#389FC0';
    color2 = routes?.card ? routes?.card?.buttonsColor : '#226E86';
    textColor = routes?.card?.textColor;
    idSpecialist = routes?.id;
  }

  return { color, color2, textColor, idSpecialist, history, idSelected };
};
