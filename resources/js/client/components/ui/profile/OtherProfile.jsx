import React from 'react';
import ProfileBase from '../../../pages/Profile';
import { useParams } from 'react-router-dom';

const OtherProfile = () => {
  const { userId } = useParams();

  return <ProfileBase isOwner={false} userId={userId} />;
};

export default OtherProfile;