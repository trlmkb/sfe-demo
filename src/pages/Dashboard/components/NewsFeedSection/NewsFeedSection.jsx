import React, { useState, useEffect } from "react";
import axios from "axios";
import Masonry from "react-masonry-css";

import { LoadingScreen } from "components/LoadingScreen/LoadingScreen";

import { Button } from "components/Button/Button";
import { Card } from "components/Card/Card";
import { BdayCard } from "components/BdayCard/BdayCard";

import "./newsFeedSection.scss";

export const NewsFeedSection = () => {
  const pageIncrement = 6;
  const storiesUrl =
    "http://frontendsourceryweb.s3-website.eu-central-1.amazonaws.com/stories.json";
  const breakpointColumnsObj = {
    default: 3,
    1150: 2,
    767: 1,
  };

  const [isFetching, setIsFetching] = useState(false);
  const [page, setPage] = useState(0);
  const [nextPage, setNextPage] = useState(pageIncrement);
  const [hasMore, setHasMore] = useState(true);
  const [stories, setStories] = useState([]);
  const [error, setError] = useState();

  const loadMore = async () => {
    setIsFetching(true);
    try {
      const storiesPromise = await axios.get(storiesUrl);
      const storiesData = storiesPromise.data;
      setStories((prevStories) => {
        return [
          ...new Set([
            ...prevStories,
            ...storiesData.stories.slice(page, nextPage),
          ]),
        ];
      });
      setPage((prevPageNumber) => prevPageNumber + pageIncrement);
      setNextPage((prevPageNumber) => prevPageNumber + pageIncrement);
      setHasMore(storiesData.stories.length > nextPage);
      setIsFetching(false);
    } catch (e) {
      setError(e.toString());
    }
  };

  useEffect(() => {
    loadMore();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="news">
      <h2 className="news__title"> News and Stories</h2>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="news__masonry-grid"
        columnClassName="news__column"
      >
        {stories.map((story) => {
          return (
            <div className="news__item" key={story.id}>
              {story.type === "post" && (
                <div className="news__item--post">
                  <Card storyData={story} />
                </div>
              )}
              {story.type === "birthday" && (
                <div className="news__item--birthday">
                  <BdayCard storyData={story} />
                </div>
              )}
              {story.type === "video" && (
                <div className="news__item--video">
                  <Card storyData={story} />
                </div>
              )}
            </div>
          );
        })}
      </Masonry>
      <div className="news__footer">
        {error && <p> {error}</p>}
        {!error && isFetching && <LoadingScreen fullScreen={false} />}
        {!isFetching && hasMore && (
          <Button
            variant="primary"
            label="Load More"
            onClick={loadMore}
          ></Button>
        )}
      </div>
    </div>
  );
};