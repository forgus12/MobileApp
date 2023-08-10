import React from 'react';
import { isUndefined } from 'lodash';
import { Text, View, ViewStyle } from 'react-native';

import { COLORS, FONTFAMILY, SIZES } from '../../../constants';

import { getDiscountedPrice, sumDurations, sumPrice } from '../helpers/calc';
import { InitialValuesNewOrderI } from '../static/static';

interface IProps {
  data: InitialValuesNewOrderI;
  numberServicesToDisplay?: number;
  customContainerStyle?: ViewStyle;
}

const TotalDurationAndPriceBlock: React.FC<IProps> = ({ data, customContainerStyle }) => {
  const { services, client } = data;

  const duration = sumDurations(services);
  const price = sumPrice(services);
  const isDiscount = !isUndefined(client.discount) && client.discount.value !== 0;
  const discount = isDiscount ? getDiscountedPrice(price, client?.discount?.value * 100) : '';

  return services[0].title !== '' ? (
    <View style={{ marginTop: SIZES.margin * 1.6, ...customContainerStyle }}>
      <View style={{ flexDirection: 'row', marginBottom: SIZES.margin * 0.8 }}>
        <Text
          style={{
            flex: 1,
            fontFamily: FONTFAMILY.text.regular,
            fontSize: SIZES.body4,
            color: COLORS.gray,
          }}>
          Суммарная длительность:
        </Text>
        <Text
          style={{
            fontFamily: FONTFAMILY.text.regular,
            fontSize: SIZES.body4,
            color: COLORS.text,
          }}>
          {duration}
        </Text>
      </View>

      {price !== 0 && (
        <View style={{ flexDirection: 'row' }}>
          <Text
            style={{
              flex: 1,
              fontFamily: FONTFAMILY.text.regular,
              fontSize: SIZES.body4,
              color: COLORS.gray,
            }}>
            Суммарная стоимость:
          </Text>
          <View style={{ flexDirection: 'row' }}>
            <Text
              style={{
                fontFamily: FONTFAMILY.text.regular,
                fontSize: SIZES.body4,
                color: COLORS.text,
                textDecorationLine: isDiscount ? 'line-through' : 'none',
              }}>
              {price + '₽'}
            </Text>
            {isDiscount && (
              <Text
                style={{
                  fontFamily: FONTFAMILY.text.regular,
                  fontSize: SIZES.body4,
                  color: COLORS.red,
                }}>
                {' ' + discount + '₽'}
              </Text>
            )}
          </View>
        </View>
      )}
    </View>
  ) : null;
};

export default TotalDurationAndPriceBlock;
