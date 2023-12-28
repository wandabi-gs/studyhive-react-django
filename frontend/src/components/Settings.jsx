import React, { useState } from 'react'
import { useQuery } from 'react-query';
import { profileQuery } from '../query/user';

function Settings() {
  return (
    <div className="max-w-2xl mx-auto mt-10">
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">Account Settings</h2>
        <ProfileSettings />
        {/* Example: <EmailPasswordSettings /> */}
        {/* Example: <NotificationSettings /> */}
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">Privacy Settings</h2>
        <VisibilitySettings />
        {/* Example: <DataPrivacySettings /> */}
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">Learning Preferences</h2>
        {/* Include components for preferred subjects and learning style */}
        {/* Example: <PreferredSubjectsSettings /> */}
        {/* Example: <LearningStyleSettings /> */}
      </section>

      {/* Additional sections for Group/Community Settings, Content Recommendations, Accessibility Settings, etc. */}
    </div>
  )
}

export default Settings

const ProfileSettings = () => {

  const [profile, setProfile] = useState({})

  const { isLoading } = useQuery("user-profile", profileQuery, {
    onSuccess : (data) => {
      setProfile(data)
      
    }
  })

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Profile Information</h3>
      <div className="control">
        <input type="text" name="" value={profile?.username} id="username" className="profile-input" />
      </div>

      <div className="control">
        <input type="email" value={profile?.email} id="email" className="profile-input" />
      </div>
    </div>
  );
};

const VisibilitySettings = () => {
  return (
    <div>
      <div className="control">

        <label htmlFor="private-account" className="profile-switch-cont">
          <p className="profile-switch-label">Private Account</p>
          <input type="checkbox" name="" id="private-account" />
        </label>
      </div>
    </div>
  )
}