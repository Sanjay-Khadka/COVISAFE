// import {getMyCourse, getAllCourse, enrollment} from '../actions/CourseActions';
// import {getAllGrade, getAssignment} from '../actions/assignmentGrades';
// import {changeProfile, ChangePhoto} from '../actions/ProfileUpdate';
// const initialState = {
//   Assignment: [],
//   MyCourse: {},
//   enrolled: {},
//   AllCourse: {},
//   Task: [],
//   Grade: {},
//   photo: {},
// };

// const ComponentReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case getAllGrade:
//       return {
//         ...state,
//         Grade: action.payload,
//       };
//     case getAssignment:
//       return {
//         ...state,
//         Assignment: action.payload,
//       };
//     case enrollment:
//       return {
//         ...state,
//         enrolled: action.payload,
//       };
//     case getMyCourse:
//       return {
//         ...state,
//         MyCourse: action.payload,
//       };
//     case getAllCourse:
//       return {
//         ...state,
//         AllCourse: action.payload,
//       };
//     case changeProfile: {
//       return {
//         ...state,
//       };
//     }
//     case ChangePhoto: {
//       return {
//         ...state,
//         photo: action.payload,
//       };
//     }

//     default:
//       return state;
//   }
// };

// export default ComponentReducer;
