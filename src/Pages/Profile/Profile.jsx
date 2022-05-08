import { ProfileForm, IdeaForm } from "Components";
import React, { useState, useEffect } from "react";
import style from "./Profile.module.css";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";


export default function Profile() {
 
  return (
    <div>
      <Tabs className={style.tabs}>
        <TabList>
          <Tab color="teal" className={style.tab} fontSize="xl">
            Ideas
          </Tab>
          <Tab color="teal" className={style.tab} fontSize="xl">
            Profile
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <IdeaForm />
          </TabPanel>
          <TabPanel>
            <ProfileForm />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
}
