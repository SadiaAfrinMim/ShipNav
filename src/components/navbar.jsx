import React, { useState, useEffect } from 'react';
import {
  Layout,
  Menu,
  Button,
  Dropdown,
  Avatar,
  Input,
  Badge,
  Drawer,
  Switch,
  Typography,
  Divider
} from 'antd';
import {
  SearchOutlined,
  BellOutlined,
  MessageOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  MoonOutlined,
  SunOutlined,
  MenuOutlined,
  DashboardOutlined,
  ShoppingCartOutlined,
  TeamOutlined,
  BarChartOutlined,
  AppstoreOutlined,
  RocketOutlined,
  CloseOutlined,
  DownOutlined,
  RightOutlined
} from '@ant-design/icons';

const { Header } = Layout;
const { Title } = Typography;
const { Search } = Input;
const { SubMenu } = Menu;

const MindBlowingNavbar = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [current, setCurrent] = useState('dashboard');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);
  const [openSubMenuKeys, setOpenSubMenuKeys] = useState([]);

  // Menu configuration array - easily modifiable
  const menuConfig = [
    {
      key: 'dashboard',
      label: 'Dashboard',
      icon: <DashboardOutlined />,
    },
    {
      key: 'projects',
      label: 'Projects',
      icon: <AppstoreOutlined />,
    },
    {
      key: 'analytics',
      label: 'Analytics',
      icon: <BarChartOutlined />,
    },
    {
      key: 'team',
      label: 'Team',
      icon: <TeamOutlined />,
      submenu: [
        { key: 'team:1', label: 'Option 1' },
        { key: 'team:2', label: 'Option 2' },
        { key: 'team:3', label: 'Option 3' },
      ],
    },
    {
      key: 'store',
      label: 'Store',
      icon: <ShoppingCartOutlined />,
    },
    // Add more menu items here as needed
    // Example with nested submenu:
    
    {
      key: 'services',
      label: 'Services',
      icon: <SettingOutlined />,
      submenu: [
        { key: 'service:1', label: 'Web Development' },
        { key: 'service:2', label: 'Mobile Apps' },
        { 
          key: 'service:3', 
          label: 'Cloud Solutions',
          submenu: [
            { key: 'cloud:1', label: 'AWS' },
            { key: 'cloud:2', label: 'Azure' },
            { key: 'cloud:3', label: 'Google Cloud' },
          ]
        },
      ],
    },
    
  ];

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 992);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const userMenuItems = [
    { key: 'profile', icon: <UserOutlined />, label: 'Profile' },
    { key: 'settings', icon: <SettingOutlined />, label: 'Settings' },
    { type: 'divider' },
    { key: 'logout', icon: <LogoutOutlined />, label: 'Logout', danger: true },
  ];

  // Custom submenu title with dropdown arrow for desktop
  const CustomSubMenuTitle = ({ label, icon }) => (
    <span style={{ display: 'flex', alignItems: 'center' }}>
      {icon}
      <span style={{ marginLeft: '8px' }}>{label}</span>
      <DownOutlined style={{ fontSize: '10px', marginLeft: '6px', transition: 'transform 0.3s' }} />
    </span>
  );

  // Handle submenu open/close
  const onOpenChange = (keys) => {
    setOpenSubMenuKeys(keys);
  };

  // Recursive function to render menu items (supports nested submenus)
  const renderMenuItems = (items, isMobileMenu = false) => {
    return items.map(item => {
      if (item.submenu) {
        return (
          <SubMenu 
            key={item.key}
            title={isMobileMenu ? (
              <span>
                {item.icon}
                <span style={{ marginLeft: '8px' }}>{item.label}</span>
              </span>
            ) : (
              <CustomSubMenuTitle label={item.label} icon={item.icon} />
            )}
            icon={isMobileMenu ? item.icon : null}
            expandIcon={isMobileMenu && openSubMenuKeys.includes(item.key) ? <DownOutlined /> : <RightOutlined />}
            popupClassName={darkMode ? 'dark-submenu' : 'light-submenu'}
          >
            {renderMenuItems(item.submenu, isMobileMenu)}
          </SubMenu>
        );
      }
      
      return (
        <Menu.Item key={item.key} icon={isMobileMenu ? item.icon : null}>
          {isMobileMenu ? (
            <span>
              {item.icon}
              <span style={{ marginLeft: '8px' }}>{item.label}</span>
            </span>
          ) : (
            <>
              {item.icon}
              <span style={{ marginLeft: '8px' }}>{item.label}</span>
            </>
          )}
        </Menu.Item>
      );
    });
  };

  return (
    <>
      <Header
        style={{
          background: darkMode
            ? 'linear-gradient(135deg, rgba(16, 20, 30, 0.95) 0%, rgba(25, 30, 45, 0.95) 100%)'
            : 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(245, 247, 250, 0.95) 100%)',
          backdropFilter: 'blur(10px)',
          borderBottom: darkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.06)',
          padding: '0 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          boxShadow: darkMode
            ? '0 4px 20px rgba(0, 0, 0, 0.2)'
            : '0 4px 20px rgba(0, 0, 0, 0.08)',
          height: '64px',
          minWidth: '320px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', marginRight: isMobile ? '8px' : '16px' }}>
            <RocketOutlined
              style={{
                fontSize: isMobile ? '20px' : '28px',
                marginRight: '8px',
                background: 'linear-gradient(135deg, #1890ff, #722ed1)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                flexShrink: 0
              }}
            />
            <Title
              level={isMobile ? 5 : 3}
              style={{
                margin: 0,
                background: 'linear-gradient(135deg, #1890ff, #722ed1)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 700,
                whiteSpace: 'nowrap',
                display: isMobile ? 'none' : 'block'
              }}
            >
              ShipNav
            </Title>
            <Title
              level={5}
              style={{
                margin: 0,
                background: 'linear-gradient(135deg, #1890ff, #722ed1)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 700,
                whiteSpace: 'nowrap',
                display: !isMobile ? 'none' : 'block'
              }}
            >
              SN
            </Title>
          </div>

          {!isMobile && (
            <Menu
              theme={darkMode ? 'dark' : 'light'}
              mode="horizontal"
              selectedKeys={[current]}
              onClick={(e) => setCurrent(e.key)}
              style={{
                background: 'transparent',
                border: 'none',
                marginLeft: '16px',
                fontWeight: 500,
                flex: 1,
                minWidth: 0
              }}
            >
              {renderMenuItems(menuConfig)}
            </Menu>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
          {!isMobile && (
            <Search
              placeholder="Search..."
              allowClear
              enterButton={<SearchOutlined />}
              size="middle"
              style={{
                width: 200,
                marginRight: '8px'
              }}
            />
          )}

          <Switch
            checked={darkMode}
            onChange={setDarkMode}
            checkedChildren={<MoonOutlined />}
            unCheckedChildren={<SunOutlined />}
            style={{ background: darkMode ? '#141414' : '#ccc' }}
          />

          {!isMobile && (
            <>
              <Badge count={5} size="small">
                <Button
                  type="text"
                  icon={<BellOutlined />}
                  shape="circle"
                  style={{
                    color: darkMode ? '#fff' : 'rgba(0, 0, 0, 0.65)',
                  }}
                />
              </Badge>

              <Badge count={12} size="small">
                <Button
                  type="text"
                  icon={<MessageOutlined />}
                  shape="circle"
                  style={{
                    color: darkMode ? '#fff' : 'rgba(0, 0, 0, 0.65)',
                  }}
                />
              </Badge>
            </>
          )}

          <Dropdown 
            menu={{ items: userMenuItems }} 
            trigger={['click']}
            placement="bottomRight"
          >
            <Avatar
              size={isMobile ? 'small' : 'default'}
              icon={<UserOutlined />}
              src="https://xsgames.co/randomusers/avatar.php?g=pixel"
              style={{
                cursor: 'pointer',
                border: '2px solid #1890ff',
                display: isMobile ? 'none' : 'block'
              }}
            />
          </Dropdown>

          <Button
            type="text"
            icon={<MenuOutlined />}
            onClick={() => setDrawerVisible(true)}
            style={{
              color: darkMode ? '#fff' : 'rgba(0, 0, 0, 0.65)',
              display: isMobile ? 'block' : 'none'
            }}
          />
          
          {!isMobile && (
            <Button
              type="text"
              icon={<SearchOutlined />}
              style={{
                color: darkMode ? '#fff' : 'rgba(0, 0, 0, 0.65)',
                display: 'none'
              }}
            />
          )}
        </div>
      </Header>

      <Drawer
        title={
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span>Menu</span>
            <Button 
              type="text" 
              icon={<CloseOutlined />} 
              onClick={() => setDrawerVisible(false)}
            />
          </div>
        }
        placement="right"
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
        bodyStyle={{
          padding: 0,
          background: darkMode
            ? 'linear-gradient(135deg, rgba(16, 20, 30, 0.98) 0%, rgba(25, 30, 45, 0.98) 100%)'
            : 'linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(245, 247, 250, 0.98) 100%)',
        }}
        headerStyle={{
          background: 'transparent',
          borderBottom: darkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.06)',
        }}
        style={{
          backdropFilter: 'blur(10px)',
        }}
        width={300}
      >
        <div style={{ padding: '16px' }}>
          <Search
            placeholder="Search..."
            allowClear
            enterButton={<SearchOutlined />}
            size="middle"
            style={{ width: '100%', marginBottom: '16px' }}
          />
        </div>
        
        <Divider style={{ margin: 0 }} />
        
        <Menu
          theme={darkMode ? 'dark' : 'light'}
          mode="inline"
          selectedKeys={[current]}
          openKeys={openSubMenuKeys}
          onOpenChange={onOpenChange}
          onClick={(e) => {
            // Only close drawer if it's not a submenu item
            if (!e.key.includes(':')) {
              setCurrent(e.key);
              setDrawerVisible(false);
            }
          }}
          style={{
            background: 'transparent',
            border: 'none',
            padding: '8px 0',
          }}
        >
          {renderMenuItems(menuConfig, true)}
        </Menu>
        
        <Divider style={{ margin: 0 }} />
        
        <div style={{ padding: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <span>Dark Mode</span>
            <Switch
              checked={darkMode}
              onChange={setDarkMode}
              checkedChildren={<MoonOutlined />}
              unCheckedChildren={<SunOutlined />}
              style={{ background: darkMode ? '#141414' : '#ccc' }}
            />
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
            <Badge count={5} size="small">
              <Button
                type="text"
                icon={<BellOutlined />}
                style={{
                  color: darkMode ? '#fff' : 'rgba(0, 0, 0, 0.65)',
                }}
              >
                Notifications
              </Button>
            </Badge>
            
            <Badge count={12} size="small">
              <Button
                type="text"
                icon={<MessageOutlined />}
                style={{
                  color: darkMode ? '#fff' : 'rgba(0, 0, 0, 0.65)',
                }}
              >
                Messages
              </Button>
            </Badge>
          </div>
          
          <Dropdown 
            menu={{ items: userMenuItems }} 
            trigger={['click']}
            placement="topRight"
          >
            <Button 
              type="text" 
              icon={<UserOutlined />} 
              style={{ width: '100%', textAlign: 'left' }}
            >
              Profile
            </Button>
          </Dropdown>
        </div>
      </Drawer>

      <style jsx global>{`
        /* Style for the dropdown arrow in submenu */
        .ant-menu-submenu-title .anticon-down {
          font-size: 10px !important;
          margin-left: 6px;
          transition: transform 0.3s;
        }
        
        .ant-menu-submenu-open .ant-menu-submenu-title .anticon-down {
          transform: rotate(180deg);
        }
        
        /* Remove the default arrow from mobile submenus */
        .ant-menu-inline .ant-menu-submenu-arrow {
          display: none !important;
        }
        
        /* Custom expand icon for mobile submenus */
        .ant-menu-submenu-expand-icon {
          position: absolute !important;
          right: 16px !important;
          top: 50% !important;
          transform: translateY(-50%) !important;
        }
        
        /* Custom styles for dark mode submenu */
        .dark-submenu {
          background: linear-gradient(135deg, rgba(16, 20, 30, 0.98) 0%, rgba(25, 30, 45, 0.98) 100%) !important;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .light-submenu {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(245, 247, 250, 0.98) 100%) !important;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(0, 0, 0, 0.06);
        }
        
        /* Medium devices (tablets, 768px and up) */
        @media (max-width: 991px) {
          .ant-layout-header {
            padding: 0 12px !important;
          }
          
          .ant-menu-horizontal {
            display: none !important;
          }
          
          .ant-switch {
            transform: scale(0.8);
          }
          
          .ant-input-search {
            width: 180px !important;
          }
        }
        
        /* Small devices (landscape phones, 576px and up) */
        @media (max-width: 767px) {
          .ant-input-search {
            display: none !important;
          }
          
          .ant-badge {
            display: none !important;
          }
        }
        
        /* Extra small devices (portrait phones, less than 576px) */
        @media (max-width: 575px) {
          .ant-layout-header {
            padding: 0 8px !important;
          }
          
          .ant-avatar {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
};

export default MindBlowingNavbar;