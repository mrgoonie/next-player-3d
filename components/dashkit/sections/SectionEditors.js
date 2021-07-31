import Card, { CardBody, CardFooter, CardHeader } from "components/diginext/containers/Card";
import Section from "components/diginext/containers/Section";
import BlockSplitter from "components/diginext/elements/BlockSplitter";
import InlineSplitter from "components/diginext/elements/InlineSplitter";
import SectionHeader from "../PageHeader";
import DashkitButton, { ButtonSize, ButtonType } from "../Buttons";
import {
  FormDatePicker,
  Input,
  InputDate,
  InputMask,
  InputShape,
  InputTime,
  InputType,
  QuillEditor,
  TextArea,
  TextEditor,
  ValidationType,
} from "components/diginext/form/Form";
import Highlight from "react-highlight";
import { useRef, useState } from "react";
import { DatePicker, Space, TimePicker } from "antd";
import renderHTML from "react-render-html";
import { DefaultStyles } from "../style/DashkitGlobalStyle";

const { RangePicker } = DatePicker;

const AdminSectionEditors = ({ children, ...rest }) => {
  const notEmptyInputRef = useRef();
  const textEditorRef = useRef();
  const [quillCurrentValue, setQuillCurrentValue] = useState("");

  return (
    <Section id="text-editors" padding="30px">
      <SectionHeader title="Text Editors" separator={true} spaceBottom>
        Dashkit Next.ks supports 3 favourite text editors: <strong>TinyMCE, CKEditor and Quill</strong>.
      </SectionHeader>

      <Card style={{ marginBottom: "40px" }}>
        <CardHeader>
          <h3>Text Editor (TinyMCE React)</h3>
        </CardHeader>
        <CardBody>
          <TextEditor defaultValue="<p><strong>Trang trí</strong> đi nào!</p>" ref={textEditorRef} />
          <DashkitButton onClick={() => console.log(textEditorRef.current.value)}>GET VALUE</DashkitButton>
        </CardBody>
      </Card>

      <Card style={{ marginBottom: "40px" }}>
        <CardHeader>
          <h3>Quill Text Editor (Quill React)</h3>
          <p>
            <a href="https://github.com/zenoamaro/react-quill/tree/v2.0.0-beta.2" target="_blank">
              Get started here!
            </a>
          </p>
        </CardHeader>
        <CardBody>
          <QuillEditor
            label="Trang trí bên dưới"
            height={200}
            onChange={(val) => {
              setQuillCurrentValue(val);
            }}
          />
          <DashkitButton onClick={() => console.log(quillCurrentValue)}>GET VALUE</DashkitButton> (Check browser's
          console for the result)
          <div
            className="quill-result"
            style={{
              marginTop: "15px",
              padding: "10px",
              border: `1px solid ${DefaultStyles.colors.borderBold}`,
              borderRadius: "0.8rem",
            }}
          >
            {renderHTML(quillCurrentValue)}
          </div>
        </CardBody>
      </Card>

      <Card style={{ marginBottom: "0px" }}>
        <CardHeader>
          <h3>Text Editor (CKEditor React)</h3>
          <p>
            Chưa làm kịp - dùng cái này tốn phí nên chưa muốn làm =))
            <a
              href="https://ckeditor.com/docs/ckeditor5/latest/builds/guides/integration/frameworks/react.html#quick-start"
              target="_blank"
            >
              Get started here!
            </a>
          </p>
        </CardHeader>
        <CardBody>
          <TextArea height="100px" defaultValue="Là lá la" />
        </CardBody>
      </Card>
    </Section>
  );
};

export default AdminSectionEditors;
