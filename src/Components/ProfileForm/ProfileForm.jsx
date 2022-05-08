import React, { useEffect, useState } from "react";
import "./ProfileForm.css";
import { useTheme } from "Context";
import { Container } from "@chakra-ui/react";
import { FormControl, FormLabel } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { Textarea } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { supabase } from "supabaseClient";
import { useAuth } from "../../Context/AuthContext/Context";
import { useParams } from "react-router-dom";
import { emailRegex } from "../../Regex/Regex";
const ProfileForm = () => {
  const [initialUserData, setInitialUserData] = useState({
    email: "",
    firstname: "",
    github_url: null,
    id: "",
    lastname: "",
    linkedin_url: null,
    twitter_url: null,
  });
  const { user } = useAuth();
  const { userId } = useParams();
  const { themeState } = useTheme();
  const { theme } = themeState;
  const userdataUpdate = async () => {
    try {
      const { data, error } = await supabase
        .from("user_profile")
        .update(initialUserData)
        .eq("id", userId);
      if (error) {
        console.log(error);
      }
    } catch (e) {
      console.log("Some error occured", e);
    }
  };
  useEffect(() => {
    (async () => {
      try {
        let { data, error } = await supabase
          .from("user_profile")
          .select("*")
          .eq("id", userId);
        setInitialUserData(...data);
      } catch (e) {
        console.log(e);
      }
    })();
  }, [userId]);
  const [error, setError] = useState({
    email: {
      isError: false,
      errorMessage: "Enter a valid mail",
    },
  });
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (name === "email") {
      console.log(value);
      !emailRegex.test(value)
        ? setError((prevValue) => ({
            ...prevValue,
            [name]: {
              ...prevValue[name],
              isError: true,
            },
          }))
        : setError((prevValue) => ({
            ...prevValue,
            [name]: {
              ...prevValue[name],
              isError: false,
            },
          }));
      console.log(error);
    }
    setInitialUserData({ ...initialUserData, [name]: value });
  };
  console.log(initialUserData);
  return (
    <div className="profile-page-container" centercontent>
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
            
           { user?.id === userId ? "My Profile" : `${initialUserData.firstname}'s Profile`}
          </Text>
          <div className="profile-form">
            <FormControl isRequired>
              <FormLabel
                htmlFor="first-name"
                color={theme === "light" ? "black" : "white"}
              >
                First name
              </FormLabel>
              <Input
                onChange={(e) => {
                  user?.id === userId && handleChange(e);
                }}
                name="firstname"
                value={initialUserData.firstname}
                id="first-name"
                placeholder="First name"
              />
              <FormLabel
                htmlFor="last-name"
                color={theme === "light" ? "black" : "white"}
              >
                Last name
              </FormLabel>
              <Input
                name="lastname"
                onChange={(e) => {
                  user?.id === userId && handleChange(e);
                }}
                value={initialUserData.lastname}
                id="last-name"
                placeholder="Last name"
              />
              <FormLabel
                htmlFor="bio"
                color={theme === "light" ? "black" : "white"}
              >
                Brief Bio
              </FormLabel>
              <Textarea
                name="bio"
                onChange={(e) => {
                  user?.id === userId && handleChange(e);
                }}
                value={initialUserData.bio}
                id="bio"
                placeholder="Please Describe yourself in few Words"
              />
              {user?.id === userId ? (
                <Button
                  colorScheme="teal"
                  variant="outline"
                  my={2}
                  onClick={() => userdataUpdate()}
                >
                  Save
                </Button>
              ) : null}
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
          {/* 
          bio: null
email: "biradaraishwarya9@gmail.com"
firstname: "Aishwarya"
github_url: null
id: "a0574e87-785c-495d-8c9d-d8b7384c5cae"
lastname: "Biradar"
linkedin_url: null
twitter_url: null
          */}
          <div className="profile-form">
            <FormControl isRequired>
              <FormLabel
                htmlFor="email"
                color={theme === "light" ? "black" : "white"}
              >
                Email
              </FormLabel>
              <Input
                name="email"
                onChange={(e) => {
                  user?.id === userId && handleChange(e);
                }}
                value={initialUserData.email}
                id="email"
                placeholder="Enter your Email"
                type="email"
              />
              {error.email.isError && (
                <span className="text-span text-center">
                  {error.email.errorMessage}
                </span>
              )}
              <FormLabel
                htmlFor="Github"
                color={theme === "light" ? "black" : "white"}
              >
                Github
              </FormLabel>
              <Input
                name="github_url"
                onChange={(e) => {
                  user?.id === userId && handleChange(e);
                }}
                value={initialUserData.github_url}
                id="Github"
                placeholder="Github Url"
              />
              <FormLabel
                htmlFor="linkedIn"
                color={theme === "light" ? "black" : "white"}
              >
                LinkedIn
              </FormLabel>
              <Input
                name="linkedin_url"
                onChange={(e) => {
                  user?.id === userId && handleChange(e);
                }}
                value={initialUserData.linkedin_url}
                id="linkedIn"
                placeholder="LinkedIn Url"
              />
              <FormLabel
                htmlFor="twitter"
                color={theme === "light" ? "black" : "white"}
              >
                Twitter
              </FormLabel>
              <Input
                name="twitter_url"
                onChange={(e) => {
                  user?.id === userId && handleChange(e);
                }}
                value={initialUserData.twitter_url}
                id="twitter"
                placeholder="Twitter Url"
              />
              {user?.id === userId ? (
                <Button colorScheme="teal" variant="outline" my={2}>
                  Save
                </Button>
              ) : null}
            </FormControl>
          </div>
        </div>
      </Container>
    </div>
  );
};

export { ProfileForm };
