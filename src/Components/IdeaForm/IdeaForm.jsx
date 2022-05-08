import React, { useState, useEffect } from "react";
import "../ProfileForm/ProfileForm.css";
import { useAuth, useTheme } from "Context";
import {
  Container,
  FormControl,
  FormLabel,
  Select,
  Input,
  Textarea,
  Text,
  Button,
} from "@chakra-ui/react";
import { supabase } from "supabaseClient";

const IdeaForm = () => {
  const { themeState } = useTheme();
  const { theme } = themeState;
  const [showForm, setShowForm] = useState(false);
  const { user } = useAuth();
  const [category, setCategory] = useState([]);

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
        onClick={() => setShowForm(!showForm)}
      >
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
                    color={theme === "light" ? "black" : "white"}
                  >
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

                    {/* <option value="Backend" className="options">
                      Backend
                    </option>
                    <option value="Web development" className="options">
                      Web development
                    </option> */}
                  </Select>
                  <Button
                    colorScheme="teal"
                    variant="outline"
                    my={2}
                    type="submit"
                  >
                    Save
                  </Button>
                </FormControl>
              </form>
            </div>
          </div>
        </Container>
      )}
      <div className="idea-table"></div>
    </div>
  );
};

export { IdeaForm };
