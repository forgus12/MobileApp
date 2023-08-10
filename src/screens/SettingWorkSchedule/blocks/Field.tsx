import React from 'react';
import { Text, View } from 'react-native';
import { COLORS, FONTFAMILY, SIZES } from '../../../constants';

interface IField {
    label?: string;
    value?: any;
    note?: boolean;
    onpress?: () => void;
    extraLabel?: any;
    extraValue?: string[];
  }

const Field: React.FC<IField> = ({
    label,
    value,
    extraLabel,
    extraValue,
  }) => {
    return (
      <View
        style={{
          borderBottomColor: COLORS.border,
          borderBottomWidth: 1,
          paddingVertical: SIZES.padding * 1.6,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View
          style={{
            marginLeft: SIZES.margin * 1.6,
          }}>
          <Text
            style={{
              fontFamily: FONTFAMILY.text.regular,
              fontSize: SIZES.h5,
              lineHeight: 14.32,
              color: COLORS.gray,
              marginBottom: SIZES.margin * 0.4,
            }}>
            {label}
          </Text>
          <Text
            style={{
              fontFamily: FONTFAMILY.text.regular,
              fontSize: SIZES.h5,
              lineHeight: 16,
              color: COLORS.textBlack,
            }}>
            {value}
          </Text>
          {extraLabel && (
            <>
              <Text
                style={{
                  fontFamily: FONTFAMILY.text.regular,
                  fontSize: SIZES.h5,
                  lineHeight: 14.32,
                  color: COLORS.gray,
                  marginBottom: SIZES.margin * 0.4,
                  marginTop: SIZES.margin * 1.6,
                }}>
                {extraLabel}
              </Text>
              <Text
                style={{
                  fontFamily: FONTFAMILY.text.regular,
                  fontSize: SIZES.h5,
                  lineHeight: 16,
                  color: COLORS.textBlack,
                }}>
                {extraValue}
              </Text>
            </>
          )}
        </View>
      </View>
    );
  };

  export default Field;