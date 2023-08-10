import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { COLORS, FONTFAMILY, SIZES } from '../../../constants';

const BlockOffer = ({ data, onPress, disabled, referal }) => {
  function getTermLabel(term) {
    if (term == 1) {
      return 'месяц';
    } else if (term >= 2 && term <= 4) {
      return 'месяца';
    } else {
      return 'месяцев';
    }
  }

  return (
    <View>
      {/* {data?.map(item => ( */}
      {referal ? (
        <TouchableOpacity
          onPress={onPress}
          disabled={!disabled}
          style={{
            padding: SIZES.padding * 0.8,
            marginBottom: SIZES.margin,
            position: 'relative',
            backgroundColor: COLORS.primary,
            borderRadius: SIZES.radius,
            opacity: disabled ? 1 : 0.5,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                padding: SIZES.padding * 0.8,
                color: COLORS.white,
                fontWeight: '500',
                lineHeight: 20.29,
                fontSize: SIZES.h2,
              }}>
              {`${data.term} ${getTermLabel(data.term)}`}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  position: 'absolute',
                  transform: [{ rotate: '160deg' }],
                  // top: 7,
                  left: 5,
                  width: 40,
                  backgroundColor: COLORS.white,
                  height: 2,
                  borderBottomWidth: 1,
                  borderColor: COLORS.white,
                }}
              />
              <Text
                style={{
                  textDecorationStyle: 'solid',
                  padding: SIZES.padding * 0.8,
                  color: COLORS.white,
                  fontWeight: '500',
                  lineHeight: 20.29,
                  fontSize: SIZES.h4,
                }}>
                {data.price}₽
              </Text>
              <Text
                style={{
                  padding: SIZES.padding * 0.8,
                  color: COLORS.white,
                  fontWeight: '500',
                  lineHeight: 20.29,
                  fontSize: SIZES.h2,
                }}>
                {data.ref_price}₽
              </Text>
            </View>
          </View>
          <Text
            style={{
              padding: SIZES.padding * 0.8,
              color: COLORS.white,
              fontSize: SIZES.body3,
            }}>
            {data.term != 1
              ? `Далее ${data.price}₽/${data.term} мес., оплата раз в ${data.term} месяцев`
              : `Далее ${data.price}₽/мес., оплата ежемесячно`}
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={onPress}
          disabled={!disabled}
          style={{
            padding: SIZES.padding * 0.8,
            marginBottom: SIZES.margin,
            position: 'relative',
            backgroundColor: COLORS.primary,
            borderRadius: SIZES.radius,
            opacity: disabled ? 1 : 0.5,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                padding: SIZES.padding * 0.8,
                color: COLORS.white,
                fontWeight: '500',
                lineHeight: 20.29,
                fontSize: SIZES.h2,
              }}>
              {`${data.sale_price}₽ в месяц`}
            </Text>
            {data.desc ? (
              <View
                style={{
                  position: 'relative',
                  height: 26,
                  opacity: 0.6,
                  backgroundColor: COLORS.backgroundAlert,
                  borderRadius: SIZES.radius,
                }}>
                <Text
                  style={{
                    paddingHorizontal: SIZES.padding * 1.8,
                    color: COLORS.white,
                    lineHeight: 22.29,
                    fontWeight: '400',
                    fontSize: SIZES.body3,
                  }}>
                  {data.desc}
                </Text>
              </View>
            ) : null}
          </View>
          <Text
            style={{
              padding: SIZES.padding * 0.8,
              color: COLORS.white,
              fontSize: SIZES.body3,
            }}>
            {data.term == '1'
              ? 'Оплата ежемесячно'
              : `При оплате ${data.price}₽ раз в ${data.term} ${getTermLabel(data.term)}`}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default BlockOffer;
