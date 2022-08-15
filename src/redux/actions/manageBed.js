import axios from 'axios';
import {url} from '../../constants';
import {ToastAndroid} from 'react-native';
export const removeBed = 'removeBed';
export const addBed = 'addBed';
export const getbeds = 'getbeds';
export const fetchBedRequest = 'fetchBedRequest';
export const authorizedBedRequest = 'authorizedBed';
export const makeBedRequest = 'makeBedRequest';
export const removebedReq = 'removebedReq';
export const fetchUserBedReq = 'fetchUserBedReq';
export const getUserApprovedBed = 'getUserApprovedBed';

export const createBed = (bedData, authToken) => {
  return async dispatch => {
    console.log(bedData);
    var config = {
      method: 'post',
      url: `${url}/bed/createBed`,
      headers: {
        'auth-token': authToken,
        'Content-Type': 'application/json',
      },
      data: bedData,
    };
    try {
      const {data} = await axios(config);
      // console.warn(data);
      dispatch({type: addBed, payload: data});
      // eslint-disable-next-line no-lone-blocksfac
      {
        data.message
          ? ToastAndroid.showWithGravity(
              data.message,
              ToastAndroid.LONG,
              ToastAndroid.TOP,
            )
          : ToastAndroid.showWithGravity(
              'Sorry could not add Bed',
              ToastAndroid.LONG,
              ToastAndroid.TOP,
            );
      }
    } catch (error) {
      // console.warn(error);
      ToastAndroid.showWithGravity(error, ToastAndroid.LONG, ToastAndroid.TOP);
    }
  };
};

export const getAllBed = () => {
  return async dispatch => {
    var config = {
      method: 'get',
      url: `${url}/bed/getAllBed`,
      headers: {},
    };

    try {
      const {data} = await axios(config);
      dispatch({type: getbeds, payload: data});
    } catch (err) {
      // console.log(err);
      ToastAndroid.showWithGravity(err, ToastAndroid.LONG, ToastAndroid.TOP);
    }
  };
};

export const deleteBed = bed_id => {
  // console.log(bed_id);
  return async dispatch => {
    var config = {
      method: 'delete',
      url: `${url}/bed/${bed_id}`,
      headers: {},
    };
    try {
      const {data} = await axios(config);
      dispatch({type: removeBed, payload: data});
      // eslint-disable-next-line no-lone-blocks
      // console.log(data);
      // eslint-disable-next-line no-lone-blocks
      {
        data.success
          ? ToastAndroid.showWithGravity(
              data.success,
              ToastAndroid.LONG,
              ToastAndroid.BOTTOM,
            )
          : ToastAndroid.showWithGravity(
              'Bed deletion failed',
              ToastAndroid.LONG,
              ToastAndroid.TOP,
            );
      }
    } catch (err) {
      // console.log(err);
      ToastAndroid.showWithGravity(err, ToastAndroid.LONG, ToastAndroid.TOP);
    }
  };
};

export const getBedRequestList = () => {
  var config = {
    method: 'get',
    url: `${url}/getallBedrequests`,
    headers: {},
  };
  return async dispatch => {
    try {
      const {data} = await axios(config);
      // console.log();
      dispatch({type: fetchBedRequest, payload: data});
      // eslint-disable-next-line no-lone-blocks
      {
        data.length !== 0
          ? ToastAndroid.showWithGravity(
              'Bed Request List fetched',
              ToastAndroid.LONG,
              ToastAndroid.BOTTOM,
            )
          : ToastAndroid.showWithGravity(
              'Bed Request list is empty',
              ToastAndroid.LONG,
              ToastAndroid.TOP,
            );
      }
    } catch (err) {
      // console.log(err);
      ToastAndroid.showWithGravity(err, ToastAndroid.LONG, ToastAndroid.TOP);
    }
  };
};

export const getUserBedRequestList = userid => {
  var config = {
    method: 'get',
    url: `${url}/getUBedrequests/${userid}`,
    headers: {},
  };
  return async dispatch => {
    try {
      const {data} = await axios(config);

      dispatch({type: fetchUserBedReq, payload: data});
      // eslint-disable-next-line no-lone-blocks
      {
        data.length !== 0
          ? ToastAndroid.showWithGravity(
              'Bed Request list fetched',
              ToastAndroid.LONG,
              ToastAndroid.BOTTOM,
            )
          : ToastAndroid.showWithGravity(
              'You do not have any Bed Requests',
              ToastAndroid.LONG,
              ToastAndroid.TOP,
            );
      }
    } catch (err) {
      // console.log(err);
      ToastAndroid.showWithGravity(err, ToastAndroid.LONG, ToastAndroid.TOP);
    }
  };
};

export const createBedRequest = (bedId, userId, requestUrgency) => {
  var config = {
    method: 'post',
    url: `${url}/createBed/${bedId}/${userId}`,
    headers: {
      'Content-Type': 'application/json',
    },
    data: requestUrgency,
  };
  return async dispatch => {
    try {
      // console.log(bedId, userId, requestUrgency);
      const {data} = await axios(config);
      // Alert.alert('Bed Request approved');
      // console.log(data);
      dispatch({type: makeBedRequest, payload: data});
      // eslint-disable-next-line no-lone-blocks
      {
        data._id
          ? ToastAndroid.showWithGravity(
              'Bed Request Submitted',
              ToastAndroid.LONG,
              ToastAndroid.BOTTOM,
            )
          : ToastAndroid.showWithGravity(
              'Sorry couldnot submit Bed request',
              ToastAndroid.LONG,
              ToastAndroid.TOP,
            );
      }
    } catch (err) {
      // console.log(err);
      ToastAndroid.showWithGravity(err, ToastAndroid.LONG, ToastAndroid.TOP);
    }
  };
};

export const userApprovedBedReq = id => {
  var config = {
    method: 'get',
    url: `${url}/apbed/${id}`,
  };
  return async dispatch => {
    try {
      const {data} = await axios(config);
      // console.log(data[0]?.request_type);
      dispatch({type: getUserApprovedBed, payload: data});
    } catch (err) {
      // console.log(err);
    }
  };
};
export const acceptBedRequest = BedRequestId => {
  // console.log(BedRequestId);
  var config = {
    method: 'put',
    url: `${url}/apbed/${BedRequestId}`,
    headers: {},
  };
  return async dispatch => {
    try {
      const {data} = await axios(config);
      // console.log(data);
      dispatch({type: authorizedBedRequest, payload: data});
      // eslint-disable-next-line no-lone-blocks
      {
        data.message
          ? ToastAndroid.showWithGravity(
              data.message,
              ToastAndroid.LONG,
              ToastAndroid.BOTTOM,
            )
          : ToastAndroid.showWithGravity(
              'Approving bed request failed',
              ToastAndroid.LONG,
              ToastAndroid.TOP,
            );
      }
    } catch (err) {
      // console.log(err);
      ToastAndroid.showWithGravity(err, ToastAndroid.LONG, ToastAndroid.TOP);
    }
  };
};

export const deletebedReq = bedreqId => {
  // console.log(bedreqId);
  var config = {
    method: 'delete',
    url: `${url}/bedReq/delete/${bedreqId}`,
    headers: {},
  };
  return async dispatch => {
    try {
      const {data} = await axios(config);
      // console.log(data);
      dispatch({type: removebedReq, payload: data});
      // eslint-disable-next-line no-lone-blocks
      {
        data.success
          ? ToastAndroid.showWithGravity(
              data.success,
              ToastAndroid.LONG,
              ToastAndroid.BOTTOM,
            )
          : ToastAndroid.showWithGravity(
              ' Failed to delete bed request',
              ToastAndroid.LONG,
              ToastAndroid.TOP,
            );
      }
    } catch (err) {
      // console.log(err);
      ToastAndroid.showWithGravity(err, ToastAndroid.LONG, ToastAndroid.TOP);
    }
  };
};
