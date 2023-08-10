import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { useField } from 'formik';
import { isUndefined } from 'lodash';
import { View, Text, TouchableOpacity, ViewStyle } from 'react-native';

import { SIZES, COLORS, FONTFAMILY } from '../../constants';

interface IProps {
  placeholder?: string;
  type: 'date' | 'select' | 'default' | 'line';
  name: string;
  label?: string;
  description?: string;
  height?: number;
  disabled?: boolean;
  multiChoice?: boolean;
  customContainerStyle?: ViewStyle;
  onPress?: () => void;
  onDelete?: () => void;
  renderContent?: (data: any) => JSX.Element | null;
  renderCustomIcon?: (data: any) => JSX.Element | null;
}

const SelectField: React.FC<IProps> = ({
  placeholder,
  type,
  name,
  label,
  description,
  height,
  disabled,
  customContainerStyle,
  multiChoice,
  onPress,
  onDelete,
  renderContent,
  renderCustomIcon,
}) => {
  const [field, meta] = useField<any>(name);

  const renderField = () => {
    const activeField =
      (!meta.value && !placeholder) || (!isUndefined(renderContent) && renderContent(meta.value) === null);

    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          ...customContainerStyle,
        }}>
        <TouchableOpacity
          onPress={onPress}
          activeOpacity={0.8}
          disabled={disabled}
          style={{
            flex: 1,
            justifyContent: 'center',
            marginBottom: SIZES.padding * 0.8,
            paddingVertical: SIZES.padding,
            paddingHorizontal: SIZES.padding * 1.6,
            minHeight: height || 56,
            backgroundColor: !disabled ? COLORS.white : COLORS.disabled,
            borderWidth: 1,
            borderColor: meta.touched && meta.error ? COLORS.error : COLORS.border,
            borderRadius: SIZES.radius,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: label ? 'space-between' : 'center',
              alignItems: 'center',
            }}>
            <View>
              {label && (
                <Text
                  style={{
                    fontFamily: FONTFAMILY.text.regular,
                    fontSize: activeField ? SIZES.body2 : SIZES.body4,
                    lineHeight: activeField ? 18 : 12,
                    color: COLORS.gray,
                    //   ...customLabelStyle,
                  }}>
                  {label}
                </Text>
              )}
              {!isUndefined(renderContent) ? (
                renderContent(meta.value)
              ) : meta.value ? (
                <Text
                  style={{
                    fontFamily: FONTFAMILY.text.regular,
                    fontSize: SIZES.body2,
                    color: COLORS.black,
                    // ...customContentStyle,
                  }}>
                  {meta.value}
                </Text>
              ) : placeholder ? (
                <Text
                  style={{
                    fontFamily: FONTFAMILY.text.regular,
                    fontSize: SIZES.body2,
                    color: COLORS.placeholderLight,
                    // ...customContentStyle,
                  }}>
                  {placeholder}
                </Text>
              ) : null}
            </View>
            {isUndefined(renderCustomIcon) ? (
              type === 'date' ? (
                <Svg
                  style={{ marginRight: SIZES.padding * 0.3 }}
                  width="18"
                  height="20"
                  viewBox="0 0 18 20"
                  fill="none">
                  <Path
                    d="M14 11H9V16H14V11ZM13 0V2H5V0H3V2H2C0.89 2 0.00999999 2.9 0.00999999 4L0 18C0 19.1 0.89 20 2 20H16C17.1 20 18 19.1 18 18V4C18 2.9 17.1 2 16 2H15V0H13ZM16 18H2V7H16V18Z"
                    fill="#38B8E0"
                  />
                </Svg>
              ) : type === 'select' ? (
                <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ opacity: !disabled ? 1 : 0.6 }}>
                  <Path
                    d="M10 6L8.59 7.41L13.17 12L8.59 16.59L10 18L16 12L10 6Z"
                    fill={!disabled ? COLORS.primary : COLORS.gray}
                  />
                </Svg>
              ) : null
            ) : (
              renderCustomIcon(meta.value)
            )}
          </View>
        </TouchableOpacity>
        {!isUndefined(onDelete) && multiChoice && (
          <TouchableOpacity
            onPress={onDelete}
            activeOpacity={0.8}
            style={{
              marginLeft: SIZES.padding * 1.6,
            }}>
            <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <Path
                d="M13 11H11H7V13H11H13H17V11H13ZM12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z"
                fill="#D64641"
              />
            </Svg>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  const renderFieldTypeLine = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          ...customContainerStyle,
        }}>
        <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={{ flex: 1 }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View>
              {label && (
                <Text
                  style={{
                    fontFamily: FONTFAMILY.title.regular,
                    fontSize: SIZES.body2,
                    lineHeight: 18,
                    color: COLORS.text,
                    //   ...customLabelStyle,
                  }}>
                  {label}
                </Text>
              )}
              {description && (
                <Text
                  style={{
                    marginTop: SIZES.margin * 0.4,
                    fontFamily: FONTFAMILY.title.regular,
                    fontSize: SIZES.h5,
                    color: COLORS.gray,
                    lineHeight: 14,
                  }}>
                  {description}
                </Text>
              )}
            </View>
            <View style={{ flexDirection: 'row' }}>
              {!isUndefined(renderContent) ? (
                renderContent(meta.value)
              ) : meta.value ? (
                <Text
                  style={{
                    fontFamily: FONTFAMILY.title.regular,
                    fontSize: SIZES.body2,
                    color: COLORS.black,
                    // ...customContentStyle,
                  }}>
                  {meta.value.label !== undefined ? meta.value.label : meta.value}
                </Text>
              ) : null}

              <View style={{ marginLeft: SIZES.margin * 0.8 }}>
                <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <Path d="M10 6L8.59 7.41L13.17 12L8.59 16.59L10 18L16 12L10 6Z" fill="#38B8E0" />
                </Svg>
              </View>
            </View>
          </View>
        </TouchableOpacity>
        {!isUndefined(onDelete) && multiChoice && (
          <TouchableOpacity
            onPress={onDelete}
            activeOpacity={0.8}
            style={{
              padding: 4,
              marginLeft: SIZES.padding * 1.6,
            }}>
            <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <Path
                d="M13 11H11H7V13H11H13H17V11H13ZM12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z"
                fill="#D64641"
              />
            </Svg>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return type === 'line' ? renderFieldTypeLine() : renderField();
};

export default SelectField;
