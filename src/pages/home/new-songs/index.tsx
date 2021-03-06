import React from "react";
import LazyLoad from "react-lazyload";
import { Spin } from "antd";

import req from "../../../api/req";
import { IArtist, INewSongs } from "../type";
import StyledItem from "../../../components/detail/StyledItem";
import StyledWrapper from "../../../components/detail/StyledWrapper";
import StyledDesc from "../../../components/detail/StyledDesc";
import StyledName from "../../../components/detail/StyledName";
import LoadingImg from "../../../components/LoadingImg";

const NewSongs: React.FunctionComponent = () => {
    const [loading, setLoading] = React.useState<boolean>(false);
    const [newSongs, setNewSongs] = React.useState<Array<INewSongs>>([]);

    const getNewSongs = async () => {
        setLoading(true);
        let data = await req.netease.getNewSongs();
        setNewSongs(data);
        setLoading(false);
    };

    React.useEffect(() => {
        getNewSongs();
    }, []);

    return (
        <Spin tip="Loading..." spinning={loading}>
            <h2>《最新音乐》</h2>
            <StyledWrapper>
                {newSongs.map((item: INewSongs) => {
                    return (
                        <StyledItem key={item.id}>
                            <div
                                style={{
                                    width: 150,
                                    height: 150,
                                    position: "relative",
                                }}
                            >
                                <LazyLoad
                                    height={160}
                                    placeholder={<LoadingImg />}
                                >
                                    <img
                                        style={{ opacity: 0.65 }}
                                        width={150}
                                        height={150}
                                        alt="detail-cover"
                                        loading="lazy"
                                        src={item.picUrl}
                                    />
                                </LazyLoad>
                                <StyledDesc width={150}>
                                    <span>By </span>
                                    {item.song.artists.map(
                                        (artist: IArtist) => {
                                            return item.song.artists.length ===
                                                1 ? (
                                                <span key={artist.id}>
                                                    {artist.name}
                                                </span>
                                            ) : (
                                                <span key={artist.id}>
                                                    {`${artist.name} / `}
                                                </span>
                                            );
                                        }
                                    )}
                                </StyledDesc>
                            </div>

                            <StyledName width={150}>{item.name}</StyledName>
                        </StyledItem>
                    );
                })}
            </StyledWrapper>
        </Spin>
    );
};

export default NewSongs;
