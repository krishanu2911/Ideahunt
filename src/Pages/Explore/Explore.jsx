import React from "react";
import "../../App.css";
import { Input, Button , InputGroup , InputLeftElement } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { Ideamodal } from "../../Components/index";
export default function Explore() {
  const dummyArray = [1, 2, 3, 4];
  return (
    <div className="explore-section">
      <div className="explore-header">
        <div className="">
          <InputGroup size="lg">
            <InputLeftElement
              pointerEvents="none"
              children={<SearchIcon color="gray.400" />}
            />
            <Input type="text" placeholder="Search Idea" />
          </InputGroup>
        </div>
        <Button colorScheme="teal" size="lg">
          New Idea!!!
        </Button>
      </div>
      {dummyArray.map((idea) => {
        return <Ideamodal />;
      })}
    </div>
  );
}
