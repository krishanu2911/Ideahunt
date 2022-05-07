import { ProfileForm, IdeaForm } from "Components";
import React, { useState } from "react";
import style from "./Profile.module.css";

export default function Profile() {
  const [profile, setProfile] = useState("Profile");
  return (
    <div>
      <div className={style.profile_tabs}>
        <h3 className={`${style.idea_tabs} ${profile==="Profile" && style.tab_style}`} onClick={()=>setProfile("Profile")}>Your Profile</h3>
        <h3 className={`${style.idea_tabs} ${profile==="Ideas" && style.tab_style}`} onClick={()=>setProfile("Ideas")}>Your Ideas</h3>
      </div>
      { profile==="Profile" ? 
        <ProfileForm />
        :
        <IdeaForm />}
    </div>
  );
}
