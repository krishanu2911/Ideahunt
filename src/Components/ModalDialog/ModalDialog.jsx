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
} from "@chakra-ui/react";
import { ArrowUpIcon } from "@chakra-ui/icons";
import "../Ideamodal/Ideamodal.css";
import { Icon } from '@chakra-ui/react';
import { FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ModalDialog = (props) => {
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
    updateUpvote=null} = props;
  const { title, upvotes, description, created_at, user_profile } = idea;
  const {firstname,lastname} = user_profile;
  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose} size={'full'}>
        <ModalOverlay />
        <ModalContent
          style={{
            margin: "2rem",
          }}
        >
          <ModalHeader>
            <section className="spacebtw marginLeft">
              <div>
                <h1>{title}</h1>
                <Link to={`/Profile/${idea.user_id}`}>
                <Button colorScheme="teal" variant="link">
                  {firstname + " " + lastname}
                </Button>
                </Link>
              </div>
              <div className="gap-display">
                {explore && <Button colorScheme="teal" variant="solid">
                  Connect
                </Button>}
                <Button
                  colorScheme="teal"
                  variant={upvoteToggle ? "solid" : "outline"}
                  onClick={() => {
                    setUpvoteToggle(prev => !prev);
                    updateUpvote();
                  }}
                >
                  <ArrowUpIcon />
                  <h1>{ideaUpvotes.length}</h1>
                </Button>
              </div>
            </section>
            <section className="gap-display">
              <Tag size="md" variant="subtle" colorScheme="teal">
                category
              </Tag>
            </section>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody className="flex-col">
            <h1>{description} </h1>
            <div className="date-section gap-display">
              <h2>Posted at</h2>
              <span>{created_at.split('').slice(0, 10).join('').split('-').reverse().join('-')}</span>
            </div>
          </ModalBody>
          <ModalFooter className="flex-col">
            {explore && <div className="gap-display idea-modal-footer">
            <Input
                placeholder="comment section"
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
            </div>}
            <div className="comment-list">
            {ideaComments.map(({ id, comment, user_profile }) => (
                <div className="single-comment" key={id}>
                  <div className="profile-details">
                    <Icon as={FaUserCircle} w={5} h={5}></Icon>
                    <h3 className="name">
                      {user_profile.firstname + " " + user_profile.lastname}
                    </h3>
                    <small className="date">
                      {"2022-05-07"
                        .split("")
                        .slice(0, 10)
                        .join("")
                        .split("-")
                        .reverse()
                        .join("-")}
                    </small>
                  </div>
                  <h1 key={{ id }} className="comment">
                    {comment}
                  </h1>
                </div>
              ))}
            </div>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}

export { ModalDialog };
