/** @jsx jsx */
import { jsx, useColorMode } from "theme-ui";
import { Grid } from "@theme-ui/components";
import { AsyncIcon } from "./icons/async";
import { ServerIcon } from "./icons/server";
import { PythonicIcon } from "./icons/pythonic";
import { TypingIcon } from "./icons/typing";
import { ArrowRightIcon } from "./icons/arrow-right";
import { Link } from "./link";

type FeatureProps = {
  bg: string;
  icon?: React.SFC<any>;
  href: string;
};

const Feature: React.SFC<FeatureProps> = ({
  icon: Icon,
  children,
  ...props
}) => {
  const [colorMode] = useColorMode();

  const isDarkMode = colorMode == "dark";

  return (
    <Link
      {...props}
      variant="feature"
      sx={{
        p: 4,
        my: 3,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: isDarkMode && props.bg == "secondary" ? "muted" : "primary",
        textAlign: "left",
        textDecoration: "none",
        transition: "0.2s transform ease-out",
        "&:hover": {
          color: isDarkMode && props.bg == "secondary" ? "muted" : "primary",
          transform: "translate(0, -20px)",
        },
      }}
    >
      {Icon && (
        <Icon
          sx={{
            display: "block",
            my: 2,
            mx: "auto",
            fill: isDarkMode && props.bg == "secondary" ? "muted" : "primary",
            height: 150,
          }}
        />
      )}

      {children}

      <ArrowRightIcon
        sx={{
          ml: 3,
          top: 10,
          stroke: isDarkMode && props.bg == "secondary" ? "muted" : "primary",
          position: "relative",
        }}
      />
    </Link>
  );
};
export const Features: React.SFC = () => (
  <Grid columns={[1, 2, 4]} gap={0} sx={{ my: 4, px: [4, 4, 0] }}>
    <Feature href="/docs/concepts/async" bg="secondary" icon={AsyncIcon}>
      Async
    </Feature>
    <Feature href="/docs/features/server" bg="muted" icon={ServerIcon}>
      Built-in server
    </Feature>
    <Feature href="/docs/concepts/type-hints" bg="secondary" icon={TypingIcon}>
      Typings
    </Feature>
    <Feature href="/docs/why" bg="muted" icon={PythonicIcon}>
      Philosophy
    </Feature>
  </Grid>
);
