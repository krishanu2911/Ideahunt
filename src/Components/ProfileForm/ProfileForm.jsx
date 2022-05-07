import React from "react";
import "./ProfileForm.css";
import { useTheme } from "Context";
import { Container } from "@chakra-ui/react";
import { FormControl, FormLabel } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { Textarea } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";

const ProfileForm = () => {
  const { themeState } = useTheme();
  const { theme } = themeState;
  return (
    <div className="profile-page-container" centerContent>
      <Container maxW="4xl" centerContent>
        <div className="profile-div">
          <Text
            fontSize="2xl"
            bg={theme === "light" ? "rgb(246, 248, 250)" : "#141414"}
            color={theme === "light" ? "#000" : "#fff"}
            my={1}
            p={2}
            borderRadius="0.3rem"
          >
            Profile
          </Text>
          <div className="profile-form">
            <FormControl isRequired>
              <FormLabel htmlFor="first-name" color={theme==="light" ? "black" : "white"}>First name</FormLabel>
              <Input id="first-name" placeholder="First name" />
              <FormLabel htmlFor="last-name" color={theme==="light" ? "black" : "white"}>Last name</FormLabel>
              <Input id="last-name" placeholder="Last name" />
              <FormLabel htmlFor="bio" color={theme==="light" ? "black" : "white"}>Brief Bio</FormLabel>
              <Textarea
                id="bio"
                placeholder="Please Describe yourself in few Words"
              />
              <Button colorScheme="teal" variant="outline" my={2}>
                Save
              </Button>
            </FormControl>
          </div>
        </div>
        <div className="profile-div">
          <Text
            fontSize="2xl"
            bg={theme === "light" ? "rgb(246, 248, 250)" : "#141414"}
            color={theme === "light" ? "#000" : "#fff"}
            my={1}
            p={1}
            borderRadius="0.3rem"
          >
            Social Links
          </Text>
          <div className="profile-form">
            <FormControl isRequired>
              <FormLabel htmlFor="email" color={theme==="light" ? "black" : "white"}>Email</FormLabel>
              <Input id="email" placeholder="Enter your Email" type="email" />
              <FormLabel htmlFor="Github" color={theme==="light" ? "black" : "white"}>Github</FormLabel>
              <Input id="Github" placeholder="Github Url" />
              <FormLabel htmlFor="linkedIn" color={theme==="light" ? "black" : "white"}>LinkedIn</FormLabel>
              <Input id="linkedIn" placeholder="LinkedIn Url" />
              <FormLabel htmlFor="twitter" color={theme==="light" ? "black" : "white"}>Twitter</FormLabel>
              <Input id="twitter" placeholder="Twitter Url" />
              <Button colorScheme="teal" variant="outline" my={2}>
                Save
              </Button>
            </FormControl>
          </div>
        </div>
      </Container>
    </div>
  );
}

export { ProfileForm };
