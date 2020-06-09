import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Helmet from "react-helmet";
import ReactPlayer from "react-player";
import Loader from "../../Components/Loader";

const Container = styled.div`
  height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  padding: 50px;
  @media screen and (max-width: 880px) {
    padding: 20px;
  }
`;

const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.bgImage});
  background-position: center center;
  background-size: cover;
  filter: blur(3px);
  opacity: 0.5;
  z-index: 0;
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 1;
`;

const Cover = styled.div`
  width: 300px;
  height: 450px;
  background-image: url(${(props) => props.bgImage});
  background-position: center center;
  background-size: cover;
  border-radius: 5px;
  @media screen and (max-width: 880px) {
    display: none;
  }
`;

const Data = styled.div`
  width: 60%;
  margin-left: 10px;
  @media screen and (max-width: 880px) {
    width: 100%;
  }
`;

const Title = styled.div`
  font-size: 32px;
  margin-bottom: 10px;
`;

const ItemContainer = styled.div`
  margin-bottom: 10px;
`;

const Item = styled.span``;

const Divider = styled.span`
  margin: 0 10px;
`;

const Overview = styled.div`
  font-size: 12px;
  opacity: 0.7;
  line-height: 1.5;
  width: 100%;
`;

const VideoContainer = styled.div`
  width: 100%;
  padding: 10px 0px;
  overflow-x: auto;
  overflow-y: hidden;
`;

const Video = styled(ReactPlayer)`
  margin-top: 10px;
`;

const VideoTitle = styled.div`
  font-size: 24px;
  margin-top: 20px;
`;

const DetailPresenter = ({ result, loading, error }) =>
  loading ? (
    <>
      <Helmet>
        <title>Loading | Nomlifx</title>
      </Helmet>
      <Loader />
    </>
  ) : (
    <Container>
      <Helmet>
        <title>{result.title ? result.title : result.name} | Nomflix</title>
      </Helmet>
      <Backdrop
        bgImage={`https://image.tmdb.org/t/p/original${result.backdrop_path}`}
      />
      <Content>
        <Cover
          bgImage={
            result.poster_path
              ? `https://image.tmdb.org/t/p/original${result.poster_path}`
              : require("../../assets/noPosterSmall.png")
          }
        />
        <Data>
          <Title>{result.title ? result.title : result.name}</Title>
          <ItemContainer>
            <Item>
              {result.release_date
                ? result.release_date.substring(0, 4)
                : result.first_air_date
                ? result.first_air_date.substring(0, 4)
                : "?"}
            </Item>
            <Divider>●</Divider>
            <Item>
              {result.runtime
                ? result.runtime
                : result.episode_run_time
                ? result.episode_run_time[0]
                : "?"}{" "}
              min
            </Item>
            <Divider>●</Divider>
            <Item>
              {result.genres &&
                result.genres.map((genre, index) =>
                  index === result.genres.length - 1
                    ? genre.name
                    : `${genre.name} / `
                )}
            </Item>
          </ItemContainer>
          <Overview>{result.overview}</Overview>
          <VideoContainer>
            <VideoTitle>
              {result.videos.results.length > 0 &&
                result.videos.results[0].name}
            </VideoTitle>
            {result.videos.results.length > 0 && (
              <Video
                url={`https://www.youtube.com/watch?v=${result.videos.results[0].key}`}
                width="340px"
                height="200px"
              />
            )}
          </VideoContainer>
        </Data>
      </Content>
    </Container>
  );

DetailPresenter.propTypes = {
  result: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

export default DetailPresenter;
