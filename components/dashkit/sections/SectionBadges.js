import Card, { CardBody } from "components/diginext/containers/Card";
import Section from "components/diginext/containers/Section";
import InlineSplitter from "components/diginext/elements/InlineSplitter";
import SectionHeader from "../PageHeader";
import AdminBadge, { BadgeType } from "../Badges";

const AdminSectionBadges = ({ children, ...rest }) => {
  return (
    <Section id="badges" padding="30px">
      <SectionHeader title="Badges" separator={true}>
        Custom badge styles with support for multiple sizes, states, and more.
      </SectionHeader>

      <Card shadow={true}>
        <CardBody>
          <AdminBadge type={BadgeType.PRIMARY}>Primary</AdminBadge>
          <InlineSplitter />
          <AdminBadge type={BadgeType.SECONDARY}>Secondary</AdminBadge>
          <InlineSplitter />
          <AdminBadge type={BadgeType.SUCCESS}>Success</AdminBadge>
          <InlineSplitter />
          <AdminBadge type={BadgeType.DANGER}>Danger</AdminBadge>
          <InlineSplitter />
          <AdminBadge type={BadgeType.WARNING}>Warning</AdminBadge>
          <InlineSplitter />
          <AdminBadge type={BadgeType.INFO}>Info</AdminBadge>
          <InlineSplitter />
          <AdminBadge type={BadgeType.LIGHT}>Light</AdminBadge>
          <InlineSplitter />
          <AdminBadge type={BadgeType.DARK}>Dark</AdminBadge>
          <InlineSplitter />
          {/* OUTLINE */}
          <AdminBadge outline={true} type={BadgeType.PRIMARY} style={{ marginBottom: "5px" }}>
            Primary
          </AdminBadge>
          <InlineSplitter />
          <AdminBadge outline={true} type={BadgeType.SECONDARY}>
            Secondary
          </AdminBadge>
          <InlineSplitter />
          <AdminBadge outline={true} type={BadgeType.SUCCESS}>
            Success
          </AdminBadge>
          <InlineSplitter />
          <AdminBadge outline={true} type={BadgeType.DANGER}>
            Danger
          </AdminBadge>
          <InlineSplitter />
          <AdminBadge outline={true} type={BadgeType.WARNING}>
            Warning
          </AdminBadge>
          <InlineSplitter />
          <AdminBadge outline={true} type={BadgeType.INFO}>
            Info
          </AdminBadge>
          <InlineSplitter />
          <AdminBadge outline={true} type={BadgeType.LIGHT}>
            Light
          </AdminBadge>
          <InlineSplitter />
          <AdminBadge outline={true} type={BadgeType.DARK}>
            Dark
          </AdminBadge>
          <InlineSplitter />
          {/* ROUND */}
          <AdminBadge round={true} type={BadgeType.PRIMARY} style={{ marginBottom: "5px" }}>
            Primary
          </AdminBadge>
          <InlineSplitter />
          <AdminBadge round={true} type={BadgeType.SECONDARY}>
            Secondary
          </AdminBadge>
          <InlineSplitter />
          <AdminBadge round={true} type={BadgeType.SUCCESS}>
            Success
          </AdminBadge>
          <InlineSplitter />
          <AdminBadge round={true} type={BadgeType.DANGER}>
            Danger
          </AdminBadge>
          <InlineSplitter />
          <AdminBadge round={true} type={BadgeType.WARNING}>
            Warning
          </AdminBadge>
          <InlineSplitter />
          <AdminBadge round={true} type={BadgeType.INFO}>
            Info
          </AdminBadge>
          <InlineSplitter />
          <AdminBadge round={true} type={BadgeType.LIGHT}>
            Light
          </AdminBadge>
          <InlineSplitter />
          <AdminBadge round={true} type={BadgeType.DARK}>
            Dark
          </AdminBadge>
          <InlineSplitter />
        </CardBody>
      </Card>
    </Section>
  );
};

export default AdminSectionBadges;
