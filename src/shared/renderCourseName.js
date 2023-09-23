export const renderCourseName = (course) => {
  switch (course) {
    case 'frontend':
      return '프론트엔드';
    case 'backend':
      return '백엔드';
    default:
      break;
  }
};