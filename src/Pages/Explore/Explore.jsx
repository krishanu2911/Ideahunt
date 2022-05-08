import React from "react";
import "../../App.css";
import { Input, Button, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { Ideamodal } from "../../Components/index";
import { supabase } from "supabaseClient";
import { useState } from "react";
import { useEffect } from "react";
// import { useAuth } from "Context";
export default function Explore() {
  const [ideas, setIdeas] = useState([]);
  const [initialIdeas, setInitialIdeas] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);
  const [searchText, setSearchText] = useState("");

  const getAllIdeas = async () => {
    try {
      let { data, error } = await supabase
        .from("ideas")
        .select(`*, user_profile!ideas_user_id_fkey(id,firstname,lastname)`)
        .order("created_at", { ascending: false });
      setIdeas(data);
      setInitialIdeas(data);
      if (error) {
        console.log(error);
      }
    } catch (e) {
      console.log("Some error occured", e);
    }
  };

  useEffect(() => {
    getAllIdeas();
  }, [isFiltered]);

  const searchItems = (searchText) => {
    setSearchText(searchText);
    if (searchText !== "") {
      const filteredIdeas = ideas.filter((item) => {
        return Object.values(item.title)
          .join("")
          .toLowerCase()
          .includes(searchText.toLowerCase());
      });
      console.log(filteredIdeas);
      setIdeas(filteredIdeas);
    } else {
      setIdeas(initialIdeas);
    }
  };

  return (
    <div className="explore-section">
      <div className="explore-header">
        <div>
          <InputGroup size="lg">
            <InputLeftElement
              pointerEvents="none"
              children={<SearchIcon color="gray.400" />}
            />
            <Input
              type="text"
              placeholder="Search idea"
              name="seacrh"
              onInput={(e) => searchItems(e.target.value)}
            />
          </InputGroup>
        </div>
        <Button colorScheme="teal" size="lg">
          New Idea
        </Button>
      </div>
      <div className="idea_models">
        {ideas.map((idea) => {
          return <Ideamodal idea={idea} key={idea.id} />;
        })}
      </div>
    </div>
  );
}
