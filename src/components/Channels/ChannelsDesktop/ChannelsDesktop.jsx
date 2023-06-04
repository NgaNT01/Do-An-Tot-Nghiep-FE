import { StyledChannelsDesktop } from "./ChannelDesktop.styled";

import { useSelector } from "react-redux";

import ChannelDesktop from "./ChannelDesktop";

const ChannelsDesktop = ({ channelTitle, video }) => {
  const { currentListUser } = useSelector((state) => state.user);
  const {currentBroadcastingStreams} = useSelector(state => state.stream)

  return (
    <StyledChannelsDesktop>

            <div className="channels-box">
                {channelTitle && <h1>{channelTitle}</h1>}
                {currentBroadcastingStreams.length === 0 ? <div style={{marginTop: '20px',marginLeft: '20px'}}>Hiện chưa có luồng nào đươc phát</div> :
                <div className="list">
                    {currentBroadcastingStreams.map((stream, index) => {
                        if (index < 6)
                            return (
                                <ChannelDesktop
                                    stream={stream}
                                    key={index}
                                    imageId={index}
                                    video={video}
                                />
                            );
                    })}
                </div>
                }
            </div>
    </StyledChannelsDesktop>
  );
};

export default ChannelsDesktop;
