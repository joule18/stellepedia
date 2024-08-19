import { Button } from "@chakra-ui/react";
import { useSetRecoilState } from "recoil";
import userAtom from "../atoms/userAtom.js";
import useShowToast from "../hooks/useShowToast.js";
import { FiLogOut } from "react-icons/fi";

const LogoutButton = () => {
  const showToast = useShowToast();
  const setUser = useSetRecoilState(userAtom);
  const handleLogout = async (req, res) => {
    try {
      const res = await fetch("/api/users/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (data.error) {
        showToast("Error", data.error, "error");
        return;
      }
      localStorage.removeItem("user-threads");
      setUser(null);
    } catch (error) {
      showToast("Error", error, "error");
      console.log(error);
    }
  };
  return (
    <Button
      onClick={handleLogout}
      position={"fixed"}
      top={"30px"}
      right={"30px"}
      size={"sm"}
      py={"20px"}
    >
      <FiLogOut size={29} />
    </Button>
  );
};
export default LogoutButton;
