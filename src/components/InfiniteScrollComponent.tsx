import { FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';
import { RootState } from '../store/reducers';
import Post from './Post';
import { getPosts } from '../store/actions/postActions';

interface InfiniteScrollProps {
  sortDesc: boolean;
  currentUserId?: string;
}

const InfiniteScrollComponent: FC<InfiniteScrollProps> = ({ currentUserId, sortDesc }) => {
  const dispatch = useDispatch();
  const { data: posts, latestPage, hasMore } = useSelector((state: RootState) => state.posts);

  const refreshPosts = () => {
    dispatch(getPosts({ userId: currentUserId, sortByTime: sortDesc ? 'desc' : 'asc' }));
  };

  const getMorePosts = () => {
    // "posts.length >= PAGE_SIZE" is a hot fix to a bug I discovered in this InfiniteScroll library
    // the "getMorePosts()" function is wrongly triggered when switching from one page to another
    // where the scroll position in the prev page is below the threshold of the InfinityScroll component located in another page
    const PAGE_SIZE = 5;
    posts.length >= PAGE_SIZE &&
      dispatch(
        getPosts({
          userId: currentUserId,
          sortByTime: sortDesc ? 'desc' : 'asc',
          pageNo: latestPage + 1,
          tailId: posts.length > 0 ? posts[posts.length - 1].id : undefined,
        })
      );
  };

  return (
    <InfiniteScroll
      dataLength={posts.length}
      next={getMorePosts}
      hasMore={hasMore}
      loader={<h4>Loading...</h4>}
      endMessage={
        <p style={{ textAlign: 'center' }}>
          <b>Yay! You have seen it all</b>
        </p>
      }
      scrollThreshold={1}
      // below props only if you need pull down functionality
      refreshFunction={refreshPosts}
      pullDownToRefresh
      pullDownToRefreshThreshold={50}
      pullDownToRefreshContent={<h3 style={{ textAlign: 'center' }}>&#8595; Pull down to refresh</h3>}
      releaseToRefreshContent={<h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>}
    >
      {posts.map((post) => (
        <Post key={post.id} data={post} />
      ))}
    </InfiniteScroll>
  );
};

export default InfiniteScrollComponent;
