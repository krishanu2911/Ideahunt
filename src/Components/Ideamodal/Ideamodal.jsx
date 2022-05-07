import React from "react";
import { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Input,
  Tag,
} from "@chakra-ui/react";
import { ArrowUpIcon } from "@chakra-ui/icons";
import "../Ideamodal/Ideamodal.css";
function Ideamodal({idea}) {
  const { title, description, created_at, comments, upvotes } = idea;
  const [upvoteToggle, setUpvoteToggle] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <div>
      <div>
        <div className="idea-showcase">
          <section>
            <div onClick={onOpen} className="cursor">
              <h1 className="bold-font">{title}</h1>
              <p className="idea-intro">{description}</p>
            </div>
            <Button colorScheme="teal" variant="link">
              Author Name
            </Button>
          </section>
          <div className="flex-col">
            <Button
              className="buttonZindex"
              colorScheme="teal"
              variant={upvoteToggle ? "solid" : "outline"}
              onClick={() => setUpvoteToggle(prev => !prev)}
            >
              <ArrowUpIcon />
              <h1>99</h1>
            </Button>
            <Button colorScheme="teal" variant="solid" onClick={onOpen}>
              View
            </Button>
          </div>
        </div>
      </div>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          style={{
            margin: "2rem",
          }}
        >
          <ModalHeader>
            <section className="spacebtw marginLeft">
              <div>
                <h1>{idea.title}</h1>
                <Button colorScheme="teal" variant="link">
                  Author Name
                </Button>
              </div>
              <div className="gap-display">
                <Button colorScheme="teal" variant="solid">
                  Connect
                </Button>
                <Button
                  colorScheme="teal"
                  variant={upvoteToggle ? "solid" : "outline"}
                  onClick={() => setUpvoteToggle(prev => !prev)}
                >
                  <ArrowUpIcon />
                  <h1>99</h1>
                </Button>
              </div>
            </section>
            <section className="gap-display">
              <Tag size="md" variant="subtle" colorScheme="teal">
                category
              </Tag>
              <Tag size="md" variant="subtle" colorScheme="teal">
                dummy
              </Tag>
              <Tag size="md" variant="subtle" colorScheme="teal">
                dummy
              </Tag>
            </section>
          </ModalHeader>
          <ModalCloseButton />

          <ModalBody className="flex-col">
            <h1>{idea.description}</h1>
            <div className="date-section gap-display">
              <h2>Created at</h2>
              <span> {created_at} </span>
            </div>
          </ModalBody>
          <hr />
          <ModalFooter className="flex-col">
            <div className="gap-display idea-modal-footer">
              <Input placeholder="comment section" size="sm" className="" />
              <Button colorScheme="teal" variant="solid" size="sm">
                comment
              </Button>
            </div>
            <div className="comment-list">
              {
                comments.map(({id, comment})=>{
                  return <h1 key={{id}} >{comment}</h1>
                })
              }
            </div>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
export { Ideamodal };
