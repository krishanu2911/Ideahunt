/* eslint-disable no-undef */
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

const ModalDialog = () => {
  return (
    <div>
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
                  <h1>{upvotes.length}</h1>
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
            <h1>{idea.description} </h1>
            <div className="date-section gap-display">
              <h2>Posted at</h2>
              <span>{created_at.split('').slice(0, 10).join('').split('-').reverse().join('-')}</span>
            </div>
          </ModalBody>
          <ModalFooter className="flex-col">
            <div className="gap-display idea-modal-footer">
              <Input placeholder="comment section" size="sm" className="" />
              <Button colorScheme="teal" variant="solid" size="sm">
                comment
              </Button>
            </div>
            <div className="comment-list">
              {
                comments?.map(({id, comment})=>
                  <div className="single-comment">
                    <div className="profile-details">
                      <Icon as={FaUserCircle} w={5} h={5}></Icon>
                      <h3 className="name">Person name</h3>
                      <small className="date">{'2022-05-07'.split('').slice(0, 10).join('').split('-').reverse().join('-')}</small>
                    </div>
                    <h1 key={{id}} className="comment">{comment}</h1>
                  </div> 
                )
              }
            </div>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}

export { ModalDialog };
