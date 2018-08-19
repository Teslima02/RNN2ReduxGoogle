import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
  DatePickerIOS,
  DatePickerAndroid,
  Image,
  ImageBackground,
  Picker,
} from 'react-native';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import CustomButton from '../../components/CustomButton';
import ImagePicker from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';
import RNFS from 'react-native-fs';

const socialImage = require('../../../img/social.jpg');

class PersonalModal extends Component {
  state = {
    dpHolder: require('../../../img/love2.png'),
  };

  chooseProfileImage = () => {
    const options = {
      title: 'Select profile Photo',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    let self = this;
    ImagePicker.showImagePicker(options, async response => {
      if (!response.didCancel && !response.error) {
        let rotation = 0;
        const { originalRotation } = response;
        if (originalRotation === 90) {
          rotation = 90;
        } else if (originalRotation === 180) {
          //For a few images rotation is 180.
          rotation = -180;
        } else if (originalRotation === 270) {
          //When taking images with the front camera (selfie), the rotation is 270.
          rotation = -90;
        }

        let height = 300;
        let width = 300;
        let format = 'JPEG';
        let quality = 80;

        const resizedImageUri = await ImageResizer.createResizedImage(
          `data:image/jpeg;base64,${response.data}`,
          height,
          width,
          format,
          quality,
          rotation
        );

        const filePath =
          Platform.OS === 'android' && resizedImageUri.uri.replace
            ? resizedImageUri.uri.replace('file:/data', '/data')
            : resizedImageUri.uri;
        const base64Str = await RNFS.readFile(filePath, 'base64');
        self.setState({ dpHolder: { uri: resizedImageUri.uri } });
      }
    });
  };
  treatDate = date => {
    updateUserInfo = d => {
      alert(d.dob);
    };
    if (Platform.OS === 'ios') {
      updateUserInfo({
        dob:
          `${date.getFullYear()}-` + `${date.getMonth() + 1}-${date.getDay()}`,
      });
    } else if (Platform.OS === 'android') {
      const maxDate = new Date();
      maxDate.setFullYear(new Date().getFullYear() - 17);
      DatePickerAndroid.open({
        date: new Date(),
        mode: 'spinner',
        maxDate,
      }).then(({ action, year, month, day }) => {
        if (action === 'dateSetAction') {
          updateUserInfo({ dob: `${year}-${month + 1}-${day}` });
        }
      });
    }
  };

  render() {
    let user = {};
    const { dpHolder } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: Platform.OS === 'android' ? 3 : 2 }}>
          <ImageBackground
            imageStyle={{ resizeMode: 'cover' }}
            style={{
              flex: 1,
              width: null,
              alignSelf: 'stretch',
            }}
            source={socialImage}>
            <LinearGradient
              colors={[
                'rgba(60,14,101, 0.2)',
                'rgba(60,14,101, 0.2)',
                'rgba(60,14,101, 0.7)',
              ]}
              style={{
                top: 0,
                left: 0,
                right: 0,
                height: '100%',
                position: 'absolute',
              }}
            />
            {/* <LinearGradient
              colors={['#3c0e65', '#5d2b8d']}
              start={{ x: 0.0, y: 0.5 }}
              end={{ x: 1.0, y: 0.1 }}
              style={[
                {},
                {
                  padding: 5,
                  alignItems: 'center',
                  borderRadius: 1,
                  justifyContent: 'center',
                  height: '100%',
                },
              ]}
            /> */}

            <TouchableOpacity
              onPress={this.chooseProfileImage}
              style={{
                height: 190,
                width: 300,
                position: 'absolute',
                alignSelf: 'center',
                marginTop: 13,
                zIndex: 55,
              }}>
              <Image
                source={dpHolder}
                style={{
                  alignSelf: 'center',
                  height: 100,
                  width: 100,
                  borderRadius: 50,
                  borderWidth: 2,
                  borderColor: 'white',
                }}
                activeOpacity={0.7}
              />
              <Text
                style={{
                  color: 'white',
                  fontFamily: 'typonil',
                  fontWeight: '600',
                  fontSize: 12,
                  alignSelf: 'center',
                }}>
                Click here to choose profile image
              </Text>
            </TouchableOpacity>
          </ImageBackground>
        </View>
        <View style={{ flex: 6, padding: 10 }}>
          <Text
            style={{
              alignSelf: 'center',
              fontFamily: 'typonil',
              fontSize: 20,
            }}>
            {`What's your Gender?`}
          </Text>
          <Picker
            style={styles.twoPickers}
            itemStyle={styles.twoPickerItems}
            selectedValue={user.gender}
            onValueChange={gender => {}}>
            <Picker.Item label={'Gender'} value={''} />
            <Picker.Item label={'Male'} value={'male'} />
            <Picker.Item label={'Female'} value={'female'} />
          </Picker>

          <Text
            style={{
              alignSelf: 'center',
              fontFamily: 'typonil',
              fontSize: 20,
            }}>
            Your date of Birth
          </Text>

          {Platform.OS === 'ios' && (
            <DatePickerIOS
              mode={'date'}
              minimumDate={new Date()}
              date={user.dob || new Date()}
              onDateChange={date => this.treatDate(date)}
            />
          )}

          {Platform.OS === 'android' && (
            <CustomButton
              colors={['#FFFFFF', '#FFFFFF']}
              text={'Choose Birthday'}
              onPress={() => this.treatDate()}
              buttonStyle={{ borderColor: '#3c0e65', borderWidth: 2 }}
              textStyle={{ color: '#3c0e65' }}
            />
          )}
          <CustomButton text={'Proceed'} onPress={() => {}} />
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    counter: state.counter,
  };
}

const styles = StyleSheet.create({
  twoPickers: {
    marginVertical: 15,
  },
  twoPickerItems: {
    height: 60,
  },
});
export default connect(mapStateToProps)(PersonalModal);
