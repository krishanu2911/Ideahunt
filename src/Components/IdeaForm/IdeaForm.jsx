import React, { useState, useEffect } from "react";
import "../ProfileForm/ProfileForm.css";
import { useAuth, useTheme } from "Context";
import { useParams } from "react-router-dom";
import {
  Container,
  FormControl,
  FormLabel,
  Select,
  Input,
  Textarea,
  Text,
  Button,
  Tag,
  Heading,
  useDisclosure,
} from "@chakra-ui/react";
import { supabase } from "supabaseClient";
import { ArrowUpIcon } from "@chakra-ui/icons";
import { Ideamodal, ModalDialog } from "Components";
import { Toast } from "Components";
const IdeaForm = () => {
  const { themeState } = useTheme();
  const { theme } = themeState;
  const [showForm, setShowForm] = useState(false);
  const [category, setCategory] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useAuth();
  const { userId } = useParams();

  const [userIdeas, setUserIdeas] = useState([]);
  const getAllUserIdeas = async () => {
    try {
      let { data, error } = await supabase
        .from("ideas")
        .select(
          `*, user_profile!ideas_user_id_fkey(id,firstname,lastname),category(*)`
        )
        .match({ user_id: userId })
        .order("created_at", { ascending: false });
      setUserIdeas(data);
      if (error) {
        console.log(error);
      }
    } catch (e) {
      console.log("Some error occured", e);
    }
  };

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
  useEffect(() => {
    getAllUserIdeas();
  }, [form]);

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
    Toast("Saved Idea Detail","success")
    setForm(()=>({
      title: "",
      description: "",
      category: "",
    }));
  };

  return (
    <div className="profile-page-container">
      {user?.id === userId ? (
        <Button
          variant="outline"
          colorScheme="teal"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Hide form" : "Add idea"}
        </Button>
      ) : null}
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

      <div className="idea-listing">
        <Heading as="h3" size="lg" color={theme === "light" ? "#000" : "#fff"}>
          {user?.id === userId ? (
            "My ideas"
          ) : (
            <>{userIdeas[0]?.user_profile?.firstname + "'s ideas"}</>
          )}
        </Heading>
        {userIdeas?.map((idea) => (
          <Ideamodal idea={idea} key={idea.id} isProfilePage={true} />
        ))}
      </div>
    </div>
  );
};

export { IdeaForm };
