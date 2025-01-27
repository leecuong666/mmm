import {
  View,
  TextInput,
  StyleSheet,
  ViewStyle,
  TextStyle,
  StyleProp,
  InputModeOptions,
} from 'react-native';
import {Controller, Control, FieldError, ValidationRule} from 'react-hook-form';
import Animated, {
  FadeInDown,
  FadeOutUp,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';
import {useTheme} from '@react-navigation/native';

interface Props {
  isDisplay?: boolean;
  id: string;
  isRequire?: boolean;
  length?: {minLength: number | undefined; maxLength?: number | undefined};
  pattern?: ValidationRule<RegExp>;
  control: Control<any>;
  inputMode?: InputModeOptions;
  errorText?: string;
  error?: FieldError | undefined;
  placeHolder?: string;
  placeHolderColor?: string;
  style?: ViewStyle;
  containerStyle?: ViewStyle;
  errStyle?: StyleProp<TextStyle>;
  inputStyle?: StyleProp<TextStyle>;
  headerComponent?: React.ReactNode;
  leftInputComponent?: React.ReactNode;
  rightInputComponent?: React.ReactNode;
}

export default function InputText({
  isDisplay = true,
  id,
  control,
  error,
  length = {minLength: undefined, maxLength: undefined},
  pattern,
  isRequire = false,
  errorText = 'Missing value',
  inputMode = 'text',
  placeHolder = 'input',
  placeHolderColor = '#616161',
  style,
  containerStyle,
  errStyle,
  inputStyle,
  headerComponent,
  leftInputComponent,
  rightInputComponent,
}: Props) {
  const {
    colors: {text},
  } = useTheme();

  const errValue = useDerivedValue(
    () => withTiming(error ? 1 : 0, {duration: 300}),
    [error],
  );

  const errorStyle = useAnimatedStyle(
    () => ({
      opacity: errValue.value,
    }),
    [error],
  );

  if (!isDisplay) return;

  return (
    <Animated.View
      entering={FadeInDown}
      exiting={FadeOutUp}
      style={[styles.container, style]}>
      {headerComponent}
      <View style={containerStyle}>
        {leftInputComponent}
        <Controller
          name={id}
          control={control}
          rules={{
            required: isRequire,
            ...length,
            pattern,
          }}
          render={({field: {onChange, value, onBlur}}) => (
            <TextInput
              placeholder={placeHolder}
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              style={[inputStyle, {color: text}]}
              inputMode={inputMode}
              placeholderTextColor={placeHolderColor}
            />
          )}
        />
        {rightInputComponent}
      </View>
      <Animated.Text style={[errStyle, errorStyle]}>{errorText}</Animated.Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 5,
  },
});
