import React from "react";

import { Modal, Button } from "antd";

export const EditModalComponent = ({
  isVisible,
  handleCancel,
  Element,
  projectDetailId,
}) => {
  return (
    <div>
      <Modal
        className="w-[600px]"
        visible={isVisible}
        maskClosable
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Return
          </Button>,
        ]}
      >
        <div>
          <Element isModal projectDetailId={projectDetailId} />
        </div>
      </Modal>
    </div>
  );
};
