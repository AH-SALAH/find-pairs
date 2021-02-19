import { Modal } from 'antd';

const CustomModal = props => {

    return (
        <Modal
            visible={false}
            centered={true}
            icon={null}
            closable={false}
            title={null}
            footer={null}
            width={668}
            {...props}
        >
            {props.children}
        </Modal>
    )
}

export default CustomModal;
