import UserHeader from "../components/UserHeader";
import UserPost from "../components/UserPost";

const UserPage = () => {
  return (
    <>
      <UserHeader />
      <UserPost
        likes={1200}
        replies={481}
        postImg={"post1.png"}
        postTitle="Let's talk about threads."
      />
      <UserPost
        likes={32}
        replies={43}
        postImg={"post2.png"}
        postTitle="Nice tutorial."
      />
      <UserPost
        likes={767}
        replies={54}
        postImg={"post3.png"}
        postTitle="I love this guy."
      />
      <UserPost likes={43} replies={342} postTitle="this is my first thread." />
    </>
  );
};
export default UserPage;
