import React, { Fragment } from 'react';
import { Layout, Icon } from 'antd';
import GlobalFooter from '@/components/GlobalFooter';

const { Footer } = Layout;
const FooterView = () => (
  <Footer style={{ padding: 0 }}>
    <GlobalFooter
      links={[
        {
          key: '邮箱',
          title: <Icon type="mail" />,
          href: 'mailto:forbreak@163.com',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <Icon type="github" />,
          href: 'https://github.com/dunwu',
          blankTarget: true,
        },
        {
          key: '博客',
          title: <Icon type="solution" />,
          href: 'https://www.cnblogs.com/jingmoxukong/',
          blankTarget: true,
        },
      ]}
      copyright={
        <Fragment>
          Copyright <Icon type="copyright" /> 2019 Zhang Peng
        </Fragment>
      }
    />
  </Footer>
);
export default FooterView;
