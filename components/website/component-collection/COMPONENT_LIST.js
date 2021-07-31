import DashkitButton, { ButtonShape } from 'components/dashkit/Buttons'
import ComponentDetail from './ComponentDetail'
import COMPONENT_TAGS from './COMPONENT_TAGS'


const COMPONENT_LIST = [

    new ComponentDetail({
        name: "Button Login",
        desc: "",
        tags: [COMPONENT_TAGS.button, COMPONENT_TAGS.login, COMPONENT_TAGS.header],
        components: <DashkitButton> Đăng Nhập</DashkitButton>,
        code: `<DashkitButton> Đăng Nhập</DashkitButton>`,
    })

    ,
    
]

export default COMPONENT_LIST;