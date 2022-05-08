import React, { useState, useEffect } from "react";
import "../ProfileForm/ProfileForm.css";
import { useAuth, useTheme } from "Context";
import { Container, 
        FormControl, 
        FormLabel, 
        Select, 
        Input, 
        Textarea, 
        Text, 
        Button,
        Tag, 
        Heading,
        useDisclosure } from "@chakra-ui/react";
import { supabase } from 'supabaseClient';
import { ArrowUpIcon } from '@chakra-ui/icons';
import { ModalDialog } from 'Components';

const ideas = [{ title: "Social media app", 
description: "description", 
category: "Web development",
upvotes: [{}, {}], 
created_at: "2022-05-07", 
comments: ["Good job", "would like to contribute"],
user_profile: {
  firstname: "Sadath",
  lastname: "Shariff"
} }]
const IdeaForm = () => {
  
  const { themeState } = useTheme();
  const { theme } = themeState;
  const [showForm, setShowForm] = useState(false);
  const { user } = useAuth();
  const [category, setCategory] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setForm({ ...form, [name]: value });
  };

  const getCategory = async () => {
    try {
      const { data, error } = await supabase.from("category").select(`*`);
      setCategory(data);
      if (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCategory();
  }, []);

  const findCategory = category.find(
    (item) => item.category_name === form.category
  );  

  const postIdea = async () => {  
    try {
      const { data, error } = await supabase.from("ideas").insert([
        {
          title: form.title,
          description: form.description,
          category_id: findCategory?.id,
          user_id: user.id,
        },
      ]);  
      if (error) {
        console.log(error);
      }
    } catch (e) {
      console.log("Some error occured", e);
    }
  };
  const submitHandler = (e) => {
    e.preventDefault();
    postIdea();
    setForm({
      title: "",
      description: "",
      category: "",
    });
  };

  return (
    <div className="profile-page-container">
      <Button
        variant="outline"
        colorScheme="teal"
        onClick={() => setShowForm(!showForm)}>
        {showForm ? "Hide form" : "Add idea"}
      </Button>
      {showForm && (
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
              Add your ideas
            </Text>
            <div className="profile-form">
              <form onSubmit={(e) => submitHandler(e)}>
                <FormControl isRequired>
                  <FormLabel
                    htmlFor="title"
                    color={theme === "light" ? "black" : "white"}
                  >
                    Title
                  </FormLabel>
                  <Input
                    id="title"
                    placeholder="Title"
                    name="title"
                    value={form.title}
                    onChange={(e) => handleChange(e)}
                  />
                  <FormLabel
                    htmlFor="bio"
                    color={theme === "light" ? "black" : "white"}
                  >
                    Description
                  </FormLabel>
                  <Textarea
                    id="desc"
                    placeholder="Please Describe your idea"
                    name="description"
                    value={form.description}
                    onChange={(e) => handleChange(e)}
                  />
                  <FormLabel
                    htmlFor="category"
                    color={theme === "light" ? "black" : "white"} >
                    Category
                  </FormLabel>
                  <Select
                    variant="outline"
                    color={theme === "light" ? "#000" : "#fff"}
                    placeholder="Select option"
                    name="category"
                    value={form.category}
                    onChange={(e) => handleChange(e)}
                  >
                    {category.map((c) => (
                      <option
                        key={c.id}
                        value={c.category_name}
                        className="options"
                      >
                        {c.category_name}
                      </option>
                    ))} 
                    </Select>
                  <Button
                    colorScheme="teal"
                    variant="outline"
                    my={2}
                    type="submit">
                    Save
                  </Button>
                </FormControl>
              </form>
            </div>
          </div>
        </Container>
      )}
     <div className="idea-listing">
        <Heading as='h3' size='lg' color={theme === "light" ? "#000" : "#fff"}>My ideas</Heading>
        {ideas.map((idea, index) => 
        <div className="main">
          <div className="idea-div" onClick={onOpen}>
            <Text fontSize='lg' color={theme === "light" ? "#000" : "#fff"} >{index+1}</Text>
            <div>
              <div className="idea-header">
                <Heading as='h4' size='sm' color={theme === "light" ? "#000" : "#fff"} className="idea-details">
                  Social Media app
                </Heading>
                <div className="idea-upvotes"><ArrowUpIcon />99</div>
              </div>
              <Tag size="md" variant="subtle" colorScheme="teal" className="idea-details">
                Web development
              </Tag>
              <Text fontSize='sm' color={theme === "light" ? "#000" : "#fff"} className="idea-desc idea-details">In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available.</Text>
            </div>
          </div>
          <ModalDialog idea={idea} isOpen={isOpen} onClose={onClose} />
        </div>)}
    </div>
    </div>
  );
};

export { IdeaForm };

// ideaComments, 
// submitComment, 
// comment, 
// setComment, 
// upvoteToggle=null, 
// setUpvoteToggle=null, 
// ideaUpvotes,
// updateUpvote
