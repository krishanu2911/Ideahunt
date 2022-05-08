import React from "react";
import "../../App.css";
import { Input, Button , InputGroup , InputLeftElement } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { Ideamodal } from "../../Components/index";
import { supabase } from "supabaseClient";
import { useState } from "react";
import { useEffect } from "react";
// import { useAuth } from "Context";
export default function Explore() {
  const [ideas, setIdeas] = useState([]);

  const getAllIdeas = async () =>{
    try{
      // let { data, error } = await supabase.from("ideas").select("*");
      let { data, error } = await supabase.from("ideas").select(`*, comments(*), upvotes(*)`);
      setIdeas(data);
      console.log(data);
      if(error)
      {
        console.log(error)
      }
    }
    catch(e){
      console.log("Some error occured",e)
    }
  }

  useEffect(()=>{getAllIdeas()},[])

  return (
    <div className="explore-section">
      <div className="explore-header">
        <div>
          <InputGroup size="lg">
            <InputLeftElement
              pointerEvents="none"
              children={<SearchIcon color="gray.400" />}
            />
            <Input type="text" placeholder="Search Idea" />
          </InputGroup>
        </div>
        <Button colorScheme="teal" size="lg">
          New Idea
        </Button>
      </div>
      <div className="idea_models">
        {ideas.map((idea) => {
          return <Ideamodal idea={idea} />;
        })}
      </div>
    </div>
  );
}
