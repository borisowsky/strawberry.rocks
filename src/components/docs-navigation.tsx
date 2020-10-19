/** @jsx jsx */
import { jsx } from "theme-ui";
import { useStaticQuery, graphql } from "gatsby";
import { Box, Button } from "@theme-ui/components";
import { Link } from "./link";
import { DocsNavigationQuery } from "./__generated__/DocsNavigationQuery";
import { useToggle } from "../helpers/use-toggle";
import { NavigationIcon } from "./icons/navigation";
import { CloseIcon } from "./icons/close";
import { Fragment, useState, useEffect } from "react";
import { useResponsiveValue } from "../helpers/use-responsive-value";

const Nav: React.SFC = () => {
  const {
    allFile: { edges },
  } = useStaticQuery<DocsNavigationQuery>(graphql`
    query DocsNavigationQuery {
      allFile(
        filter: {
          sourceInstanceName: { eq: "strawberry-repo" }
          extension: { eq: "md" }
        }
      ) {
        edges {
          node {
            relativeDirectory
            childMdx {
              frontmatter {
                title
                path
              }
            }
          }
        }
      }
    }
  `);

  const sections = {};

  edges.map(({ node }) => {
    const section = node.relativeDirectory
      .replace(/^docs\//, "")
      .split("/")[0]
      .replace(/^[0-9]+_/, "");

    if (!sections[section]) {
      sections[section] = [];
    }

    sections[section].push(node);
  });

  return (
    <Fragment>
      {Object.entries(sections).map(([section, nodes]) => (
        <Fragment key={section}>
          <h2 sx={{ textTransform: "capitalize" }}>{section}</h2>

          <nav sx={{ mb: 2 }}>
            {nodes.map((node) => (
              <li
                sx={{ listStyle: "none" }}
                key={node.childMdx.frontmatter.path}
              >
                <Link href={node.childMdx.frontmatter.path} variant="docs-nav">
                  {node.childMdx.frontmatter.title}
                </Link>
              </li>
            ))}
          </nav>
        </Fragment>
      ))}
    </Fragment>
  );
};

export const DocsNavigation: React.SFC = () => {
  const [open, toggleOpen] = useToggle(false);

  return (
    <Fragment>
      <Box
        sx={{
          px: 4,
          py: 4,
          display: ["none", "block"],
        }}
      >
        <Nav />
      </Box>

      <Fragment>
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            height: "100vh",
            overflowX: "scroll",
            backgroundColor: "background",
            zIndex: 1,
            p: 4,
            display: [open ? "block" : "none", "none"],
          }}
        >
          <Nav />
        </Box>

        <Button
          sx={{
            position: "fixed",
            bottom: 4,
            right: 4,
            zIndex: 2,
            fill: "primary",
            backgroundColor: "muted",
            borderRadius: "100%",
            width: 70,
            height: 70,
            p: "10px",
            cursor: "pointer",
            boxShadow: "0 0 20px rgba(0, 0, 0, 0.3)",
            display: ["block", "none"],
          }}
          onClick={toggleOpen}
        >
          {open ? <CloseIcon /> : <NavigationIcon />}
        </Button>
      </Fragment>
    </Fragment>
  );
};
