import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import VideoDesktop from "./VideoDesktop";
import {StyledVideosDesktop} from "./VideoDesktop.styled";
import ReactLoading from "react-loading";
import { Row, Col } from 'antd';

const VideosDesktop = ({ title, currentListRecords }) => {
    // const {currentBroadcastingStreams} = useSelector(state => state.stream);
    const dispatch = useDispatch();
    const {isLoading} = useSelector(state => state.record)

    useEffect(() => {
        console.log(currentListRecords);
    },[])

    return (
        <StyledVideosDesktop>

            <div className="channels-box">
                {title && <h1>{title}</h1>}
                {currentListRecords.length === 0 ? <div style={{marginTop: '20px',marginLeft: '20px',fontSize: '20px'}}>Hiện chưa có video</div> :
                    // <div className="list">
                    //     {currentListRecords.map((record, index) => {
                    //         if (index < 50)
                    //             return (
                    //                 <VideoDesktop
                    //                     key={index}
                    //                     url={record.recordUrl}
                    //                     name={record.recordName}
                    //                     thumbnailUrl={record.thumbnailUrl}
                    //                     startTime={record.startTime}
                    //                     endTime={record.endTime}
                    //                     streamId={record.streamId}
                    //                     style={{display: 'inline-block'}}
                    //                 />
                    //             );
                    //     })}
                    // </div>
                    <Row gutter={[16, 16]} wrap={true}>
                        {currentListRecords.map((record, index) => (
                            <Col key={index} xs={24} sm={12} md={8} lg={6}>
                                <VideoDesktop
                                     key={index}
                                     url={record.recordUrl}
                                     name={record.recordName}
                                     thumbnailUrl={record.thumbnailUrl}
                                     startTime={record.startTime}
                                     endTime={record.endTime}
                                     streamId={record.streamId}
                                     style={{display: 'inline-block'}}
                                />
                            </Col>
                        ))}
                    </Row>
                }
                <div className="react-loading">
                    {isLoading === true ? <ReactLoading  type="spinningBubbles" color="#622DF7"/> : <div/>}
                </div>
            </div>
        </StyledVideosDesktop>
    );
};

export default VideosDesktop;