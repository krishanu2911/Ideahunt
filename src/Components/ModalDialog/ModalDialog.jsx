import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  Tag,
  Text,
  Heading
} from "@chakra-ui/react";
import { ArrowDownIcon, ArrowUpIcon } from "@chakra-ui/icons";
import "../Ideamodal/Ideamodal.css";
import { Icon } from '@chakra-ui/react';
import { FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useTheme } from "Context";

const ModalDialog = (props) => {
  const { themeState } = useTheme();
  const { theme } = themeState;
  const {
    explore, 
    idea, 
    isOpen, 
    onClose, 
    ideaComments=[], 
    submitComment=null, 
    comment=null, 
    setComment=null, 
    upvoteToggle=null, 
    setUpvoteToggle=null, 
    ideaUpvotes=9,
    isUpvotedByMe,
    updateUpvote=null} = props;
  const { title, description, created_at, user_profile } = idea;
  const {firstname,lastname} = user_profile;
  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose} size={"full"} colorScheme="teal">
        <ModalOverlay />
        <ModalContent style={{ margin: "2rem" }}>
          <ModalHeader bg={theme === "light" ? "#FFFFFF" : "#1A202C"}>
            <section className="spacebtw marginLeft">
              <div>
                <Heading
                  as="h4"
                  size="md"
                  color={theme === "light" ? "#1A202C" : "#FFFFFF"}
                >
                  {title}
                </Heading>
                <Link to={`/Profile/${idea.user_id}`}>
                  <Button colorScheme="teal" variant="link">
                    {firstname + " " + lastname}
                  </Button>
                </Link>
              </div>
              <div className="gap-display button-actions">
                {explore && (
                  <Button colorScheme="teal" variant="solid" size="sm">
                    Connect
                  </Button>
                )}
                <Button
                  size="sm"
                  colorScheme="teal"
                  variant={upvoteToggle ? "solid" : "outline"}
                  onClick={() => {
                    setUpvoteToggle(prev => !prev);
                    updateUpvote();
                  }}
                >
                  {isUpvotedByMe() ? <ArrowDownIcon /> : <ArrowUpIcon />}
                  <h1>{ideaUpvotes.length}</h1>
                </Button>
              </div>
            </section>
            <section className="gap-display">
              <Tag size="lg" variant="subtle" colorScheme="teal">
                Category
              </Tag>
              <div className="date-section">
                Date :{" "}
                <span>
                  {created_at
                    .split("")
                    .slice(0, 10)
                    .join("")
                    .split("-")
                    .reverse()
                    .join("-")}
                </span>
              </div>
            </section>
          </ModalHeader>
          <ModalCloseButton color={theme === "light" ? "#1A202C" : "#FFFFFF"} />
          <ModalBody
            className="flex-col modal-desc"
            bg={theme === "light" ? "#FFFFFF" : "#1A202C"}
          >
            <Text
              fontSize="lg"
              color={theme === "light" ? "#1A202C" : "#FFFFFF"}
            >
              {description}
            </Text>
          </ModalBody>
          <ModalFooter
            className="flex-col"
            bg={theme === "light" ? "#FFFFFF" : "#1A202C"}
          >
            <div className="gap-display idea-modal-footer">
              <Input
                placeholder="add a comment"
                size="sm"
                className=""
                name="comment"
                value={comment}
                onChange={e => setComment(e.target.value)}
              />
              <Button
                colorScheme="teal"
                variant="solid"
                size="sm"
                onClick={submitComment}
              >
                comment
              </Button>
            </div>
            <div className="comment-list">
              {ideaComments.map(({ id, comment, user_profile }) => (
                <div className="single-comment" key={id}>
                  <div className="profile-details">
                    <Icon
                      as={FaUserCircle}
                      w={5}
                      h={5}
                      color={theme === "light" ? "#1A202C" : "#FFFFFF"}
                    ></Icon>
                    <Heading
                      as="h5"
                      size="sm"
                      className="name"
                      color={theme === "light" ? "#1A202C" : "#FFFFFF"}
                    >
                      {user_profile.firstname + " " + user_profile.lastname}
                    </Heading>
                    <small
                      className="date"
                      color={theme === "light" ? "#1A202C" : "#FFFFFF"}
                    >
                      {"2022-05-07"
                        .split("")
                        .slice(0, 10)
                        .join("")
                        .split("-")
                        .reverse()
                        .join("-")}
                    </small>
                  </div>
                  <Text
                    fontSize="sm"
                    key={{ id }}
                    className="comment"
                    color={theme === "light" ? "#1A202C" : "#FFFFFF"}
                  >
                    {comment}
                  </Text>
                </div>
              ))}
            </div>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

export { ModalDialog };
