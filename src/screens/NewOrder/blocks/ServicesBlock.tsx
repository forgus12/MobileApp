import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { isUndefined } from 'lodash';
import { FieldArray, FormikState, useFormikContext } from 'formik';
import { Text, View } from 'react-native';

import { Hr, ModalWindow, MultiChoiceButton, SelectField } from '../../../components';
import { COLORS, FONTFAMILY, SIZES } from '../../../constants';

import TotalDurationAndPriceBlock from './TotalDurationAndPriceBlock';
import { InitialValuesNewOrderI, maintenanceNewOrder } from '../static/static';
import { NewServiceModal, SelectServiceModal } from '../modals';
import { getDiscountedPrice } from '../helpers/calc';

const ServicesBlock: React.FC = () => {
  const { values }: FormikState<InitialValuesNewOrderI> = useFormikContext();
  const { client } = values;
  const [isVisibleSelectServiceModal, setIsVisibleSelectServiceModal] = React.useState<boolean>(false);
  const [isVisibleNewServiceModal, setIsVisibleNewServiceModal] = React.useState<boolean>(false);
  const [indexField, setIndexField] = React.useState<number>(0);

  return (
    <>
      <View
        style={{
          paddingHorizontal: SIZES.padding * 1.6,
          paddingVertical: SIZES.padding * 1.6,
        }}>
        <FieldArray name="services">
          {({ insert, remove, push }) => (
            <>
              {values.services.length > 0 &&
                values.services.map((item, index) => (
                  <SelectField
                    onPress={() => {
                      setIsVisibleSelectServiceModal(true);
                      setIndexField(index);
                    }}
                    onDelete={() => remove(index)}
                    key={index}
                    type="select"
                    name={`services.[${index}]`}
                    label="Услуга"
                    multiChoice={values.services.length > 1}
                    height={74}
                    renderContent={data => {
                      const { title, price, duration } = data;

                      const isPriceZero = Number(data.price.value) === 0;
                      const discount = getDiscountedPrice(price.value, client?.discount?.value * 100);

                      const isDiscount = !isUndefined(client.discount) && client?.discount?.value !== 0;

                      return title ? (
                        <View style={{ flex: 1 }}>
                          <Text
                            numberOfLines={1}
                            style={{
                              marginBottom: SIZES.margin * 0.4,
                              fontFamily: FONTFAMILY.title.regular,
                              fontSize: SIZES.body2,
                              color: COLORS.text,
                            }}>
                            {title}
                          </Text>
                          <View style={{ flexDirection: 'row' }}>
                            {isPriceZero ? (
                              <Text
                                style={{
                                  fontFamily: FONTFAMILY.text.regular,
                                  fontSize: SIZES.h5,
                                  color: COLORS.gray,
                                  lineHeight: 14,
                                }}>
                                {duration.label}
                              </Text>
                            ) : (
                              <>
                                <Text
                                  style={{
                                    fontFamily: FONTFAMILY.text.regular,
                                    fontSize: SIZES.body4,
                                    color: COLORS.gray,
                                    lineHeight: 14,
                                    textDecorationLine: isDiscount ? 'line-through' : 'none',
                                  }}>
                                  {price.value + '₽'}
                                </Text>
                                {isDiscount && (
                                  <Text
                                    style={{
                                      fontFamily: FONTFAMILY.text.regular,
                                      fontSize: SIZES.h5,
                                      color: COLORS.red,
                                      lineHeight: 14,
                                    }}>
                                    {' ' + discount + '₽'}
                                  </Text>
                                )}
                                <Text
                                  style={{
                                    fontFamily: FONTFAMILY.text.regular,
                                    fontSize: SIZES.h5,
                                    color: COLORS.gray,
                                    fontWeight: '400',
                                    lineHeight: 14,
                                  }}>
                                  {' / ' + duration.label}
                                </Text>
                              </>
                            )}
                          </View>
                        </View>
                      ) : null;
                    }}
                  />
                ))}
              <MultiChoiceButton label="Добавить услуги" onPress={() => push(maintenanceNewOrder)} />
            </>
          )}
        </FieldArray>

        {/* Суммрная длительность и стоимость */}
        <TotalDurationAndPriceBlock data={values} />
      </View>
      <Hr />

      <ModalWindow
        name={`services.[${indexField}]`}
        title="Услуга"
        isVisible={isVisibleSelectServiceModal}
        component={SelectServiceModal}
        onClose={() => setIsVisibleSelectServiceModal(false)}
        onPressRightButton={() => setIsVisibleNewServiceModal(true)}
        renderRightButton={() => (
          <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <Path d="M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z" fill="#38B8E0" />
          </Svg>
        )}
      />
      <ModalWindow
        title="Новая услуга"
        isVisible={isVisibleNewServiceModal}
        component={NewServiceModal}
        onClose={() => setIsVisibleNewServiceModal(false)}
      />
    </>
  );
};

export default ServicesBlock;
