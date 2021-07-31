import React from "react";
import Card, { CardBody, CardFooter, CardHeader } from "components/diginext/containers/Card";
import { BS } from "components/diginext/elements/Splitters";
import Highlight from "react-highlight";

const SectionBlock = ({ children, title, sampleCode }) => {
  const sample = (
    <CardFooter padding={0}>
      <Highlight>{sampleCode}</Highlight>
    </CardFooter>
  );

  return (
    <Card shadow style={{ marginBottom: "30px" }}>
      <CardHeader>
        <h3>
          <strong>{title}</strong>
        </h3>
      </CardHeader>
      <CardBody>{children}</CardBody>
      {sampleCode && sample}
    </Card>
  );
};

export default SectionBlock;
