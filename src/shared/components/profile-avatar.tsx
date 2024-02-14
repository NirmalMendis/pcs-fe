import { SxProps } from "@mui/material";
import Avatar from "@mui/material/Avatar";

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
  const sizeObj = {
    width: 40,
    height: 40,
  };
  if (size === "medium") {
    sizeObj.width = 34;
    sizeObj.height = 34;
  }
  return {
    sx: {
      bgcolor: stringToColor(name),
      fontSize: 14,
      width: sizeObj.width,
      height: sizeObj.height,
      textTransform: "capitalize",
    },
    children: `${name.split(" ")[0][0]}${
      name.split(" ").length > 1 ? name.split(" ")[1][0] : ""
    }`,
  };
}

export default function ProfileAvatar({
  name,
  size,
}: {
  name: string;
  size: string;
}) {
  return <Avatar {...stringAvatar(name, size)} />;
}
