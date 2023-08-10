import { useSelector } from 'react-redux';

export const useRoutService = route => {
  let color;
  let color2;
  let buttonColor;
  let routes;
  let specialist = [];
  if (route?.params?.params.name === 'BusinessCardPage') {
    routes = route?.params?.params?.infoSpecialist;
    color = routes?.card ? routes?.card?.gradientColor : '#389FC0';
    color2 = routes?.card ? routes?.card?.buttonsColor : '#226E86';
    buttonColor = routes?.card?.textColor;
  } else if (route?.params?.params?.name === 'HistoryPage') {
    const businessCards = useSelector(state => state.vizitnica.businessCards);
    businessCards.filter(item => (item.id === route?.params?.params?.specialist?.id ? specialist.push(item) : null));
    routes = specialist[0];

    color = routes?.card ? routes?.card?.gradientColor : '#389FC0';
    color2 = routes?.card ? routes?.card?.buttonsColor : '#226E86';
    buttonColor = routes?.card?.textColor;
  } else {
    routes = route?.params?.params;
    color = routes?.card ? routes?.card?.gradientColor : '#389FC0';
    color2 = routes?.card ? routes?.card?.buttonsColor : '#226E86';
    buttonColor = routes?.card?.textColor;
  }

  return { color, color2, buttonColor, routes, route };
};
