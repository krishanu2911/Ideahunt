import { ProfileForm, IdeaForm } from "Components";
import React, { useState } from "react";
import style from "./Profile.module.css";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'

export default function Profile() {
  const [profile, setProfile] = useState("Profile");
  return (
    <div>
      <Tabs className={style.tabs}>
        <TabList>
          <Tab color="teal" className={style.tab} fontSize="xl">Profile</Tab>
          <Tab color="teal" className={style.tab} fontSize="xl">Ideas</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <ProfileForm />
          </TabPanel>
          <TabPanel>
            <IdeaForm />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
}
