import React, { useState, useEffect } from "react";
import "../../App.css";
import {
  Input,
  Button,
  InputGroup,
  InputLeftElement,
  Select,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { Ideamodal } from "../../Components/index";
import { supabase } from "supabaseClient";
import { AiOutlinePlus } from "react-icons/ai";
import { BiUpArrowAlt, BiDownArrowAlt } from "react-icons/bi";
import { useAuth, useTheme } from "Context";
import { Icon } from "@chakra-ui/icon";
import { Link } from "react-router-dom";
import { Toast } from "../../Components/Toast/Toast"
const category = [1, 2, 3, 4, 5, 6];
export default function Explore() {
  const [ideas, setIdeas] = useState([]);
  const [initialIdeas, setInitialIdeas] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [sort, setSort] = useState(false);
  const { themeState } = useTheme();
  const { theme } = themeState;
  const { user } = useAuth();

  const getAllIdeas = async () => {
    try {
      let { data, error } = await supabase
        .from("ideas")
        .select(
          `*, user_profile!ideas_user_id_fkey(id,firstname,lastname),category(*),upvotes(*)`
        )
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

  const searchItems = searchText => {
    setSearchText(searchText);
    if (searchText !== "") {
      const filteredIdeas = ideas.filter(item => {
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

  const sortIdeas = ascending => {
    ascending
      ? ideas.sort((a, b) => (a.upvotes.length) -(b.upvotes.length))
      : ideas.sort((a, b) => (b.upvotes.length) - (a.upvotes.length));
  };

  return (
    <div className="explore-section">
      <div className="explore-header">
        <div className="explore-search">
          <InputGroup size="lg">
            <InputLeftElement
              pointerEvents="none"
              children={<SearchIcon color="gray.400" />}
            />
            <Input
              type="text"
              placeholder="Search idea"
              name="seacrh"
              onInput={e => searchItems(e.target.value)}
            />
          </InputGroup>
          <Link to={`${user ? `/Profile/${user ? user?.id : ""}` : "/login"}`}>
            <Button colorScheme="teal" variant="solid">
              Add new idea
            </Button>
          </Link>
          <div className="explore-actions">
           {sort ? 
              <Button
                colorScheme="teal"
                variant="solid"
                onClick={() => {
                  setSort(false);
                  sortIdeas(false);
                }}
              >
                <BiUpArrowAlt />Most Upvotes
              </Button>
          :
              <Button
                colorScheme="teal"
                variant="solid"
                onClick={() => {
                  setSort(true);
                  sortIdeas(true);
                }}
              >
                <BiDownArrowAlt />Least upvotes
              </Button>}
          </div>
        </div>
      </div>
      <div className="idea_models">
        {ideas.map(idea => {
          return <Ideamodal idea={idea} key={idea.id} />;
        })}
      </div>
    </div>
  );
}
