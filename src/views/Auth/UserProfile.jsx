import React, {useEffect, useState} from 'react';
import Header from "../../components/Header/Header";
import {StyledUserProfile} from "./UserProfile.styled";
import {Button, Layout, message, Upload, Menu, theme} from "antd";
const {Content, Footer, Sider } = Layout;
import {UploadOutlined,LaptopOutlined, NotificationOutlined, UserOutlined, HeartFilled, YoutubeOutlined} from "@ant-design/icons";
import UsersDesktop from "../../components/Users/UsersDesktop";
import {Redirect, useHistory, useParams} from "react-router-dom";
import {getCurrentUser} from "../../utils/auth";
import MyInformation from "../MyProfile/MyInformation";
import {useDispatch, useSelector} from "react-redux";
import {getListFollowing} from "../../store/follow";
import {getAllRecordByUserId} from "../../store/record_video";
import MyVideos from "../MyProfile/MyVideos";


export const UserProfile = () => {
    const dispatch = useDispatch();
    const {currentListFollowing} = useSelector(state => state.follow);
    const {currentMyListRecord} = useSelector(state => state.record);

    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const [selectedKey, setSelectedKey] = useState('1');
    const {username} = useParams();
    const history = useHistory();

    useEffect(() => {
        if (getCurrentUser().username !== username) {
            history.push("/")
        }
    }, [])

    useEffect(async () => {
        await dispatch(getListFollowing(getCurrentUser().id))
        await dispatch(getAllRecordByUserId(getCurrentUser().id))
    }, [])

    const renderContent = () => {
        switch (selectedKey) {
            case '1':
                return <MyInformation/>;
            case '2':
                return currentListFollowing !== null ? <UsersDesktop currentListUsers={currentListFollowing}/> : <span/>;
            case '3':
                return currentMyListRecord !== null ? <MyVideos currentListRecords={currentMyListRecord}/> : <span/>;
            default:
                return null;
        }
    };

    const items2 = [UserOutlined, HeartFilled, YoutubeOutlined].map((icon, index) => {
        const key = index + 1;
        let label;
        switch (key) {
            case 1:
                label = 'Thông tin của tôi'
                break;
            case 2:
                label = 'Theo dõi của tôi'
                break;
            case 3:
                label = 'Video của tôi'
                break;
        }
        return {
            key: `${key}`,
            icon: <span style={{width: '20px'}}>{React.createElement(icon)}</span>,
            label: <span style={{fontSize: '20px',color: '#5A5A5A'}}>{label}</span>,
        };
    });

    const onClickItem = (e) => {
        setSelectedKey(e.key)
    }

    return (
        <StyledUserProfile>
            <Header mySize="1848" />
            <Layout
                style={{
                    height: '800px',
                    padding: '24px 0',
                    background: colorBgContainer,
                }}
            >
                <Sider
                    style={{
                        background: colorBgContainer,
                        width: '300px'
                    }}
                >
                    <Menu
                        mode="vertical"
                        defaultSelectedKeys={['1']}
                        style={{
                            height: '100%',
                            width: '300px'
                        }}
                        items={items2}
                        onClick={onClickItem}
                    />
                </Sider>
                <Content
                    style={{
                        padding: '0 24px',
                    }}
                >
                    {renderContent(selectedKey)}
                </Content>
            </Layout>
        </StyledUserProfile>
    );
};