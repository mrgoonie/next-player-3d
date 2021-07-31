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

const { RangePicker } = DatePicker;

const AdminSectionForms = ({ children, ...rest }) => {
  const notEmptyInputRef = useRef();
  const textEditorRef = useRef();
  const [quillCurrentValue, setQuillCurrentValue] = useState("");

  return (
    <Section id="forms" padding="30px">
      <SectionHeader title="Forms" separator={true} spaceBottom={false}>
        Dashkit Next.js supports all of form stylings in addition to a handful of new input types and features.
      </SectionHeader>

      {/* --------- INPUTS --------- */}
      <SectionHeader title="Inputs" size={2} spaceBottom={false} />

      <Card style={{ marginBottom: "0px" }}>
        <CardBody>
          <Input label="Email" placeholder="Your email"></Input>
          <Input label="Password" type={InputType.PASSWORD} placeholder="Your password"></Input>
        </CardBody>
        <CardFooter padding="0">
          <Highlight className="html javascript jsx">
            {`<input className="haha">
  <h1>Something</h1>
</input>`}
          </Highlight>
        </CardFooter>
      </Card>

      {/* --------- ROUNDED INPUTS --------- */}
      <SectionHeader title="Rounded inputs" size={2} spaceBottom={false} />

      <Card style={{ marginBottom: "0px" }}>
        <CardBody>
          <Input shape={InputShape.ROUND} placeholder="Your email"></Input>
        </CardBody>
      </Card>

      {/* --------- FLUSH INPUTS --------- */}
      <SectionHeader title="Flush inputs" size={2} spaceBottom={false}>
        Remove vertical padding and borders from a form control
      </SectionHeader>

      <Card style={{ marginBottom: "0px" }}>
        <CardBody>
          <Input shape={InputShape.FLUSH} placeholder="Your email"></Input>
        </CardBody>
      </Card>

      {/* --------- AUTO INPUTS --------- */}
      <SectionHeader title="Auto inputs" size={2} spaceBottom={false}>
        Remove all padding and borders from a form control
      </SectionHeader>

      <Card style={{ marginBottom: "0px" }}>
        <CardBody>
          <Input shape={InputShape.AUTO} placeholder="Your email"></Input>
        </CardBody>
      </Card>

      {/* --------- INPUTS WITH ICONS --------- */}
      <SectionHeader title="Inputs with icons" size={2} spaceBottom={false} />

      <Card style={{ marginBottom: "0px" }}>
        <CardBody></CardBody>
      </Card>

      {/* --------- INPUT MASKING --------- */}
      <SectionHeader title="Input masking" size={2} spaceBottom={false} />

      <Card style={{ marginBottom: "0px" }}>
        <CardBody>
          <InputDate label="Date" />
          <InputTime label="Time" />
          <InputMask
            label="Numeral formatting"
            placeholder="Enter number"
            maskOption={{ numeral: true, numeralThousandsGroupStyle: "thousand" }}
          />
          <InputMask
            label="Prefix"
            placeholder="XXXXXX"
            maskOption={{
              prefix: "PREFIX-",
              uppercase: true,
            }}
          />
          <InputMask label="Credit card" placeholder="Enter credit number" maskOption={{ creditCard: true }} />
        </CardBody>
      </Card>

      {/* --------- INPUT VALIDATION --------- */}
      <SectionHeader title="Validation" size={2} spaceBottom={false} />

      <Card style={{ marginBottom: "0px" }}>
        <CardBody>
          <Input
            ref={notEmptyInputRef}
            label="Not empty"
            placeholder="Write something and delete it."
            validateConditions={[{ type: ValidationType.NOT_EMPTY, errMessage: "Không thể bỏ trống." }]}
            // onChange={(val) => {console.log('val', val)}}
          >
            <DashkitButton onClick={() => alert("isValid = " + notEmptyInputRef.current.isValid.toString())}>
              VALIDATE
            </DashkitButton>
          </Input>

          <Input
            label="Min length is 5 characters & max length is 10 characters"
            placeholder="Write something."
            maxLength="10"
            validateConditions={[{ type: ValidationType.MIN_LENGTH, minLength: 5, errMessage: "Tối thiểu 5 ký tự" }]}
          ></Input>

          <Input
            label="Email validation"
            placeholder="Enter any email to validate."
            validateConditions={[{ type: ValidationType.EMAIL, errMessage: "Không đúng định dạng email" }]}
          ></Input>

          <Input
            label="Số CMND/ID"
            placeholder="Nhập số CMND hoặc ID."
            validateConditions={[{ type: ValidationType.ID_NO, errMessage: "Số CMND/ID không hợp lệ." }]}
          ></Input>

          <Input
            label="Số điện thoại"
            placeholder="Nhập số điện thoại để kiểm tra."
            validateConditions={[{ type: ValidationType.PHONE, errMessage: "Số điện thoại không hợp lệ." }]}
          ></Input>

          <Input
            label="Chỉ được nhập chữ"
            placeholder="Nhập số xem sao nào."
            validateConditions={[{ type: ValidationType.LETTERS, errMessage: "Chỉ được nhập chữ thôi cưng à :))" }]}
          ></Input>

          <Input
            label="Chỉ được nhập số"
            placeholder="Nhập chữ xem sao nào."
            validateConditions={[{ type: ValidationType.NUMBERS, errMessage: "Chỉ được nhập số thôi cưng à :))" }]}
          ></Input>

          <Input
            label="Phải chứa cả ký tự chữ và số"
            placeholder="Nhập thử gì đó xem sao nào."
            validateConditions={[
              {
                type: ValidationType.LETTERS_AND_NUMBERS,
                errMessage: "Phải chứa cả ký tự chữ và số mới được á nha chưa!",
              },
            ]}
          ></Input>
        </CardBody>
      </Card>

      {/* --------- CHECKBOX --------- */}
      <SectionHeader title="Checkbox" size={2} spaceBottom={false} />

      <Card style={{ marginBottom: "0px" }}>
        <CardBody></CardBody>
      </Card>

      {/* --------- RADIO --------- */}
      <SectionHeader title="Radio" size={2} spaceBottom={false} />

      <Card style={{ marginBottom: "0px" }}>
        <CardBody></CardBody>
      </Card>

      {/* --------- SWITCH --------- */}
      <SectionHeader title="Switch" size={2} spaceBottom={false} />

      <Card style={{ marginBottom: "0px" }}>
        <CardBody></CardBody>
      </Card>

      {/* --------- DATE PICKER --------- */}
      <SectionHeader title="Date picker" size={2} spaceBottom={false}>
        Read the docs:{" "}
        <a href="https://ant.design/components/date-picker/" target="_blank">
          https://ant.design/components/date-picker/
        </a>
      </SectionHeader>

      <Card shadow={true}>
        <CardBody>
          Pick date: <FormDatePicker />
          <BlockSplitter />
          Pick date & time: <DatePicker showTime />
          <BlockSplitter />
          Pick time: <TimePicker />
        </CardBody>
      </Card>

      <BlockSplitter />

      <Card shadow={true}>
        <CardBody>
          From date - to date: <RangePicker />
          <BlockSplitter />
          From datetime - to datetime: <RangePicker showTime />
        </CardBody>
      </Card>

      {/* --------- TEXT AREA  --------- */}
      <SectionHeader title="Text area" size={2} spaceBottom={false} />

      <Card style={{ marginBottom: "0px" }}>
        <CardBody>
          <TextArea label="Text area (plain)" height="100px" defaultValue="Dòng này điền sẵn nè!" />

          <TextArea label="Text area (autosize)" autoSize={true} defaultValue="Gõ vào đây nó tự mở rộng ra nè!" />
        </CardBody>
      </Card>

      {/* --------- DRAG & DROP --------- */}
      <SectionHeader title="Drag & drop" size={2} spaceBottom={false} />

      <Card style={{ marginBottom: "0px" }}>
        <CardBody></CardBody>
      </Card>

      {/* --------- SELECT --------- */}
      <SectionHeader title="Select" size={2} spaceBottom={false} />

      <Card style={{ marginBottom: "0px" }}>
        <CardBody></CardBody>
      </Card>
    </Section>
  );
};

export default AdminSectionForms;
