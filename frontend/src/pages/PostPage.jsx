import {
  Avatar,
  Flex,
  Text,
  Image,
  Box,
  Divider,
  Button,
  Spinner,
} from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";
import Actions from "../components/Actions";
import { useEffect, useState } from "react";
import useShowToast from "../hooks/useShowToast";
import { useNavigate, useParams } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { DeleteIcon } from "@chakra-ui/icons";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import useGetUserProfile from "../hooks/useGetUserProfile";
import Comment from "../components/Comment";

const PostPage = () => {
  const { user, loading } = useGetUserProfile();
  const [post, setPost] = useState(null);
  const showToast = useShowToast();
  const { pid } = useParams();
  const currentUser = useRecoilValue(userAtom);
  const navigate = useNavigate();

  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await fetch(`/api/posts/${pid}`);
        const data = await res.json();
        if (data.error) {
          return showToast("Error", data.error, "error");
        }
        setPost(data);
      } catch (error) {
        showToast("Error", error, "error");
      }
    };
    getPost();
  }, [showToast, pid]);

  const handleDeletePost = async () => {
    try {
      if (!window.confirm("Delete this post?")) return;

      const res = await fetch(`/api/posts/${post._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.error) {
        return showToast("Error", data.error, "error");
      }
      showToast("Success", "Post deleted", "success");
      navigate(`/${user.username}`);
    } catch (error) {
      showToast("Error", error, "error");
    }
  };

  if (!user && loading) {
    return (
      <Flex justifyContent={"center"}>
        <Spinner size={"xl"} />
      </Flex>
    );
  }

  if (!post) return null;

  return (
    <>
      <Flex>
        <Flex w={"full"} alignItems={"center"} gap={3}>
          <Avatar src={user.profilePic} size={"md"} name={user.name} />
          <Flex>
            <Text fontSize={"sm"} fontWeight={"bold"}>
              {user.username}
            </Text>
            <Image src="/verified.png" w={4} h={4} ml={4} />
          </Flex>
        </Flex>
        <Flex gap={4} alignItems={"center"}>
          <Text
            fontSize={"xs"}
            width={36}
            textAlign={"right"}
            color={"gray.light"}
          >
            {formatDistanceToNow(new Date(post.createdAt)).replace(
              /^about\s/,
              ""
            )}{" "}
            ago
          </Text>
          {currentUser._id === user?._id && (
            <DeleteIcon
              size={20}
              onClick={handleDeletePost}
              cursor={"pointer"}
            />
          )}
        </Flex>
      </Flex>
      <Text my={3}>{post.text}</Text>

      {post.img && (
        <Box
          borderRadius={6}
          overflow={"hidden"}
          border={"1px solid"}
          borderColor={"gray.light"}
        >
          <Image src={post.img} w={"full"}></Image>
        </Box>
      )}

      <Flex gap={3} my={3}>
        <Actions post={post} />
      </Flex>
      <Divider my={4} />

      <Flex justifyContent={"space-between"}>
        <Flex gap={2} alignItems={"center"}>
          <Text fontSize={"2xl"}>👋</Text>
          <Text color={"gray.light"}>Get the app to like, reply and post.</Text>
        </Flex>
        <Button>Get</Button>
      </Flex>
      <Divider my={4} />
      {post.replies.map((reply) => (
        <Comment
          key={reply._id}
          reply={reply}
          lastReply={reply._id === post.replies[post.replies.length - 1]._id}
        />
      ))}
    </>
  );
};
export default PostPage;
