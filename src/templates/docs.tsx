import * as React from "react";
import { graphql } from "gatsby";
import { MDXProvider } from "@mdx-js/react";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { Flex, Box } from "@theme-ui/components";
import { Global, css } from "@emotion/core";
import SEO from "../components/seo";
import { DocsNavigation } from "../components/docs-navigation";
import { DocsPageQuery } from "./__generated__/DocsPageQuery";
import { EditOnGithub } from "../components/edit-on-github";
import GraphQLExample from "../components/graphql-example";
import { Logo } from "../components/logo";
import { Link } from "../components/link";

const DocsPage = ({
  data: { file, github },
}: {
  data: DocsPageQuery;
}): React.ReactElement => (
  <>
    <SEO title={file.childMdx.frontmatter.title} />

    <Global
      styles={css`
        a.anchor.before {
          position: absolute;
          left: -1.5rem;
        }
      `}
    />

    <Flex
      sx={{
        width: "100%",
        mx: "auto",
        flex: 1,
        mt: -160,
        position: "relative",
        zIndex: 0,
      }}
    >
      <Box
        sx={{
          width: 300,
          backgroundColor: "mutedLight",
        }}
      >
        <Box
          sx={{
            my: 2,
            px: 4,
            py: 2,
          }}
        >
          <Logo height="45" />

          <a>Strawberry docs</a>
        </Box>

        <Link
          variant="version"
          target="_blank"
          href="https://pypi.org/project/strawberry-graphql/"
        >
          {github.repository.releases.nodes[0].tagName}
        </Link>

        <DocsNavigation />
      </Box>

      <Box sx={{ px: 5, pb: 6, pt: 160, maxWidth: 960, mx: "auto" }}>
        <MDXProvider
          components={{
            GraphQLExample,
          }}
        >
          <MDXRenderer>{file.childMdx.body}</MDXRenderer>
        </MDXProvider>

        <EditOnGithub relativePath={file.relativePath} />
      </Box>
    </Flex>
  </>
);

export default DocsPage;

export const pageQuery = graphql`
  query DocsPageQuery($relativePath: String!) {
    github {
      repository(owner: "strawberry-graphql", name: "strawberry") {
        url
        releases(last: 1) {
          nodes {
            tagName
          }
        }
      }
    }

    file(relativePath: { eq: $relativePath }) {
      relativePath
      childMdx {
        body
        frontmatter {
          title
        }
      }
    }
  }
`;
