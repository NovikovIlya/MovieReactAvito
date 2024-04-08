import { ConfigProvider, Breadcrumb } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";

const Breadcrumbs = ({ data }) => {
  const navigate = useNavigate();
  return (
    <ConfigProvider
      theme={{
        components: {
          Breadcrumb: {
            itemColor: "rgba(39, 97, 245, 0.8)",
            linkColor: "rgba(39, 97, 245, 0.8)",
            separatorColor: "rgba(39, 97, 245, 0.8)",
            lastItemColor: "rgba(39, 97, 245, 0.8)",
            linkHoverColor: "rgba(39, 97, 245, 0.8)",
          },
        },
      }}
    >
      <Breadcrumb
        items={[
          {
            onClick: () => {
              navigate("/");
            },
            title: (
              <>
                <UserOutlined />
                <span style={{ cursor: "pointer" }}>Фильмы</span>
              </>
            ),
          },
          {
            title: data?.name,
          },
        ]}
      />
    </ConfigProvider>
  );
};

export default Breadcrumbs;
