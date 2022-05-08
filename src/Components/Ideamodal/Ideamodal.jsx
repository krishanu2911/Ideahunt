import React from "react";
import { useState, useEffect } from "react";
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
  SkeletonCircle,
} from "@chakra-ui/react";
import { ArrowUpIcon } from "@chakra-ui/icons";
import "../Ideamodal/Ideamodal.css";
import { Link } from "react-router-dom";
import { useTheme } from "Context";
import { Icon } from "@chakra-ui/react";
import { FaUserCircle } from "react-icons/fa";
import { supabase } from "supabaseClient";
import { useAuth } from "Context";

function Ideamodal({ idea }) {
  const { id, title, description, created_at, user_profile } = idea;
  const {firstname,lastname} = user_profile;
  const [upvoteToggle, setUpvoteToggle] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { themeState } = useTheme();
  const { theme } = themeState;
  const theme_text = theme === "light" ? "text_light" : "text_dark";
  const [comment, setComment] = useState("");
  const { user } = useAuth();
  const [ideaComments, setIdeaComments] = useState([]);
  const [ideaUpvotes, setIdeaUpvotes] = useState([]);
  const [commentAdded, setCommentAdded] = useState(false);
  const [isUpvoted, setIsUpvoted] = useState(false);
  const getCommentsByIdeaId = async () => {
    try {
      let { data, error } = await supabase
        .from("comments")
        .select(`*,user_profile(firstname,lastname)`)
        .eq("idea_id", id);
      setIdeaComments(data);
      setCommentAdded(false);
      if (error) {
        console.log(error);
      }
    } catch (e) {
      console.log("Some error occured", e);
    }
  };

  useEffect(() => {
    getCommentsByIdeaId();
  }, [commentAdded]);

  const updateUpvote = async () => {
    if (upvoteToggle) {
      try {
        const { data, error } = await supabase
          .from("upvotes")
          .delete()
          .match({ idea_id: id, upvotedby_userid: user.id });
        setIsUpvoted(true);
        if (error) console.log(error);
      } catch (e) {
        console.log(e);
      }
    } else {
      try {
        const { data, error } = await supabase
          .from("upvotes")
          .insert([{ idea_id: id, upvotedby_userid: user.id }]);
        console.log(data);
        setIsUpvoted(true);
        if (error) console.log(error);
      } catch (e) {
        console.log(e);
      }
    }
  };

  const getUpvotesByIdeaId = async () => {
    try {
      let { data, error } = await supabase
        .from("upvotes")
        .select(`*`)
        .eq("idea_id", id);
      setIdeaUpvotes(data);
      setIsUpvoted(false);
      if (error) {
        console.log(error);
      }
    } catch (e) {
      console.log("Some error occured", e);
    }
  };

  useEffect(() => {
    getUpvotesByIdeaId();
  }, [isUpvoted]);

  const postComment = async () => {
    try {
      const { data, error } = await supabase
        .from("comments")
        .insert([{ comment: comment, idea_id: id, user_id: user.id }]);
      setCommentAdded(true);
      if (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const submitComment = () => {
    postComment();
    setComment("");
  };

  const isUpvotedByMe = () => ideaUpvotes?.find(vote => vote.idea_id === id);

  return (
    <div>
      <div>
        <div className="idea-showcase">
          <section>
            <div onClick={onOpen} className="cursor">
              <h1 className="bold-font">{title}</h1>
              <p className="idea-intro">{description}</p>
            </div>
            <Link to={`/Profile/${idea.user_id}`}>
            <Button colorScheme="teal" variant="link">
              Author Name
            </Button>
            </Link>
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
          <Button colorScheme="teal" variant="link">
            {firstname + " " + lastname}
          </Button>
        </section>
        <div className="flex-col">
          <Button
            className="buttonZindex"
            colorScheme="teal"
            variant={isUpvotedByMe() ? "solid" : "outline"}
            onClick={() => {
              setUpvoteToggle(prev => !prev);
              updateUpvote();
            }}
          >
            <ArrowUpIcon />
            <h1>{ideaUpvotes.length}</h1>
          </Button>
          <Button colorScheme="teal" variant="solid" onClick={onOpen}>
            View
          </Button>
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
                <Link to={`/Profile/${idea.user_id}`}>
                 <Button colorScheme="teal" variant="link">
                  Author Name
                </Button> 
                </Link>

                <Button colorScheme="teal" variant="link">
                  {firstname + " " + lastname}
                </Button>
              </div>
              <div className="gap-display">
                <Button colorScheme="teal" variant="solid">
                  Connect
                </Button>
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
            <h1>{idea.description} </h1>
            <div className="date-section gap-display">
              <span>Posted at</span>
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
          </ModalBody>
          <ModalFooter className="flex-col">
            <div className="gap-display idea-modal-footer">
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
            </div>
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
  );
}
export { Ideamodal };
