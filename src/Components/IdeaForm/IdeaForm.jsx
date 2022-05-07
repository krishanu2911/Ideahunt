import React, { useState } from 'react'
import "../ProfileForm/ProfileForm.css";
import { useTheme } from "Context";
import { Container, FormControl, FormLabel, Select, Input, Textarea, Text, Button } from "@chakra-ui/react";

const IdeaForm = () => {
  const { themeState } = useTheme();
  const { theme } = themeState;
  const [showForm, setShowForm] = useState(false);
  return (
      <div className="profile-page-container">
            <Button variant="outline" colorScheme="teal" onClick={()=>setShowForm(!showForm)}>{showForm ? "Hide form" : "Add idea"}</Button>
            {showForm && <Container maxW="4xl" centerContent>
                <div className="profile-div">
                <Text
                    fontSize="2xl"
                    bg={theme === "light" ? "rgb(246, 248, 250)" : "#141414"}
                    color={theme === "light" ? "#000" : "#fff"}
                    my={1}
                    p={2}
                    borderRadius="0.3rem"
                >
                    Add your ideas
                </Text>
                <div className="profile-form">
                    <FormControl isRequired>
                    <FormLabel htmlFor="title" color={theme==="light" ? "black" : "white"}>Title</FormLabel>
                    <Input id="title" placeholder="Title" />
                    <FormLabel htmlFor="bio" color={theme==="light" ? "black" : "white"}>Description</FormLabel>
                    <Textarea
                        id="desc"
                        placeholder="Please Describe your idea"
                    />
                    <FormLabel htmlFor="category" color={theme==="light" ? "black" : "white"}>Category</FormLabel>
                    <Select variant='outline' 
                            color={theme === "light" ? "#000" : "#fff"} 
                            placeholder='Select option'>
                        <option value='IOT' className="options">IOT</option>
                        <option value='Backend' className="options">Backend</option>
                        <option value='Web development' className="options">Web development</option>
                    </Select>
                    <Button colorScheme="teal" variant="outline" my={2}>
                        Save
                    </Button>
                    </FormControl>
                </div>
            </div>
        </Container>}
      <div className="idea-table">
        

      </div>
    </div>
  )
}

export { IdeaForm };
