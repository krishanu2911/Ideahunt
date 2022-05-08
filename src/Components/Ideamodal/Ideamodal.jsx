import React, { useState, useEffect } from "react";
import { useDisclosure, Button } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { ArrowUpIcon } from "@chakra-ui/icons";
import "../Ideamodal/Ideamodal.css";
import { useTheme } from "Context";
import { supabase } from "supabaseClient";
import { useAuth } from "Context";

import { ModalDialog } from "Components";
import { Link } from "react-router-dom";
function Ideamodal({ idea }) {
  const { id, title, description, user_profile } = idea;
  const { firstname, lastname } = user_profile;
  const [upvoteToggle, setUpvoteToggle] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [comment, setComment] = useState("");
  const [ideaComments, setIdeaComments] = useState([]);
  const [ideaUpvotes, setIdeaUpvotes] = useState([]);
  const [commentAdded, setCommentAdded] = useState(false);
  const [isUpvoted, setIsUpvoted] = useState(false);
  const { themeState } = useTheme();
  const { theme } = themeState;
  const theme_text = theme === "light" ? "text_light" : "text_dark";

  const { user } = useAuth();
  const { userId } = useParams();

  const isUserSame = user?.id === userId;

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
      <div className="idea-showcase">
        <section>
          <div onClick={onOpen} className="cursor">
            <h1 className={`bold-font ${theme_text}`}>{title}</h1>
            <p className={`idea-intro ${theme_text}`}>{description}</p>
          </div>

          <Link to={`/Profile/${idea.user_profile.id}`}>
            <Button colorScheme="teal" variant="link">
              {isUserSame ? (
            "My idea"
          ) : (
            <>
              <Button colorScheme="teal" variant="link">
                {firstname + " " + lastname}
              </Button>
            </>
          )}
            </Button>
          </Link>

        </section>
        <div className="flex-col">
          <Button
            className="buttonZindex"
            colorScheme="teal"
            variant={isUpvotedByMe() ? "solid" : "outline"}
            onClick={() => {
              setUpvoteToggle((prev) => !prev);
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
      <ModalDialog
        explore={true}
        idea={idea}
        isOpen={isOpen}
        submitComment={submitComment}
        comment={comment}
        setComment={setComment}
        ideaComments={ideaComments}
        onClose={onClose}
        upvoteToggle={upvoteToggle}
        setUpvoteToggle={setUpvoteToggle}
        ideaUpvotes={ideaUpvotes}
        updateUpvote={updateUpvote}
      />
    </div>
  );
}
export { Ideamodal };
