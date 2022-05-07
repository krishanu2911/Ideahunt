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
function Ideamodal() {
  const [upvoteToggle, setUpvoteToggle] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <div>
      <div>
        <div className="idea-showcase">
          <section>
            <div onClick={onOpen} className="cursor">
              <h1 className="bold-font">Idea Title</h1>
              <p className="idea-intro">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </p>
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
              onClick={() => setUpvoteToggle((prev) => !prev)}
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
                <h1>Idea Title</h1>
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
                  onClick={() => setUpvoteToggle((prev) => !prev)}
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
            <h1>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </h1>
            <div className="date-section gap-display">
              <h2>Created at</h2>
              <span>07/05/2022</span>
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
              <h1>dummy comment</h1>
              <h1>dummy comment</h1>
              <h1>dummy comment</h1>
              <h1>dummy comment</h1>
              <h1>dummy comment</h1>
              <h1>dummy comment</h1>
            </div>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
export { Ideamodal };
