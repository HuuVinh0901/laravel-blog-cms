import React from 'react';
import ProfileBase from '../../../pages/Profile';


const MyProfile = () => {
//   const { user } = useAuth(); // Lấy thông tin user hiện tại từ context

  return <ProfileBase isOwner={true} userId={1} />;
};

export default MyProfile;