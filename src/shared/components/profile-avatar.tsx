import { SxProps } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { MULTIPLE_WHITESPACE_REGEX } from "../../constants/generic-constants";

function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(
  name: string,
  size: string
): { sx: SxProps; children: string } {
  const formattedName = name.replaceAll(MULTIPLE_WHITESPACE_REGEX, " ");
  const sizeObj = {
    width: 40,
    height: 40,
  };
  if (size === "medium") {
    sizeObj.width = 34;
    sizeObj.height = 34;
  } else if (size === "small") {
    sizeObj.width = 28;
    sizeObj.height = 28;
  }
  return {
    sx: {
      bgcolor: stringToColor(formattedName),
      fontSize: 14,
      width: sizeObj.width,
      height: sizeObj.height,
      textTransform: "capitalize",
    },
    children: `${formattedName.split(" ")[0][0]}${
      formattedName.split(" ").length > 1 ? formattedName.split(" ")[1][0] : ""
    }`,
  };
}

export default function ProfileAvatar({
  name,
  size,
}: {
  name: string;
  size: "medium" | "small";
}) {
  return <Avatar {...stringAvatar(name, size)} />;
}
