import {Pressable, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Google, Logo} from '../../contants/svgs';
import {dimension} from '../../contants/appInfo';
import TextTheme from '../../components/TextTheme';
import {colors} from '../../contants/color';
import {textStyle} from '../../styles/text';
import {viewStyle} from '../../styles/view';
import useAppLanguage from '../../hooks/useAppLanguage';
import {SignInLng} from '../../language/type';
import {useForm} from 'react-hook-form';
import {BtnAnimated} from '../../components/Btn';
import {fonts} from '../../contants/fonts';
import InputText from '../../components/InputText';
import {getLabel} from '../../utils/type';
import {shadow} from '../../styles/shadow';
import Animated, {
  FadeInDown,
  FadeOut,
  LinearTransition,
} from 'react-native-reanimated';
import {emailReg} from '../../contants/regex';
import {Eye, EyeOff} from 'lucide-react-native';
import ViewTheme from '../../components/ViewTheme';
import {handleSignIn, handleSignUp} from '../../api';
import {SignInType, SignUpType} from '../../types/auth';
import LogoLoading from '../../components/LogoLoading';
import * as Keychain from 'react-native-keychain';
import {ResponseCommonType} from '../../types/serverResponseForm';
import HttpStatusCode from '../../api/statusCode';
import useAppNotification from '../../hooks/useAppNotification';

const logoSize = dimension.width * 0.2;
const iconSize = dimension.width * 0.07;
const eyeSize = iconSize * 0.9;
const damping = 200;
const entering = FadeInDown.springify().damping(damping).duration(damping);
const exiting = FadeOut.springify().damping(damping).duration(damping);
const layout = LinearTransition.springify().damping(damping).duration(damping);

const SignIn = () => {
  const {
    button: {signin, singup},
    form: {name, email, passwrod},
    privacy,
    formAlert: {nameAlert, emailAlert, passwordAlert},
  } = useAppLanguage<SignInLng>('screens.SignIn');
  const {showNotification, showLoading} = useAppNotification();
  const [isSignIn, setIsSignIn] = useState(true);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: {errors},
    reset,
    setValue,
  } = useForm<SignUpType>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  useEffect(() => {
    checkAccountExist();
  }, []);

  const checkAccountExist = async () => {
    const credential =
      (await Keychain.getGenericPassword()) as Keychain.UserCredentials;

    setValue('email', credential.username);
    setValue('password', credential.password);
  };

  const toggleForm = () => {
    reset();
    setIsSignIn(isSignin => !isSignin);

    if (!isSignIn) checkAccountExist();
  };

  const toggleShowPassword = () => {
    setIsShowPassword(state => !state);
  };

  const onSubmit = async (data: SignInType | SignUpType) => {
    showLoading(true, {text: 'Checking your account'});

    try {
      const res = (await (isSignIn
        ? handleSignIn(data)
        : handleSignUp(data as SignUpType))) as ResponseCommonType;

      if (res.code === HttpStatusCode.OK) {
        Keychain.setGenericPassword(data.email, data.password);
      }
    } catch (error) {
      console.log(error);
    } finally {
      showLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={[viewStyle.view, {width: '82%', gap: dimension.width * 0.07}]}>
        <View />

        <Logo width={logoSize} height={logoSize} />

        <View style={styles.formContainer}>
          <View style={styles.headerContainer}>
            <Pressable disabled={isSignIn} onPress={toggleForm}>
              <TextTheme
                style={[textStyle.title, {fontSize: dimension.width * 0.08}]}
                secondColor={colors.text2}
                activeSecondColor={!isSignIn}>
                {signin}
              </TextTheme>
            </Pressable>
            <TextTheme style={textStyle.title}>/</TextTheme>
            <Pressable disabled={!isSignIn} onPress={toggleForm}>
              <TextTheme
                style={[textStyle.title, {fontSize: dimension.width * 0.08}]}
                secondColor={colors.text2}
                activeSecondColor={isSignIn}>
                {singup}
              </TextTheme>
            </Pressable>
          </View>

          <Animated.View
            key={`${isSignIn}`}
            entering={entering}
            exiting={exiting}
            layout={layout}
            style={styles.formInputContainer}>
            <InputText
              isDisplay={!isSignIn}
              id={getLabel<SignUpType>('name')}
              control={control}
              isRequire={!isSignIn}
              length={{minLength: 5}}
              placeHolder={name}
              error={errors.name}
              containerStyle={styles.inputContainer}
              inputStyle={styles.inputStyle}
              errStyle={styles.errStyle}
              errorText={nameAlert}
            />

            <InputText
              id={getLabel<SignUpType>('email')}
              control={control}
              isRequire
              pattern={{value: emailReg, message: ''}}
              placeHolder={email}
              error={errors.email}
              containerStyle={styles.inputContainer}
              inputStyle={styles.inputStyle}
              errStyle={styles.errStyle}
              errorText={emailAlert}
            />

            <InputText
              id={getLabel<SignUpType>('password')}
              control={control}
              isRequire
              textSecure={!isShowPassword}
              length={{minLength: 8}}
              placeHolder={passwrod}
              error={errors.password}
              containerStyle={styles.inputContainer}
              inputStyle={styles.inputStyle}
              errStyle={styles.errStyle}
              errorText={passwordAlert}
              rightInputComponent={
                <ViewTheme>
                  {({colors: {card}}) => (
                    <BtnAnimated onPress={toggleShowPassword}>
                      {isShowPassword ? (
                        <Eye color={card} width={eyeSize} height={eyeSize} />
                      ) : (
                        <EyeOff color={card} width={eyeSize} height={eyeSize} />
                      )}
                    </BtnAnimated>
                  )}
                </ViewTheme>
              }
            />
          </Animated.View>

          <BtnAnimated
            onPress={handleSubmit(onSubmit)}
            bgColor={colors.main3}
            style={styles.btnContainer}>
            <Text style={styles.btnText}>{isSignIn ? signin : singup}</Text>
          </BtnAnimated>
        </View>

        <Text style={styles.privacyText}>{privacy}</Text>

        <Text style={styles.privacyText}>or</Text>

        <View style={styles.anotherSigninContainer}>
          <BtnAnimated style={styles.signinBtn} onPress={() => {}}>
            <Google width={iconSize} height={iconSize} />
          </BtnAnimated>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  formContainer: {
    gap: dimension.height * 0.05,
  },

  formInputContainer: {
    gap: dimension.height * 0.02,
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1.5,
    borderBlockColor: '#f0f0f0',
  },

  inputStyle: {
    fontFamily: fonts.regular,
    fontSize: dimension.width * 0.045,
  },

  btnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: dimension.height * 0.015,
    borderRadius: 12,
  },

  btnText: {
    fontFamily: fonts.semiBold,
    fontSize: dimension.width * 0.05,
    color: colors.main1,
  },

  privacyText: {
    textAlign: 'center',
    fontFamily: fonts.medium,
    fontSize: dimension.width * 0.042,
    color: colors.text2,
    width: '80%',
    alignSelf: 'center',
  },

  anotherSigninContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  signinBtn: {
    padding: 10,
    borderRadius: '50%',
    boxShadow: shadow(1, 2),
  },

  errStyle: {
    fontFamily: fonts.regular,
    fontSize: dimension.width * 0.038,
    color: 'red',
  },
});
